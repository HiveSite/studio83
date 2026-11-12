export const casesEn = [
  {
    slug:'sistem-za-terenske-angazmane',
    type:'Operations + activations',
    title:'Field staffing system across Montenegro',
    summary:'From sourcing to payment - talent roster, coordination, shift leaders and reporting for promotional and event assignments.',
    metrics:[['150+','people on the roster'],['15+','clients'],['20.000 €+','paid to staff over four months']],
    challenge:'Clients need more than a list of people. They need reliable attendance, clear shifts, replacements, briefings, supervision and reporting without daily operational chaos.',
    solution:'We built an operating system covering sourcing, the staff roster, promotional team leaders, check-in/check-out procedures, accountability at each location and standardized reporting.',
    result:'Sindikat can organize promotional and event teams in Podgorica and other cities with clear records and centralized client communication.',
    services:['Activations and events','Recruitment campaigns','Operations coordination']
  },
  {
    slug:'battlebots-arena',
    type:'Educational event + production',
    title:'BattleBots Arena - a programme across four municipalities',
    summary:'A multi-month STEAM programme, workshops, local activities and a three-day finale brought together in one production and communications programme.',
    metrics:[['4','municipalities'],['150+','participants'],['10','finalist teams']],
    challenge:'The programme required months of coordination among partners, instructors, participants, venues, workshops, finale production and communications.',
    solution:'We created a phased plan with information days, workshops, local coordination, final selection and a central event at the Mtel Digital Factory.',
    result:'The programme concluded with ten finalist teams and a clear journey from initial applications to the final competition.',
    services:['Event production','Project coordination','Content and communications']
  },
  {
    slug:'imaposla-digitalni-proizvod',
    type:'Digital product + growth',
    title:'ImaPosla.me - job platform and distribution network',
    summary:'A web platform, employer flow, candidate profiles, listings, SEO structure, Viber community and social channels connected into one local employment product.',
    metrics:[['Web','platform for employers and candidates'],['3.000+','Viber community members'],['CG','locally focused product']],
    challenge:'Job listings, candidates and communication were scattered across social networks and messages, without a central place for search, applications and management.',
    solution:'We developed routes for vacancies, cities, categories, companies, profiles, quick jobs and administration, supported by distribution channels.',
    result:'The result is a product combining a platform, a community and promotional infrastructure that can support clients’ recruitment campaigns.',
    services:['Web and conversions','Recruitment campaigns','SEO and distribution']
  }
];
export const caseEnBySlug = Object.fromEntries(casesEn.map(item=>[item.slug,item]));
