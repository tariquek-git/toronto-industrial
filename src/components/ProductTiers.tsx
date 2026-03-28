'use client';

import { useState } from 'react';
import { useTorontoMode } from '@/context/TorontoModeContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { productTiers } from '@/data/content';

// Toronto Mode shifts the palette — gold, green, warm amber
const torontoColors = ['#FFBD2E', '#0E8A45', '#C8956B'];

export default function ProductTiers() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { torontoMode } = useTorontoMode();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="tiers" className="scroll-reveal max-w-5xl mx-auto px-6 py-20">
      <div className="flex items-baseline gap-4 mb-12">
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-primary">
          WHO I WORK WITH
        </h2>
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
          // clients.segments — pick a card, any card
        </span>
      </div>

      {/* Card deck */}
      <div className="relative flex justify-center items-end gap-0" style={{ perspective: '800px' }}>
        {productTiers.map((tier, index) => {
          const isHovered = hoveredIndex === index;
          const offset = (index - 1) * 30; // Fan out from center
          const rotation = (index - 1) * -5;
          const zIndex = isHovered ? 30 : 10 - Math.abs(index - 1);
          const color = torontoMode ? torontoColors[index] : tier.color;

          return (
            <div
              key={tier.id}
              className="relative w-[280px] sm:w-[320px] cursor-pointer transition-all duration-300 ease-out"
              style={{
                transform: isHovered
                  ? `translateY(-20px) translateX(${offset}px) rotateZ(0deg) scale(1.05)`
                  : `translateY(0) translateX(${offset}px) rotateZ(${rotation}deg)`,
                zIndex,
                marginLeft: index > 0 ? '-40px' : '0',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="rounded-lg border p-6 h-[380px] flex flex-col transition-all duration-300"
                style={{
                  borderColor: isHovered ? color : 'var(--border-strong)',
                  backgroundColor: isHovered ? `${color}08` : 'var(--surface)',
                  boxShadow: isHovered
                    ? `0 12px 40px ${color}20`
                    : '0 2px 8px var(--shadow)',
                }}
              >
                {/* Segment badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 border rounded"
                    style={{ borderColor: color, color: color }}
                  >
                    {tier.segment}
                  </span>
                  <span className="font-mono text-[9px] text-text-tertiary">
                    #{tier.id}
                  </span>
                </div>

                <h3
                  className="font-display text-2xl tracking-wider transition-colors duration-300"
                  style={{ color: isHovered ? color : 'var(--text-primary)' }}
                >
                  {tier.title.toUpperCase()}
                </h3>

                <p className="font-mono text-xs text-text-secondary mt-3 leading-relaxed flex-1">
                  {tier.description}
                </p>

                {/* Features */}
                <div className="border-t border-border pt-3 mt-3">
                  <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest mb-2">
                    Capabilities
                  </div>
                  <div className="space-y-1">
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-mono text-[11px] text-text-secondary">{f}</span>
                      </div>
                    ))}
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
