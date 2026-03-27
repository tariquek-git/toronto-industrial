'use client';

import { tickerItems } from '@/data/content';

export default function JsonTicker() {
  const items = [...tickerItems, ...tickerItems]; // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden border-y border-border py-4 bg-surface/50">
      <div className="ticker-animate flex whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-6">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: item.type === 'opinion' ? 'var(--accent)' : 'var(--primary)',
              }}
            />
            <span className="font-mono text-xs tracking-wide text-text-secondary">
              {item.text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
