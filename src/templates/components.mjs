import { navigation, site } from '../data/site.mjs';
import { escapeHtml } from '../lib/html.mjs';

export function header(activePath = '/') {
  const links = navigation.map(item => {
    const active = activePath.startsWith(item.href) && item.href !== '/' ? ' aria-current="page" class="is-active"' : '';
    return `<a href="${item.href}"${active}>${item.label}</a>`;
  }).join('');

  return `
  <a class="skip-link" href="#main">Preskoči na sadržaj</a>
  <header class="site-header" data-header>
    <div class="container nav-shell">
      <a class="brand" href="/" aria-label="Sindikat Studio 83 - početna">
        <img src="/images/brand/logo.png" width="210" height="210" alt="Sindikat Studio 83">
      </a>
      <nav class="desktop-nav" aria-label="Glavna navigacija">${links}</nav>
      <div class="nav-actions">
        <a class="button button-primary button-small" href="/kontakt/" data-track="header_lead">Zatraži plan</a>
        <button class="menu-toggle" type="button" aria-label="Otvori meni" aria-expanded="false" data-menu-toggle>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="mobile-panel" data-mobile-menu>
      <nav aria-label="Mobilna navigacija">${links}<a href="/postani-dio-tima/">Postani dio tima</a></nav>
      <a class="button button-primary" href="/kontakt/">Zatraži plan i procjenu</a>
    </div>
  </header>`;
}

export function footer() {
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="/images/brand/logo.png" width="180" height="180" alt="Sindikat Studio 83">
        <p>Kampanje, sadržaj, ljudi i teren povezani kroz isti cilj.</p>
        <div class="footer-socials">
          <a href="${site.instagram}" target="_blank" rel="noopener noreferrer" data-track="instagram_click">Instagram</a>
          <a href="mailto:${site.email}" data-track="email_click">Email</a>
        </div>
      </div>
      <div>
        <h2>Usluge</h2>
        <a href="/usluge/performance-marketing/">Performance marketing</a>
        <a href="/usluge/aktivacije-i-eventi/">Aktivacije i eventi</a>
        <a href="/usluge/web-i-konverzije/">Web i konverzije</a>
        <a href="/usluge/recruitment-kampanje/">Recruitment kampanje</a>
      </div>
      <div>
        <h2>Studio</h2>
        <a href="/radovi/">Radovi</a>
        <a href="/industrije/">Industrije</a>
        <a href="/o-nama/">O nama</a>
        <a href="/blog/">Resursi</a>
        <a href="/postani-dio-tima/">Postani dio tima</a>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p>${site.location}</p>
        <a href="mailto:${site.email}">${site.email}</a>
        <a href="/kontakt/">Pošalji upit</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© <span data-year></span> Sindikat Studio 83</span>
      <div><a href="/privatnost/">Privatnost</a><a href="/kolacici/">Kolačići</a><a href="/uslovi-koriscenja/">Uslovi</a></div>
    </div>
  </footer>
  <div class="mobile-cta"><a class="button button-primary" href="/kontakt/" data-track="mobile_sticky_lead">Zatraži plan</a></div>
  <div class="cookie-banner" data-cookie-banner hidden>
    <div><strong>Kolačići i analitika</strong><p>Koristimo analitiku da razumijemo kako sajt radi. Izbor možeš kasnije promijeniti.</p></div>
    <div class="cookie-actions"><button class="button button-ghost button-small" type="button" data-cookie-reject>Odbij</button><button class="button button-primary button-small" type="button" data-cookie-accept>Prihvati</button></div>
  </div>`;
}

export function breadcrumbs(items = []) {
  const list = [{ label: 'Početna', href: '/' }, ...items];
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${list.map((item, index) => index === list.length - 1
    ? `<span aria-current="page">${escapeHtml(item.label)}</span>`
    : `<a href="${item.href}">${escapeHtml(item.label)}</a><i>/</i>`).join('')}</nav>`;
}

export function sectionHeading({ eyebrow, title, text = '', align = '' }) {
  return `<div class="section-heading ${align ? `section-heading-${align}` : ''}">
    <div><span class="eyebrow">${escapeHtml(eyebrow)}</span><h2>${title}</h2></div>
    ${text ? `<p>${text}</p>` : ''}
  </div>`;
}

