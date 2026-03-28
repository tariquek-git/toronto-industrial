'use client';

import { careerTimeline } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CareerTimeline() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="timeline" className="scroll-reveal max-w-4xl mx-auto px-6 py-20">
      <div className="flex items-baseline gap-4 mb-12">
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-primary">
          AUDIT LOG
        </h2>
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
          // career.timeline — all transactions final
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
                <div className="audit-stamp mt-3 flex gap-4 border-b border-border pb-3 mb-3">
                  <span>Period: {entry.period}</span>
                  <span>|</span>
                  <span>Loc: {entry.location}</span>
                  <span>|</span>
                  <span>Ref: #{entry.id}</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {entry.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-text-secondary">
                      <span className="font-mono text-[10px] text-text-tertiary mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {h}
                    </li>
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
