'use client';

import { useState, useEffect, useRef } from 'react';
import { careerTimeline } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';

function AnimatedNum({ prefix, target, suffix }: { prefix: string; target: number; suffix: string }) {
  const count = useCountUp(target, 1800, true);
  return <span>{prefix}{count}{suffix}</span>;
}

function AnimatedHighlight({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — reveal immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Split text on number patterns like $700M+, 40K+, 11x, $300M+
  const parts = text.split(/(\$?\d+(?:\.\d+)?[MKBx%]?\+?)/);

  return (
    <li ref={ref} className="flex gap-2 text-sm text-text-secondary">
      <span className="font-mono text-[10px] text-text-tertiary mt-0.5">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span>
        {parts.map((part, i) => {
          const match = part.match(/^(\$?)(\d+(?:\.\d+)?)([MKBx%]?\+?)$/);
          if (match && revealed) {
            const [, pre, num, suf] = match;
            return <AnimatedNum key={i} prefix={pre} target={parseFloat(num)} suffix={suf} />;
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    </li>
  );
}

export default function CareerTimeline() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="timeline" className="scroll-reveal max-w-4xl mx-auto px-6 py-20">
      <div className="flex items-baseline gap-4 mb-12">
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-primary">
          TRACK RECORD
        </h2>
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
          // career.timeline
        </span>
      </div>

      <div className="space-y-0">
        {careerTimeline.map((entry, index) => (
          <div key={entry.id} className="relative">
            {/* Connector line */}
            {index < careerTimeline.length - 1 && (
              <div className="absolute left-[11px] top-[28px] bottom-0 w-px bg-border-strong" />
            )}

            <div className="flex gap-6">
              {/* Status dot */}
              <div className="flex-shrink-0 mt-2">
                <div
                  className="w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: entry.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border-strong)',
                  }}
                >
                  {entry.status === 'ACTIVE' && (
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                </div>
              </div>

              {/* Content card */}
              <div className="flex-1 border border-border-strong p-6 mb-6 bg-surface/30">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-display text-xl tracking-wider text-primary">
                      {entry.role.toUpperCase()}
                    </h3>
                    <div className="font-mono text-xs text-text-secondary mt-0.5">
                      {entry.company}
                    </div>
                  </div>
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 border"
                    style={{
                      borderColor: entry.status === 'ACTIVE' ? 'var(--accent)' : 'var(--border)',
                      color: entry.status === 'ACTIVE' ? 'var(--accent)' : 'var(--text-tertiary)',
                    }}
                  >
                    {entry.status}
                  </span>
                </div>

                {/* Metadata */}
                <div className="audit-stamp mt-3 flex flex-wrap gap-2 sm:gap-4 border-b border-border pb-3 mb-3">
                  <span>Period: {entry.period}</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Loc: {entry.location}</span>
                  <span className="hidden sm:inline">|</span>
                  <span>Ref: #{entry.id}</span>
                </div>

                {/* Thesis — what I learned */}
                {'thesis' in entry && entry.thesis && (
                  <div className="mb-3 py-2 px-3 border-l-2 border-accent/40 bg-accent/5">
                    <p className="font-mono text-xs text-text-primary/70 italic leading-relaxed">
                      &ldquo;{entry.thesis}&rdquo;
                    </p>
                  </div>
                )}

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {entry.highlights.map((h, i) => (
                    <AnimatedHighlight key={i} text={h} index={i} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
