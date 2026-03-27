'use client';

import { useMouseParallax } from '@/hooks/useMouseParallax';
import TorontoSkyline from './TorontoSkyline';
import HeroCard from './HeroCard';
import { profile } from '@/data/content';

export default function HeroSection() {
  const parallax = useMouseParallax(0.05);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14 pb-8">
      <TorontoSkyline offsetX={parallax.x} offsetY={parallax.y} />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 px-6">
        {/* System label */}
        <div className="font-mono text-[10px] tracking-[0.3em] text-text-tertiary uppercase">
          // system.initialize
        </div>

        {/* THE CARD — hero centerpiece */}
        <div className="card-float">
          <HeroCard />
        </div>

        {/* Flip hint */}
        <div className="font-mono text-[10px] text-text-tertiary tracking-widest uppercase">
          Click to flip // Hover to inspect
        </div>

        {/* Supporting context below the card */}
        <div className="max-w-xl text-center">
          <p className="font-mono text-sm text-text-secondary leading-relaxed">
            Building credit card programs for banks, fintechs, and brands
            across {profile.markets.join(' & ')}. The card is the platform.
          </p>
        </div>

        {/* Specialty tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {profile.specialties.map(s => (
            <span
              key={s}
              className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 border border-border-strong text-text-secondary hover:text-primary hover:border-accent transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, var(--bg))' }}
      />
    </section>
  );
}
