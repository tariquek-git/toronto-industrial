import type { Metadata } from 'next';
import { getStackSorted } from '@/data/stack';
import StackIndexClient from './StackIndexClient';

export const metadata: Metadata = {
  title: 'Stack // Payments Knowledge Base // Tarique Khan',
  description:
    'BaaS, CaaS, BIN sponsorship, interchange, RPAA, open banking — defined by someone who sells this stuff to banks. Not Wikipedia. Field notes.',
  openGraph: {
    title: 'Stack // Payments Knowledge Base',
    description:
      'Payments infrastructure terms explained by a fintech BD who actually uses them in deals.',
    type: 'website',
  },
};

export default function StackIndexPage() {
  const entries = getStackSorted();
  return <StackIndexClient entries={entries} />;
}
