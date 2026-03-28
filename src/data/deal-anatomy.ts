export interface DealStage {
  id: number;
  name: string;
  duration: string;
  description: string;
  insight: string;
  killRate: string;
  killPercent: number;
  tips: string[];
}

export const dealStages: DealStage[] = [
  {
    id: 1,
    name: 'Discovery',
    duration: '2\u20134 weeks',
    description:
      'Coffee meetings and conference hallway chats. You get the meeting \u2014 usually through a warm intro, a mutual connection, or a panel you both sat on. The bank\u2019s innovation team is curious. They want a demo. You show them the product. They\u2019re impressed. You think you\u2019re two weeks from a deal. You are not.',
    insight:
      'Most deals start with a warm intro, not an inbound lead. Cold outreach to banks has a response rate that rounds to zero. The people who close deals in financial services are the ones who spent years building the network before they needed it. If you\u2019re starting from scratch, budget 18 months of relationship-building before your first real opportunity.',
    killRate: '10% of deals die here',
    killPercent: 10,
    tips: [
      'Read buying signals: if they ask about pricing in the first meeting, they\u2019re serious. If they only ask about features, they\u2019re window shopping.',
      'The person who takes the meeting is rarely the decision-maker. Ask early: "Who else needs to be comfortable with this?"',
      'Conference hallway conversations convert better than booth demos. Be where the VPs hang out, not where the analysts browse.',
      'Follow up within 24 hours with a one-pager, not a 40-slide deck. Nobody reads the deck.',
    ],
  },
  {
    id: 2,
    name: 'Technical Scoping',
    duration: '4\u20138 weeks',
    description:
      'This is where the solution architect earns their salary. The bank\u2019s IT and architecture teams get involved. They want to understand your API, your data residency, your security posture, your SOC 2, your penetration test results. They want to know how you integrate with their core banking system \u2014 which was built in 1997 and runs on prayers and COBOL.',
    insight:
      'The bank\u2019s IT team will try to kill the deal here by making requirements impossible. Not because they\u2019re malicious \u2014 because every new vendor means more work for them, more integration risk, and more on-call pages at 3 AM. Your job is to make their life easier, not harder. Come with pre-built connectors, clear documentation, and a deployment model that doesn\u2019t require them to touch their core.',
    killRate: '20% of deals die here',
    killPercent: 20,
    tips: [
      'Have your SOC 2 Type II, penetration test results, and architecture diagrams ready before they ask. Delays here signal immaturity.',
      'Ask the IT team what their biggest pain point is \u2014 then show how you solve it. Make them an ally, not an obstacle.',
      'Data residency matters more than you think. If you can\u2019t confirm Canadian data stays in Canada, the conversation is over.',
      'Never badmouth their legacy systems. They know it\u2019s old. They don\u2019t need you to tell them.',
    ],
  },
  {
    id: 3,
    name: 'Business Case',
    duration: '3\u20136 weeks',
    description:
      'Building the internal champion\u2019s pitch deck. Your contact at the bank needs to sell this deal internally \u2014 to their boss, to the CFO, to the risk committee. You\u2019re not in the room for that meeting. Your champion is presenting your value prop with their slides, their framing, and their credibility on the line.',
    insight:
      'You\u2019re not selling to the person in the room \u2014 you\u2019re selling to the person they have to convince. Every asset you create should be designed to be forwarded. The internal business case needs three things: revenue impact (or cost savings), risk mitigation, and competitive pressure ("RBC is already doing this").',
    killRate: '15% of deals die here',
    killPercent: 15,
    tips: [
      'Build the ROI model for them. Don\u2019t make your champion do math \u2014 give them a spreadsheet with their numbers already populated.',
      'Include a competitive analysis showing what happens if they don\u2019t move. Loss aversion closes more deals than opportunity.',
      'Ask your champion: "What objection will come up in that meeting?" Then arm them with the answer.',
      'The business case that wins isn\u2019t the one with the best numbers \u2014 it\u2019s the one that makes the sponsor look smart for bringing it forward.',
    ],
  },
  {
    id: 4,
    name: 'Procurement',
    duration: '8\u201316 weeks',
    description:
      'Where deals go to die. The bank\u2019s procurement team has a process. That process involves an RFP, a vendor assessment, a risk assessment, a compliance review, a data privacy impact assessment, a third-party risk management review, and approximately 47 stakeholders who all need to approve before anyone can sign anything.',
    insight:
      'Procurement doesn\u2019t care about your product. They care about risk, compliance, and getting the best price. This is the stage nobody talks about at conferences because it\u2019s not sexy. But it\u2019s where 80% of enterprise fintech deals actually die. The procurement team\u2019s job is to protect the bank, not to help you close. Respect that.',
    killRate: '35% of deals die here',
    killPercent: 35,
    tips: [
      'Fill out the vendor assessment questionnaire before they send it. If you\u2019ve sold to one bank, you\u2019ve seen the form before.',
      'Build a relationship with the procurement lead. They\u2019re not the enemy \u2014 they\u2019re the gatekeeper.',
      'Have your insurance certificates, business continuity plans, and incident response procedures ready. They will ask.',
      'If the deal goes quiet for more than two weeks in procurement, it\u2019s not "processing" \u2014 it\u2019s stuck. Call your champion.',
    ],
  },
  {
    id: 5,
    name: 'Contract & Legal',
    duration: '4\u20138 weeks',
    description:
      'Debating whether the force majeure clause covers a raccoon invasion. Legal review at a bank is not legal review anywhere else. Every clause gets reviewed by compliance, risk, legal, and sometimes the board. Your standard MSA? They\u2019ve never seen a standard MSA they didn\u2019t want to redline.',
    insight:
      'Legal review at a bank is not legal review anywhere else. Every clause gets reviewed by compliance, risk, and sometimes the board. The indemnification clause alone can take three weeks. Data processing agreements, subprocessor lists, audit rights, termination provisions \u2014 each one is a potential three-week detour. The banks that close fastest are the ones with a dedicated fintech legal team.',
    killRate: '10% of deals die here',
    killPercent: 10,
    tips: [
      'Send your MSA, DPA, and SLA templates proactively. Letting them draft first means you\u2019re playing defense for months.',
      'Know your non-negotiables in advance. Unlimited liability? That\u2019s a no. Audit rights with 30 days notice? That\u2019s fine.',
      'If legal review is taking too long, propose a call between counsels. Email redlines can bounce for months.',
      'The raccoon clause is a joke. The regulatory change clause is not. Make sure your contract handles both.',
    ],
  },
  {
    id: 6,
    name: 'Integration & Launch',
    duration: '8\u201316 weeks',
    description:
      'The deal is signed but the work is just starting. Now you need to actually connect to their systems, run UAT, get scheme certifications, train their teams, migrate data, and go live without breaking anything. The first 90 days post-signature determine whether you\u2019re the partner or the vendor they\u2019re already planning to replace.',
    insight:
      'The first 90 days post-signature determine whether you get the expansion deal or get replaced at renewal. Implementation is where promises become reality. Every shortcut you took in the sales process \u2014 every "we can do that" that was actually "we\u2019ll figure it out" \u2014 comes due here. The best BD people stay involved through launch because the relationship you built is the safety net when things go wrong.',
    killRate: '10% of deals die here',
    killPercent: 10,
    tips: [
      'Assign a dedicated implementation lead on day one. Do not make the sales team run implementation.',
      'Set expectations early: the first two weeks are onboarding and environment setup, not feature delivery.',
      'Weekly status calls with the bank\u2019s project team are non-negotiable. Silence breeds anxiety.',
      'Celebrate the small wins publicly. First API call, first test transaction, first live card. These build confidence.',
    ],
  },
];

export function getSurvivalRate(throughStage: number): number {
  let surviving = 100;
  for (let i = 0; i < throughStage && i < dealStages.length; i++) {
    surviving = surviving * (1 - dealStages[i].killPercent / 100);
  }
  return Math.round(surviving);
}
