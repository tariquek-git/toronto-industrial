'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { getSignalsSorted } from '@/data/signals';
import SignalCard from './SignalCard';

export default function SignalPreview() {
  const ref = useScrollReveal<HTMLElement>();
  const latestSignals = getSignalsSorted().slice(0, 3);

  return (
    <section ref={ref} className="scroll-reveal max-w-4xl mx-auto px-6 py-16 sm:py-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-10">
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-primary">
          SIGNAL
        </h2>
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
          // dispatch.log &mdash; viewpoints &amp; analysis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 stagger-reveal">
        {latestSignals.map((signal, i) => (
          <SignalCard key={signal.slug} signal={signal} index={i} />
        ))}
      </div>

      <div className="text-right">
        <Link
          href="/signal"
          className="inline-block font-mono text-xs tracking-[0.15em] uppercase text-text-secondary
                     hover:text-accent transition-colors border-b border-border-strong hover:border-accent pb-1"
        >
          View all signals &rarr;
        </Link>
      </div>
    </section>
  );
}
