'use client';

import { useState } from 'react';
import HeroCard from './HeroCard';
import { useTheme } from '@/context/ThemeContext';

export default function HeroSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { resolvedDark } = useTheme();

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-14">

      {/* Radial spotlight — gives the card a "stage" */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '140%',
          height: '120%',
          top: '-10%',
          left: '-20%',
          background: resolvedDark
            ? 'radial-gradient(ellipse 50% 60% at 50% 45%, rgba(248,81,73,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 50% 60% at 50% 45%, rgba(10,21,37,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 className="sr-only">Tarique Khan — Selling Technology to Financial Institutions</h1>

        {/* THE CARD */}
        <HeroCard onFlipChange={setIsFlipped} />

        {/* Tagline */}
        <p className="font-mono text-[10px] sm:text-xs text-text-secondary/80 tracking-[0.08em] sm:tracking-[0.15em] uppercase mt-5 text-center">
          Selling technology to banks across Canada and the US.
        </p>

        {/* Flip hint */}
        <div className="font-mono text-[9px] text-text-tertiary/40 tracking-[0.25em] uppercase mt-1.5">
          {isFlipped ? 'click to flip back' : 'tap the card'}
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
