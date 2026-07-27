export const industries = [
  {
    slug: 'ugostiteljstvo-i-turizam',
    title: 'Ugostiteljstvo i turizam',
    summary: 'Kampanje, direktne rezervacije, sezonski launch, Google prisustvo, sadržaj i aktivacije na lokaciji.',
    problems: ['zavisnost od posrednika i platformi', 'slaba popunjenost van udarnih termina', 'nejasna ponuda za strane i domaće goste'],
    solutions: ['sezonski growth plan', 'Google Search i lokalna vidljivost', 'Meta kampanje i remarketing', 'landing na više jezika', 'QR sistem za recenzije i povratak gosta'],
    cta: 'Planiraj sezonu'
  },
  {
    slug: 'retail-i-fmcg',
    title: 'Retail i FMCG',
    summary: 'Promocije, sampling, launch proizvoda, prodajna mjesta, promo timovi i digitalni nastavak kampanje.',
    problems: ['aktivacija bez mjerljivog ishoda', 'neujednačena realizacija po lokacijama', 'materijal sa terena se ne koristi dalje'],
    solutions: ['operativni rollout po lokacijama', 'promoteri i promo lideri', 'sampling i kupon mehanike', 'foto/video dokaz realizacije', 'remarketing i post-event sadržaj'],
    cta: 'Planiraj aktivaciju'
  },
  {
    slug: 'eventi-i-venue',
    title: 'Eventi i venue',
    summary: 'Punjenje događaja, prodaja ulaznica, guest flow, produkcija, tim i sadržaj prije, tokom i poslije eventa.',
    problems: ['promocija kreće kasno', 'ne postoji jasan prodajni funnel', 'produkcija i marketing rade odvojeno'],
    solutions: ['launch plan i kampanja', 'prodajni landing ili ticket flow', 'event osoblje i koordinacija', 'sadržaj uživo i UGC', 'post-event retargeting'],
    cta: 'Pokreni event kampanju'
  },
  {
    slug: 'nekretnine-i-premium-usluge',
    title: 'Nekretnine i premium usluge',
    summary: 'Lead generation, kvalifikacione forme, jasna prezentacija ponude i praćenje kvaliteta upita.',
    problems: ['mnogo nekvalitetnih upita', 'spora obrada leadova', 'sajt ne objašnjava dovoljno vrijednost i naredni korak'],
    solutions: ['lead kampanje', 'landing po projektu ili ponudi', 'kvalifikaciona pitanja', 'CRM ili email integracija', 'praćenje izvora i kvaliteta leadova'],
    cta: 'Sredi lead sistem'
  },
  {
    slug: 'poslodavci-i-zaposljavanje',
    title: 'Poslodavci i zapošljavanje',
    summary: 'Recruitment kampanje, employer ponuda, prijavni flow, distribucija i sezonski hiring.',
    problems: ['premalo relevantnih prijava', 'oglas ne objašnjava stvarne uslove', 'kandidati odustaju zbog sporog procesa'],
    solutions: ['employer value proposition', 'oglasi i kreativni paket', 'brza prijava bez komplikacije', 'ImaPosla i community distribucija', 'screening i izvještavanje'],
    cta: 'Pokreni recruitment'
  }
];

export const industryBySlug = Object.fromEntries(industries.map(industry => [industry.slug, industry]));
