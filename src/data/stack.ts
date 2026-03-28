export interface StackEntry {
  slug: string;
  term: string;
  fullName: string;
  category: 'infrastructure' | 'regulation' | 'economics' | 'process';
  categoryLabel: string;
  color: string;
  tldr: string;
  body: string[];
  related?: string[];
}

export const categoryColors: Record<StackEntry['category'], string> = {
  infrastructure: '#2563EB',
  regulation: '#0E8A45',
  economics: '#B8860B',
  process: '#DA291C',
};

const categoryLabels: Record<StackEntry['category'], string> = {
  infrastructure: 'Infrastructure',
  regulation: 'Regulation',
  economics: 'Economics',
  process: 'Process',
};

export const stackEntries: StackEntry[] = [
  {
    slug: 'baas',
    term: 'BaaS',
    fullName: 'Banking-as-a-Service',
    category: 'infrastructure',
    categoryLabel: categoryLabels.infrastructure,
    color: categoryColors.infrastructure,
    tldr: 'A model where licensed banks rent their charter, compliance infrastructure, and deposit insurance to fintechs who want to offer banking products without becoming a bank.',
    body: [
      'Banking-as-a-Service is a model where a licensed bank provides its regulatory infrastructure — charter, compliance framework, deposit insurance, payment network access — to a fintech or brand that wants to offer banking products.',
      'The fintech handles the customer experience. The bank handles the regulated stuff. On paper, this sounds elegant. In practice, it\u2019s a regulatory minefield that\u2019s gotten multiple companies shut down.',
      'The BaaS shakeout of 2023\u20132025 exposed a fundamental tension: regulators hold the bank responsible for everything the fintech does, but the bank often has limited visibility into what the fintech is actually doing. Synapse, Evolve, and several others learned this the hard way.',
      'That said, BaaS isn\u2019t going away. It\u2019s maturing. The winners will be platforms that treat compliance as a feature, not a checkbox. Banks that partner with BaaS platforms need to understand they\u2019re not outsourcing risk — they\u2019re sharing it.',
      'If you\u2019re evaluating BaaS partners, the first question isn\u2019t "what\u2019s your API look like?" It\u2019s "what happens when the regulator calls?"',
    ],
    related: ['caas', 'bin-sponsorship'],
  },
  {
    slug: 'caas',
    term: 'CaaS',
    fullName: 'Card-as-a-Service',
    category: 'infrastructure',
    categoryLabel: categoryLabels.infrastructure,
    color: categoryColors.infrastructure,
    tldr: 'The full stack for issuing credit, debit, or prepaid cards — processor, BIN sponsor, scheme registration, compliance, fraud, rewards — bundled as one API platform.',
    body: [
      'Card-as-a-Service is what I sell. It\u2019s the full stack for issuing payment cards: the processor, the BIN sponsor relationship, scheme registration (Visa, Mastercard, Interac), compliance framework, fraud systems, rewards engine, and servicing — delivered as an API platform.',
      'The traditional path to launching a card program takes 12\u201318 months. You need a bank partner, a processor, scheme certifications, a compliance team, a fraud vendor, a servicing platform, and a lot of patience. CaaS collapses this into 10\u201312 weeks.',
      'But here\u2019s what most people get wrong about CaaS: the technology is the easy part. The hard part is the BIN sponsor relationship, the scheme rules, and the regulatory alignment. A beautiful API means nothing if you can\u2019t get Visa to certify your program.',
      'CaaS platforms like Brim sit at the intersection of technology and compliance. We\u2019re not just a card processor — we\u2019re the connective tissue between the fintech\u2019s product vision and the bank\u2019s regulatory obligations.',
      'When I pitch CaaS to a bank, I\u2019m not selling software. I\u2019m selling speed, compliance cover, and the ability to launch modern card products without ripping out their core banking system.',
    ],
    related: ['baas', 'bin-sponsorship', 'interchange'],
  },
  {
    slug: 'bin-sponsorship',
    term: 'BIN Sponsorship',
    fullName: 'Bank Identification Number Sponsorship',
    category: 'infrastructure',
    categoryLabel: categoryLabels.infrastructure,
    color: categoryColors.infrastructure,
    tldr: 'A BIN is the first 6\u20138 digits of a card number. A BIN sponsor is the licensed bank that lets a fintech issue cards under their banking license.',
    body: [
      'The BIN \u2014 Bank Identification Number \u2014 is the first 6 to 8 digits on a payment card. It identifies the issuing bank and routes transactions through the card network. Without a BIN, you can\u2019t issue cards. Period.',
      'BIN sponsorship is the arrangement where a licensed bank allows a non-bank entity (a fintech, a brand, a program manager) to issue cards under the bank\u2019s BIN. The bank is the legal issuer. The fintech is the program manager.',
      'Here\u2019s my hot take: the BIN sponsor IS the product. Everything else \u2014 the processor, the app, the rewards engine \u2014 is middleware. If your BIN sponsor gets a consent order, your program is dead. If they decide fintechs are too risky, you\u2019re shopping for a new bank.',
      'Finding the right BIN sponsor is like finding a business partner, not a vendor. You need alignment on risk appetite, transaction volume, target markets, and \u2014 critically \u2014 how they handle regulatory exams. The banks that are good at this treat their fintech partners as extensions of their compliance program.',
      'In the US market, the number of banks willing to sponsor fintech BINs has actually shrunk since 2023. FDIC and OCC scrutiny has made some banks pull back entirely. This means the remaining BIN sponsors have more leverage, and fintechs need to bring a cleaner compliance story to the table.',
    ],
    related: ['baas', 'caas'],
  },
  {
    slug: 'interchange',
    term: 'Interchange',
    fullName: 'Interchange Fee',
    category: 'economics',
    categoryLabel: categoryLabels.economics,
    color: categoryColors.economics,
    tldr: 'The fee paid by the merchant\u2019s bank (acquirer) to the cardholder\u2019s bank (issuer) on every card transaction. Typically 1.5\u20133% of transaction value.',
    body: [
      'Every time you tap your credit card, a fee gets split between several parties. The merchant pays a "merchant discount rate" \u2014 let\u2019s say 2.5% on a $100 purchase. That $2.50 gets divided among the issuer (your bank), the card network (Visa/Mastercard), and the acquirer (the merchant\u2019s payment processor).',
      'The issuer\u2019s cut \u2014 interchange \u2014 is the biggest piece, typically 1.5\u20131.8% for consumer credit. This is how banks fund rewards programs, fraud protections, and the general cost of extending credit. When someone says "points aren\u2019t free," this is what they mean.',
      'Interchange rates aren\u2019t negotiable by merchants \u2014 they\u2019re set by the card networks and vary by card type (debit vs. credit), card tier (basic vs. premium/infinite), merchant category (grocery vs. restaurants vs. e-commerce), and geography.',
      'In Canada, interchange is lower than the US due to voluntary commitments by Visa and Mastercard to the government. In the EU, interchange is capped at 0.3% for credit \u2014 which is why European card rewards programs are terrible compared to North American ones.',
      'Understanding interchange economics is essential for anyone in the card business. It\u2019s the revenue engine that makes card programs viable, the cost that merchants resent, and the fee that regulators periodically threaten to cap. It\u2019s the tax nobody reads but everybody pays.',
    ],
    related: ['caas', 'bin-sponsorship'],
  },
  {
    slug: 'rpaa',
    term: 'RPAA',
    fullName: 'Retail Payment Activities Act',
    category: 'regulation',
    categoryLabel: categoryLabels.regulation,
    color: categoryColors.regulation,
    tldr: 'Canada\u2019s framework for regulating payment service providers. Not Y2K. It\u2019s the cost of doing business in Canadian payments.',
    body: [
      'The Retail Payment Activities Act is Canada\u2019s first comprehensive framework for regulating payment service providers (PSPs). It came into effect in stages, with registration requirements hitting in November 2024.',
      'Before RPAA, Canada had a patchwork approach to payments regulation. Banks were regulated by OSFI, but the fintechs processing payments through them? Largely unregulated. RPAA changes that by requiring PSPs to register with the Bank of Canada and comply with operational risk, safeguarding, and incident reporting requirements.',
      'The industry reaction split into two camps. Camp 1: "This is Y2K for payments \u2014 we\u2019re all going to die." Camp 2 (where I sit): "This is the cost of doing business, and the fintechs that treat compliance as a feature will win."',
      'Here\u2019s why RPAA is actually good for well-run fintechs: it raises the bar for everyone. The companies that were cutting corners on safeguarding customer funds or operating without proper risk frameworks? They\u2019re either going to clean up or exit. That\u2019s less competition for the companies doing it right.',
      'From a sales perspective, RPAA has been a gift. When I\u2019m talking to a bank about partnering with Brim, our RPAA compliance posture is a selling point. It tells the bank\u2019s compliance team: "We take this seriously. We\u2019re not going to be the partner that gets you a consent order."',
    ],
    related: ['open-banking'],
  },
  {
    slug: 'open-banking',
    term: 'Open Banking',
    fullName: 'Open Banking / Consumer-Directed Finance',
    category: 'regulation',
    categoryLabel: categoryLabels.regulation,
    color: categoryColors.regulation,
    tldr: 'A framework where banks share customer financial data with third parties via APIs. The UK did it in 2018. Canada is still talking about it.',
    body: [
      'Open banking is the idea that consumers should be able to direct their banks to share their financial data with third parties \u2014 fintechs, other banks, financial advisors \u2014 via standardized APIs. With consent. Securely.',
      'The UK implemented it in 2018. Australia in 2020. The EU has PSD2. Brazil launched their framework. India has UPI and the Account Aggregator framework. Canada? Canada announced it would happen "soon" in 2018. It is now 2026.',
      'The Canadian approach has been \u2014 and I\u2019m being generous here \u2014 methodical. Multiple consultations, advisory committees, framework documents, and pilot programs. Meanwhile, Canadians are screen-scraping their bank credentials into third-party apps, which is both insecure and exactly the problem open banking is supposed to solve.',
      'The delay has real consequences. Canadian fintechs building products that require bank data access are at a disadvantage versus their UK or US counterparts. Some have relocated. Others have found workarounds. None of this is ideal.',
      'My read: open banking will happen in Canada. Eventually. But by the time it launches, the first movers in other markets will have already built the dominant platforms. Canada\u2019s fintechs will be playing catch-up on infrastructure that their competitors have had for years.',
      'Start building. Stop talking. That\u2019s been my position since 2019, and I see no reason to change it.',
    ],
    related: ['rpaa'],
  },
  {
    slug: 'deal-anatomy',
    term: 'Deal Anatomy',
    fullName: 'How Fintech Sells to Banks',
    category: 'process',
    categoryLabel: categoryLabels.process,
    color: categoryColors.process,
    tldr: 'The 6-stage lifecycle of selling technology to a financial institution. Average timeline: 6\u201318 months. 80% of deals die at procurement.',
    body: [
      'Selling technology to banks is nothing like selling SaaS to a startup. There\u2019s no free trial, no product-led growth, no "sign up with your email." There\u2019s a process, and if you don\u2019t understand it, your deal will die in committee.',
      'Stage 1: Discovery. You get the meeting \u2014 usually through a warm intro, a conference, or (rarely) inbound. The bank\u2019s innovation team is curious. They want a demo. You show them the product. They\u2019re impressed. You think you\u2019re 2 weeks from a deal. You are not.',
      'Stage 2: Technical Scoping. The bank\u2019s IT and architecture teams get involved. They want to understand your API, your data residency, your security posture, your SOC 2, your penetration test results. They want to know how you integrate with their core banking system (which was built in 1997). This takes 4\u20138 weeks.',
      'Stage 3: Procurement. This is where 80% of deals die. The bank\u2019s procurement team has a process. That process involves an RFP, a vendor assessment, a risk assessment, a compliance review, a legal review, and approximately 47 stakeholders who all need to approve. Timeline: 2\u20136 months.',
      'Stage 4: Contract. You\u2019ve survived procurement. Now legal wants to negotiate the MSA. They have concerns about liability, indemnification, data ownership, SLAs, termination clauses, and whether the force majeure clause covers a raccoon invasion. This takes 4\u201312 weeks.',
      'Stage 5: Integration. You\u2019re signed. Now you need to actually connect to their systems, run UAT, get scheme certifications (if it\u2019s a card program), and train their teams. Timeline: 6\u201312 weeks with a good platform, 6\u201312 months with a bad one.',
      'Stage 6: Launch. The card program goes live. Customers start transacting. The bank\u2019s comms team writes an internal announcement that nobody reads. You write a case study that you can\u2019t publish because the bank won\u2019t approve it.',
      'Total timeline from first meeting to launch: 6\u201318 months. The tech demo gets you in the door. The compliance narrative closes the deal. Procurement is the product.',
    ],
    related: [],
  },
];

export function getStackSorted(): StackEntry[] {
  return [...stackEntries];
}

export function getStackBySlug(slug: string): StackEntry | undefined {
  return stackEntries.find((e) => e.slug === slug);
}
