'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RaccoonToggle from '@/components/RaccoonToggle';
import InterchangeCalculator from '@/components/InterchangeCalculator';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function InterchangePageClient() {
  const calcRef = useScrollReveal<HTMLElement>();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/stack"
            className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary hover:text-accent transition-colors mb-6"
          >
            &larr; Back to stack
          </Link>

          {/* Page header */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4">
              <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-primary">
                INTERCHANGE
              </h1>
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
                // fees.calculator &mdash; follow the money
              </span>
            </div>

            <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-2xl mb-4">
              Interchange is the fee the merchant&apos;s bank pays the cardholder&apos;s bank
              on every card transaction. It&apos;s the economic engine of the entire card
              ecosystem &mdash; it funds your rewards points, covers credit risk, and is
              the reason issuers bother putting cards in people&apos;s wallets. If you work
              in payments and don&apos;t understand interchange, you&apos;re flying blind.
            </p>

            <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-2xl">
              Play with the calculator below. Change the card type, change the merchant
              category, watch the money move. This is what a {formatDollar(100)} transaction
              actually looks like under the hood.
            </p>
          </div>

          {/* Calculator */}
          <section ref={calcRef} className="scroll-reveal mb-16">
            <InterchangeCalculator />
          </section>

          {/* Deep dive */}
          <section className="border-t border-border pt-8 mb-12">
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary mb-4">
              // interchange.deepDive()
            </div>
            <div className="space-y-4">
              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                Every time you tap your credit card, a fee gets split between several
                parties. The merchant pays a &ldquo;merchant discount rate&rdquo; &mdash;
                let&apos;s say 2.5% on a $100 purchase. That $2.50 gets divided among the
                issuer (your bank), the card network (Visa/Mastercard), and the acquirer
                (the merchant&apos;s payment processor).
              </p>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                Interchange rates aren&apos;t negotiable by merchants &mdash; they&apos;re
                set by the card networks and vary by card type (debit vs. credit), card
                tier (basic vs. premium/infinite), merchant category (grocery vs.
                restaurants vs. e-commerce), and geography.
              </p>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                In Canada, interchange is lower than the US due to voluntary commitments
                by Visa and Mastercard to the government. In the EU, interchange is capped
                at 0.3% for credit &mdash; which is why European card rewards programs are
                terrible compared to North American ones.
              </p>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                Understanding interchange economics is essential for anyone in the card
                business. It&apos;s the revenue engine that makes card programs viable,
                the cost that merchants resent, and the fee that regulators periodically
                threaten to cap. It&apos;s the tax nobody reads but everybody pays.
              </p>
            </div>
          </section>

          {/* Related links */}
          <div className="border-t border-border pt-8">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary mb-3">
              // related.entries()
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/stack/caas"
                className="group inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <span>Card-as-a-Service (CaaS)</span>
                <span className="group-hover:tracking-widest transition-all duration-300">&rarr;</span>
              </Link>
              <Link
                href="/stack/bin-sponsorship"
                className="group inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <span>BIN Sponsorship</span>
                <span className="group-hover:tracking-widest transition-all duration-300">&rarr;</span>
              </Link>
              <Link
                href="/stack"
                className="group inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <span>All Stack entries</span>
                <span className="group-hover:tracking-widest transition-all duration-300">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <RaccoonToggle />
    </>
  );
}

function formatDollar(n: number): string {
  return `$${n.toFixed(0)}`;
}
