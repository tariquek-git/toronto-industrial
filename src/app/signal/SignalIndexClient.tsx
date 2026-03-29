'use client';

import Link from 'next/link';
import type { Signal } from '@/data/signals';
import SignalCard from '@/components/SignalCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  signals: Signal[];
}

export default function SignalIndexClient({ signals }: Props) {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary hover:text-accent transition-colors mb-6"
            >
              &larr; Back to home
            </Link>

            <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4">
              <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-primary">
                SIGNAL
              </h1>
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
                // dispatch.log &mdash; all entries
              </span>
            </div>

            <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-2xl">
              Viewpoints on fintech, payments, regulation, and the business of selling technology
              to financial institutions. Not blog posts &mdash; dispatches from the field.
            </p>
          </div>

          {/* Signal grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signals.map((signal, i) => (
              <SignalCard key={signal.slug} signal={signal} index={i} />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase">
              // More signals incoming. Follow on{' '}
              <a
                href="https://linkedin.com/in/tariquekhan1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                LinkedIn
              </a>{' '}
              for real-time dispatches.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
