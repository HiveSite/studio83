export const services = [
  {
    slug: 'performance-marketing',
    eyebrow: 'Performance sistem',
    title: 'Kampanje koje vode do upita, rezervacije ili prodaje',
    shortTitle: 'Performance marketing',
    summary: 'Meta i Google kampanje povezujemo sa ponudom, landing stranicom, trackingom i kreativama. Ne optimizujemo za lijepe grafikone, nego za radnju koja vrijedi biznisu.',
    outcomes: ['više kvalitetnih upita', 'jasnija cijena konverzije', 'kontinuirano testiranje ponude i kreativa'],
    includes: [
      'analiza cilja, ponude i trenutnog funnel-a',
      'plan kanala i kampanjske strukture',
      'Meta Ads i/ili Google Ads postavka',
      'GA4, GTM i conversion event tracking',
      'ads kreative, copy i varijante za testiranje',
      'sedmična optimizacija i jasan mjesečni izvještaj'
    ],
    process: [
      ['Dijagnostika', 'Provjeravamo ponudu, podatke, budžet, konkurenciju i gdje trenutno curi konverzija.'],
      ['Postavka', 'Sređujemo tracking, publike, kampanje, landing flow i kreativne varijante.'],
      ['Test', 'Pokrećemo kontrolisane testove i ne donosimo zaključke na osnovu par klikova.'],
      ['Optimizacija', 'Budžet pomjeramo prema izvorima i porukama koje daju kvalitetniji rezultat.']
    ],
    pricing: [
      { name: 'Dijagnostika', price: 'od 190 €', text: 'Jednokratni audit i akcioni plan.' },
      { name: 'Postavka kampanje', price: 'od 300 €', text: 'Tracking, struktura, oglasi i launch.' },
      { name: 'Mjesečno vođenje', price: 'od 400 €', text: 'Optimizacija, testovi i izvještavanje. Medijski budžet nije uključen.' }
    ],
    faq: [
      ['Koliki budžet ima smisla?', 'Zavisi od cilja, marže i tržišta. Za lokalne kampanje često je važnije da postoji dovoljno budžeta za stabilan test nego da se odmah ide široko. Budžet definišemo nakon dijagnostike.'],
      ['Da li radite samo Meta oglase?', 'Ne. Koristimo Meta, Google i druge kanale kada imaju smisla, ali ne uvodimo kanal samo zato što je popularan.'],
      ['Možete li raditi sa postojećim sajtom?', 'Da. Prvo provjeravamo brzinu, poruku, CTA i tracking. Nekad je dovoljna optimizacija, a nekad je isplativije napraviti namjenski landing.']
    ],
    accent: 'pink'
  },
  {
    slug: 'aktivacije-i-eventi',
    eyebrow: 'Teren + digital',
    title: 'Aktivacije i događaji koji ostavljaju mjerljiv trag',
    shortTitle: 'Aktivacije i eventi',
    summary: 'Planiramo koncept, tim, logistiku i sadržaj sa terena. Aktivaciju povezujemo sa QR kodovima, leadovima, kuponima, remarketingom i izvještajem.',
    outcomes: ['organizovan tim i logistika', 'mjerljiva interakcija na terenu', 'sadržaj za nastavak kampanje'],
    includes: [
      'koncept i mehanika aktivacije',
      'sourcing i koordinacija promotera, hostesa i event tima',
      'briefing, raspored, check-in i kontrola realizacije',
      'sampling, lead capture, QR ili kupon mehanika',
      'foto i video sadržaj sa terena',
      'post-event izvještaj i digitalni nastavak'
    ],
    process: [
      ['Cilj', 'Definišemo šta osoba treba da uradi i kako se ta radnja broji.'],
      ['Plan terena', 'Lokacije, termini, broj ljudi, oprema, rizici i plan B ulaze u jednu operativnu mapu.'],
      ['Priprema tima', 'Biramo ljude, radimo briefing i postavljamo jasnu odgovornost po smjeni.'],
      ['Realizacija i izvještaj', 'Pratimo prisustvo, učinak, materijal i nalaze koji pomažu narednoj kampanji.']
    ],
    pricing: [
      { name: 'Plan aktivacije', price: 'od 500 €', text: 'Koncept, operativni plan i budžetska struktura.' },
      { name: 'Produkcija i koordinacija', price: 'od 1.500 €', text: 'Agencijska naknada zavisi od broja lokacija, ljudi i dana.' },
      { name: 'Kompletna kampanja', price: 'po ponudi', text: 'Digital, produkcija, ljudi, teren i izvještavanje.' }
    ],
    faq: [
      ['Radite li van Podgorice?', 'Da. Radimo širom Crne Gore. Transport, smještaj i dodatna logistika van Podgorice definišu se u ponudi.'],
      ['Ko obezbjeđuje uniforme i materijal?', 'Možemo preuzeti nabavku i produkciju, ili raditi sa materijalom koji klijent već ima. U oba slučaja radimo kontrolnu listu prije izlaska na teren.'],
      ['Kako mjerite aktivaciju?', 'Zavisno od cilja koristimo broj interakcija, podijeljenih uzoraka, QR skenova, prijava, kupona, posjeta, UGC materijala i kvalitativni izvještaj tima.']
    ],
    accent: 'cyan'
  },
  {
    slug: 'web-i-konverzije',
    eyebrow: 'Web + CRO',
    title: 'Landing stranice i sajtovi napravljeni da vode korisnika do akcije',
    shortTitle: 'Web i konverzije',
    summary: 'Pravimo brze, mobilno prioritetne stranice sa jasnom ponudom, strukturisanim sadržajem, SEO osnovom, analitikom i formama koje se stvarno mogu koristiti.',
    outcomes: ['jasnija ponuda', 'manje trenja u formama', 'brži i mjerljiviji put do konverzije'],
    includes: [
      'informaciona arhitektura i UX flow',
      'copy i struktura ponude',
      'responsive UI i produkcijski frontend',
      'forme, integracije i thank-you flow',
      'tehnički SEO i schema podaci',
      'GA4/GTM event tracking i QA'
    ],
    process: [
      ['Struktura', 'Definišemo ko dolazi, šta mora da razumije i koju radnju treba da uradi.'],
      ['Prototip', 'Pravimo ključne ekrane i prodajni redosljed prije finalnog razvoja.'],
      ['Produkcija', 'Implementiramo responsive, pristupačan i brz frontend sa svim integracijama.'],
      ['QA i objava', 'Testiramo linkove, forme, tracking, SEO, mobilni prikaz i redirecte.']
    ],
    pricing: [
      { name: 'Landing stranica', price: 'od 550 €', text: 'Jedna prodajna stranica sa trackingom i formom.' },
      { name: 'Premium mini-sajt', price: 'od 900 €', text: 'Više sekcija ili stranica, sadržaj i lokalni SEO.' },
      { name: 'Kompleksniji web sistem', price: 'po specifikaciji', text: 'Integracije, korisnički flow i posebna logika.' }
    ],
    faq: [
      ['Da li dobijam kod?', 'Da. Predajemo produkcijski repo, dokumentaciju i pristupe koji pripadaju klijentu.'],
      ['Radite li održavanje?', 'Da. Može biti mjesečno ili po potrebi. Jasno razdvajamo održavanje od novih funkcionalnosti.'],
      ['Možete li povezati postojeće forme i analitiku?', 'Da. Prije migracije mapiramo sve postojeće endpointove, eventove i redirecte kako se funkcionalnost ne bi izgubila.']
    ],
    accent: 'yellow'
  },
  {
    slug: 'sadrzaj-za-kampanje',
    eyebrow: 'Creative system',
    title: 'Sadržaj koji ima posao u kampanji',
    shortTitle: 'Sadržaj za kampanje',
    summary: 'Planiramo hookove, formate i varijante prema fazi funnel-a. Materijal se pravi za testiranje i distribuciju, ne samo da feed izgleda uredno.',
    outcomes: ['više kreativnih testova', 'jasnija poruka ponude', 'materijal prilagođen kanalima i fazama funnel-a'],
    includes: [
      'content i ads creative plan',
      'hook, angle i copy matrica',
      'foto, video, UGC i terenski materijal',
      'formatiranje za Meta, Google i društvene mreže',
      'varijante naslova, CTA-a i uvodnih kadrova',
      'arhiva materijala i plan ponovne upotrebe'
    ],
    process: [
      ['Poruka', 'Iz ponude izvlačimo nekoliko uglova koji odgovaraju različitim motivima publike.'],
      ['Produkcioni plan', 'Definišemo scene, kadrove, formate, ljude, lokacije i rokove.'],
      ['Izvedba', 'Snimamo ili dizajniramo materijal u paketima spremnim za distribuciju.'],
      ['Test i iteracija', 'Najbolje poruke razvijamo dalje, a slabe ne branimo iz estetskih razloga.']
    ],
    pricing: [
      { name: 'Creative plan', price: 'od 250 €', text: 'Poruke, hookovi, formati i produkcioni plan.' },
      { name: 'Paket ads kreativa', price: 'od 400 €', text: 'Obim zavisi od broja formata i produkcije.' },
      { name: 'Kontinuirana produkcija', price: 'od 700 €', text: 'Mjesečni sistem materijala i iteracija.' }
    ],
    faq: [
      ['Radite li vođenje društvenih mreža?', 'Da, kada mreže imaju jasnu ulogu u prodajnom ili reputacionom sistemu. Ne prodajemo samo broj objava bez cilja.'],
      ['Da li snimate na lokaciji?', 'Da. Produkcija na lokaciji se planira posebno i može se povezati sa aktivacijom ili događajem.'],
      ['Dobijamo li izvorne fajlove?', 'Predaja se definiše ponudom. Finalni eksporti su standard, a izvorni fajlovi se mogu uključiti kada su klijentu potrebni.']
    ],
    accent: 'pink'
  },
  {
    slug: 'recruitment-kampanje',
    eyebrow: 'Recruitment growth',
    title: 'Kampanje za zapošljavanje i sezonski angažman',
    shortTitle: 'Recruitment kampanje',
    summary: 'Povezujemo employer ponudu, landing, oglase, zajednice i screening pitanja da kompanija dobije više relevantnih prijava, a ne samo veći broj CV-eva.',
    outcomes: ['više relevantnih kandidata', 'brži screening i organizovaniji proces', 'mjerljiva cijena prijave i izvora kandidata'],
    includes: [
      'definisanje employer ponude i oglasa',
      'recruitment landing i prijavni flow',
      'Meta kampanja za kandidate',
      'distribucija kroz ImaPosla i relevantne zajednice',
      'screening pitanja i organizacija leadova',
      'employer sadržaj i izvještavanje'
    ],
    process: [
      ['Profil kandidata', 'Preciziramo ko je potreban, šta je minimum i zbog čega bi kandidat izabrao ponudu.'],
      ['Ponuda i flow', 'Sređujemo oglas, benefite, prijavu i pitanja koja smanjuju nepotrebni screening.'],
      ['Distribucija', 'Pokrećemo kampanje i koristimo kanale koji imaju pristup lokalnim kandidatima.'],
      ['Optimizacija', 'Pratimo kvalitet, izvor i brzinu odgovora, ne samo broj prijava.']
    ],
    pricing: [
      { name: 'Recruitment sprint', price: 'od 400 €', text: 'Oglas, landing/prijava, distribucija i kampanjska postavka.' },
      { name: 'Sezonska kampanja', price: 'od 800 €', text: 'Više pozicija, kreativni paket i kontinuirana optimizacija.' },
      { name: 'Employer sistem', price: 'po ponudi', text: 'Employer branding, sadržaj, baza i kontinuirani hiring flow.' }
    ],
    faq: [
      ['Da li garantujete zaposlenje kandidata?', 'Ne. Možemo povećati broj i kvalitet prijava i pomoći procesu, ali konačna odluka zavisi od ponude, uslova i selekcije kompanije.'],
      ['Možete li raditi više pozicija odjednom?', 'Da. Strukturu pravimo po prioritetima, lokacijama i razlikama između profila kandidata.'],
      ['Da li je ImaPosla obavezno?', 'Nije, ali je koristan kanal kada ciljna grupa odgovara publici platforme i zajednice.']
    ],
    accent: 'cyan'
  }
];

export const serviceBySlug = Object.fromEntries(services.map(service => [service.slug, service]));
