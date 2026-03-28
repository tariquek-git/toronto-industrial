import type { Metadata } from 'next';
import { stackEntries, getStackBySlug } from '@/data/stack';
import { notFound } from 'next/navigation';
import StackDetailClient from './StackDetailClient';

export function generateStaticParams() {
  return stackEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getStackBySlug(slug);
  if (!entry) return {};

  return {
    title: `${entry.term}: ${entry.fullName} // Tarique Khan`,
    description: entry.tldr,
    openGraph: {
      title: `${entry.term} — ${entry.fullName}`,
      description: entry.tldr,
      type: 'article',
    },
  };
}

export default async function StackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getStackBySlug(slug);
  if (!entry) notFound();

  return <StackDetailClient entry={entry} />;
}
