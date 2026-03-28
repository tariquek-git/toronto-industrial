export const profile = {
  name: 'Tarique',
  fullName: 'Tarique Khan',
  title: 'Business Development',
  company: 'Brim Financial',
  location: 'Toronto, ON',
  specialties: ['BaaS', 'CaaS', 'Payment Rails', 'RPAA Compliance'],
  markets: ['Canada', 'United States'],
};

export const tickerItems = [
  { type: 'opinion' as const, text: 'Open Banking: Start building, stop talking.' },
  { type: 'opinion' as const, text: 'Procurement is the product when selling to FIs.' },
  { type: 'opinion' as const, text: 'Raccoon Logic: Smart, resourceful, underestimated.' },
  { type: 'spec' as const, text: 'BaaS // Banking-as-a-Service' },
  { type: 'spec' as const, text: 'CaaS // Card-as-a-Service' },
  { type: 'spec' as const, text: 'RPAA // Retail Payment Activities Act' },
  { type: 'spec' as const, text: 'PCI DSS v4.0.1 // Compliant' },
  { type: 'spec' as const, text: '300+ RESTful APIs // Sub-100ms p95' },
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
    highlights: [
      'Leading enterprise sales for credit-card-as-a-service platform',
      'Managing $700M+ US pipeline across banks and fintechs',
      'Driving platform adoption for consumer, business, and commercial card programs',
      'Navigating RPAA regulatory landscape for partner compliance',
    ],
  },
  {
    id: 'previous-fintech',
    role: 'Business Development Manager',
    company: 'Financial Services',
    period: '2019 \u2013 2022',
    location: 'Toronto, ON',
    status: 'ARCHIVED',
    highlights: [
      'Built B2B partnerships across payments and lending verticals',
      'Structured enterprise deals with banks and credit unions',
      'Developed go-to-market strategies for Canadian fintech expansion',
    ],
  },
  {
    id: 'early-career',
    role: 'Associate, Strategy & Partnerships',
    company: 'Financial Technology',
    period: '2016 \u2013 2019',
    location: 'Toronto, ON',
    status: 'ARCHIVED',
    highlights: [
      'Supported enterprise client onboarding and integration',
      'Contributed to partnership development with issuing banks',
      'Gained deep understanding of payment infrastructure and network rules',
    ],
  },
];

export const productTiers = [
  {
    id: 'consumer',
    segment: 'Consumer',
    color: '#2563EB',
    title: 'Consumer Credit Cards',
    description: 'White-label and co-branded credit card programs for everyday consumers. Real-time adjudication, digital-first onboarding, reward rails.',
    features: ['Real-time decisioning', 'Digital wallet provisioning', 'Rewards engine', 'Mobile-first UX'],
  },
  {
    id: 'business',
    segment: 'Business',
    color: '#0E8A45',
    title: 'Business Credit Cards',
    description: 'Expense management and corporate purchasing card solutions. Multi-user controls, automated reconciliation, ERP integration.',
    features: ['Multi-card management', 'Spend controls & limits', 'Automated reporting', 'ERP connectors'],
  },
  {
    id: 'commercial',
    segment: 'Commercial',
    color: '#B8860B',
    title: 'Commercial & Secured',
    description: 'Large-scale commercial card programs and secured credit products. Treasury integration, custom settlement flows, compliance-ready.',
    features: ['Custom settlement flows', 'Treasury integration', 'Secured card programs', 'Regulatory compliance'],
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
  { label: 'CARD PROGRAMS',  value: 'CONSUMER · BIZ · COMMERCIAL' },
  { label: 'TIME TO LAUNCH', value: '10–12 WEEKS TO MARKET' },
  { label: 'NETWORK REACH',  value: 'VISA · MC · INTERAC' },
  { label: 'PLATFORM APIS',  value: '300+  RESTful  <100ms p95' },
  { label: 'COMPLIANCE',     value: 'RPAA · PCI-DSS v4 · ISO 27001' },
  { label: 'OPEN BANKING',   value: '// START BUILDING. STOP TALKING.' },
  { label: 'MARKETS',        value: 'CANADA  //  UNITED STATES' },
];

// Cycling expiry dates — famous moments in payments/fintech history
// Displayed as MM/YY with a tiny footnote. Dry, nerdy, multi-layered.
export const expiryDates = [
  { date: '01/09', note: 'Bitcoin genesis block mined' },
  { date: '02/50', note: 'Diners Club — first charge card' },
  { date: '09/58', note: 'BankAmericard issued — became Visa' },
  { date: '08/66', note: 'Interbank Card Assn — became Mastercard' },
  { date: '04/98', note: 'PayPal founded. Obviously.' },
  { date: '09/08', note: 'Lehman Brothers — fintech was born' },
  { date: '06/11', note: 'Stripe beta — 7 lines of code' },
  { date: '11/24', note: 'RPAA — Canada regulates payments' },
  { date: '03/23', note: 'SVB collapses. Fintech discovers risk.' },
  { date: '05/75', note: 'Magnetic stripe patent. Swipe era begins.' },
  { date: '∞/99',  note: 'This card never expires' },
];

// Contact info shown on back of card
export const contact = {
  email: 'tarique@brimfinancial.com',
  linkedin: 'linkedin.com/in/tariquekhan',
  location: 'Toronto, ON · Canada',
};

// Industry affiliation badges on back of card
export const industryLogos = [
  { id: 'mentrad',  label: 'MENTRAD' },
  { id: 'holtz',   label: 'HOLTZ' },
  { id: 'fintech',  label: 'FINTECH' },
  { id: 'cadence',  label: 'CADENCE' },
];
