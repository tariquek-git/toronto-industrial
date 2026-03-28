'use client';

import { useState } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import TorontoSkyline from './TorontoSkyline';
import HeroCard from './HeroCard';

export default function HeroSection() {
  const parallax = useMouseParallax(0.05);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center overflow-hidden pt-[12vh] sm:pt-[14vh] lg:pt-[10vh] pb-8">
      <TorontoSkyline offsetX={parallax.x} offsetY={parallax.y} />

      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 px-4">
        <h1 className="sr-only">Tarique Khan — Selling Technology to Financial Institutions</h1>
        {/* THE CARD — hero-sized */}
        <div>
          <HeroCard onFlipChange={setIsFlipped} />
        </div>

        {/* Tagline with typewriter effect */}
        <div className="text-center mt-1">
          <div className="font-mono text-[10px] sm:text-xs text-text-secondary/80 tracking-[0.08em] sm:tracking-[0.15em] uppercase typewriter-line">
            Selling technology to banks. Built from Toronto.
          </div>
        </div>

        {/* Dynamic flip hint */}
        <div className="font-mono text-[9px] text-text-tertiary/60 tracking-[0.25em] uppercase">
          {isFlipped ? 'click to flip back' : 'tap to flip // magstripe not required'}
        </div>
      </div>

      {/* Bottom fade — subtle transition into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, var(--bg))' }}
      />
    </section>
  );
}
