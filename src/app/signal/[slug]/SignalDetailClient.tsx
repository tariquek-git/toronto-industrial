'use client';

import Link from 'next/link';
import type { Signal } from '@/data/signals';
import { getSignalsSorted } from '@/data/signals';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  signal: Signal;
}

export default function SignalDetailClient({ signal }: Props) {
  const dateFormatted = new Date(signal.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get next/prev signals for navigation
  const sorted = getSignalsSorted();
  const currentIndex = sorted.findIndex((s) => s.slug === signal.slug);
  const prevSignal = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
  const nextSignal = currentIndex > 0 ? sorted[currentIndex - 1] : null;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 pb-16">
        <article className="max-w-2xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/signal"
            className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary hover:text-accent transition-colors mb-8"
          >
            &larr; All signals
          </Link>

          {/* Article header */}
          <header className="mb-10">
            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border"
                style={{ borderColor: signal.color, color: signal.color }}
              >
                {signal.categoryLabel}
              </span>
              <span className="font-mono text-[9px] text-text-tertiary tracking-wider uppercase">
                {dateFormatted}
              </span>
              <span className="font-mono text-[9px] text-text-tertiary tracking-wider">
                {signal.readTime} read
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl tracking-wider text-primary mb-2">
              {signal.title.toUpperCase()}
            </h1>

            {/* Subtitle */}
            <p className="font-mono text-sm text-text-tertiary tracking-wide">
              {signal.subtitle}
            </p>

            {/* Engagement bar */}
            {signal.engagement && (
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-text-tertiary tracking-wider">
                    LinkedIn: {signal.engagement}
                  </span>
                  {signal.linkedinUrl && (
                    <a
                      href={signal.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-accent hover:underline tracking-wider"
                    >
                      View original &rarr;
                    </a>
                  )}
                </div>
              </div>
            )}
          </header>

          {/* Article body */}
          <div className="border border-border-strong bg-surface/30 p-6 sm:p-8 mb-10">
            <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-6">
              // signal.body &mdash; read-only
            </div>

            {signal.body.map((paragraph, i) => (
              <p
                key={i}
                className={`font-mono text-sm sm:text-base leading-relaxed ${
                  i === 0 ? 'text-text-primary' : 'text-text-secondary'
                } ${i > 0 ? 'mt-4' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author attribution */}
          <div className="border-t border-border-strong pt-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-border-strong flex items-center justify-center">
                <span className="font-display text-lg text-primary">TK</span>
              </div>
              <div>
                <div className="font-mono text-sm text-primary">Tarique Khan</div>
                <div className="font-mono text-[10px] text-text-tertiary tracking-wider">
                  Director, Business Development &middot; Brim Financial &middot; Toronto
                </div>
              </div>
            </div>
          </div>

          {/* Nav between signals */}
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
            {prevSignal ? (
              <Link
                href={`/signal/${prevSignal.slug}`}
                className="group"
              >
                <div className="font-mono text-[9px] text-text-tertiary tracking-wider uppercase mb-1">
                  &larr; Previous
                </div>
                <div className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">
                  {prevSignal.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextSignal ? (
              <Link
                href={`/signal/${nextSignal.slug}`}
                className="group text-right"
              >
                <div className="font-mono text-[9px] text-text-tertiary tracking-wider uppercase mb-1">
                  Next &rarr;
                </div>
                <div className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">
                  {nextSignal.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
