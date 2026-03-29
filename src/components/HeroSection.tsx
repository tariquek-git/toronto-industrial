'use client';

import { useState } from 'react';
import HeroCard from './HeroCard';

export default function HeroSection() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">

      <div className="relative z-10 flex flex-col items-center gap-2 px-4">
        <h1 className="sr-only">Tarique Khan — Selling Technology to Financial Institutions</h1>

        {/* THE CARD */}
        <HeroCard onFlipChange={setIsFlipped} />

        {/* Tagline — tight to card */}
        <div className="font-mono text-[10px] sm:text-xs text-text-secondary/80 tracking-[0.08em] sm:tracking-[0.15em] uppercase mt-4">
          Selling technology to banks across Canada and the US.
        </div>

        {/* Flip hint */}
        <div className="font-mono text-[9px] text-text-tertiary/50 tracking-[0.25em] uppercase mt-1">
          {isFlipped ? 'click to flip back' : 'tap to flip'}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, var(--bg))' }}
      />
    </section>
  );
}
