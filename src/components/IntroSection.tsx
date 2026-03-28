'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function IntroSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="scroll-reveal max-w-3xl mx-auto px-6 py-16 sm:py-20">
      <div className="border border-border-strong bg-surface/30 p-6 sm:p-8">
        {/* Header stamp */}
        <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-4">
          // system.profile — read-only
        </div>

        {/* The story arc */}
        <p className="font-mono text-sm sm:text-base text-text-primary leading-relaxed">
          I sell technology to financial institutions. Every product I&apos;ve ever
          sold either helps a bank save money or make more money.
        </p>
        <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
          Game-based employee training that drives digital adoption. Behavioral
          AI that turned 40K accounts into $300M in deposits. API platforms that
          replaced manual lending workflows overnight. And now &mdash; card-as-a-service
          infrastructure that gets banks from zero to live card program in 12 weeks.
        </p>
        <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
          I&apos;m not a payments person who does sales. I&apos;m a fintech vertical
          specialist who&apos;s spent a decade learning how financial institutions
          buy, what their procurement teams need to hear, and how to structure
          deals that actually close.
        </p>

        {/* Specialties grid */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-3">
            // what.i.sell.into.banks
          </div>
          <div className="flex flex-wrap gap-2">
            {['Card-as-a-Service', 'API Platforms', 'Behavioral Banking', 'Digital Adoption', 'Payment Rails', 'Open Banking', 'BaaS Infrastructure', 'Enterprise Sales', 'Go-to-Market', 'Procurement Strategy'].map(
              (spec) => (
                <span
                  key={spec}
                  className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase px-2.5 py-1
                             border border-border-strong text-text-secondary hover:border-accent
                             hover:text-accent transition-colors cursor-default"
                >
                  {spec}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
