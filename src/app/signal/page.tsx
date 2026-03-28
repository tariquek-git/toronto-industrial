import type { Metadata } from 'next';
import { getSignalsSorted } from '@/data/signals';
import SignalIndexClient from './SignalIndexClient';

export const metadata: Metadata = {
  title: 'Signal // Tarique Khan — Fintech Viewpoints & Analysis',
  description: 'Contrarian takes, regulatory breakdowns, and industry analysis from a decade of selling technology to financial institutions.',
  alternates: { canonical: '/signal' },
  openGraph: {
    title: 'Signal // Tarique Khan',
    description: 'Fintech viewpoints and payments industry analysis.',
    type: 'website',
  },
};

export default function SignalIndexPage() {
  const signals = getSignalsSorted();

  return <SignalIndexClient signals={signals} />;
}
