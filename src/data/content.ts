export const profile = {
  name: 'Tarique',
  fullName: 'Tarique Khan',
  title: 'Director, Business Development',
  company: 'Brim Financial',
  location: 'Toronto, ON',
  specialties: ['BaaS', 'CaaS', 'Payment Rails', 'RPAA Compliance', 'Enterprise Sales', 'Go-to-Market'],
  markets: ['Canada', 'United States'],
};

export const tickerItems = [
  { type: 'opinion' as const, text: 'Open Banking: Start building, stop talking.' },
  { type: 'opinion' as const, text: 'Procurement is the product when selling to FIs.' },
  { type: 'opinion' as const, text: 'Raccoon Logic: Smart, resourceful, underestimated.' },
  { type: 'opinion' as const, text: 'The BIN sponsor is the product. Everything else is middleware.' },
  { type: 'opinion' as const, text: 'Nobody reads the scheme rules until they get fined.' },
  { type: 'opinion' as const, text: 'Every bank wants modern issuance. None want to change their core.' },
  { type: 'opinion' as const, text: 'RPAA isn\u2019t Y2K. It\u2019s the cost of doing business in Canadian payments.' },
  { type: 'opinion' as const, text: 'Co-brand economics only work if the brand actually drives volume.' },
  { type: 'opinion' as const, text: 'If your RFP is 200 pages, you\u2019re not buying technology \u2014 you\u2019re buying process.' },
  { type: 'spec' as const, text: 'BaaS // Banking-as-a-Service' },
  { type: 'spec' as const, text: 'CaaS // Card-as-a-Service' },
  { type: 'spec' as const, text: 'RPAA // Retail Payment Activities Act' },
  { type: 'spec' as const, text: 'PCI DSS v4.0.1 // Compliant' },
  { type: 'opinion' as const, text: 'Settlement takes less time than the 501 Queen streetcar.' },
  { type: 'spec' as const, text: 'Interchange // the tax nobody reads but everybody pays' },
  { type: 'opinion' as const, text: 'The best partnerships start with a procurement team that says no.' },
  { type: 'opinion' as const, text: 'Fintech is a vertical. Sales is the skill. Don\u2019t confuse them.' },
];

export const careerTimeline = [
  {
    id: 'brim',
    role: 'Director, Business Development',
    company: 'Brim Financial',
    period: '2022 \u2013 Present',
    location: 'Toronto, ON',
    status: 'ACTIVE',
    thesis: 'Selling infrastructure is selling trust. The product is secondary to the compliance story and the speed guarantee.',
    highlights: [
      'Building and managing $700M+ US pipeline across banks, fintechs, and brands',
      'Structuring enterprise CaaS deals end-to-end: BIN sponsorship, scheme registration, processor integration',
      'Navigating RPAA regulatory landscape \u2014 turning compliance from blocker to selling point',
      'Reducing partner time-to-market from 18 months (industry avg) to 10\u201312 weeks',
    ],
  },
  {
    id: 'previous-fintech',
    role: 'Business Development Manager',
    company: 'Financial Services',
    period: '2019 \u2013 2022',
    location: 'Toronto, ON',
    status: 'ARCHIVED',
    thesis: 'Banks don\u2019t buy technology \u2014 they buy regulatory cover and speed. Structure every deal around what their compliance team needs to hear.',
    highlights: [
      'Closed enterprise partnerships with Tier 1 and Tier 2 Canadian banks and credit unions',
      'Developed go-to-market strategy that cut sales cycle from 14 months to 8',
      'Learned that procurement is where 80% of fintech deals die \u2014 and how to survive it',
    ],
  },
  {
    id: 'early-career',
    role: 'Associate, Strategy & Partnerships',
    company: 'Financial Technology',
    period: '2016 \u2013 2019',
    location: 'Toronto, ON',
    status: 'ARCHIVED',
    thesis: 'You can\u2019t sell payment infrastructure if you don\u2019t understand interchange economics, network rules, and why the core banking system is always the bottleneck.',
    highlights: [
      'Managed enterprise onboarding: integration architecture, testing, go-live',
      'Sat in 200+ calls with issuing banks \u2014 learned the language they actually speak',
      'Built deep understanding of Visa/MC scheme rules, interchange models, and settlement flows',
    ],
  },
  {
    id: 'advisory',
    role: 'Advisor & Board Member',
    company: 'Fintech Ecosystem',
    period: '2020 \u2013 Present',
    location: 'Toronto / Montreal',
    status: 'ACTIVE',
    thesis: 'The best way to understand a market is to advise the people building in it.',
    highlights: [
      'Advisory board \u2014 Acceleron Bank: guiding digital banking and card issuance strategy',
      'Holt Xchange: mentoring fintech founders on enterprise sales and bank partnerships',
      'Fintech Cadence: contributing to Canada\u2019s fintech hub ecosystem development',
    ],
  },
];

