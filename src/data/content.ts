export const profile = {
  name: 'Tarique',
  fullName: 'Tarique Khan',
  title: 'Director, Business Development',
  company: 'Brim Financial',
  location: 'Toronto, ON',
  tagline: 'I sell technology to financial institutions. Everything I\u2019ve ever sold either helps a bank save money or make more money.',
  specialties: ['Enterprise Sales', 'BD & Partnerships', 'Go-to-Market', 'BaaS', 'CaaS', 'Payment Rails', 'Open Banking', 'Digital Adoption', 'Behavioral Banking', 'API Platforms'],
  markets: ['Canada', 'United States'],
};

export const tickerItems = [
  { type: 'opinion' as const, text: 'Open Banking: Start building, stop talking.' },
  { type: 'opinion' as const, text: 'Procurement is the product when selling to FIs.' },
  { type: 'opinion' as const, text: 'Four fintechs. One thesis. Sell the thing that moves the needle.' },
  { type: 'opinion' as const, text: 'The BIN sponsor is the product. Everything else is middleware.' },
  { type: 'opinion' as const, text: 'Nobody reads the scheme rules until they get fined.' },
  { type: 'opinion' as const, text: 'Every bank wants modern issuance. None want to change their core.' },
  { type: 'opinion' as const, text: 'RPAA isn\u2019t Y2K. It\u2019s the cost of doing business in Canadian payments.' },
  { type: 'opinion' as const, text: 'Co-brand economics only work if the brand actually drives volume.' },
  { type: 'opinion' as const, text: 'If your RFP is 200 pages, you\u2019re not buying technology \u2014 you\u2019re buying process.' },
  { type: 'opinion' as const, text: 'The future of finance isn\u2019t big vs. small \u2014 it\u2019s connected.' },
  { type: 'opinion' as const, text: 'Banks don\u2019t buy technology. They buy regulatory cover and speed.' },
  { type: 'opinion' as const, text: 'If your integration timeline is longer than your contract term, you\u2019ve already lost.' },
  { type: 'opinion' as const, text: 'Fintech is a vertical. Sales is the skill. Don\u2019t confuse them.' },
  { type: 'opinion' as const, text: 'The best partnerships start with a procurement team that says no.' },
  { type: 'spec' as const, text: 'BaaS // Banking-as-a-Service' },
  { type: 'spec' as const, text: 'CaaS // Card-as-a-Service' },
  { type: 'spec' as const, text: 'RPAA // Retail Payment Activities Act' },
  { type: 'opinion' as const, text: 'Settlement takes less time than the 501 Queen streetcar.' },
  { type: 'spec' as const, text: 'Interchange // the tax nobody reads but everybody pays' },
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
      'Building and managing US pipeline across banks, fintechs, and brands',
      'Structuring enterprise CaaS deals end-to-end: BIN sponsorship, scheme registration, processor integration',
      'Navigating RPAA regulatory landscape \u2014 turning compliance from blocker to selling point',
      'Reducing partner time-to-market from 18 months (industry avg) to 10\u201312 weeks',
    ],
  },
  {
    id: 'railz',
    role: 'Business Development',
    company: 'Railz (now FIS Accounting Data as a Service)',
    period: '2021 \u2013 2022',
    location: 'Toronto, ON',
    status: 'ARCHIVED',
    thesis: 'A single API to all accounting data is the unlock for SMB lending. Banks don\u2019t need more data \u2014 they need the right data, faster.',
    highlights: [
      'Sold API-based accounting data platform to banks, fintechs, and lenders for underwriting and risk decisioning',
      'Connected financial institutions to real-time QuickBooks, Xero, and Sage data via one integration',
      'Helped banks modernize SMB lending workflows \u2014 replacing manual document collection with API pulls',
    ],
  },
  {
    id: 'exagens',
    role: 'Business Development',
    company: 'Exagens',
    period: '2019 \u2013 2021',
    location: 'Toronto / Montreal',
    status: 'ARCHIVED',
    thesis: 'Banks sit on mountains of behavioral data and do nothing with it. The ones who act on it see 11x lift in account openings.',
    highlights: [
      'Sold behavioral banking platform combining behavioral economics, psycholinguistics, and AI to credit unions and community banks',
      'Drove adoption at Desjardins: 11x increase in new savings accounts, $300M+ deposited, 40K+ new accounts',
      'Positioned the platform as a revenue-generation play, not just analytics \u2014 reframed behavioral data as a growth lever',
    ],
  },
  {
    id: 'lemonade',
    role: 'Business Development / Account Executive',
    company: 'Lemonade by Launchfire (now LemonadeLXP)',
    period: '2017 \u2013 2019',
    location: 'Ottawa / Toronto',
    status: 'ARCHIVED',
    thesis: 'Digital transformation fails when the employees can\u2019t use the tools. Training is the unsexy foundation that makes everything else work.',
    highlights: [
      'Sold AI-powered, game-based learning platform to banks and credit unions for digital adoption and employee training',
      'Positioned product at the intersection of customer experience and operational efficiency \u2014 both a save-money and make-money play',
      'Learned that selling to FIs means selling to compliance, IT, marketing, and HR simultaneously',
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
      'Advisory board \u2014 Acceleron Bank: guiding digital banking, FX payments, and card issuance strategy',
      'Holt Xchange: mentoring fintech founders on enterprise sales and bank partnerships',
      'Fintech Cadence: contributing to Canada\u2019s fintech ecosystem \u2014 co-hosting Canadian Fintech Summit events',
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
  linkedin: 'linkedin.com/in/tariquekhan1',
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
    hook: 'Building a financial product and need to sell into banks?',
    detail: 'I\u2019ve been on your side of the table at four different fintechs. I know what procurement looks like from the inside, how to structure the deal, and what the compliance team actually needs to hear.',
    color: '#2563EB',
    subject: 'Let\u2019s talk card programs',
  },
  {
    id: 'bank',
    audience: 'Banks & Credit Unions',
    hook: 'Looking for technology that saves money or makes money?',
    detail: 'Whether it\u2019s card modernization, API infrastructure, digital adoption, or behavioral insights \u2014 I\u2019ve sold all of them into FIs. Let\u2019s talk about what your institution actually needs.',
    color: '#0E8A45',
    subject: 'Modernizing our card stack',
  },
  {
    id: 'builder',
    audience: 'Builders & Partners',
    hook: 'Want to connect in the fintech ecosystem?',
    detail: 'I advise startups, mentor founders, and connect people across Canada\u2019s fintech landscape. If you\u2019re building something in financial services, let\u2019s find the overlap.',
    color: '#B8860B',
    subject: 'Ecosystem connection',
  },
];
