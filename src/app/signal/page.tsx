import type { Metadata } from 'next';
import Link from 'next/link';
import { getSignalsSorted } from '@/data/signals';
import SignalCard from '@/components/SignalCard';
import SignalIndexClient from './SignalIndexClient';

export const metadata: Metadata = {
  title: 'Signal // Tarique Khan — Fintech Viewpoints & Analysis',
  description: 'Contrarian takes, regulatory breakdowns, and industry analysis from a decade of selling technology to financial institutions.',
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
