export const cases = [
  {
    slug: 'sistem-za-terenske-angazmane',
    type: 'Operacije + aktivacije',
    title: 'Sistem za terenske angažmane širom Crne Gore',
    summary: 'Od sourcinga do isplate - roster, koordinacija, leadovi smjene i izvještavanje za promotivne i event angažmane.',
    metrics: [
      ['150+', 'ljudi u rosteru'],
      ['15+', 'klijenata'],
      ['20.000 €+', 'isplaćeno angažovanima u četiri mjeseca']
    ],
    challenge: 'Klijentima nije potreban samo spisak ljudi. Potrebni su pouzdani dolasci, jasne smjene, zamjene, briefing, kontrola i izvještaj bez svakodnevnog operativnog haosa.',
    solution: 'Postavljen je operativni sistem sa sourcingom, rosterom, promo liderima, check-in/check-out logikom, odgovornošću po lokaciji i standardizovanim izvještajem.',
    result: 'Sindikat može organizovati promotivne i event timove u Podgorici i drugim gradovima, uz jasnu evidenciju i centralnu komunikaciju sa klijentom.',
    services: ['Aktivacije i eventi', 'Recruitment kampanje', 'Operativna koordinacija']
  },
  {
    slug: 'battlebots-arena',
    type: 'Edukativni event + produkcija',
    title: 'BattleBots Arena - program kroz četiri opštine',
    summary: 'Višemjesečni STEAM program, radionice, lokalne aktivnosti i trodnevno finale povezani kroz jednu produkcijsku i komunikacionu cjelinu.',
    metrics: [
      ['4', 'opštine'],
      ['150+', 'učesnika'],
      ['10', 'finalnih timova']
    ],
    challenge: 'Program je zahtijevao koordinaciju partnera, predavača, učesnika, lokacija, radionica, produkcije finala i komunikacije kroz više mjeseci.',
    solution: 'Napravljen je fazni plan sa info danima, radionicama, lokalnim koordinacijama, finalnom selekcijom i centralnim događajem u Mtel Digitalnoj fabrici.',
    result: 'Program je završen sa deset finalnih timova i jasnim tokom od prve prijave do finalnog takmičenja.',
    services: ['Event produkcija', 'Projektna koordinacija', 'Sadržaj i komunikacija']
  },
  {
    slug: 'imaposla-digitalni-proizvod',
    type: 'Digitalni proizvod + growth',
    title: 'ImaPosla.me - platforma i distribucioni sistem za poslove',
    summary: 'Web platforma, employer flow, kandidat profili, oglasi, SEO struktura, Viber zajednica i društveni kanali povezani u jedan lokalni employment proizvod.',
    metrics: [
      ['Web', 'platforma za firme i kandidate'],
      ['3.000+', 'članova Viber zajednice'],
      ['CG', 'lokalno fokusiran proizvod']
    ],
    challenge: 'Oglasi, kandidati i komunikacija bili su rasuti kroz društvene mreže i poruke, bez centralnog mjesta za pretragu, prijavu i upravljanje.',
    solution: 'Razvijen je sistem sa rutama za oglase, gradove, kategorije, firme, profile, brze poslove i administratorske procese, uz kanale za distribuciju.',
    result: 'Nastao je proizvod koji kombinuje platformu, zajednicu i promotivnu infrastrukturu i može da podrži recruitment kampanje klijenata.',
    services: ['Web i konverzije', 'Recruitment kampanje', 'SEO i distribucija']
  }
];

export const caseBySlug = Object.fromEntries(cases.map(item => [item.slug, item]));