export const productTiers = [
  {
    id: 'fintechs',
    segment: 'Fintechs',
    color: '#2563EB',
    title: 'Embedded Card Programs',
    description: 'Helping early-stage and growth fintechs embed credit cards into their platforms. From BIN sponsorship to full-stack issuance \u2014 shortcutting the 18 months it usually takes.',
    features: ['BaaS integration', 'Program design & launch', 'Scheme registration', 'Speed to market'],
  },
  {
    id: 'banks',
    segment: 'Banks & CUs',
    color: '#0E8A45',
    title: 'Digital Card Modernization',
    description: 'Working with banks and credit unions ready to move beyond legacy processors. Modern card stack, real-time decisioning, and a platform that ships in weeks, not years.',
    features: ['Legacy migration', 'Digital-first issuance', 'Custom rewards & loyalty', 'Regulatory alignment'],
  },
  {
    id: 'brands',
    segment: 'Brands',
    color: '#B8860B',
    title: 'Co-Brand & Private Label',
    description: 'Retailers, airlines, and platforms that want their own card. Structuring the economics, navigating scheme rules, and making the business case that gets past procurement.',
    features: ['Co-brand structuring', 'Revenue share models', 'Merchant integration', 'Brand-first UX'],
  },
];

export const platformStats = [
  { label: 'Cardholders', value: '1M+' },
  { label: 'API Endpoints', value: '300+' },
  { label: 'Platform SLA', value: '99.95%' },
  { label: 'Deployment', value: '10-12 wks' },
];

// Cycling facts shown in card-number slot on front face (rotates every 3.5s)
export const cardFacts = [
  { label: 'US PIPELINE',    value: '$700M+  ACTIVE DEALS' },
  { label: 'CARD PROGRAMS',  value: 'CONSUMER \u00b7 BIZ \u00b7 COMMERCIAL' },
  { label: 'TIME TO LAUNCH', value: '10\u201312 WEEKS TO MARKET' },
  { label: 'NETWORK REACH',  value: 'VISA \u00b7 MC \u00b7 INTERAC' },
  { label: 'PLATFORM APIS',  value: '300+  RESTful  <100ms p95' },
  { label: 'COMPLIANCE',     value: 'RPAA \u00b7 PCI-DSS v4 \u00b7 ISO 27001' },
  { label: 'OPEN BANKING',   value: '// START BUILDING. STOP TALKING.' },
  { label: 'MARKETS',        value: 'CANADA  //  UNITED STATES' },
];

// Cycling expiry dates — famous moments in payments/fintech history
export const expiryDates = [
  { date: '01/09', note: 'Bitcoin genesis block mined' },
  { date: '02/50', note: 'Diners Club \u2014 first charge card' },
  { date: '09/58', note: 'BankAmericard issued \u2014 became Visa' },
  { date: '08/66', note: 'Interbank Card Assn \u2014 became Mastercard' },
  { date: '04/98', note: 'PayPal founded. Obviously.' },
  { date: '09/08', note: 'Lehman Brothers \u2014 fintech was born' },
  { date: '06/11', note: 'Stripe beta \u2014 7 lines of code' },
  { date: '11/24', note: 'RPAA \u2014 Canada regulates payments' },
  { date: '03/23', note: 'SVB collapses. Fintech discovers risk.' },
  { date: '05/75', note: 'Magnetic stripe patent. Swipe era begins.' },
  { date: '\u221e/99',  note: 'This card never expires' },
];

// Contact info shown on back of card
export const contact = {
  email: 'tarique@brimfinancial.com',
  linkedin: 'linkedin.com/in/tariquekhan',
  location: 'Toronto, ON \u00b7 Canada',
};

// Industry affiliation badges on back of card
export const industryLogos = [
  { id: 'holt',     label: 'HOLT' },
  { id: 'cadence',  label: 'FT CADENCE' },
  { id: 'acceleron', label: 'ACCELERON' },
];

// Connect section — conversion-focused CTAs
export const connectPaths = [
  {
    id: 'fintech',
    audience: 'Fintechs',
    hook: 'Exploring card issuance or embedded finance?',
    detail: 'I\u2019ve helped fintechs go from zero to live card program in under 12 weeks. Let\u2019s talk BIN sponsorship, scheme registration, and what your compliance team needs to hear.',
    color: '#2563EB',
  },
  {
    id: 'bank',
    audience: 'Banks & Credit Unions',
    hook: 'Ready to modernize your card stack?',
    detail: 'I understand your procurement process, your regulatory constraints, and why your core system is always the bottleneck. Let\u2019s find the path that actually gets approved.',
    color: '#0E8A45',
  },
  {
    id: 'builder',
    audience: 'Builders & Partners',
    hook: 'Building something new in payments?',
    detail: 'Whether you\u2019re a brand launching a co-brand card, a startup exploring BaaS, or someone who just wants to understand how this space works \u2014 let\u2019s connect.',
    color: '#B8860B',
  },
];
