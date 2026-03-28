'use client';

import Link from 'next/link';
import type { StackEntry } from '@/data/stack';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RaccoonToggle from '@/components/RaccoonToggle';

interface Props {
  entries: StackEntry[];
}

export default function StackIndexClient({ entries }: Props) {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
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
                STACK
              </h1>
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
                // payments.glossary &mdash; field definitions
              </span>
            </div>

            <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-2xl">
              Payments infrastructure terms explained by someone who uses them in deals,
              not someone who read about them on Wikipedia. These are field definitions &mdash;
              how the concepts actually work when you&apos;re selling to banks.
            </p>
          </div>

          {/* Category legend */}
          <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-border">
            {(['infrastructure', 'regulation', 'economics', 'process'] as const).map((cat) => {
              const colors: Record<string, string> = {
                infrastructure: '#2563EB',
                regulation: '#0E8A45',
                economics: '#B8860B',
                process: '#DA291C',
              };
              return (
                <div key={cat} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2"
                    style={{ backgroundColor: colors[cat] }}
                  />
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary">
                    {cat}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stack entries */}
          <div className="space-y-4">
            {entries.map((entry, i) => (
              <Link
                key={entry.slug}
                href={`/stack/${entry.slug}`}
                className="group block border border-border hover:border-accent/40 transition-all duration-300 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Category + number */}
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border"
                        style={{ borderColor: entry.color, color: entry.color }}
                      >
                        {entry.categoryLabel}
                      </span>
                      <span className="font-mono text-[9px] text-text-tertiary tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Term + full name */}
                    <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-primary group-hover:text-accent transition-colors mb-1">
                      {entry.term.toUpperCase()}
                    </h2>
                    <div className="font-mono text-xs text-text-tertiary tracking-wide mb-3">
                      {entry.fullName}
                    </div>

                    {/* TLDR */}
                    <p className="font-mono text-sm text-text-secondary leading-relaxed">
                      {entry.tldr}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="font-mono text-sm text-text-tertiary group-hover:text-accent group-hover:tracking-widest transition-all duration-300 mt-8 shrink-0">
                    READ &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Terminal hint */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="font-mono text-[10px] text-text-tertiary tracking-[0.15em] uppercase">
              // Pro tip: press &#x2318;K and type{' '}
              <code className="text-accent">stack baas</code> for the quick version.
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <RaccoonToggle />
    </>
  );
}
