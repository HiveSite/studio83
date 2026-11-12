(() => {
  const isEn = document.documentElement.lang.toLowerCase().startsWith('en');
  const originalPath = window.location.pathname;
  const path = (isEn ? originalPath.replace(/^\/en(?=\/|$)/, '') : originalPath).replace(/\/+$/, '') || '/';
  const enText = {
  "Kampanje i rast": "Campaigns and growth",
  "Za više prodaje, kvalitetnijih upita i vidljivosti koja vodi do konkretne radnje.": "For more sales, better-qualified enquiries and visibility that leads to action.",
  "Meta i Google": "Meta and Google",
  "kreativa": "creative",
  "landing": "landing pages",
  "tracking": "tracking",
  "Web i digitalni proizvodi": "Web and digital products",
  "Od landing stranice do kompleksnije platforme - jasno, brzo, mobilno i mjerljivo.": "From a landing page to a complex platform - clear, fast, mobile-first and measurable.",
  "web sajtovi": "websites",
  "platforme": "platforms",
  "Aktivacije i eventi": "Activations and events",
  "Od koncepta do kompletne realizacije - produkcija, logistika, tim i dokaz sa terena.": "From concept to delivery - production, logistics, people and evidence from the field.",
  "koncept": "concept",
  "produkcija": "production",
  "logistika": "logistics",
  "teren": "on-site",
  "Timovi i angažmani": "Teams and assignments",
  "Ljudi za promocije, događaje i operativne potrebe - sourcing, briefing i organizacija.": "People for promotions, events and operational needs - sourcing, briefing and coordination.",
  "hostese": "hostesses",
  "promoteri": "promoters",
  "staffing": "staffing",
  "recruitment": "recruitment",
  "Pogledaj rješenje": "Explore solution",
  "Šta vam treba?": "What do you need?",
  "Izaberite cilj. Ne morate znati naziv usluge.": "Choose your objective. You do not need to know the name of the service.",
  "Mi slažemo kanale, produkciju i ljude iza cilja. Vi samo treba da znate šta želite da promijenite.": "We bring together the channels, production and people behind your goal. You only need to know what you want to change.",
  "Kako sarađujemo": "How we work together",
  "Tri jasna načina da radimo zajedno.": "Three clear ways to work together.",
  "Ne kupujete listu zadataka. Birate nivo odgovornosti koji treba da preuzmemo.": "You are not buying a task list. You choose the level of responsibility we take on.",
  "Jedan konkretan problem": "One specific challenge",
  "Sprint": "Sprint",
  "Za projekat sa jasnim početkom, isporukom i rokom.": "For a project with a clear start, deliverables and deadline.",
  "definisan cilj i scope": "defined goal and scope",
  "jedna odgovorna osoba": "one accountable lead",
  "jasan rok i predaja": "clear deadline and handover",
  "bez otvorene liste zahtjeva": "no open-ended requests",
  "od 500 €": "from €500",
  "jednokratno": "one-time",
  "Kontinuirani rast": "Ongoing growth",
  "Partnerstvo": "Partnership",
  "Za firme kojima treba stalni digitalni i marketinški partner.": "For companies needing an ongoing digital and marketing partner.",
  "kampanje i optimizacija": "campaigns and optimization",
  "kreativa i sadržaj": "creative and content",
  "web podrška po prioritetu": "prioritized web support",
  "redovan pregled rezultata": "regular performance reviews",
  "od 600 € / mj.": "from €600 / month",
  "kontinuirano": "ongoing",
  "Jedna tačka odgovornosti": "One point of accountability",
  "Full execution": "Full execution",
  "Za projekte gdje digital, produkcija, ljudi i teren moraju da rade kao jedan sistem.": "For projects where digital, production, people and on-site execution must work as one system.",
  "plan i project management": "planning and project management",
  "digital i kreativna produkcija": "digital and creative production",
  "timovi, logistika i teren": "teams, logistics and on-site execution",
  "izvještaj i naredni potez": "reporting and the next step",
  "od 1.500 €": "from €1,500",
  "prema obimu": "depending on scope",
  "Medijski budžet, zakup, transport, osoblje i eksterni produkcijski troškovi se odvajaju kada su potrebni.": "Media spend, venue hire, transport, staff and third-party production costs are listed separately where relevant.",
  "Pronađi pravi model": "Find the right model",
  "3 pitanja. Jedna preporuka.": "3 questions. One recommendation.",
  "Izaberite ono što je najbliže vašoj situaciji. Na kraju dobijate preporučeni pravac i brief sa već popunjenim kontekstom.": "Choose what best matches your situation. At the end, you will receive a suggested approach and a brief pre-filled with your context.",
  "01 - cilj": "01 - objective",
  "Šta želite da postignete?": "What would you like to achieve?",
  "Više prodaje ili upita": "More sales or enquiries",
  "Novi sajt ili platformu": "A new website or platform",
  "Promociju ili događaj": "A promotion or event",
  "Pronaći i organizovati ljude": "Find and coordinate people",
  "Kompleksan projekat": "A complex project",
  "02 - ritam": "02 - cadence",
  "Kako projekat izgleda?": "What does the project look like?",
  "Jednokratan projekat": "A one-off project",
  "Treba nam kontinuirana podrška": "We need ongoing support",
  "Još nijesmo sigurni": "We are not sure yet",
  "03 - okvir": "03 - budget",
  "Koji je okvirni budžet?": "What is the approximate budget?",
  "Do 500 €": "Up to €500",
  "500 - 1.500 €": "€500 - €1,500",
  "1.500 - 5.000 €": "€1,500 - €5,000",
  "5.000 €+": "€5,000+",
  "Preporuka": "Recommendation",
  "Izaberite tri odgovora iznad.": "Choose three answers above.",
  "Ne morate pogoditi savršeno - brief ćemo finalno složiti zajedno.": "You do not have to get everything exactly right - we will finalize the brief together.",
  "Pošalji brief": "Send a brief",
  "Pogledaj radove": "View our work",
  "Preporuka za vas": "Our recommendation",
  "Jedan jasno definisan problem, isporuka i rok.": "One clearly defined challenge, deliverable and deadline.",
  "Preuzimamo koordinaciju digitala, produkcije, ljudi i realizacije kao jednog sistema.": "We coordinate digital, production, people and delivery as one system.",
  "Partnerstvo za timove i angažmane": "Partnership for teams and assignments",
  "Sourcing, organizacija, briefing i operativa prema potrebnom broju ljudi i lokacija.": "Sourcing, coordination, briefing and operations based on the team size and number of locations.",
  "Kontinuirano vodimo prioritete, kampanje, sadržaj i optimizaciju oko istog poslovnog cilja.": "We continuously manage priorities, campaigns, content and optimization around one business objective.",
  "Web & Digital Sprint": "Web & Digital Sprint",
  "Struktura, UX/UI, razvoj, integracije i objava u jasno zaključanom projektu.": "Structure, UX/UI, development, integrations and launch within a defined project.",
  "Početna dijagnostika": "Initial assessment",
  "Sa ovim okvirom prvo treba precizirati problem i napraviti mali, kontrolisan prvi korak.": "At this budget level, we first clarify the challenge and define a small, controlled first step.",
  "Studio za rast i realizaciju": "Growth and delivery studio",
  "Digital, kampanje,": "Digital, campaigns,",
  "ljudi i realizacija.": "people and delivery.",
  "Jedan tim.": "One team.",
  "Od prvog klika do posljednjeg detalja na terenu - preuzimamo djelove koji moraju da rade zajedno i vodimo ih kroz jednu odgovornu tačku.": "From the first click to the final on-site detail, we coordinate the elements that must work together through one accountable team.",
  "Pronađi rješenje": "Find a solution",
  "Podgorica i cijela Crna Gora": "Podgorica and all of Montenegro",
  "Jedan vlasnik projekta, manje koordinacije za klijenta": "One project lead, less coordination for the client",
  "jedna tačka": "one point of",
  "odgovornosti": "accountability",
  "Digital": "Digital",
  "Kampanje, web i tracking": "Campaigns, web and tracking",
  "Ljudi": "People",
  "Timovi, raspored i logistika": "Teams, scheduling and logistics",
  "Teren": "On-site",
  "Aktivacije, eventi i sadržaj": "Activations, events and content",
  "Operativa koja postoji i van prezentacije.": "Operational capability beyond the pitch deck.",
  "Izabrani radovi": "Selected work",
  "Pogledajte kako izgleda kada preuzmemo odgovornost.": "See what it looks like when we take responsibility.",
  "Problem, naš obim i rezultat - bez dekorativnih case study priča.": "The challenge, our role and the outcome - without decorative case-study claims.",
  "Imate problem koji treba preuzeti?": "Have a challenge that needs an owner?",
  "Pošaljite cilj, rok i okvirni budžet. Dobićete preporuku pravca i realan sljedeći korak.": "Send your goal, deadline and approximate budget. We will recommend a practical approach and next step.",
  "Izaberite prema cilju": "Choose by objective",
  "Ne morate znati da li vam treba performance, CRO, content ili staffing. Izaberite rezultat - mi ćemo složiti pravi sistem iza njega.": "You do not need to know whether you need performance, CRO, content or staffing. Choose the outcome - we will build the right system around it.",
  "Najlakši način da krenete": "The easiest way to get started",
  "izaberite jedan od 4 cilja": "choose one of four objectives",
  "pogledajte šta tipično uključuje": "see what it usually includes",
  "odaberite model saradnje": "choose a way to work together",
  "pošaljite kratak brief": "send a short brief",
  "Kratki brief": "Short brief",
  "Recite cilj. Mi ćemo složiti ostatak.": "Tell us your goal. We will organize the rest.",
  "Ne treba vam gotova specifikacija. Dovoljni su cilj, rok, ono što već postoji i okvirni budžet.": "You do not need a finished specification. Your goal, deadline, existing materials and approximate budget are enough.",
  "Izaberite najbliži cilj": "Choose the closest objective",
  "Web i digitalni proizvod": "Web and digital product",
  "Aktivacija ili događaj": "Activation or event",
  "Kompleksan projekat / više oblasti": "Complex project / multiple services",
  "Nijesam siguran": "Not sure yet",
  "Još nije definisan": "Not yet defined",
  "do 500 €": "up to €500",
  "Preporučeni model:": "Recommended model:",
  "Tip saradnje:": "Collaboration type:",
  "Okvirni budžet:": "Approximate budget:",
  "Kratko o projektu:": "Briefly describe your project:",
  "Problemi koje rješavamo": "Problems we solve",
  "Glavni proizvodi": "Core services",
  "Industrije": "Industries",
  "Prije nego pošalješ upit.": "Before you send an enquiry.",
  "Dokaz prije obećanja.": "Evidence before promises."
};
  const localizeSalesUi = (root) => {
    if (!isEn || !root) return;
    root.querySelectorAll('option').forEach(option => {
      if (!option.hasAttribute('value')) option.setAttribute('value', option.textContent.trim());
    });
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if (node.parentElement?.closest('script,style,noscript')) return;
      const raw=node.nodeValue;
      const value=raw.trim();
      const m=value.match(/^(\d{2}) - (.+)$/);
      const translated=enText[value] || (m && enText[m[2]] ? m[1]+' - '+enText[m[2]] : null);
      if(translated) node.nodeValue=raw.replace(value,translated);
    });
    root.querySelectorAll('a[href^="/"]').forEach(link=>{
      const href=link.getAttribute('href');
      if(href && !href.startsWith('//') && !href.startsWith('/en/') && href!=='/en'){
        link.setAttribute('href', '/en'+href);
      }
    });
  };

  const areas = [
    {
      key: 'growth', index: '01', title: 'Kampanje i rast',
      text: 'Za više prodaje, kvalitetnijih upita i vidljivosti koja vodi do konkretne radnje.',
      tags: ['Meta i Google', 'kreativa', 'landing', 'tracking'],
      href: '/usluge/performance-marketing/', accent: 'var(--pink)'
    },
    {
      key: 'web', index: '02', title: 'Web i digitalni proizvodi',
      text: 'Od landing stranice do kompleksnije platforme - jasno, brzo, mobilno i mjerljivo.',
      tags: ['web sajtovi', 'landing', 'UX/UI', 'platforme'],
      href: '/usluge/web-i-konverzije/', accent: 'var(--yellow)'
    },
    {
      key: 'event', index: '03', title: 'Aktivacije i eventi',
      text: 'Od koncepta do kompletne realizacije - produkcija, logistika, tim i dokaz sa terena.',
      tags: ['koncept', 'produkcija', 'logistika', 'teren'],
      href: '/usluge/aktivacije-i-eventi/', accent: 'var(--cyan)'
    },
    {
      key: 'people', index: '04', title: 'Timovi i angažmani',
      text: 'Ljudi za promocije, događaje i operativne potrebe - sourcing, briefing i organizacija.',
      tags: ['hostese', 'promoteri', 'staffing', 'recruitment'],
      href: '/usluge/recruitment-kampanje/', accent: 'var(--green)'
    }
  ];

  function areaCards() {
    return areas.map(area => `
      <a class="sales-area-card" href="${area.href}" style="--accent:${area.accent}" data-sales-area="${area.key}">
        <span class="sales-area-index">${area.index} - ${area.title}</span>
        <h3>${area.title}</h3>
        <p>${area.text}</p>
        <div class="sales-area-tags">${area.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        <span class="sales-area-link">Pogledaj rješenje <b>↗</b></span>
      </a>`).join('');
  }

  function solutionSection() {
    const section = document.createElement('section');
    section.className = 'sales-solution-section';
    section.id = 'izaberi-rjesenje';
    section.innerHTML = `
      <div class="container">
        <div class="sales-solution-head">
          <div><span class="eyebrow">Šta vam treba?</span><h2>Izaberite cilj. Ne morate znati naziv usluge.</h2></div>
          <p>Mi slažemo kanale, produkciju i ljude iza cilja. Vi samo treba da znate šta želite da promijenite.</p>
        </div>
        <div class="sales-area-grid">${areaCards()}</div>
      </div>`;
    return section;
  }

  function modelsSection() {
    const section = document.createElement('section');
    section.className = 'sales-models';
    section.id = 'saradnja';
    section.innerHTML = `
      <div class="container">
        <div class="sales-models-head">
          <div><span class="eyebrow">Kako sarađujemo</span><h2>Tri jasna načina da radimo zajedno.</h2></div>
          <p>Ne kupujete listu zadataka. Birate nivo odgovornosti koji treba da preuzmemo.</p>
        </div>
        <div class="sales-model-grid">
          <article class="sales-model-card">
            <span class="sales-model-kicker">Jedan konkretan problem</span>
            <h3>Sprint</h3>
            <p>Za projekat sa jasnim početkom, isporukom i rokom.</p>
            <ul><li>definisan cilj i scope</li><li>jedna odgovorna osoba</li><li>jasan rok i predaja</li><li>bez otvorene liste zahtjeva</li></ul>
            <div class="sales-model-price"><strong>od 500 €</strong><span>jednokratno</span></div>
          </article>
          <article class="sales-model-card is-featured">
            <span class="sales-model-kicker">Kontinuirani rast</span>
            <h3>Partnerstvo</h3>
            <p>Za firme kojima treba stalni digitalni i marketinški partner.</p>
            <ul><li>kampanje i optimizacija</li><li>kreativa i sadržaj</li><li>web podrška po prioritetu</li><li>redovan pregled rezultata</li></ul>
            <div class="sales-model-price"><strong>od 600 € / mj.</strong><span>kontinuirano</span></div>
          </article>
          <article class="sales-model-card">
            <span class="sales-model-kicker">Jedna tačka odgovornosti</span>
            <h3>Full execution</h3>
            <p>Za projekte gdje digital, produkcija, ljudi i teren moraju da rade kao jedan sistem.</p>
            <ul><li>plan i project management</li><li>digital i kreativna produkcija</li><li>timovi, logistika i teren</li><li>izvještaj i naredni potez</li></ul>
            <div class="sales-model-price"><strong>od 1.500 €</strong><span>prema obimu</span></div>
          </article>
        </div>
        <p class="sales-model-note">Medijski budžet, zakup, transport, osoblje i eksterni produkcijski troškovi se odvajaju kada su potrebni.</p>
      </div>`;
    return section;
  }

  function chooserSection() {
    const section = document.createElement('section');
    section.className = 'sales-chooser';
    section.innerHTML = `
      <div class="container">
        <div class="sales-chooser-shell" data-sales-chooser>
          <div class="sales-chooser-intro">
            <div><span class="eyebrow">Pronađi pravi model</span><h2>3 pitanja. Jedna preporuka.</h2></div>
            <p>Izaberite ono što je najbliže vašoj situaciji. Na kraju dobijate preporučeni pravac i brief sa već popunjenim kontekstom.</p>
          </div>
          <div class="sales-chooser-grid">
            <div class="sales-chooser-step" data-step="goal">
              <small>01 - cilj</small><h3>Šta želite da postignete?</h3>
              <div class="sales-choice-list">
                <button class="sales-choice" type="button" data-value="growth">Više prodaje ili upita</button>
                <button class="sales-choice" type="button" data-value="web">Novi sajt ili platformu</button>
                <button class="sales-choice" type="button" data-value="event">Promociju ili događaj</button>
                <button class="sales-choice" type="button" data-value="people">Pronaći i organizovati ljude</button>
                <button class="sales-choice" type="button" data-value="complex">Kompleksan projekat</button>
              </div>
            </div>
            <div class="sales-chooser-step" data-step="mode">
              <small>02 - ritam</small><h3>Kako projekat izgleda?</h3>
              <div class="sales-choice-list">
                <button class="sales-choice" type="button" data-value="one">Jednokratan projekat</button>
                <button class="sales-choice" type="button" data-value="ongoing">Treba nam kontinuirana podrška</button>
                <button class="sales-choice" type="button" data-value="unsure">Još nijesmo sigurni</button>
              </div>
            </div>
            <div class="sales-chooser-step" data-step="budget">
              <small>03 - okvir</small><h3>Koji je okvirni budžet?</h3>
              <div class="sales-choice-list">
                <button class="sales-choice" type="button" data-value="under500">Do 500 €</button>
                <button class="sales-choice" type="button" data-value="500-1500">500 - 1.500 €</button>
                <button class="sales-choice" type="button" data-value="1500-5000">1.500 - 5.000 €</button>
                <button class="sales-choice" type="button" data-value="5000plus">5.000 €+</button>
              </div>
            </div>
          </div>
          <div class="sales-recommendation">
            <div class="sales-recommendation-copy" data-sales-result>
              <span>Preporuka</span><strong>Izaberite tri odgovora iznad.</strong><p>Ne morate pogoditi savršeno - brief ćemo finalno složiti zajedno.</p>
            </div>
            <div class="sales-recommendation-actions">
              <a class="button button-primary" href="/kontakt/" data-sales-brief>Pošalji brief</a>
              <a class="button button-ghost" href="/radovi/">Pogledaj radove</a>
            </div>
          </div>
        </div>
      </div>`;
    return section;
  }

  function findMainSection(text) {
    return [...document.querySelectorAll('main > section')].find(section => section.textContent.includes(text) || (isEn && enText[text] && section.textContent.includes(enText[text])));
  }

  function setupChooser(root = document) {
    const chooser = root.querySelector('[data-sales-chooser]');
    if (!chooser) return;
    const state = { goal: '', mode: '', budget: '' };
    const result = chooser.querySelector('[data-sales-result]');
    const brief = chooser.querySelector('[data-sales-brief]');
    const budgetLabels = { under500: 'do 500 €', '500-1500': '500 - 1.500 €', '1500-5000': '1.500 - 5.000 €', '5000plus': '5.000 €+' };
    const goalLabels = { growth: 'više prodaje ili upita', web: 'novi sajt ili platformu', event: 'promociju ili događaj', people: 'ljude i angažmane', complex: 'kompleksan projekat' };
    const modeLabels = { one: 'jednokratan projekat', ongoing: 'kontinuiranu saradnju', unsure: 'još nedefinisan model' };

    const render = () => {
      if (!state.goal || !state.mode || !state.budget) {
        result.innerHTML = '<span>Preporuka</span><strong>Izaberite tri odgovora iznad.</strong><p>Ne morate pogoditi savršeno - brief ćemo finalno složiti zajedno.</p>';
        brief.href = isEn ? '/en/kontakt/' : '/kontakt/';
        localizeSalesUi(result);
        return;
      }
      let title = 'Sprint';
      let text = 'Jedan jasno definisan problem, isporuka i rok.';
      if (state.goal === 'event' || state.goal === 'complex') {
        title = 'Full execution';
        text = 'Preuzimamo koordinaciju digitala, produkcije, ljudi i realizacije kao jednog sistema.';
      } else if (state.goal === 'people') {
        title = state.mode === 'ongoing' ? 'Partnerstvo za timove i angažmane' : 'Timovi i angažmani';
        text = 'Sourcing, organizacija, briefing i operativa prema potrebnom broju ljudi i lokacija.';
      } else if (state.mode === 'ongoing') {
        title = 'Partnerstvo';
        text = 'Kontinuirano vodimo prioritete, kampanje, sadržaj i optimizaciju oko istog poslovnog cilja.';
      } else if (state.goal === 'web') {
        title = 'Web & Digital Sprint';
        text = 'Struktura, UX/UI, razvoj, integracije i objava u jasno zaključanom projektu.';
      } else if (state.budget === 'under500') {
        title = 'Početna dijagnostika';
        text = 'Sa ovim okvirom prvo treba precizirati problem i napraviti mali, kontrolisan prvi korak.';
      }
      result.innerHTML = `<span>Preporuka za vas</span><strong>${title}</strong><p>${text}</p>`;
      const params = new URLSearchParams({ cilj: goalLabels[state.goal], model: modeLabels[state.mode], budzet: budgetLabels[state.budget], preporuka: title });
      brief.href = `${isEn ? '/en' : ''}/kontakt/?${params.toString()}`;
      localizeSalesUi(result);
    };

    chooser.querySelectorAll('.sales-chooser-step').forEach(step => {
      const key = step.dataset.step;
      step.querySelectorAll('.sales-choice').forEach(button => {
        button.addEventListener('click', () => {
          step.querySelectorAll('.sales-choice').forEach(item => item.classList.remove('is-selected'));
          button.classList.add('is-selected');
          state[key] = button.dataset.value;
          render();
        });
      });
    });
  }

  function enhanceHome() {
    document.body.classList.add('sales-home');
    const copy = document.querySelector('.hero-copy');
    if (copy) {
      copy.innerHTML = `
        <span class="eyebrow">Studio za rast i realizaciju</span>
        <h1><span>Digital, kampanje,</span><span>ljudi i realizacija.</span><span class="outline">Jedan tim.</span></h1>
        <p class="lead">Od prvog klika do posljednjeg detalja na terenu - preuzimamo djelove koji moraju da rade zajedno i vodimo ih kroz jednu odgovornu tačku.</p>
        <div class="button-row hero-actions"><a class="button button-primary" href="#izaberi-rjesenje" data-track="hero_solution">Pronađi rješenje</a><a class="button button-ghost" href="/radovi/" data-track="hero_cases">Pogledaj radove</a></div>
        <div class="hero-note"><span><i></i> Podgorica i cijela Crna Gora</span><span><i></i> Jedan vlasnik projekta, manje koordinacije za klijenta</span></div>`;
    }
    const core = document.querySelector('.hero-core strong');
    if (core) core.innerHTML = 'jedna tačka<br>odgovornosti';
    const node1 = document.querySelector('.hero-node-1');
    const node2 = document.querySelector('.hero-node-2');
    const node3 = document.querySelector('.hero-node-3');
    if (node1) node1.innerHTML = '<strong>Digital</strong><span>Kampanje, web i tracking</span>';
    if (node2) node2.innerHTML = '<strong>Ljudi</strong><span>Timovi, raspored i logistika</span>';
    if (node3) node3.innerHTML = '<strong>Teren</strong><span>Aktivacije, eventi i sadržaj</span>';

    const proofIntro = document.querySelector('.proof-intro');
    if (proofIntro) proofIntro.textContent = 'Operativa koja postoji i van prezentacije.';

    ['Problemi koje rješavamo', 'Glavni proizvodi', 'Aktivacije i eventi', 'Industrije', 'Prije nego pošalješ upit.'].forEach(text => {
      const section = findMainSection(text);
      if (section) section.remove();
    });

    const proof = document.querySelector('.proof-strip');
    if (proof) {
      const solutions = solutionSection();
      proof.insertAdjacentElement('afterend', solutions);
      solutions.insertAdjacentElement('afterend', chooserSection());
    }

    const caseSection = findMainSection('Dokaz prije obećanja.');
    if (caseSection) {
      const title = caseSection.querySelector('.section-heading h2');
      const text = caseSection.querySelector('.section-heading > p');
      const eyebrow = caseSection.querySelector('.section-heading .eyebrow');
      if (eyebrow) eyebrow.textContent = 'Izabrani radovi';
      if (title) title.textContent = 'Pogledajte kako izgleda kada preuzmemo odgovornost.';
      if (text) text.textContent = 'Problem, naš obim i rezultat - bez dekorativnih case study priča.';
    }

    const oldPricing = document.querySelector('.pricing-panel')?.closest('section');
    if (oldPricing) oldPricing.replaceWith(modelsSection());

    const final = document.querySelector('.final-cta-panel');
    if (final) {
      const title = final.querySelector('h2');
      const text = final.querySelector('p');
      const primary = final.querySelector('.button-primary');
      if (title) title.textContent = 'Imate problem koji treba preuzeti?';
      if (text) text.textContent = 'Pošaljite cilj, rok i okvirni budžet. Dobićete preporuku pravca i realan sljedeći korak.';
      if (primary) primary.textContent = 'Pošalji brief';
    }
    setupChooser(document);
  }

  function enhanceServicesIndex() {
    document.body.classList.add('sales-service-index');
    const hero = document.querySelector('.page-hero-grid > div');
    if (hero) {
      const eyebrow = hero.querySelector('.eyebrow');
      const title = hero.querySelector('h1');
      const lead = hero.querySelector('.lead');
      if (eyebrow) eyebrow.textContent = 'Izaberite prema cilju';
      if (title) title.textContent = 'Šta želite da postignete?';
      if (lead) lead.textContent = 'Ne morate znati da li vam treba performance, CRO, content ili staffing. Izaberite rezultat - mi ćemo složiti pravi sistem iza njega.';
    }
    const aside = document.querySelector('.page-hero-aside');
    if (aside) aside.innerHTML = '<strong>Najlakši način da krenete</strong><ul><li>izaberite jedan od 4 cilja</li><li>pogledajte šta tipično uključuje</li><li>odaberite model saradnje</li><li>pošaljite kratak brief</li></ul>';

    const oldServices = document.querySelector('.service-grid-five')?.closest('section');
    if (oldServices) oldServices.replaceWith(solutionSection());
    const final = document.querySelector('.final-cta');
    if (final) final.insertAdjacentElement('beforebegin', modelsSection());
  }

  function enhanceContact() {
    document.body.classList.add('sales-contact');
    const hero = document.querySelector('.page-hero-grid > div');
    if (hero) {
      const eyebrow = hero.querySelector('.eyebrow');
      const title = hero.querySelector('h1');
      const lead = hero.querySelector('.lead');
      if (eyebrow) eyebrow.textContent = 'Kratki brief';
      if (title) title.textContent = 'Recite cilj. Mi ćemo složiti ostatak.';
      if (lead) lead.textContent = 'Ne treba vam gotova specifikacija. Dovoljni su cilj, rok, ono što već postoji i okvirni budžet.';
    }
    const goal = document.querySelector('select[name="goal"]');
    if (goal) {
      goal.innerHTML = '<option value="">Izaberite najbliži cilj</option><option>Kampanje i rast</option><option>Web i digitalni proizvod</option><option>Aktivacija ili događaj</option><option>Timovi i angažmani</option><option>Kompleksan projekat / više oblasti</option><option>Nijesam siguran</option>';
    }
    const budget = document.querySelector('select[name="budget"]');
    if (budget) {
      budget.innerHTML = '<option value="">Još nije definisan</option><option>do 500 €</option><option>500 - 1.500 €</option><option>1.500 - 5.000 €</option><option>5.000 €+</option>';
    }
    const params = new URLSearchParams(window.location.search);
    const goalParam = (params.get('cilj') || '').toLowerCase();
    if (goal && goalParam) {
      const match = [...goal.options].find(option => {
        const val = option.textContent.toLowerCase();
        return (goalParam.includes('prodaje') && val.includes('kampanje')) ||
          (goalParam.includes('sajt') && val.includes('web')) ||
          (goalParam.includes('promociju') && val.includes('aktivacija')) ||
          (goalParam.includes('ljude') && val.includes('timovi')) ||
          (goalParam.includes('kompleksan') && val.includes('kompleksan'));
      });
      if (match) goal.value = match.value;
    }
    const message = document.querySelector('textarea[name="message"]');
    if (message && params.get('preporuka')) {
      const lines = [
        `Preporučeni model: ${params.get('preporuka')}`,
        params.get('model') ? `Tip saradnje: ${params.get('model')}` : '',
        params.get('budzet') ? `Okvirni budžet: ${params.get('budzet')}` : '',
        '',
        'Kratko o projektu: '
      ].filter((line, i) => line || i >= 3);
      message.value = lines.join('\n');
    }
  }

  if (path === '/') enhanceHome();
  if (path === '/usluge') enhanceServicesIndex();
  if (path === '/kontakt') enhanceContact();
  localizeSalesUi(document.querySelector('main'));
})();
