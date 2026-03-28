import type { Metadata } from 'next';
import DealAnatomyClient from './DealAnatomyClient';

export const metadata: Metadata = {
  title: 'Deal Anatomy: How Banks Buy Technology // Tarique Khan',
  description:
    'Interactive walkthrough of the enterprise sales lifecycle in financial services. From discovery to launch.',
  alternates: { canonical: '/deal-anatomy' },
  openGraph: {
    title: 'Deal Anatomy: How Banks Buy Technology',
    description:
      'Interactive walkthrough of the enterprise sales lifecycle in financial services. From discovery to launch.',
    type: 'website',
    images: [
      {
        url: '/og/deal-anatomy.png',
        width: 1200,
        height: 630,
        alt: 'Deal Anatomy — How Banks Buy Technology — Tarique Khan',
      },
    ],
  },
};

export default function DealAnatomyPage() {
  return <DealAnatomyClient />;
}
