'use client';

import Link from 'next/link';
import type { StackEntry } from '@/data/stack';
import { getStackSorted, getStackBySlug } from '@/data/stack';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  entry: StackEntry;
}

export default function StackDetailClient({ entry }: Props) {
  const sorted = getStackSorted();
  const currentIndex = sorted.findIndex((e) => e.slug === entry.slug);
  const prevEntry = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextEntry = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  const relatedEntries = (entry.related || [])
    .map((slug) => getStackBySlug(slug))
    .filter(Boolean) as StackEntry[];

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 pb-16">
        <article className="max-w-2xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/stack"
            className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary hover:text-accent transition-colors mb-8"
          >
            &larr; All terms
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border"
                style={{ borderColor: entry.color, color: entry.color }}
              >
                {entry.categoryLabel}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl tracking-wider text-primary mb-2">
              {entry.term.toUpperCase()}
            </h1>
            <p className="font-mono text-sm text-text-tertiary tracking-wide">
              {entry.fullName}
            </p>

            {/* TLDR box */}
            <div className="mt-6 p-4 border border-accent/30 bg-accent/5">
              <div className="font-mono text-[9px] text-accent tracking-[0.2em] uppercase mb-2">
                // tl;dr
              </div>
              <p className="font-mono text-sm text-text-primary leading-relaxed">
                {entry.tldr}
              </p>
            </div>
          </header>

          {/* Body */}
          <div className="border border-border-strong bg-surface/30 p-6 sm:p-8 mb-10">
            <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-6">
              // stack.read(&quot;{entry.slug}&quot;) &mdash; field definition
            </div>

            {entry.body.map((paragraph, i) => (
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

          {/* Interactive Deal Anatomy callout */}
          {entry.slug === 'deal-anatomy' && (
            <Link
              href="/deal-anatomy"
              className="group block border border-accent/30 hover:border-accent/60 p-5 mb-10 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[9px] text-accent tracking-[0.2em] uppercase mb-1">
                    // interactive version
                  </div>
                  <div className="font-mono text-sm text-text-primary group-hover:text-accent transition-colors">
                    Explore the full Deal Anatomy interactive walkthrough
                  </div>
                  <div className="font-mono text-xs text-text-tertiary mt-1">
                    Expandable stages, pipeline funnel, survival rates, and field notes.
                  </div>
                </div>
                <span className="font-mono text-sm text-text-tertiary group-hover:text-accent group-hover:tracking-widest transition-all duration-300 shrink-0">
                  EXPLORE &rarr;
                </span>
              </div>
            </Link>
          )}

          {/* Related terms */}
          {relatedEntries.length > 0 && (
            <div className="mb-10">
              <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-4">
                // see also
              </div>
              <div className="flex flex-wrap gap-3">
                {relatedEntries.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/stack/${related.slug}`}
                    className="group border border-border hover:border-accent/40 px-4 py-3 transition-all duration-300"
                  >
                    <div className="font-display text-lg tracking-wider text-primary group-hover:text-accent transition-colors">
                      {related.term.toUpperCase()}
                    </div>
                    <div className="font-mono text-[10px] text-text-tertiary tracking-wide">
                      {related.fullName}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author */}
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

          {/* Nav */}
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
            {prevEntry ? (
              <Link href={`/stack/${prevEntry.slug}`} className="group">
                <div className="font-mono text-[9px] text-text-tertiary tracking-wider uppercase mb-1">
                  &larr; Previous
                </div>
                <div className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">
                  {prevEntry.term}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextEntry ? (
              <Link href={`/stack/${nextEntry.slug}`} className="group text-right">
                <div className="font-mono text-[9px] text-text-tertiary tracking-wider uppercase mb-1">
                  Next &rarr;
                </div>
                <div className="font-mono text-xs text-text-secondary group-hover:text-accent transition-colors">
                  {nextEntry.term}
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
