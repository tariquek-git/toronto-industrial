import type { Metadata } from 'next';
import InterchangePageClient from './InterchangePageClient';

export const metadata: Metadata = {
  title: 'Interchange Calculator // Tarique Khan',
  description:
    'Interactive breakdown of credit card interchange fees. See exactly where your money goes.',
  alternates: { canonical: '/stack/interchange' },
  openGraph: {
    title: 'Interchange Calculator // Tarique Khan',
    description:
      'Interactive breakdown of credit card interchange fees. See exactly where your money goes.',
    type: 'website',
    images: [{ url: '/og/interchange.png', width: 1200, height: 630, alt: 'Interchange Calculator — Tarique Khan' }],
  },
};

export default function InterchangePage() {
  return <InterchangePageClient />;
}
