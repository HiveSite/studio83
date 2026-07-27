import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/data/site.mjs';
import { services, serviceBySlug } from './src/data/services.mjs';
import { industries, industryBySlug } from './src/data/industries.mjs';
import { cases, caseBySlug } from './src/data/cases.mjs';
import { layout, organizationSchema, websiteSchema, breadcrumbSchema } from './src/templates/layout.mjs';
import { breadcrumbs, sectionHeading, finalCta, serviceCard, caseCard, industryCard, faqList, contactForm } from './src/templates/components.mjs';
import { escapeHtml } from './src/lib/html.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(__dirname, 'src', 'assets');
const blogPosts = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/blog-posts.json'), 'utf8'));

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(publicDir, dist, { recursive: true });
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });
fs.copyFileSync(path.join(assetsDir, 'styles.css'), path.join(dist, 'assets/styles.css'));
fs.copyFileSync(path.join(assetsDir, 'app.js'), path.join(dist, 'assets/app.js'));

const writePage = (route, html) => {
  const clean = route === '/' ? '' : route.replace(/^\//, '').replace(/\/$/, '');
  const target = clean ? path.join(dist, clean, 'index.html') : path.join(dist, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
};

const serviceSchemas = service => [{
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.shortTitle,
  description: service.summary,
  provider: { '@id': `${site.domain}/#organization` },
  areaServed: { '@type': 'Country', name: 'Montenegro' },
  url: `${site.domain}/usluge/${service.slug}/`
}];

function homePage() {
  const proof = site.proof.map(item => `<div class="proof-stat"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join('');
  const body = `
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">Podgorica - digital - ljudi - teren</span>
        <h1><span>Kampanje koje</span><span>dovode ljude</span><span class="outline">do stvarne akcije.</span></h1>
        <p class="lead">Povezujemo Meta i Google kampanje, sadržaj, landing stranice, promotivne timove i realizaciju na terenu kroz jedan jasan cilj.</p>
        <div class="button-row hero-actions"><a class="button button-primary" href="/kontakt/" data-track="hero_lead">Zatraži plan i procjenu</a><a class="button button-ghost" href="/radovi/" data-track="hero_cases">Pogledaj rezultate</a></div>
        <div class="hero-note"><span><i></i> Podgorica i cijela Crna Gora</span><span><i></i> Digital + teren u istom sistemu</span></div>
      </div>
      <div class="hero-visual" aria-label="Sistem koji povezuje kampanje, sadržaj i teren">
        <div class="hero-glow"></div><div class="hero-ring"></div><div class="hero-ring"></div>
        <div class="hero-system"><div class="hero-core"><strong>od oglasa<br>do akcije</strong></div><div class="hero-node hero-node-1"><strong>Kampanja</strong><span>Meta, Google i tracking</span></div><div class="hero-node hero-node-2"><strong>Teren</strong><span>Ljudi, logistika i aktivacija</span></div><div class="hero-node hero-node-3"><strong>Sadržaj</strong><span>Kreative i digitalni nastavak</span></div></div>
      </div>
    </div>
  </section>
  <section class="proof-strip"><div class="container proof-grid"><div class="proof-intro">Operativna osnova, ne samo prezentacija.</div>${proof}</div></section>
  <section class="section"><div class="container">
    ${sectionHeading({ eyebrow: 'Problemi koje rješavamo', title: 'Marketing ne smije da bude skup skup odvojenih zadataka.', text: 'Kampanja, sadržaj, sajt i teren moraju da podrže istu radnju. U suprotnom svako radi svoj dio, a rezultat nema vlasnika.' })}
    <div class="problem-grid">
      <article class="problem-card"><span>01</span><h3>Kampanje troše, a upiti nijesu dovoljno kvalitetni</h3><p>Provjeravamo ponudu, mjerenje i put do kontakta prije povećanja budžeta.</p></article>
      <article class="problem-card"><span>02</span><h3>Aktivacija prođe bez podataka i nastavka</h3><p>Postavljamo mehaniku, evidenciju i sadržaj koji ostaje upotrebljiv poslije događaja.</p></article>
      <article class="problem-card"><span>03</span><h3>Brend nema pouzdan tim za realizaciju</h3><p>Sourcing, raspored, briefing, leadovi smjene i kontrola nalaze se u jednom sistemu.</p></article>
      <article class="problem-card"><span>04</span><h3>Sezona ili launch dolaze bez pripremljenog funnel-a</h3><p>Spajamo ponudu, landing, distribuciju, sadržaj i lokalnu realizaciju prije nego što krene pritisak.</p></article>
    </div>
  </div></section>
  <section class="section section-light"><div class="container">
    ${sectionHeading({ eyebrow: 'Glavni proizvodi', title: 'Ne prodajemo katalog. Slažemo sistem prema cilju.', text: 'Krećemo od ishoda koji biznis želi. Alati, kanali i produkcija dolaze tek nakon toga.' })}
    <div class="service-grid">${services.slice(0,3).map((service,index)=>serviceCard(service,index===0)).join('')}</div>
    <div class="button-row" style="margin-top:28px"><a class="button button-dark" href="/usluge/">Pogledaj kompletnu ponudu</a></div>
  </div></section>
  <section class="section"><div class="container split-sticky">
    <div class="sticky-copy"><span class="eyebrow">Aktivacije i eventi</span><h2>Teren koji ima cilj, vlasnika i dokaz.</h2><p class="lead">Od prvog briefa do završnog izvještaja, svaki korak ima odgovornu osobu, rok i način mjerenja.</p><a class="button button-primary" href="/usluge/aktivacije-i-eventi/">Kako radimo aktivacije</a></div>
    <div class="step-list">
      ${[['01','Cilj i mehanika','Definišemo radnju koju publika treba da uradi i način na koji je bilježimo.'],['02','Tim i operativna mapa','Lokacije, smjene, oprema, odgovornosti, zamjene i plan B.'],['03','Briefing i realizacija','Ljudi znaju poruku, proces i standard prije nego što izađu na teren.'],['04','Sadržaj i mjerenje','Prikupljamo podatke, foto/video dokaz i nalaze za digitalni nastavak.'],['05','Izvještaj i naredni potez','Klijent dobija šta je urađeno, šta smo naučili i gdje postoji prostor za rast.']].map(([n,t,d])=>`<div class="step"><span>${n}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
    </div>
  </div></section>
  <section class="section section-dark"><div class="container">
    ${sectionHeading({ eyebrow: 'Radovi i sistemi', title: 'Dokaz prije obećanja.', text: 'Prikazujemo projekte za koje imamo konkretan obim, proces i potvrđene podatke.' })}
    <div class="case-grid">${cases.slice(0,2).map(caseCard).join('')}</div>
    <div class="button-row" style="margin-top:28px"><a class="button button-ghost" href="/radovi/">Svi projekti</a></div>
  </div></section>
  <section class="section"><div class="container">
    ${sectionHeading({ eyebrow: 'Industrije', title: 'Najviše vrijedimo tamo gdje su digital i lokalna realizacija povezani.', text: 'Ne pokušavamo da budemo specijalisti za svaku industriju. Fokus je na sektorima u kojima naš operativni model ima stvarnu prednost.' })}
    <div class="industry-grid">${industries.map(industryCard).join('')}</div>
  </div></section>
  <section class="section"><div class="container pricing-panel">
    <div><span class="eyebrow">Modeli saradnje</span><h2>Jasan okvir prije početka.</h2><p>Raspon služi da znaš red veličine. Konačna ponuda zavisi od obima, rokova, produkcije, lokacija i potrebnog tima.</p></div>
    <div class="pricing-list"><div class="price-card"><div><h3>Strategija i sprint</h3><p>Analiza, plan, jedna jasna isporuka i definisani sljedeći koraci.</p></div><strong>od 190 €</strong></div><div class="price-card"><div><h3>Kontinuirani growth</h3><p>Kampanje, optimizacija, sadržaj i mjesečni ritam.</p></div><strong>od 600 € / mj.</strong></div><div class="price-card"><div><h3>Kampanja + teren</h3><p>Digitalna distribucija, produkcija, ljudi, aktivacija i izvještaj.</p></div><strong>po ponudi</strong></div></div>
  </div></section>
  <section class="section"><div class="container faq-layout"><div><span class="eyebrow">FAQ</span><h2>Prije nego pošalješ upit.</h2><p>Najvažnije stvari su cilj, rok, lokacija i okvirni budžet. Ostalo možemo strukturisati zajedno.</p></div>${faqList([
    ['Da li radite samo Meta i Google kampanje?','Ne. Oni su često okosnica, ali po potrebi uključujemo sadržaj, landing, SEO osnovu, recruitment ili teren. Sve mora da podrži isti cilj.'],
    ['Radite li van Podgorice?','Da. Digitalne projekte radimo bez geografskog ograničenja, a aktivacije i događaje širom Crne Gore uz unaprijed definisanu logistiku.'],
    ['Koliko brzo možemo početi?','Manji audit ili sprint može krenuti brzo. Kampanje sa produkcijom i terenom zahtijevaju više pripreme, naročito u sezoni.'],
    ['Da li garantujete rezultat?','Ne garantujemo broj prodaja koji ne kontrolišemo. Garantujemo dogovoreni proces, transparentno mjerenje, urednu izvedbu i optimizaciju na osnovu podataka.'],
    ['Možete li preuzeti kompletan projekat?','Da, kada su obim, odgovornosti i budžet jasno definisani. Ne prihvatamo neograničen full-service model bez prioriteta.']
  ])}</div></section>
  ${finalCta()}`;

  return layout({
    title: 'Sindikat Studio 83 - kampanje, ljudi i teren',
    description: 'Performance kampanje, aktivacije, sadržaj, web i recruitment u Crnoj Gori. Povezujemo digital, ljude i teren kroz jedan mjerljiv cilj.',
    path: '/', body,
    schemas: [organizationSchema(), websiteSchema(), {
      '@context':'https://schema.org','@type':'ProfessionalService','@id':`${site.domain}/#service`,name:site.name,url:site.domain,image:`${site.domain}/images/brand/og-cover.png`,areaServed:{'@type':'Country',name:'Montenegro'},address:{'@type':'PostalAddress',addressLocality:'Podgorica',addressCountry:'ME'},parentOrganization:{'@id':`${site.domain}/#organization`}
    }]
  });
}

function servicesIndex() {
  const body = `
  <section class="page-hero"><div class="container">${breadcrumbs([{label:'Usluge',href:'/usluge/'}])}<div class="page-hero-grid"><div><span class="eyebrow">Ponuda</span><h1>Usluge organizovane prema rezultatu, ne prema alatima.</h1><p class="lead">Biramo najkraći sistem koji ima smisla za cilj - od kampanje i landing stranice do ljudi, terena i recruitment distribucije.</p></div><aside class="page-hero-aside"><strong>Svaki projekat dobija</strong><ul><li>jasan cilj i mjerilo</li><li>definisan obim i odgovornost</li><li>tracking i izvještaj gdje je primjenjivo</li><li>konkretan sljedeći korak</li></ul></aside></div></div></section>
  <section class="section section-light"><div class="container"><div class="service-grid service-grid-five">${services.map((service,index)=>serviceCard(service,index===0)).join('')}</div></div></section>
  <section class="section"><div class="container split-sticky"><div class="sticky-copy"><span class="eyebrow">Kako biramo obim</span><h2>Prvo problem. Onda kanal.</h2><p class="lead">Ne preporučujemo sajt, kampanju, content ili aktivaciju prije nego što znamo šta treba da se promijeni u ponašanju kupca ili kandidata.</p></div><div class="step-list">${[['01','Ishod','Upit, rezervacija, posjeta, prodaja, prijava ili mjerljiva interakcija.'],['02','Ograničenja','Budžet, rok, tržište, kapacitet tima i postojeći materijali.'],['03','Najkraći sistem','Biramo minimum kanala i isporuka koji mogu da daju koristan signal.'],['04','Skaliranje','Širimo tek kada osnovni flow radi i kada znamo šta treba pojačati.']].map(([n,t,d])=>`<div class="step"><span>${n}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div></div></section>
  ${finalCta({title:'Ne znaš koja usluga ti treba? To nije problem.',text:'Pošalji cilj, rok i okvir. Preporučićemo najkraći realan put, uključujući opciju da još nije vrijeme za veću kampanju.'})}`;
  return layout({ title:'Usluge - performance, aktivacije, web i recruitment', description:'Kompletna ponuda Sindikat Studio 83: performance kampanje, aktivacije i eventi, web i konverzije, sadržaj i recruitment kampanje.', path:'/usluge/', body, schemas:[organizationSchema(), breadcrumbSchema([{label:'Usluge',href:'/usluge/'}])] });
}

function servicePage(service) {
  const items = service.includes.map((item,index)=>`<article class="deliverable"><span>${String(index+1).padStart(2,'0')}</span><h3>${escapeHtml(item)}</h3></article>`).join('');
  const steps = service.process.map(([title,text],index)=>`<div class="step"><span>${String(index+1).padStart(2,'0')}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div></div>`).join('');
  const prices = service.pricing.map(item=>`<div class="price-card"><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.text)}</p></div><strong>${escapeHtml(item.price)}</strong></div>`).join('');
  const related = services.filter(item=>item.slug!==service.slug).slice(0,3).map(item=>`<article class="related-card"><h3>${escapeHtml(item.shortTitle)}</h3><p>${escapeHtml(item.summary)}</p><a href="/usluge/${item.slug}/">Detalji ↗</a></article>`).join('');
  const crumbs = [{label:'Usluge',href:'/usluge/'},{label:service.shortTitle,href:`/usluge/${service.slug}/`}];
  const body = `
  <section class="page-hero"><div class="container">${breadcrumbs(crumbs)}<div class="page-hero-grid"><div><span class="eyebrow">${escapeHtml(service.eyebrow)}</span><h1>${escapeHtml(service.title)}</h1><p class="lead">${escapeHtml(service.summary)}</p><div class="button-row" style="margin-top:30px"><a class="button button-primary" href="/kontakt/?usluga=${service.slug}" data-track="service_lead">Zatraži plan</a><a class="button button-ghost" href="#sta-dobijas">Šta dobijaš</a></div></div><aside class="page-hero-aside"><strong>Tipični ishodi</strong><ul>${service.outcomes.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></aside></div><div class="outcome-band">${service.outcomes.map(item=>`<div>${escapeHtml(item)}</div>`).join('')}</div></div></section>
  <section class="section" id="sta-dobijas"><div class="container">${sectionHeading({eyebrow:'Obim usluge',title:'Šta konkretno dobijaš.',text:'Konačni obim se zaključava u ponudi. Ovo su standardni blokovi koje kombinujemo prema cilju.'})}<div class="deliverable-grid">${items}</div></div></section>
  <section class="section section-dark"><div class="container split-sticky"><div class="sticky-copy"><span class="eyebrow">Proces</span><h2>Uredan tok od dijagnostike do sljedećeg poteza.</h2><p class="lead">Svaki projekat ima vlasnika, rokove, ulazne materijale i definisanu tačku odobrenja.</p></div><div class="step-list">${steps}</div></div></section>
  <section class="section"><div class="container pricing-panel"><div><span class="eyebrow">Orijentacioni okvir</span><h2>Cijena zavisi od obima, ne od magle.</h2><p>Medijski budžet, produkcijski troškovi, osoblje, transport i zakup nijesu automatski uključeni u agencijsku naknadu. Sve stavke se odvajaju u ponudi.</p></div><div class="pricing-list">${prices}</div></div></section>
  <section class="section"><div class="container faq-layout"><div><span class="eyebrow">Pitanja</span><h2>Najčešće prije početka.</h2><p>Za preciznu procjenu pošalji cilj, rok, tržište i ono što već postoji.</p></div>${faqList(service.faq)}</div></section>
  <section class="section section-dark"><div class="container">${sectionHeading({eyebrow:'Povezane usluge',title:'Kada jedan blok nije dovoljan.'})}<div class="related-grid">${related}</div></div></section>
  ${finalCta({title:`Hajde da procijenimo da li je ${service.shortTitle.toLowerCase()} pravi sljedeći korak.`,text:'Pošalji trenutnu situaciju, rok i budžet. Odgovor će biti konkretan okvir, ne obavezivanje na projekat.'})}`;
  return layout({ title:`${service.shortTitle} u Crnoj Gori`, description:service.summary, path:`/usluge/${service.slug}/`, body, schemas:[organizationSchema(),breadcrumbSchema(crumbs),...serviceSchemas(service)] });
}

function industriesIndex() {
  const body = `<section class="page-hero"><div class="container">${breadcrumbs([{label:'Industrije',href:'/industrije/'}])}<div class="page-hero-grid"><div><span class="eyebrow">Industrije</span><h1>Fokus na tržišta gdje lokalna realizacija pravi razliku.</h1><p class="lead">Naša prednost nije samo digitalna distribucija. Vrijednost raste kada kampanju treba povezati sa lokacijom, sezonom, osobljem, događajem ili recruitment procesom.</p></div><aside class="page-hero-aside"><strong>Najčešći ciljevi</strong><ul><li>više rezervacija i posjeta</li><li>launch proizvoda ili lokacije</li><li>mjerljive aktivacije</li><li>više kvalitetnih kandidata</li></ul></aside></div></div></section><section class="section"><div class="container"><div class="industry-grid">${industries.map(industryCard).join('')}</div></div></section>${finalCta({title:'Tvoja industrija nije na listi?',text:'To ne znači automatski da ne možemo pomoći. Pošalji problem i cilj, pa ćemo reći da li imamo realnu prednost ili ne.'})}`;
  return layout({title:'Industrije - turizam, retail, eventi i zapošljavanje',description:'Marketing i aktivacije za ugostiteljstvo, turizam, retail, FMCG, evente, nekretnine i poslodavce u Crnoj Gori.',path:'/industrije/',body,schemas:[organizationSchema(),breadcrumbSchema([{label:'Industrije',href:'/industrije/'}])]});
}

function industryPage(item) {
  const crumbs=[{label:'Industrije',href:'/industrije/'},{label:item.title,href:`/industrije/${item.slug}/`}];
  const relatedServices = item.slug === 'poslodavci-i-zaposljavanje' ? ['recruitment-kampanje','performance-marketing','web-i-konverzije'] : item.slug === 'retail-i-fmcg' || item.slug === 'eventi-i-venue' ? ['aktivacije-i-eventi','sadrzaj-za-kampanje','performance-marketing'] : ['performance-marketing','web-i-konverzije','sadrzaj-za-kampanje'];
  const body=`<section class="page-hero"><div class="container">${breadcrumbs(crumbs)}<div class="page-hero-grid"><div><span class="eyebrow">Industrija</span><h1>${escapeHtml(item.title)}</h1><p class="lead">${escapeHtml(item.summary)}</p><div class="button-row" style="margin-top:30px"><a class="button button-primary" href="/kontakt/?industrija=${item.slug}">${escapeHtml(item.cta)}</a></div></div><aside class="page-hero-aside"><strong>Najčešći problemi</strong><ul>${item.problems.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></aside></div></div></section><section class="section"><div class="container dual-list"><article class="list-panel"><span class="eyebrow">Problem</span><h2>Gdje sistem najčešće puca.</h2><ul>${item.problems.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></article><article class="list-panel list-panel-solutions"><span class="eyebrow">Rješenje</span><h2>Šta povezujemo.</h2><ul>${item.solutions.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></article></div></section><section class="section section-dark"><div class="container">${sectionHeading({eyebrow:'Preporučeni blokovi',title:'Usluge koje najčešće imaju smisla za ovu industriju.'})}<div class="related-grid">${relatedServices.map(slug=>{const s=serviceBySlug[slug];return `<article class="related-card"><h3>${escapeHtml(s.shortTitle)}</h3><p>${escapeHtml(s.summary)}</p><a href="/usluge/${s.slug}/">Pogledaj uslugu ↗</a></article>`}).join('')}</div></div></section>${finalCta({title:`Složi plan za ${item.title.toLowerCase()}.`,text:'Pošalji lokaciju, period, cilj i okvirni budžet. Posebno je važno da znamo da li je projekat sezonski ili vezan za konkretan datum.',label:item.cta})}`;
  return layout({title:`Marketing za ${item.title.toLowerCase()} u Crnoj Gori`,description:item.summary,path:`/industrije/${item.slug}/`,body,schemas:[organizationSchema(),breadcrumbSchema(crumbs)]});
}

function worksIndex() {
  const body=`<section class="page-hero"><div class="container">${breadcrumbs([{label:'Radovi',href:'/radovi/'}])}<div class="page-hero-grid"><div><span class="eyebrow">Radovi</span><h1>Projekti sa konkretnim obimom, procesom i dokazom.</h1><p class="lead">Ne predstavljamo zamišljene rezultate kao case study. Ovdje su projekti za koje možemo jasno objasniti problem, sistem i ishod.</p></div><aside class="page-hero-aside"><strong>Šta prikazujemo</strong><ul><li>stvarni obim projekta</li><li>potvrđene javne brojke</li><li>ulogu Sindikata</li><li>šta je sistem omogućio</li></ul></aside></div></div></section><section class="section section-dark"><div class="container"><div class="case-grid">${cases.map(caseCard).join('')}</div></div></section>${finalCta({title:'Treba ti sličan sistem?',text:'Nećemo kopirati projekat jedan na jedan. Uzećemo logiku koja radi i prilagoditi je tvom cilju, timu i tržištu.'})}`;
  return layout({title:'Radovi i case studies',description:'Odabrani projekti Sindikat Studio 83: terenski angažmani, event produkcija i razvoj lokalnih digitalnih proizvoda.',path:'/radovi/',body,schemas:[organizationSchema(),breadcrumbSchema([{label:'Radovi',href:'/radovi/'}])]});
}

function casePage(item) {
  const crumbs=[{label:'Radovi',href:'/radovi/'},{label:item.title,href:`/radovi/${item.slug}/`}];
  const body=`<section class="page-hero"><div class="container">${breadcrumbs(crumbs)}<div class="page-hero-grid"><div><span class="eyebrow">${escapeHtml(item.type)}</span><h1>${escapeHtml(item.title)}</h1><p class="lead">${escapeHtml(item.summary)}</p><div class="case-hero-metrics">${item.metrics.map(([v,l])=>`<div><strong>${escapeHtml(v)}</strong><span>${escapeHtml(l)}</span></div>`).join('')}</div></div><div class="case-visual case-visual-${item.slug}" style="min-height:460px;border-radius:26px;border:1px solid var(--line)"><span>${escapeHtml(item.type)}</span><div class="case-orbit"></div></div></div></div></section><section class="section"><div class="container case-story"><article class="story-card"><span>01 - Izazov</span><h2>Šta je trebalo riješiti</h2><p>${escapeHtml(item.challenge)}</p></article><article class="story-card"><span>02 - Sistem</span><h2>Kako je postavljeno</h2><p>${escapeHtml(item.solution)}</p></article><article class="story-card"><span>03 - Ishod</span><h2>Šta je omogućeno</h2><p>${escapeHtml(item.result)}</p></article></div></section><section class="section section-dark"><div class="container"><span class="eyebrow">Obuhvaćene usluge</span><h2>Više disciplina, jedan odgovoran sistem.</h2><div class="case-service-tags">${item.services.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></div></section>${finalCta({title:'Imaš projekat sa više pokretnih djelova?',text:'Pošalji osnovni brief. Prvo ćemo razdvojiti šta je cilj, šta je operativa, a šta stvarno mora da bude u prvoj fazi.'})}`;
  return layout({title:item.title,description:item.summary,path:`/radovi/${item.slug}/`,body,schemas:[organizationSchema(),breadcrumbSchema(crumbs),{'@context':'https://schema.org','@type':'CreativeWork',name:item.title,description:item.summary,creator:{'@id':`${site.domain}/#organization`},url:`${site.domain}/radovi/${item.slug}/`} ]});
}

function aboutPage() {
  const body=`<section class="page-hero"><div class="container">${breadcrumbs([{label:'O nama',href:'/o-nama/'}])}<div class="page-hero-grid"><div><span class="eyebrow">O Sindikatu</span><h1>Nastali smo iz terena. Digital smo dodali da rezultat ne ostane slučajan.</h1><p class="lead">Sindikat je Performance & Activation Studio iz Podgorice. Povezujemo strategiju, kampanje, sadržaj, web, ljude i lokalnu realizaciju.</p></div><aside class="page-hero-aside"><strong>Naš fokus</strong><ul><li>jedan cilj po projektu</li><li>jasna odgovornost i rokovi</li><li>realna lokalna izvedba</li><li>mjerenje bez uljepšavanja</li></ul></aside></div></div></section><section class="section"><div class="container manifesto"><div><span class="eyebrow">Zašto postojimo</span><h2>Između plana i rezultata postoji operativa.</h2></div><div class="manifesto-copy">Dobar oglas ne spašava nejasnu ponudu. Dobar event ne vrijedi mnogo ako prođe bez podataka i nastavka. <strong>Naš posao je da spojimo djelove u sistem koji može da se izvede.</strong></div></div></section><section class="section section-dark"><div class="container">${sectionHeading({eyebrow:'Način rada',title:'Četiri pravila koja nas čuvaju od full-service haosa.'})}<div class="value-grid"><article class="value-card"><span>01</span><h3>Jedan vlasnik</h3><p>Klijent zna ko vodi projekat i ko je odgovoran za sljedeći potez.</p></article><article class="value-card"><span>02</span><h3>Zaključan obim</h3><p>Dogovorene isporuke, rokovi i revizije nijesu otvorena lista bez kraja.</p></article><article class="value-card"><span>03</span><h3>Dokaz prije priče</h3><p>Rezultate prikazujemo samo kada možemo objasniti izvor i kontekst.</p></article><article class="value-card"><span>04</span><h3>Operativa je dio proizvoda</h3><p>Raspored, tracking, forma i izvještaj nijesu sitnice koje se rješavaju na kraju.</p></article></div></div></section><section class="section"><div class="container split-sticky"><div class="sticky-copy"><span class="eyebrow">Razvoj</span><h2>Od event industrije do integrisanog growth sistema.</h2><p class="lead">Počeli smo sa ljudima i događajima. Kroz rad smo vidjeli da teren bez kampanje ostaje izolovan, a kampanja bez sadržaja, landing flowa i operativnog kapaciteta brzo dođe do plafona.</p></div><div class="step-list"><div class="step"><span>01</span><div><h3>Event i promo operativa</h3><p>Sourcing, roster, smjene, koordinacija i realizacija u Crnoj Gori.</p></div></div><div class="step"><span>02</span><div><h3>Digitalne kampanje</h3><p>Meta, Google, creative testing i tracking za upite, registracije i posjete.</p></div></div><div class="step"><span>03</span><div><h3>Web i proizvodi</h3><p>Landing stranice, platforme i procesi koji povezuju podatke sa narednom radnjom.</p></div></div><div class="step"><span>04</span><div><h3>Jedinstven sistem</h3><p>Danas biramo samo blokove koji zajedno imaju smisla za konkretan cilj.</p></div></div></div></div></section>${finalCta()}`;
  return layout({title:'O nama - Performance & Activation Studio',description:'Sindikat Studio 83 je studio iz Podgorice koji spaja digitalne kampanje, sadržaj, web, ljude i aktivacije na terenu.',path:'/o-nama/',body,schemas:[organizationSchema(),breadcrumbSchema([{label:'O nama',href:'/o-nama/'}])]});
}

const categoryLabels={strategija:'Strategija',performance:'Performance',kreative:'Kreative',dogadjaji:'Događaji',aktivacije:'Aktivacije',seo:'SEO',web:'Web'};
function blogIndex() {
  const categories=[...new Set(blogPosts.map(p=>p.category))];
  const cards=blogPosts.map(post=>`<article class="blog-card" data-blog-card data-category="${escapeHtml(post.category)}" data-slug="${escapeHtml(post.slug)}"><img src="${post.cover}" width="1280" height="720" loading="lazy" alt="${escapeHtml(post.coverAlt)}"><div class="blog-card-copy"><span>${escapeHtml(categoryLabels[post.category]||post.category)}</span><h2>${escapeHtml(post.title)}</h2><p>${escapeHtml(post.excerpt)}</p><a href="/blog/${post.slug}/">Pročitaj tekst ↗</a></div></article>`).join('');
  const body=`<section class="page-hero"><div class="container">${breadcrumbs([{label:'Resursi',href:'/blog/'}])}<div class="page-hero-grid"><div><span class="eyebrow">Resursi</span><h1>Praktični vodiči za kampanje, aktivacije i lokalni growth.</h1><p class="lead">Tekstovi su namijenjeni vlasnicima i timovima koji žele da razumiju šta se stvarno radi, koliko djelova sistem ima i gdje najčešće nastaje problem.</p></div><aside class="page-hero-aside"><strong>Teme</strong><ul><li>Meta i Google kampanje</li><li>event produkcija i budžeti</li><li>aktivacije i mjerenje</li><li>landing, SEO i konverzije</li></ul></aside></div></div></section><section class="section"><div class="container"><div class="blog-toolbar"><div class="filter-row"><button class="filter-button is-active" type="button" data-blog-filter="all">Sve</button>${categories.map(c=>`<button class="filter-button" type="button" data-blog-filter="${escapeHtml(c)}">${escapeHtml(categoryLabels[c]||c)}</button>`).join('')}</div><label class="search-field"><span class="sr-only">Pretraži tekstove</span><input type="search" placeholder="Pretraži tekstove" data-blog-search></label></div><div class="blog-grid">${cards}</div></div></section>${finalCta({title:'Treba ti primjena, ne još jedan tekst?',text:'Pošalji konkretnu situaciju i cilj. Pretvorićemo temu u prioritetni plan za tvoj biznis.'})}`;
  return layout({title:'Blog i vodiči',description:'Praktični vodiči o Meta i Google kampanjama, eventima, aktivacijama, sadržaju, SEO-u i konverzijama u Crnoj Gori.',path:'/blog/',body,schemas:[organizationSchema(),breadcrumbSchema([{label:'Resursi',href:'/blog/'}])]});
}

function cleanArticleBody(raw='', cover='/images/covers/generic.svg') {
  return raw
    .replaceAll('/sr-me/blog/', '/blog/')
    .replaceAll('/sr-me/kontakt/', '/kontakt/')
    .replaceAll('/sr-me/usluge/', '/usluge/')
    .replace(/src="https?:\/\/[^"]+"/gi, `src="${cover}"`)
    .replace(/<img(?![^>]*\bwidth=)/gi, '<img width="1280" height="720"')
    .replace(/<p>\s*<strong>([^<]+)<\/strong>\s*<\/p>/gi,'<h2>$1</h2>')
    .replace(/ style="[^"]*"/g,'');
}
function articlePage(post,index) {
  const crumbs=[{label:'Resursi',href:'/blog/'},{label:post.title,href:`/blog/${post.slug}/`}];
  const related=[blogPosts[(index+1)%blogPosts.length],blogPosts[(index+2)%blogPosts.length],blogPosts[(index+3)%blogPosts.length]];
  const body=`<article><header class="article-hero"><div class="container article-hero-inner">${breadcrumbs(crumbs)}<span class="eyebrow">${escapeHtml(categoryLabels[post.category]||post.category)}</span><h1>${escapeHtml(post.title)}</h1><p class="lead">${escapeHtml(post.excerpt)}</p><div class="article-meta"><span>Sindikat Studio 83</span>${post.tags.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></div></header><div class="article-cover"><img src="${post.cover}" width="1280" height="720" alt="${escapeHtml(post.coverAlt)}"></div><section class="section"><div class="container article-layout"><aside class="article-aside"><strong>U tekstu</strong><nav><a href="#article-content">Čitanje</a><a href="#povezani">Povezani tekstovi</a><a href="/kontakt/">Primijeni na projekat</a></nav></aside><div class="article-content" id="article-content">${cleanArticleBody(post.body, post.cover)}</div></div></section></article><section class="section section-dark" id="povezani"><div class="container">${sectionHeading({eyebrow:'Nastavi čitanje',title:'Povezani vodiči'})}<div class="blog-grid">${related.map(p=>`<article class="blog-card"><img src="${p.cover}" width="1280" height="720" loading="lazy" alt="${escapeHtml(p.coverAlt)}"><div class="blog-card-copy"><span>${escapeHtml(categoryLabels[p.category]||p.category)}</span><h2>${escapeHtml(p.title)}</h2><p>${escapeHtml(p.excerpt)}</p><a href="/blog/${p.slug}/">Pročitaj ↗</a></div></article>`).join('')}</div></div></section>${finalCta({title:'Pretvori ideju iz teksta u konkretan plan.',text:'Pošalji trenutni setup, cilj i budžet. Dobićeš prioritetne korake za svoju situaciju.'})}`;
  return layout({title:post.title,description:post.description,path:`/blog/${post.slug}/`,body,type:'article',image:post.cover,schemas:[organizationSchema(),breadcrumbSchema(crumbs),{'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.description,image:`${site.domain}${post.cover}`,author:{'@id':`${site.domain}/#organization`},publisher:{'@id':`${site.domain}/#organization`},mainEntityOfPage:`${site.domain}/blog/${post.slug}/`,inLanguage:site.locale}]});
}

function contactPage() {
  const body=`<section class="page-hero"><div class="container">${breadcrumbs([{label:'Kontakt',href:'/kontakt/'}])}<div class="page-hero-grid"><div><span class="eyebrow">Kontakt</span><h1>Pošalji cilj. Mi ćemo složiti realan sljedeći korak.</h1><p class="lead">Ne moraš znati naziv usluge. Napiši šta želiš da promijeniš, kada, gdje i sa kojim okvirnim budžetom.</p></div><aside class="page-hero-aside"><strong>Dobar početni brief sadrži</strong><ul><li>cilj ili problem</li><li>rok i lokaciju</li><li>šta već postoji</li><li>okvirni budžet</li></ul></aside></div></div></section><section class="section"><div class="container contact-layout"><aside class="contact-sidebar"><span class="eyebrow">Direktan kontakt</span><h2>Podgorica i cijela Crna Gora.</h2><p>Za kampanje, web i strategiju možemo raditi potpuno digitalno. Za aktivacije i događaje planiramo logistiku prema lokaciji.</p><div class="contact-card"><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a><p>Za brži pregled u subject stavi naziv firme ili projekta.</p></div><div class="contact-card"><strong>Instagram</strong><a href="${site.instagram}" target="_blank" rel="noopener">@sindikat_studio83</a><p>Za ozbiljnije briefove forma ili email su pouzdaniji.</p></div></aside>${contactForm()}</div></section>`;
  return layout({title:'Kontakt',description:'Pošaljite upit za performance kampanje, aktivacije, web, sadržaj ili recruitment u Crnoj Gori.',path:'/kontakt/',body,schemas:[organizationSchema(),breadcrumbSchema([{label:'Kontakt',href:'/kontakt/'}])]});
}

const fallbackJobs=[
  {id:'open-promoter',title:'Promoter / promoterka',company:'Sindikat roster',location:'Crna Gora',pay:'',type:'Povremeni angažman'},
  {id:'open-hostess',title:'Hostesa / event osoblje',company:'Sindikat roster',location:'Crna Gora',pay:'',type:'Povremeni angažman'}
];
function jobsPage() {
  const body=`<section class="page-hero"><div class="container">${breadcrumbs([{label:'Postani dio tima',href:'/postani-dio-tima/'}])}<div class="page-hero-grid"><div><span class="eyebrow">Roster i angažmani</span><h1>Radi na promocijama, događajima i terenskim projektima.</h1><p class="lead">Ova stranica koristi postojeći Sindikat backend za aktivne angažmane i prijave. Za šire oglase za posao posjeti ImaPosla.me.</p><div class="button-row" style="margin-top:30px"><button class="button button-primary" type="button" data-apply-job data-job-id="open-application" data-job-title="Otvorena prijava">Pošalji otvorenu prijavu</button><a class="button button-ghost" href="${site.imaposla}" target="_blank" rel="noopener" data-track="imaposla_click">ImaPosla.me</a></div></div><aside class="page-hero-aside"><strong>Prije prijave</strong><ul><li>unesi tačan kontakt</li><li>navedi grad i dostupnost u poruci</li><li>prijava ne garantuje angažman</li><li>uslovi se potvrđuju za svaku smjenu</li></ul></aside></div></div></section><section class="section"><div class="container">${sectionHeading({eyebrow:'Aktivni angažmani',title:'Prijavi se za konkretnu poziciju ili pošalji otvorenu prijavu.',text:'Lista se u pozadini povezuje sa postojećim Google Apps Script endpointom. Ako veza privremeno nije dostupna, prikazuju se otvorene roster prijave.'})}<div class="jobs-list" data-jobs-list data-fallback='${JSON.stringify(fallbackJobs).replaceAll("'",'&#39;')}'><p>Učitavanje angažmana...</p></div></div></section><section class="section section-dark"><div class="container dual-list"><article class="list-panel"><span class="eyebrow">Za firme</span><h2>Treba ti tim ili želiš objaviti angažman?</h2><p>Za veće recruitment kampanje koristi našu recruitment uslugu ili ImaPosla.me. Za kratke event i promo angažmane možeš poslati zahtjev ispod.</p>${postJobForm()}</article><article class="list-panel"><span class="eyebrow">Za kandidate</span><h2>Kako funkcioniše roster.</h2><ul><li>Prijava ulazi u postojeću bazu.</li><li>Kontaktiramo te kada profil i dostupnost odgovaraju projektu.</li><li>Za svaki angažman dobijaš posebne uslove, lokaciju, smjenu i briefing.</li><li>Nemoj slati osjetljive dokumente kroz ovu osnovnu formu.</li></ul></article></div></section>${jobModal()}`;
  return layout({title:'Postani dio tima - angažmani i roster',description:'Prijavi se za promotivne, event i terenske angažmane Sindikat Studio 83 u Podgorici i širom Crne Gore.',path:'/postani-dio-tima/',body,schemas:[organizationSchema(),breadcrumbSchema([{label:'Postani dio tima',href:'/postani-dio-tima/'}])]});
}
function postJobForm(){return `<form class="lead-form" data-post-job-form><div class="form-grid"><label><span>Naziv pozicije *</span><input name="title" required placeholder="Promoter / hostesa / event osoblje"></label><label><span>Kompanija *</span><input name="company" required></label><label><span>Lokacija *</span><input name="location" required placeholder="Podgorica"></label><label><span>Kategorija</span><select name="category"><option>Promocije</option><option>Eventi</option><option>Ugostiteljstvo</option><option>Drugo</option></select></label><label><span>Tip angažmana</span><select name="type"><option>Povremeni</option><option>Sezonski</option><option>Puno radno vrijeme</option></select></label><label><span>Naknada</span><input name="pay" type="number" min="0" placeholder="Iznos u €"></label><input type="hidden" name="payType" value="daily"><label class="form-span"><span>Opis *</span><textarea name="desc" required></textarea></label><label class="form-span"><span>Email ili link za prijavu *</span><input name="apply" required></label></div><div class="form-submit"><button class="button button-primary" type="submit">Pošalji na odobrenje</button></div></form>`}
function jobModal(){return `<div class="modal" data-job-modal aria-hidden="true"><div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="apply-title"><div class="modal-header"><div><span class="eyebrow">Prijava</span><h2 id="apply-title">Pošalji podatke</h2></div><button class="modal-close" type="button" data-modal-close aria-label="Zatvori">×</button></div><form class="lead-form" data-apply-form><input type="hidden" name="jobId"><label><span>Pozicija</span><input name="jobTitle" readonly></label><div class="form-grid" style="margin-top:16px"><label><span>Ime i prezime *</span><input name="name" required autocomplete="name"></label><label><span>Email *</span><input name="email" type="email" required autocomplete="email"></label><label><span>Telefon *</span><input name="phone" required autocomplete="tel"></label><label class="form-span"><span>Grad, dostupnost i kratko iskustvo</span><textarea name="msg" rows="4"></textarea></label></div><div class="form-submit"><button class="button button-primary" type="submit">Pošalji prijavu</button><p>Podaci se šalju kroz postojeći Sindikat sistem za prijave.</p></div></form></div></div>`}

function thankYouPage(){const body=`<section class="section"><div class="container final-cta-panel center" style="margin-top:40px"><span class="eyebrow">Upit je primljen</span><h1 style="font-size:clamp(48px,7vw,82px);margin-top:25px">Hvala. Sljedeći potez je na nama.</h1><p class="lead" style="margin-inline:auto">Pregledaćemo cilj, okvir i kontakt. Ako nedostaje važna informacija, prvo ćemo postaviti kratko pitanje prije nego što predložimo obim.</p><div class="button-row" style="justify-content:center;margin-top:30px"><a class="button button-primary" href="/">Nazad na početnu</a><a class="button button-ghost" href="/radovi/">Pogledaj radove</a></div></div></section>`;return layout({title:'Hvala - upit je poslat',description:'Hvala na upitu za Sindikat Studio 83. Pregledaćemo podatke i javiti se sa konkretnim sljedećim korakom.',path:'/hvala/',body,robots:'noindex,follow'});}

function legalPage(kind){const content={
  privatnost:{title:'Politika privatnosti',description:'Kako Sindikat Studio 83 obrađuje podatke poslate kroz kontakt i prijavne forme.',body:`<p>Ova politika opisuje kako Sindikat Studio 83 obrađuje podatke koje dobrovoljno pošalješ kroz kontakt forme, prijave za angažmane i druge kanale na sajtu.</p><h2>Podaci koje prikupljamo</h2><p>Možemo obraditi ime, naziv firme, email, telefon, cilj projekta, budžetski okvir, poruku, podatke iz prijave za angažman, URL stranice, referrer i kampanjske parametre.</p><h2>Svrha</h2><p>Podatke koristimo da odgovorimo na upit, organizujemo projekat ili prijavu, vodimo evidenciju komunikacije, razumijemo učinak sajta i spriječimo zloupotrebu formi.</p><h2>Servisi trećih strana</h2><p>Sajt koristi Google Analytics, Google Tag Manager i postojeće Google Apps Script endpointove za kontakt, blog i angažmane. Njihova obrada može biti uređena i pravilima tih servisa.</p><h2>Čuvanje i prava</h2><p>Podatke čuvamo onoliko koliko je razumno potrebno za svrhu zbog koje su poslati, ugovorne obaveze i zakonske zahtjeve. Za pristup, ispravku ili brisanje piši na <a href="mailto:${site.email}">${site.email}</a>.</p><h2>Važna napomena</h2><p>Ovo je operativna politika pripremljena za sajt. Prije javne objave treba da je pregleda lokalni pravnik ili lice odgovorno za zaštitu podataka i uskladi sa stvarnim internim procesima.</p>`},
  kolacici:{title:'Politika kolačića',description:'Informacije o analitičkim i funkcionalnim kolačićima na sajtu Sindikat Studio 83.',body:`<p>Sajt koristi lokalnu memoriju i analitičke tehnologije radi funkcionisanja, pamćenja izbora i mjerenja korišćenja.</p><h2>Neophodna memorija</h2><p>Koristimo je da zapamtimo izbor u vezi sa kolačićima i kampanjske parametre tokom sesije.</p><h2>Analitika</h2><p>Na sajtu su zadržani postojeći Google Analytics 4 identifikator i Google Tag Manager kontejner. Oni mogu prikupljati podatke o posjetama i događajima u skladu sa konfiguracijom tih naloga.</p><h2>Promjena izbora</h2><p>Izbor se čuva u lokalnoj memoriji pregledača. Možeš obrisati podatke sajta u podešavanjima pregledača da bi se izbor ponovo prikazao.</p><h2>Produkcijska provjera</h2><p>Prije objave potrebno je provjeriti koje oznake se stvarno aktiviraju kroz GTM i uskladiti banner sa pravnom osnovom i stvarnom konfiguracijom.</p>`},
  'uslovi-koriscenja':{title:'Uslovi korišćenja',description:'Osnovni uslovi korišćenja sajta Sindikat Studio 83.',body:`<p>Sadržaj sajta služi za predstavljanje usluga, projekata, vodiča i mogućnosti angažmana.</p><h2>Ponude i cijene</h2><p>Prikazani rasponi su orijentacioni. Obavezujući obim, rokovi i cijena postoje tek nakon pisane ponude i prihvatanja.</p><h2>Prijave i angažmani</h2><p>Slanje prijave ne garantuje angažman. Uslovi, naknada, lokacija i obaveze potvrđuju se posebno za svaki projekat.</p><h2>Sadržaj</h2><p>Tekstovi i vodiči nijesu pravni, poreski ili finansijski savjet. Korisnik je odgovoran da odluke prilagodi sopstvenoj situaciji.</p><h2>Odgovornost</h2><p>Nastojimo da informacije budu tačne, ali ne garantujemo da će svaki eksterni servis, forma ili link biti dostupan bez prekida.</p><h2>Kontakt</h2><p>Za pitanja piši na <a href="mailto:${site.email}">${site.email}</a>.</p>`}
}[kind];const route=`/${kind}/`;const body=`<section class="section"><div class="container legal">${breadcrumbs([{label:content.title,href:route}])}<span class="eyebrow" style="margin-top:42px">Pravni dokument</span><h1>${content.title}</h1><p class="lead">${content.description}</p>${content.body}<p class="notice">Posljednja interna revizija: jul 2026. Prije produkcijske objave uskladiti sa stvarnim pravnim podacima firme.</p></div></section>`;return layout({title:content.title,description:content.description,path:route,body,schemas:[breadcrumbSchema([{label:content.title,href:route}])]});}

function notFoundPage(){const body=`<section class="section"><div class="container final-cta-panel center"><span class="eyebrow">404</span><h1 style="font-size:clamp(58px,10vw,110px);margin-top:25px">Ova stranica nije pronađena.</h1><p class="lead" style="margin-inline:auto">Link je možda promijenjen tokom nove strukture. Stari važni URL-ovi imaju redirect, a odavde možeš nastaviti na glavne sekcije.</p><div class="button-row" style="justify-content:center;margin-top:30px"><a class="button button-primary" href="/">Početna</a><a class="button button-ghost" href="/usluge/">Usluge</a></div></div></section>`;return layout({title:'Stranica nije pronađena',description:'Tražena stranica ne postoji.',path:'/404.html',body,robots:'noindex,follow'});}

writePage('/', homePage());
writePage('/usluge/', servicesIndex());
services.forEach(service=>writePage(`/usluge/${service.slug}/`,servicePage(service)));
writePage('/industrije/',industriesIndex());
industries.forEach(item=>writePage(`/industrije/${item.slug}/`,industryPage(item)));
writePage('/radovi/',worksIndex());
cases.forEach(item=>writePage(`/radovi/${item.slug}/`,casePage(item)));
writePage('/o-nama/',aboutPage());
writePage('/blog/',blogIndex());
blogPosts.forEach((post,index)=>writePage(`/blog/${post.slug}/`,articlePage(post,index)));
writePage('/kontakt/',contactPage());
writePage('/postani-dio-tima/',jobsPage());
writePage('/hvala/',thankYouPage());
writePage('/privatnost/',legalPage('privatnost'));
writePage('/kolacici/',legalPage('kolacici'));
writePage('/uslovi-koriscenja/',legalPage('uslovi-koriscenja'));
fs.writeFileSync(path.join(dist,'404.html'),notFoundPage());

const routes=[
  '/', '/usluge/', ...services.map(s=>`/usluge/${s.slug}/`), '/industrije/', ...industries.map(i=>`/industrije/${i.slug}/`), '/radovi/', ...cases.map(c=>`/radovi/${c.slug}/`), '/o-nama/', '/blog/', ...blogPosts.map(p=>`/blog/${p.slug}/`), '/kontakt/', '/postani-dio-tima/', '/privatnost/', '/kolacici/', '/uslovi-koriscenja/'
];
const today=new Date().toISOString().slice(0,10);
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route=>`  <url><loc>${site.domain}${route}</loc><lastmod>${today}</lastmod><changefreq>${route.startsWith('/blog/')?'monthly':'weekly'}</changefreq><priority>${route==='/'?'1.0':route.split('/').filter(Boolean).length===1?'0.8':'0.7'}</priority></url>`).join('\n')}\n</urlset>`;
fs.writeFileSync(path.join(dist,'sitemap.xml'),sitemap);
fs.writeFileSync(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`);

const redirects=[
  ['/sr-me/','/'],['/sr-me/index.html','/'],['/sr-me/pocetna/','/'],['/sr-me/Pocetna.html','/'],['/sr-me/onama/','/o-nama/'],['/sr-me/onama/cn.html','/o-nama/'],['/sr-me/kontakt/','/kontakt/'],['/sr-me/poslovi/','/postani-dio-tima/'],['/sr-me/usluge/','/usluge/'],
  ['/sr-me/usluge/oglasavanje.html','/usluge/performance-marketing/'],['/sr-me/usluge/oglasavanje/','/usluge/performance-marketing/'],['/sr-me/usluge/analitika/','/usluge/performance-marketing/'],
  ['/sr-me/usluge/landingpage.html','/usluge/web-i-konverzije/'],['/sr-me/usluge/landingpage/','/usluge/web-i-konverzije/'],['/sr-me/usluge/ux.html','/usluge/web-i-konverzije/'],['/sr-me/usluge/ux/','/usluge/web-i-konverzije/'],['/sr-me/usluge/seo.html','/usluge/web-i-konverzije/'],['/sr-me/usluge/seo/','/usluge/web-i-konverzije/'],
  ['/sr-me/usluge/copywriting.html','/usluge/sadrzaj-za-kampanje/'],['/sr-me/usluge/copywriting/','/usluge/sadrzaj-za-kampanje/'],['/sr-me/usluge/game.html','/usluge/web-i-konverzije/'],['/sr-me/usluge/game/','/usluge/web-i-konverzije/'],['/sr-me/usluge/gamification/','/usluge/aktivacije-i-eventi/'],
  ['/sr-me/blog/','/blog/'],...blogPosts.flatMap(post=>[[`/sr-me/blog/${post.slug}/`,`/blog/${post.slug}/`],[`/sr-me/blog/${post.slug}/index.html`,`/blog/${post.slug}/`]])
];
const redirectHtml = (destination) => `<!doctype html><html lang="sr-ME"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="${site.domain}${destination}"><title>Stranica je premještena</title></head><body><p>Stranica je premještena na <a href="${destination}">novu adresu</a>.</p></body></html>`;
for (const [from, to] of redirects) {
  const cleanFrom = from.replace(/^\//, '');
  const target = cleanFrom.endsWith('.html') ? path.join(dist, cleanFrom) : path.join(dist, cleanFrom, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (!fs.existsSync(target)) fs.writeFileSync(target, redirectHtml(to));
}
fs.writeFileSync(path.join(dist,'_redirects'),redirects.map(([from,to])=>`${from} ${to} 301!`).join('\n')+'\n');
fs.writeFileSync(path.join(dist,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-Frame-Options: SAMEORIGIN\n  Cache-Control: public, max-age=0, must-revalidate\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/images/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
fs.writeFileSync(path.join(__dirname,'vercel.json'),JSON.stringify({cleanUrls:true,trailingSlash:true,redirects:redirects.map(([source,destination])=>({source,destination,permanent:true})),headers:[{source:'/(.*)',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'}]},{source:'/assets/(.*)',headers:[{key:'Cache-Control',value:'public, max-age=31536000, immutable'}]},{source:'/images/(.*)',headers:[{key:'Cache-Control',value:'public, max-age=31536000, immutable'}]}]},null,2));


const apacheRules = redirects.map(([from,to]) => {
  const pattern = from.replace(/^\//,'').replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\/$/,'/?');
  return `RewriteRule ^${pattern}$ ${to} [R=301,L]`;
}).join('\n');
fs.writeFileSync(path.join(dist,'.htaccess'), `RewriteEngine On\n${apacheRules}\n\n<IfModule mod_headers.c>\nHeader always set X-Content-Type-Options "nosniff"\nHeader always set Referrer-Policy "strict-origin-when-cross-origin"\n</IfModule>\n`);

console.log(`Built ${routes.length} indexable pages + utility pages in ${dist}`);
