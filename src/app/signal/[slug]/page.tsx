import type { Metadata } from 'next';
import { signals, getSignalBySlug } from '@/data/signals';
import { notFound } from 'next/navigation';
import SignalDetailClient from './SignalDetailClient';

// Required for static export with dynamic routes
export function generateStaticParams() {
  return signals.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const signal = getSignalBySlug(slug);
  if (!signal) return {};

  return {
    title: `${signal.title} // Tarique Khan`,
    description: signal.excerpt,
    openGraph: {
      title: signal.title,
      description: signal.excerpt,
      type: 'article',
    },
  };
}

export default async function SignalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const signal = getSignalBySlug(slug);
  if (!signal) notFound();

  return <SignalDetailClient signal={signal} />;
}
