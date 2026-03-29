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
      'Building the US pipeline from scratch \u2014 banks, fintechs, and brands who want their own card program but don\u2019t want to spend 18 months getting there',
      'Structuring CaaS deals end-to-end: BIN sponsor, scheme registration, processor integration. The kind of deal where one missing compliance doc kills the whole thing',
      'Turned RPAA compliance from a blocker into a selling point \u2014 when the bank\u2019s compliance team asks \u201care you RPAA-ready?\u201d, the answer better be yes',
      'Cut partner time-to-market from 18 months (industry average) to 10\u201312 weeks. That number closes deals.',
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
      'Gave banks a single API to pull QuickBooks, Xero, and Sage data \u2014 replaced the \u201cemail us your financials\u201d workflow killing SMB lending speed',
      'Sold to banks and lenders who were still doing manual document collection for underwriting. The pitch: real-time data, faster decisions, fewer defaults',
      'Acquired by FIS \u2014 which tells you something about what the big players thought the API was worth',
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
      'Sold behavioral banking AI to credit unions and community banks \u2014 the pitch was \u201cyou\u2019re sitting on behavioral data and doing nothing with it\u201d',
      'Desjardins case study: 11x increase in new savings accounts, $300M+ deposited, 40K+ new accounts opened. That one number got us into every other meeting',
      'Repositioned the product from \u201canalytics tool\u201d to \u201crevenue engine\u201d \u2014 behavioral data isn\u2019t a dashboard, it\u2019s a growth lever',
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
      'First fintech sales role. Game-based training platform that helped bank employees actually use the digital tools their employer spent millions on',
      'Learned the hard way that selling to an FI means selling to compliance, IT, marketing, and HR simultaneously \u2014 and any one of them can kill the deal',
      'This is where I figured out that the product that gets you the meeting is not the product that gets you the contract',
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
      'Advisory board at Acceleron Bank \u2014 guiding digital banking, FX payments, and card issuance strategy',
      'Holt Xchange \u2014 mentoring fintech founders who are learning that selling to banks is nothing like selling SaaS',
      'Fintech Cadence \u2014 co-hosting Canadian Fintech Summit events, building the ecosystem connections that turn into warm intros',
    ],
  },
];

export const productTiers = [
  {
    id: 'fintechs',
    segment: 'Fintechs',
    color: '#2563EB',
    title: 'Fintechs Selling to Banks',
    description: 'I\u2019ve been on the fintech side of the table four times. I know what procurement looks like from the inside, what the compliance team actually needs to hear, and how to structure a deal that survives the 47-stakeholder approval process. If your deals keep dying in committee, that\u2019s what I fix.',
    features: ['Navigating bank procurement', 'Compliance-first positioning', 'Deal structuring', 'Speed to signed MSA'],
  },
  {
    id: 'banks',
    segment: 'Banks & CUs',
    color: '#0E8A45',
    title: 'Banks & Credit Unions',
    description: 'Banks are my buyers, not my employers. I speak their language \u2014 risk appetite, regulatory alignment, integration timelines \u2014 because I\u2019ve sold into dozens of them. When a bank needs modern card infrastructure without touching their core, I build the bridge between what they need and what the technology can deliver.',
    features: ['Card program modernization', 'Core-adjacent integration', 'Regulatory alignment', 'Vendor due diligence support'],
  },
  {
    id: 'brands',
    segment: 'Brands',
    color: '#B8860B',
    title: 'Brands & Platforms',
    description: 'Retailers, airlines, and platforms that want their own card don\u2019t realize how deep the iceberg goes. Scheme rules, interchange economics, BIN sponsor relationships, co-brand revenue models \u2014 I\u2019ve structured these deals and I know where they break. The brand gets the logo on the card. I handle everything underneath.',
    features: ['Co-brand deal structuring', 'Revenue share modeling', 'Scheme rule navigation', 'Program economics'],
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