export function finalCta({ title = 'Imaš cilj. Hajde da složimo sistem koji ga podržava.', text = 'Pošalji okvir, rok i budžet. Dobićeš konkretan sljedeći korak, ne generičku prezentaciju.', label = 'Zatraži plan i procjenu' } = {}) {
  return `<section class="final-cta section"><div class="container final-cta-panel">
    <span class="eyebrow">Sljedeći korak</span>
    <h2>${title}</h2>
    <p>${text}</p>
    <div class="button-row"><a class="button button-primary" href="/kontakt/" data-track="final_lead">${label}</a><a class="button button-ghost" href="/radovi/">Pogledaj radove</a></div>
  </div></section>`;
}

export function serviceCard(service, featured = false) {
  return `<article class="service-card ${featured ? 'service-card-featured' : ''}">
    <span class="service-index">${escapeHtml(service.eyebrow)}</span>
    <h3>${escapeHtml(service.shortTitle)}</h3>
    <p>${escapeHtml(service.summary)}</p>
    <ul>${service.outcomes.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    <a href="/usluge/${service.slug}/">Pogledaj uslugu <span>↗</span></a>
  </article>`;
}

export function caseCard(item) {
  return `<article class="case-card">
    <div class="case-visual case-visual-${item.slug}"><span>${escapeHtml(item.type)}</span><div class="case-orbit"></div></div>
    <div class="case-card-copy"><span class="eyebrow">${escapeHtml(item.type)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p>
    <div class="case-mini-metrics">${item.metrics.slice(0, 3).map(metric => `<div><strong>${escapeHtml(metric[0])}</strong><span>${escapeHtml(metric[1])}</span></div>`).join('')}</div>
    <a href="/radovi/${item.slug}/">Pogledaj projekat <span>↗</span></a></div>
  </article>`;
}

export function industryCard(item) {
  return `<a class="industry-card" href="/industrije/${item.slug}/"><span class="industry-mark"></span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><span class="industry-link">Detalji ↗</span></a>`;
}

export function faqList(items = []) {
  return `<div class="faq-list">${items.map(([question, answer], index) => `<details ${index === 0 ? 'open' : ''}><summary>${escapeHtml(question)}<span>+</span></summary><div><p>${escapeHtml(answer)}</p></div></details>`).join('')}</div>`;
}

export function contactForm({ compact = false, source = 'contact-page' } = {}) {
  return `<form class="lead-form ${compact ? 'lead-form-compact' : ''}" data-contact-form data-source="${escapeHtml(source)}" novalidate>
    <div class="form-grid">
      <label><span>Ime i firma *</span><input name="name" autocomplete="name" required placeholder="Marko / Naziv firme"></label>
      <label><span>Email ili telefon *</span><input name="contact" autocomplete="email" required placeholder="marko@email.com / +382..."></label>
      <label><span>Šta želiš da postigneš? *</span><select name="goal" required><option value="">Izaberi cilj</option><option>Više upita ili prodaje</option><option>Aktivacija ili događaj</option><option>Novi sajt ili landing</option><option>Recruitment i kandidati</option><option>Sezonska kampanja</option><option>Drugo</option></select></label>
      <label><span>Okvirni budžet</span><select name="budget"><option value="">Još nije definisan</option><option>do 500 €</option><option>500-1.500 €</option><option>1.500-5.000 €</option><option>5.000 €+</option></select></label>
      <label><span>Kada želiš da kreneš?</span><select name="deadline"><option value="">Izaberi okvir</option><option>Što prije</option><option>U narednih 30 dana</option><option>Za 1-3 mjeseca</option><option>Kasnije / planiranje</option></select></label>
      <label class="form-span"><span>Kratak opis projekta</span><textarea name="message" rows="5" placeholder="Napiši šta već postoji, rok, lokaciju i najvažniji problem."></textarea></label>
      <label class="honeypot" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
    </div>
    <div class="form-submit"><button class="button button-primary" type="submit">Pošalji upit</button><p>Slanjem forme prihvataš <a href="/privatnost/">pravila privatnosti</a>.</p></div>
    <div class="form-status" role="status" aria-live="polite" data-form-status></div>
  </form>`;
}
