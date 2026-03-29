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
          At Brim Financial, I work across the infrastructure layer &mdash; card
          issuance, payments, and money movement. I structure CaaS deals end-to-end
          for banks, credit unions, and fintechs: BIN sponsorship, scheme registration,
          processor integration. The kind of plumbing that gets a partner from zero
          to live card program in 12 weeks.
        </p>
        <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
          Before that: API platforms that connected banks to real-time accounting
          data at Railz (now FIS). Behavioral AI that opened 40K+ new accounts
          and drove $300M in deposits at Exagens. Game-based training that drove
          digital adoption at banks and credit unions with Lemonade.
        </p>
        <p className="font-mono text-sm sm:text-base text-text-secondary leading-relaxed mt-3">
          Four fintechs, one thesis &mdash; everything I sell either helps a
          financial institution save money or make more money.
        </p>

        {/* Specialties grid */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-3">
            // what.i.sell.into.FIs
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
