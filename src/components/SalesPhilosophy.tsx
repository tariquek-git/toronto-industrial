'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const principles = [
  {
    id: 'procurement',
    headline: 'Procurement is the product.',
    detail:
      '80% of deals die at procurement, not the demo. Banks don\u2019t evaluate your UI \u2014 they evaluate your SOC 2, your incident response plan, and your insurance certificate. I build the compliance narrative before the sales deck.',
  },
  {
    id: 'thesis',
    headline: 'Everything saves money or makes money.',
    detail:
      'Four fintechs, one filter. If I can\u2019t map the product to one of those outcomes in the first meeting, the RFP response is going in the shredder. Banks don\u2019t buy innovation \u2014 they buy measurable impact.',
  },
  {
    id: 'bin',
    headline: 'The BIN sponsor is the product.',
    detail:
      'The processor, the app, the rewards engine \u2014 that\u2019s all middleware. If your BIN sponsor gets a consent order, your program is dead. I sell the relationship and the regulatory cover, not the software.',
  },
  {
    id: 'speed',
    headline: 'Speed is the real differentiator.',
    detail:
      'Industry average to launch a card program: 18 months. What I deliver at Brim: 10\u201312 weeks. That time gap is the entire pitch. Banks don\u2019t need better technology \u2014 they need technology that ships.',
  },
];

export default function SalesPhilosophy() {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="scroll-reveal max-w-4xl mx-auto px-6 py-16 sm:py-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-10">
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-primary">
          HOW I SELL
        </h2>
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
          // four principles
        </span>
      </div>

      <div className="space-y-3">
        {principles.map((p, index) => {
          const isOpen = openId === p.id;
          return (
            <div
              key={p.id}
              className="border border-border-strong bg-surface/30 transition-all duration-300 cursor-pointer group"
              style={{
                borderColor: isOpen ? 'var(--accent)' : undefined,
              }}
              onClick={() => setOpenId(isOpen ? null : p.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpenId(isOpen ? null : p.id);
                }
              }}
            >
              <div className="flex items-center justify-between p-5 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="font-mono text-[10px] text-text-tertiary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="font-display text-lg sm:text-xl tracking-wider transition-colors duration-300"
                    style={{ color: isOpen ? 'var(--accent)' : 'var(--text-primary)' }}
                  >
                    {p.headline.toUpperCase()}
                  </h3>
                </div>
                <span
                  className="font-mono text-xs text-text-tertiary transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </div>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: isOpen ? '200px' : '0px',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  <div className="border-t border-border pt-4">
                    <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {p.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
