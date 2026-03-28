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

        {/* Positioning statement */}
        <p className="font-mono text-sm sm:text-base text-text-primary leading-relaxed">
          I sell payments infrastructure to the people who build financial products.
        </p>
        <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
          Banks, credit unions, fintechs, brands — if they want to issue cards, modernize
          their stack, or launch a new program, I&apos;m the one structuring the deal
          and getting it through procurement. Enterprise sales, partnerships, and
          go-to-market strategy across Canada and the US.
        </p>
        <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
          $700M+ pipeline. Consumer, business, and commercial card programs.
          From first call to live cards in 10&ndash;12 weeks.
        </p>

        {/* Specialties grid */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-3">
            // core.specialties
          </div>
          <div className="flex flex-wrap gap-2">
            {['Enterprise Sales', 'BD & Partnerships', 'Go-to-Market', 'BaaS', 'CaaS', 'Payment Rails', 'RPAA', 'Open Banking', 'Scheme Rules', 'Procurement Strategy'].map(
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
