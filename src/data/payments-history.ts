export interface TimelineEntry {
  year: number;
  title: string;
  description: string;
  aside?: string;
}

export const paymentsHistory: TimelineEntry[] = [
  {
    year: 1950,
    title: 'Diners Club',
    description: 'First charge card lets 200 New Yorkers eat dinner without cash.',
    aside: 'The original "put it on my tab" energy.',
  },
  {
    year: 1958,
    title: 'BankAmericard',
    description: 'Bank of America mails unsolicited credit cards to 60,000 residents of Fresno, California — inventing revolving credit (and later, Visa).',
    aside: 'Imagine getting a credit card you never asked for. In Fresno.',
  },
  {
    year: 1966,
    title: 'Interbank Card Assoc.',
    description: 'A consortium of banks forms what will become Mastercard, because Visa shouldn\'t have all the fun.',
    aside: 'Duopoly speedrun.',
  },
  {
    year: 1967,
    title: 'Interac Founded',
    description: 'Five Canadian banks create a shared debit network — the country quietly builds the best debit system on Earth.',
    aside: 'Canadians solving payments without anyone noticing. On brand.',
  },
  {
    year: 1970,
    title: 'Magnetic Stripe',
    description: 'IBM standardizes the mag stripe, giving every card a machine-readable identity.',
    aside: 'Still on your card 55 years later. Legacy infrastructure is forever.',
  },
  {
    year: 1994,
    title: 'First Online Purchase',
    description: 'A pepperoni pizza from Pizza Hut becomes the first documented online purchase.',
    aside: 'e-commerce started exactly how you\'d expect.',
  },
  {
    year: 2007,
    title: 'iPhone Launches',
    description: 'Apple puts a computer in every pocket, making mobile payments inevitable.',
    aside: 'Steve Jobs didn\'t mention payments once. Didn\'t need to.',
  },
  {
    year: 2008,
    title: 'Bitcoin Whitepaper',
    description: 'Satoshi Nakamoto proposes a peer-to-peer electronic cash system — decentralized payments enter the conversation.',
    aside: 'Still waiting for that coffee use case.',
  },
  {
    year: 2011,
    title: 'Stripe Beta',
    description: 'Seven lines of code to accept payments — Stripe makes API-first payments the new standard.',
    aside: 'The moment every payments exec started losing sleep.',
  },
  {
    year: 2014,
    title: 'Apple Pay',
    description: 'NFC contactless goes mainstream as Apple brings tap-to-pay to the iPhone.',
    aside: 'Tap > swipe > insert. The UX hierarchy of needs.',
  },
  {
    year: 2018,
    title: 'Open Banking UK',
    description: 'PSD2 takes effect in the UK, forcing banks to open APIs and share customer data with licensed third parties.',
    aside: 'Banks sharing data voluntarily? Well, "voluntarily."',
  },
  {
    year: 2024,
    title: 'RPAA',
    description: 'Canada\'s Retail Payment Activities Act creates a real-time payments oversight framework — finally.',
    aside: 'Canada catches up. Politely.',
  },
];
