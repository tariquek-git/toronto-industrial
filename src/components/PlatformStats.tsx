'use client';

import { platformStats } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function PlatformStats() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="scroll-reveal max-w-4xl mx-auto px-6 py-12"
    >
      <div className="border border-border-strong bg-surface/30 p-6">
        {/* Header */}
        <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-4">
          // platform.metrics — live
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {platformStats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="font-display text-3xl sm:text-4xl tracking-wider text-primary leading-none">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-text-tertiary uppercase tracking-[0.15em] mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
