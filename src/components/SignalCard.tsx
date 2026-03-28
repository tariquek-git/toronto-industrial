'use client';

import Link from 'next/link';
import type { Signal } from '@/data/signals';
import { useTiltHover } from '@/hooks/useTiltHover';

interface SignalCardProps {
  signal: Signal;
  index?: number;
}

export default function SignalCard({ signal, index = 0 }: SignalCardProps) {
  const { ref, style: tiltStyle, handleMove, handleLeave } = useTiltHover(2);
  const dateFormatted = new Date(signal.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <Link href={`/signal/${signal.slug}`} className="group block">
      <article
        ref={ref as React.Ref<HTMLElement>}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={tiltStyle}
        className="border border-border-strong bg-surface/30 p-6 h-full flex flex-col
                   hover:bg-surface/60 hover:border-accent/40 transition-all duration-300
                   relative overflow-hidden"
      >
        {/* Index number */}
        <div className="absolute top-4 right-4 font-mono text-[10px] text-text-tertiary/40 tracking-wider">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Category + date */}
        <div className="flex items-center gap-3 mb-4">
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
            {signal.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-2xl tracking-wider text-primary mb-1 group-hover:text-accent transition-colors">
          {signal.title.toUpperCase()}
        </h3>

        {/* Subtitle */}
        <div className="font-mono text-[11px] text-text-tertiary tracking-wide mb-4">
          {signal.subtitle}
        </div>

        {/* Excerpt */}
        <p className="font-mono text-xs text-text-secondary leading-relaxed mb-4">
          {signal.excerpt}
        </p>

        {/* Footer: engagement + read more */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <span className="font-mono text-[9px] text-text-tertiary tracking-wider">
            {signal.engagement || '\u00A0'}
          </span>
          <span className="font-mono text-[10px] text-accent tracking-wider uppercase group-hover:tracking-[0.2em] transition-all">
            Read &rarr;
          </span>
        </div>
      </article>
    </Link>
  );
}
