'use client';

import { useState } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import TorontoSkyline from './TorontoSkyline';
import HeroCard from './HeroCard';

export default function HeroSection() {
  const parallax = useMouseParallax(0.05);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14 pb-8">
      <TorontoSkyline offsetX={parallax.x} offsetY={parallax.y} />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6">
        <h1 className="sr-only">Tarique Khan — Business Development, Payments Infrastructure</h1>
        {/* THE CARD */}
        <div className="card-float">
          <HeroCard onFlipChange={setIsFlipped} />
        </div>

        {/* Tagline with typewriter effect */}
        <div className="text-center mt-2">
          <div className="font-mono text-[11px] sm:text-xs text-text-secondary/80 tracking-[0.15em] uppercase typewriter-line">
            Payments infrastructure. Built from Toronto.
          </div>
        </div>

        {/* Dynamic flip hint */}
        <div className="font-mono text-[9px] text-text-tertiary/60 tracking-[0.25em] uppercase">
          {isFlipped ? 'click to flip back' : 'tap to flip // magstripe not required'}
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
