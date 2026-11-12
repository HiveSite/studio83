export const industriesEn = [
  {
    slug:'ugostiteljstvo-i-turizam', title:'Hospitality and tourism',
    summary:'Campaigns, direct bookings, seasonal launches, Google visibility, content and on-site activations.',
    problems:['dependence on intermediaries and booking platforms','low occupancy outside peak periods','unclear offers for international and domestic guests'],
    solutions:['seasonal growth plan','Google Search and local visibility','Meta campaigns and remarketing','multilingual landing pages','QR-based review and guest return system'],
    cta:'Plan your season'
  },
  {
    slug:'retail-i-fmcg',title:'Retail and FMCG',
    summary:'Promotions, sampling, product launches, points of sale, promotional teams and digital campaign follow-up.',
    problems:['activations with no measurable outcome','inconsistent execution across locations','on-site content not reused after the event'],
    solutions:['coordinated rollout across locations','promoters and team leaders','sampling and coupon mechanics','photo/video proof of execution','remarketing and post-event content'],
    cta:'Plan an activation'
  },
  {
    slug:'eventi-i-venue',title:'Events and venues',
    summary:'Building event attendance, ticket sales, guest journeys, production, staffing and content before, during and after the event.',
    problems:['promotion starts too late','no clear sales funnel','production and marketing operate separately'],
    solutions:['launch plan and campaign','sales landing page or ticketing flow','event staff and coordination','live content and UGC','post-event retargeting'],
    cta:'Launch an event campaign'
  },
  {
    slug:'nekretnine-i-premium-usluge',title:'Real estate and premium services',
    summary:'Lead generation, qualification forms, clear offer presentation and lead quality tracking.',
    problems:['too many unqualified enquiries','slow lead follow-up','website does not clearly explain value or the next step'],
    solutions:['lead-generation campaigns','dedicated landing pages for projects or offers','qualification questions','CRM or email integration','lead source and quality tracking'],
    cta:'Improve your lead system'
  },
  {
    slug:'poslodavci-i-zaposljavanje',title:'Employers and recruitment',
    summary:'Recruitment campaigns, employer offers, application flows, distribution and seasonal hiring.',
    problems:['too few relevant applications','job advertisements lack clear terms','candidates abandon slow application processes'],
    solutions:['employer value proposition','job advertisements and creative package','fast, simple applications','ImaPosla and community distribution','screening and reporting'],
    cta:'Launch recruitment'
  }
];
export const industryEnBySlug = Object.fromEntries(industriesEn.map(item=>[item.slug,item]));
