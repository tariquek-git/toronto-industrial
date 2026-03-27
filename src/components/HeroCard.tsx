'use client';

import { useRef, useState, useCallback } from 'react';
import { useTorontoMode } from '@/context/TorontoModeContext';
import { profile, platformStats } from '@/data/content';

export default function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const { torontoMode } = useTorontoMode();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    const y = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={() => setIsFlipped(f => !f)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative w-[360px] h-[228px] sm:w-[480px] sm:h-[303px] lg:w-[540px] lg:h-[340px] transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${isFlipped ? 180 + tilt.y : tilt.y}deg)`,
        }}
      >
        {/* Front Face - The Personal Card */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            background: torontoMode
              ? 'linear-gradient(135deg, #0E8A45 0%, #065A2C 50%, #0E8A45 100%)'
              : 'linear-gradient(135deg, #0A1525 0%, #1A2B45 50%, #0F1D30 100%)',
          }}
        >
          {/* Top row: chip + network */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-11 h-8 sm:w-14 sm:h-10 rounded border border-white/20 bg-white/10 flex items-center justify-center">
                <div className="w-7 h-5 sm:w-9 sm:h-6 rounded-sm bg-gradient-to-br from-yellow-300/70 to-yellow-500/70" />
              </div>
              <div className="hidden sm:block w-6 h-6 rounded-full border border-white/15" />
            </div>
            <div className="text-right">
              <div className="font-display text-lg sm:text-xl tracking-wider text-white/90">
                BRIM FINANCIAL
              </div>
              <div className="font-mono text-[8px] sm:text-[9px] tracking-widest text-white/40">
                CARD-AS-A-SERVICE
              </div>
            </div>
          </div>

          {/* Card number */}
          <div className="font-mono text-base sm:text-lg tracking-[0.25em] text-white/60">
            4506 &bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 0001
          </div>

          {/* Bottom: cardholder info */}
          <div className="flex justify-between items-end">
            <div>
              <div className="font-mono text-[8px] sm:text-[9px] text-white/35 uppercase tracking-[0.15em] mb-1">
                Cardholder
              </div>
              <div className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-wider text-white leading-none">
                {profile.name.toUpperCase()}
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider mt-1">
                {profile.title}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[8px] sm:text-[9px] text-white/35 uppercase tracking-[0.15em] mb-1">
                Since
              </div>
              <div className="font-mono text-sm sm:text-base text-white/70">
                2022
              </div>
              <div className="font-mono text-[8px] sm:text-[9px] text-white/35 mt-1">
                {profile.location}
              </div>
            </div>
          </div>
        </div>

        {/* Back Face - Platform Specs */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: torontoMode
              ? 'linear-gradient(135deg, #065A2C 0%, #0E8A45 100%)'
              : 'linear-gradient(135deg, #1A2B45 0%, #0A1525 100%)',
          }}
        >
          <div className="w-full h-9 sm:h-11 bg-black/30 rounded -mt-1 mb-4 sm:mb-6" />
          <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 uppercase mb-3 sm:mb-4">
            // Platform Infrastructure
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1">
            {platformStats.map(stat => (
              <div key={stat.label} className="border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center">
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl text-white/90">{stat.value}</div>
                <div className="font-mono text-[8px] sm:text-[9px] text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="font-mono text-[8px] text-white/30 tracking-widest mt-3 sm:mt-4 text-center">
            {profile.specialties.join(' // ')}
          </div>
        </div>
      </div>
    </div>
  );
}
