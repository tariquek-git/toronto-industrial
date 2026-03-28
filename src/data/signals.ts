export interface Signal {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: 'take' | 'breakdown' | 'culture' | 'regulation';
  categoryLabel: string;
  readTime: string;
  excerpt: string;
  body: string[];
  linkedinUrl?: string;
  engagement?: string;
  color: string;
}

export const signals: Signal[] = [
  {
    slug: 'lost-in-buzzwords',
    title: 'Lost in Buzzwords',
    subtitle: 'Where Humans Fit in Digital Banking',
    date: '2018-06-13',
    category: 'take',
    categoryLabel: 'Hot Take',
    readTime: '4 min',
    excerpt: 'Bankers think customers want new technology. They don\u2019t. They want the benefits of that technology. There\u2019s a massive difference.',
    body: [
      'I\u2019ve sat through hundreds of bank pitches where someone says \u201cwe need AI\u201d or \u201cwe need blockchain\u201d without ever defining what problem they\u2019re solving. The technology becomes the goal instead of the tool. This is how banks waste millions.',
      'Three patterns I see over and over: First, industry groupthink \u2014 banks adopt technology because competitors did, not because customers asked for it. Second, cost-first thinking \u2014 they frame digital channels as \u201ccheaper\u201d without asking if customers actually want to use them. Third, technology-first strategy \u2014 \u201cwe need AI\u201d instead of \u201cour customers can\u2019t find their statements.\u201d',
      'Bank of America\u2019s COO put it perfectly: \u201cIt\u2019s not about what CAN AI do, but what SHOULD AI do.\u201d That\u2019s the question. Not whether the tech is impressive \u2014 but whether it solves something a real person cares about.',
      'The banks that win aren\u2019t the ones with the most advanced tech stack. They\u2019re the ones who start with the human problem and work backwards to the technology. I\u2019ve seen a $50M AI deployment underperform a well-designed SMS notification system. The buzzword lost to the basics.',
      'Every time I sell technology into a bank, I frame it around outcomes, not capabilities. Save money. Make money. Reduce risk. Improve experience. If you can\u2019t map your product to one of those four, your RFP response is going in the shredder.',
    ],
    linkedinUrl: 'https://www.linkedin.com/pulse/lost-buzzwords-where-humans-fit-digital-banking-tarique-khan',
    engagement: '433 likes \u00b7 41 comments',
    color: '#DA291C',
  },
  {
    slug: 'block-identity-crisis',
    title: 'Block\u2019s Identity Crisis',
    subtitle: 'When Strategy Looks Like Trend-Chasing',
    date: '2026-03-14',
    category: 'take',
    categoryLabel: 'Hot Take',
    readTime: '3 min',
    excerpt: 'Four major pivots in five years. At what point does a company\u2019s strategy become indistinguishable from following trends?',
    body: [
      'Block has made four major business pivots in the last five years: Square POS, Cash App consumer banking, Afterpay BNPL acquisition, a Bitcoin/crypto bet, and now an AI play. That\u2019s a lot of identity shifts for one company.',
      'I\u2019m not saying diversification is wrong \u2014 it\u2019s necessary. But there\u2019s a difference between expanding a thesis and chasing whatever\u2019s generating conference buzz. When you pivot faster than your enterprise customers can integrate, you\u2019re not building infrastructure \u2014 you\u2019re building FOMO.',
      'The question I keep asking: what is Block\u2019s actual thesis? Stripe knows: developer-first payment infrastructure. Adyen knows: unified commerce for enterprise. What does Block know? That it wants to be wherever the puck is going next?',
      'The best fintech companies I\u2019ve worked with \u2014 and sold alongside \u2014 have a single strategic conviction they execute against for years. The ones that chase every wave end up being a mile wide and an inch deep. Banks notice. And banks have long memories.',
      'This isn\u2019t a Block problem. It\u2019s an industry problem. The pressure to appear innovative pushes companies to announce before they\u2019ve built, pivot before they\u2019ve proven, and rebrand before they\u2019ve earned trust. In financial services, trust compounds. So does the lack of it.',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/tariquekhan1/',
    engagement: '48 likes \u00b7 7 comments',
    color: '#2563EB',
  },
  {
    slug: 'osfi-fast-track',
    title: 'OSFI\u2019s Fast-Track Framework',
    subtitle: 'Canada Just Made It Easier to Start a Bank',
    date: '2026-02-15',
    category: 'regulation',
    categoryLabel: 'Regulation',
    readTime: '3 min',
    excerpt: 'Canada\u2019s banking regulator launched an accelerated licensing process. Here\u2019s what it actually means for fintechs trying to enter the market.',
    body: [
      'OSFI just introduced a fast-track licensing framework for new banking entrants in Canada. If you\u2019ve ever tried to get a banking license in this country, you know this is a big deal. The traditional process is measured in years. The new framework compresses it significantly.',
      'But here\u2019s the part nobody\u2019s talking about: a faster license doesn\u2019t mean a faster bank. Getting the charter is step one of a hundred. You still need core banking infrastructure, card processing, compliance tooling, KYC/AML systems, and a BIN sponsor relationship. The license is the permit to start building \u2014 not the building itself.',
      'Compare this to the U.S. OCC process, which has seen neobank applications stall for years (ask Varo how long their journey was). Canada is signaling that it wants more competition, and that\u2019s encouraging. But the infrastructure layer is where new entrants will succeed or fail.',
      'This is exactly where card-as-a-service and BaaS platforms matter. A new bank with an OSFI license but no modern processing stack is just a logo with a compliance obligation. The fintechs that provide the infrastructure \u2014 issuance, processing, program management \u2014 become the actual engine behind these new entrants.',
      'For anyone watching the Canadian fintech space: this framework is a tailwind. The question is who\u2019s ready to be the rails under the next generation of banks.',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/tariquekhan1/',
    engagement: '74 likes \u00b7 3 comments',
    color: '#0E8A45',
  },
  {
    slug: 'bnpl-math-doesnt-work',
    title: 'The BNPL Math Doesn\u2019t Work',
    subtitle: 'Bad Debt Ratios Tell the Whole Story',
    date: '2022-03-12',
    category: 'breakdown',
    categoryLabel: 'Breakdown',
    readTime: '3 min',
    excerpt: 'Amex had $15.4M in bad debts on $56.8B in sales. BNPL players had $220M in bad debts on $11.4B. Run those numbers again.',
    body: [
      'I keep hearing that Buy Now Pay Later is the future of consumer credit. Maybe. But the current economics don\u2019t support the thesis. Here are numbers that should concern anyone in the space.',
      'Amex and Diners Club combined: $15.4M in bad debts on $56.8B in total sales. That\u2019s a write-off rate you can live with. Now look at the BNPL players: $220M in bad debts on $11.4B in sales. Afterpay alone was running a 13.9% bad debt rate. Klarna: 11.2%. Traditional credit card write-offs sit around 2.62%.',
      'The BNPL pitch is that they\u2019re extending credit more responsibly because there\u2019s no interest. But no interest doesn\u2019t mean no risk. It means no interest income to cover when loans go bad. The entire model depends on merchant fees and a low-loss assumption that the data doesn\u2019t support.',
      'This isn\u2019t a hot take \u2014 it\u2019s arithmetic. If your loss rate is 5x the industry average and your revenue per transaction is lower than a traditional card, you\u2019re subsidizing growth with investor capital. That works until it doesn\u2019t. Ask any venture-backed fintech that scaled losses faster than revenue.',
      'I\u2019m not anti-BNPL. I\u2019m anti-ignoring-the-math. The companies that survive this shakeout will be the ones that figured out underwriting, not just user acquisition. Credit is a risk business. Always has been.',
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/tariquekhan1_fintech-bnpl-banking-activity-6908411550181560320-QJCA',
    engagement: '99 likes \u00b7 13 comments',
    color: '#DA291C',
  },
  {
    slug: 'legacy-tech-footage',
    title: 'Rare Footage of a Bank Updating Its Tech Stack',
    subtitle: 'Why Core Modernization Is the Hardest Sale in Fintech',
    date: '2022-09-06',
    category: 'culture',
    categoryLabel: 'Culture',
    readTime: '3 min',
    excerpt: 'I posted a 40-second video with that caption. 3,100+ likes later, it\u2019s clear I hit a nerve. Here\u2019s why legacy modernization is the elephant in every room.',
    body: [
      'I posted a 40-second video clip with the caption \u201cRare footage of a bank attempting to update its legacy tech stack.\u201d It became my most-engaged post ever \u2014 over 3,100 likes and 127 comments. Turns out, everyone in financial services has the same pain.',
      'Here\u2019s what the comments revealed: bankers sharing war stories about COBOL systems from the 1980s that nobody knows how to maintain anymore. Fintech founders frustrated that their API-native platform can\u2019t connect to a bank\u2019s batch-processing core. Consultants describing 3-year core migration projects that delivered 30% of scope.',
      'The fundamental tension is this: every bank wants modern issuance, real-time data, and API-driven everything. But none of them want to touch their core. And honestly? I get it. The core runs. It processes millions of transactions daily. The risk of migration isn\u2019t theoretical \u2014 it\u2019s existential.',
      'This is exactly why the \u201cwrapper\u201d approach works. Instead of ripping out the core, you put modern infrastructure around it. CaaS and BaaS platforms sit on top of legacy systems and provide the API layer, the real-time processing, and the modern UX \u2014 without a core migration. It\u2019s not sexy. But it ships.',
      'One commenter wrote: \u201cWe use RPA to work around the things we can\u2019t fix.\u201d That\u2019s the state of banking technology in one sentence. The opportunity for fintechs isn\u2019t to replace the core. It\u2019s to make the core irrelevant.',
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/tariquekhan1_rare-footage-of-a-bank-attempting-to-update-activity-6972899581143490560-Q3dq',
    engagement: '3,113 likes \u00b7 127 comments',
    color: '#B8860B',
  },
  {
    slug: 'fintech-vs-banks-rap-battle',
    title: 'I Made AI Write a Rap Battle: Fintech vs. Banks',
    subtitle: '2Pac vs. Biggie, But Make It Interchange Fees',
    date: '2022-12-06',
    category: 'culture',
    categoryLabel: 'Culture',
    readTime: '3 min',
    excerpt: 'I asked ChatGPT to write a rap battle between fintech and traditional banks in the style of 2Pac vs. Notorious B.I.G. It understood both the rhyme schemes and the industry dynamics. 1,265 likes later, a former battle rap emcee freestyled in the comments.',
    body: [
      'I\u2019m in banking and fintech, and I\u2019m a big fan of 90s hip-hop. So when ChatGPT dropped, I did what anyone would do: I asked it to write a rap battle between fintech and banks in the style of 2Pac vs. Notorious B.I.G.',
      'What came back was genuinely impressive. The \u201cbanks\u201d verse channeled Biggie\u2019s swagger \u2014 emphasizing trust, regulation, and decades of infrastructure. The \u201cfintech\u201d verse channeled Pac\u2019s rebellious energy \u2014 speed, disruption, and digital-first access. The AI didn\u2019t just know the industry dynamics. It understood the rhetorical styles of two of the greatest rappers ever.',
      'The post got 1,265 likes and 97 comments. A former battle rap emcee jumped in and freestyled his own verse. 80.lv picked it up as a media story. It became one of those moments where two worlds collide and people realize the intersection is more interesting than either world alone.',
      'But here\u2019s the deeper point: the tension between fintech and banks isn\u2019t actually adversarial. It never was. Banks have the licenses, the trust, and the regulatory cover. Fintechs have the speed, the UX, and the technology. The future isn\u2019t one vs. the other \u2014 it\u2019s partnership. Every deal I close proves that.',
      'Also, this post taught me something about LinkedIn: people engage with personality. The most technical content I\u2019ve posted gets decent reach. The content that shows who I am \u2014 not just what I do \u2014 travels further. Be the person who\u2019s interesting AND credible. That\u2019s the real moat.',
    ],
    linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7005996103145783296',
    engagement: '1,265 likes \u00b7 97 comments',
    color: '#7C3AED',
  },
  {
    slug: 'open-banking-canada-joke',
    title: 'I Have a Joke About Open Banking in Canada',
    subtitle: '...But You\u2019ll Have to Wait for It',
    date: '2021-11-25',
    category: 'regulation',
    categoryLabel: 'Regulation',
    readTime: '3 min',
    excerpt: 'Open banking in Canada has been \u201ccoming soon\u201d for years. Meanwhile, screen-scraping is still how most fintechs access bank data. The punchline writes itself.',
    body: [
      'I posted \u201cI have a joke about open banking in Canada... but you\u2019ll have to wait for it.\u201d That was 2021. We\u2019re still waiting. The joke is aging like fine wine.',
      'Canada\u2019s open banking journey has been a masterclass in regulatory caution. The U.K. launched Open Banking in 2018. The EU has PSD2 and is working on PSD3. Australia launched its Consumer Data Right. Canada formed an advisory committee, published a report, formed another committee, and published another report.',
      'Meanwhile, fintechs and banks are left in limbo. Companies like Flinks partnered with National Bank to build the Open Banking Environment \u2014 effectively creating open banking infrastructure without waiting for the regulation. That\u2019s the Canadian fintech way: build around the gap.',
      'Here\u2019s my actual take: open banking isn\u2019t a technology problem. It\u2019s a trust problem. Banks don\u2019t want to share data because data is their moat. Fintechs need that data to build useful products. The regulation exists to force the sharing that the market won\u2019t do voluntarily.',
      'The companies that win in open banking aren\u2019t waiting for legislation. They\u2019re building API infrastructure, establishing data-sharing agreements, and creating the trust frameworks that will eventually become the regulatory standard. Stop talking. Start building. The regulation will catch up.',
    ],
    linkedinUrl: 'https://www.linkedin.com/posts/tariquekhan1_fintech-fintechnorth-openbanking-activity-6869651076199645184-ytiZ',
    engagement: '74 likes \u00b7 6 comments',
    color: '#0E8A45',
  },
  {
    slug: 'hidden-fx-rates',
    title: 'The FX Rates Hidden in Your Merchant Agreement',
    subtitle: 'What Acquirers Don\u2019t Want You to Read',
    date: '2025-08-01',
    category: 'breakdown',
    categoryLabel: 'Breakdown',
    readTime: '3 min',
    excerpt: 'I\u2019ve seen FX conversion rates of 3.5\u20137%+ buried deep in merchant acquiring agreements. Most merchants have no idea they\u2019re paying them.',
    body: [
      'I recently reviewed merchant agreements from several different acquirers. What I found in the FX settlement sections was staggering: rates of 3.5% to 7%+ on currency conversions, buried in dense legal language that most merchants never read.',
      'Here\u2019s how it works: a merchant in the U.K. processes a transaction in EUR. The acquirer settles in GBP. The FX conversion happens at a rate the acquirer sets \u2014 not the interbank rate, not the Visa/Mastercard rate, but their own rate with a healthy margin baked in. The merchant sees the GBP settlement and assumes the conversion was fair. It usually isn\u2019t.',
      'This isn\u2019t fraud. It\u2019s in the agreement. It\u2019s just that nobody reads page 47 of a 60-page merchant services contract. And acquirers don\u2019t exactly highlight it in the sales pitch.',
      'For high-volume cross-border merchants, these hidden FX margins can add up to hundreds of thousands per year. One merchant I spoke with was paying 5.2% on USD-to-GBP conversions without knowing it. When they renegotiated, they saved more on FX than they did on their interchange optimization.',
      'The lesson: always read the settlement section of your merchant agreement. Ask for the FX markup explicitly. Compare it to the mid-market rate on the day of settlement. And if your acquirer can\u2019t tell you their FX margin clearly and quickly \u2014 that\u2019s your answer.',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/tariquekhan1/',
    engagement: '',
    color: '#B8860B',
  },
  {
    slug: 'european-acquirer-landscape',
    title: 'The European Merchant Acquirer Landscape',
    subtitle: 'Who\u2019s Actually Processing the Payments',
    date: '2025-06-01',
    category: 'breakdown',
    categoryLabel: 'Breakdown',
    readTime: '4 min',
    excerpt: 'Merchant acquirers are behind every card payment. But unlike banks or card brands, they get far less visibility. Here\u2019s who\u2019s who and what\u2019s shifting.',
    body: [
      'Merchant acquirers are behind every card payment you\u2019ve ever made. But unlike banks or card networks, they operate in relative obscurity. Most people couldn\u2019t name three acquirers. Here\u2019s the landscape and why it matters.',
      'Worldpay (now set to be acquired by Global Payments in a massive consolidation play) has been the volume king. Nexi is Europe\u2019s top consolidator, rolling up national processors across Italy, the Nordics, and DACH. Adyen took the developer-first, API-native approach and built a direct-to-merchant model that bypasses traditional acquiring relationships entirely. Fiserv brought U.S. scale with Clover and is pushing into global markets.',
      'The interesting trends: alternative rails (Open Banking, A2A payments) are starting to bypass card networks entirely for certain transaction types. Embedded finance is pushing acquiring capabilities into SaaS platforms. And legacy acquirers are drowning in tech debt from decades of acquisitions \u2014 they bought market share but inherited five different processing stacks.',
      'Regulation is reshaping the map too. PSD3 in Europe will change how settlement and strong customer authentication work. AML requirements are getting stricter, which favors scale players who can absorb compliance costs.',
      'For anyone selling into this space: the acquirer relationship is often the most important and least understood part of a merchant\u2019s payment infrastructure. The issuer gets the cardholder relationship. The network gets the brand recognition. The acquirer gets the transaction. Whoever controls the transaction controls the economics.',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/tariquekhan1/',
    engagement: '',
    color: '#2563EB',
  },
  {
    slug: 'pay-by-bank-evolution',
    title: 'Pay-by-Bank Is Coming Faster Than You Think',
    subtitle: 'Same-Day ACH Changed the Equation',
    date: '2025-09-01',
    category: 'take',
    categoryLabel: 'Hot Take',
    readTime: '3 min',
    excerpt: 'Pay-by-bank used to mean \u201cslow and unreliable.\u201d Same-day ACH and faster settlement changed that. The rails are modernizing. The question is who adapts.',
    body: [
      'Pay-by-bank in the U.S. is evolving faster than most people in card payments want to admit. Same-day ACH and faster settlement options mean payments clear in hours, not days. As the rails modernize, settlement speed is only improving.',
      'For merchants, the appeal is obvious: lower cost per transaction than card-based payments, no interchange fees, and fewer chargebacks. For consumers, the UX is catching up \u2014 bank-native payment flows that don\u2019t require entering a 16-digit card number.',
      'But here\u2019s the nuance nobody talks about: pay-by-bank doesn\u2019t replace cards. It competes for specific use cases \u2014 recurring payments, high-value transactions, and markets where interchange is a meaningful cost. Cards still win on ubiquity, consumer protection, and rewards.',
      'The real threat to card networks isn\u2019t pay-by-bank itself. It\u2019s the infrastructure layer being built around it. Companies building account-to-account rails, open banking APIs, and instant settlement networks are creating an alternative payments infrastructure that doesn\u2019t need Visa or Mastercard in the middle.',
      'My view: the payments industry will look like telecom. Multiple competing rails, interoperability requirements, and merchants choosing the cheapest route for each transaction type. Cards won\u2019t disappear. But they\u2019ll share the road with rails that didn\u2019t exist five years ago.',
    ],
    linkedinUrl: 'https://www.linkedin.com/in/tariquekhan1/',
    engagement: '',
    color: '#0E8A45',
  },
];

// Helper to get sorted signals (newest first)
export function getSignalsSorted(): Signal[] {
  return [...signals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper to get a signal by slug
export function getSignalBySlug(slug: string): Signal | undefined {
  return signals.find((s) => s.slug === slug);
}

