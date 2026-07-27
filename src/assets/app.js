(() => {
  'use strict';
  const config = window.SINDIKAT_CONFIG || {};
  const dataLayer = window.dataLayer = window.dataLayer || [];
  const pushEvent = (event, params = {}) => dataLayer.push({ event, ...params });

  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (toggle && mobileMenu) {
    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', () => {
      const next = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(next));
      mobileMenu.classList.toggle('is-open', next);
      document.body.style.overflow = next ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    window.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  document.addEventListener('click', event => {
    const tracked = event.target.closest('[data-track]');
    if (tracked) pushEvent(tracked.dataset.track, { link_url: tracked.href || '', link_text: tracked.textContent.trim() });
    const hrefNode = event.target.closest('a[href]');
    if (!hrefNode) return;
    const href = hrefNode.getAttribute('href') || '';
    if (href.startsWith('mailto:')) pushEvent('email_click', { link_url: href });
    if (href.startsWith('tel:')) pushEvent('phone_click', { link_url: href });
  });

  const parseUtm = () => {
    const params = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
    return Object.fromEntries(keys.map(key => [key, params.get(key) || sessionStorage.getItem(`sindikat_${key}`) || '']));
  };
  const rememberUtm = () => {
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach(key => {
      const value = params.get(key);
      if (value) sessionStorage.setItem(`sindikat_${key}`, value);
    });
  };
  rememberUtm();

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    let started = false;
    form.addEventListener('input', () => {
      if (!started) {
        started = true;
        pushEvent('form_start', { form_name: 'lead_form', form_source: form.dataset.source || 'unknown' });
      }
    }, { once: true });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      const submit = form.querySelector('button[type="submit"]');
      const fd = new FormData(form);
      if (fd.get('website')) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Popuni obavezna polja.';
        status.className = 'form-status is-error';
        pushEvent('form_error', { form_name: 'lead_form', reason: 'validation' });
        return;
      }
      const utm = parseUtm();
      const payload = {
        name: String(fd.get('name') || '').trim(),
        contact: String(fd.get('contact') || '').trim(),
        goal: String(fd.get('goal') || '').trim(),
        budget: String(fd.get('budget') || '').trim(),
        deadline: String(fd.get('deadline') || '').trim(),
        message: String(fd.get('message') || '').trim(),
        url: window.location.href,
        referrer: document.referrer,
        source: form.dataset.source || 'new-website',
        ...utm
      };
      const old = submit.textContent;
      submit.disabled = true;
      submit.textContent = 'Šaljem...';
      status.textContent = 'Slanje u toku...';
      status.className = 'form-status';
      try {
        const response = await fetch(config.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.ok === false) throw new Error(result.error || `HTTP ${response.status}`);
        pushEvent('generate_lead', { form_name: 'lead_form', goal: payload.goal, budget: payload.budget, form_source: payload.source });
        form.reset();
        status.textContent = 'Hvala. Upit je poslat i javićemo se uskoro.';
        status.className = 'form-status is-success';
        setTimeout(() => { window.location.href = '/hvala/?source=contact'; }, 700);
      } catch (error) {
        console.error(error);
        status.textContent = 'Slanje nije prošlo. Probaj ponovo ili piši direktno na sindikatevents@gmail.com.';
        status.className = 'form-status is-error';
        pushEvent('form_error', { form_name: 'lead_form', reason: 'network' });
      } finally {
        submit.disabled = false;
        submit.textContent = old;
      }
    });
  });

  const filterButtons = document.querySelectorAll('[data-blog-filter]');
  const search = document.querySelector('[data-blog-search]');
  const blogCards = document.querySelectorAll('[data-blog-card]');
  if (blogCards.length) {
    let active = 'all';
    const apply = () => {
      const q = (search?.value || '').toLocaleLowerCase('sr');
      blogCards.forEach(card => {
        const matchCategory = active === 'all' || card.dataset.category === active;
        const matchText = !q || card.textContent.toLocaleLowerCase('sr').includes(q);
        card.classList.toggle('hidden', !(matchCategory && matchText));
      });
    };
    filterButtons.forEach(button => button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.remove('is-active'));
      button.classList.add('is-active');
      active = button.dataset.blogFilter;
      apply();
      pushEvent('blog_filter', { category: active });
    }));
    search?.addEventListener('input', apply);
  }

  if (blogCards.length && config.blogEndpoint) {
    fetch(config.blogEndpoint, { cache: 'no-store' })
      .then(response => response.json())
      .then(data => {
        const posts = Array.isArray(data?.posts) ? data.posts : [];
        posts.forEach(post => {
          const card = document.querySelector(`[data-blog-card][data-slug="${CSS.escape(String(post.slug || ''))}"]`);
          if (!card) return;
          const title = card.querySelector('h2');
          const excerpt = card.querySelector('p');
          if (title && post.title) title.textContent = post.title;
          if (excerpt && post.excerpt) excerpt.textContent = post.excerpt;
        });
        pushEvent('blog_feed_sync', { matched_posts: posts.filter(post => document.querySelector(`[data-blog-card][data-slug="${CSS.escape(String(post.slug || ''))}"]`)).length });
      })
      .catch(() => {});
  }

  const cookieBanner = document.querySelector('[data-cookie-banner]');
  const cookieChoice = localStorage.getItem('sindikat_cookie_choice');
  const setConsent = choice => {
    localStorage.setItem('sindikat_cookie_choice', choice);
    cookieBanner.hidden = true;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: choice === 'accepted' ? 'granted' : 'denied',
        ad_storage: choice === 'accepted' ? 'granted' : 'denied',
        ad_user_data: choice === 'accepted' ? 'granted' : 'denied',
        ad_personalization: choice === 'accepted' ? 'granted' : 'denied'
      });
    }
    pushEvent('consent_update', { consent_choice: choice });
  };
  if (cookieBanner && !cookieChoice) cookieBanner.hidden = false;
  if (cookieChoice) setConsent(cookieChoice);
  document.querySelector('[data-cookie-accept]')?.addEventListener('click', () => setConsent('accepted'));
  document.querySelector('[data-cookie-reject]')?.addEventListener('click', () => setConsent('rejected'));

  const modal = document.querySelector('[data-job-modal]');
  const applyForm = document.querySelector('[data-apply-form]');
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.addEventListener('click', event => {
    const open = event.target.closest('[data-apply-job]');
    if (open && modal && applyForm) {
      applyForm.elements.jobId.value = open.dataset.jobId || 'open-application';
      applyForm.elements.jobTitle.value = open.dataset.jobTitle || 'Otvorena prijava';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      applyForm.querySelector('input[name="name"]')?.focus();
      pushEvent('job_apply_start', { job_id: open.dataset.jobId || '' });
    }
    if (event.target.closest('[data-modal-close]') || event.target === modal) closeModal();
  });
  window.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

  const postUrlEncoded = payload => fetch(config.jobsEndpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: new URLSearchParams({ ...payload, source: 'Sindikat website - production', userAgent: navigator.userAgent }).toString()
  });

  applyForm?.addEventListener('submit', event => {
    event.preventDefault();
    const fd = new FormData(applyForm);
    const submit = applyForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    postUrlEncoded({
      action: 'apply',
      jobId: fd.get('jobId') || '',
      jobTitle: fd.get('jobTitle') || '',
      name: fd.get('name') || '',
      email: fd.get('email') || '',
      phone: fd.get('phone') || '',
      msg: fd.get('msg') || ''
    }).finally(() => {
      pushEvent('job_application', { job_id: fd.get('jobId') || '', job_title: fd.get('jobTitle') || '' });
      applyForm.reset();
      submit.disabled = false;
      closeModal();
      alert('Prijava je poslata.');
    });
  });

  const postJobForm = document.querySelector('[data-post-job-form]');
  postJobForm?.addEventListener('submit', event => {
    event.preventDefault();
    const fd = new FormData(postJobForm);
    const submit = postJobForm.querySelector('button[type="submit"]');
    const now = new Date();
    submit.disabled = true;
    postUrlEncoded({
      action: 'post_job',
      id: `p_${Date.now()}`,
      title: fd.get('title') || '',
      company: fd.get('company') || '',
      location: fd.get('location') || '',
      category: fd.get('category') || '',
      type: fd.get('type') || '',
      pay: fd.get('pay') || '',
      payType: fd.get('payType') || 'daily',
      posted: now.toISOString().slice(0, 10),
      desc: fd.get('desc') || '',
      responsibilities: '', qualifications: '', benefits: '', img: '', apply: fd.get('apply') || ''
    }).finally(() => {
      pushEvent('job_post_submit', { company: fd.get('company') || '' });
      postJobForm.reset();
      submit.disabled = false;
      alert('Oglas je poslat na odobrenje.');
    });
  });

  const jobsList = document.querySelector('[data-jobs-list]');
  if (jobsList && config.jobsEndpoint) {
    const fallback = JSON.parse(jobsList.dataset.fallback || '[]');
    const renderJobs = jobs => {
      const clean = jobs.filter(job => job && (job.title || job.position)).slice(0, 12);
      jobsList.innerHTML = clean.map(job => {
        const id = String(job.id || job.ID || 'open');
        const title = String(job.title || job.position || 'Angažman');
        const company = String(job.company || 'Sindikat partner');
        const location = String(job.location || 'Crna Gora');
        const pay = job.pay ? `${job.pay} €` : 'Po dogovoru';
        return `<article class="job-card"><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(company)}</p><div class="job-meta"><span>${escapeHtml(location)}</span><span>${escapeHtml(pay)}</span><span>${escapeHtml(job.type || 'Angažman')}</span></div></div><div class="job-card-actions"><button class="button button-primary button-small" type="button" data-apply-job data-job-id="${escapeHtml(id)}" data-job-title="${escapeHtml(title)}">Prijavi se</button></div></article>`;
      }).join('') || '<p>Trenutno nema objavljenih angažmana. Možeš poslati otvorenu prijavu.</p>';
    };
    const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]));
    renderJobs(fallback);
    fetch(`${config.jobsEndpoint}?action=jobs`, { cache: 'no-store' })
      .then(response => response.json())
      .then(data => {
        const jobs = Array.isArray(data) ? data : (Array.isArray(data.jobs) ? data.jobs : []);
        if (jobs.length) renderJobs(jobs);
      })
      .catch(() => {});
  }
})();
