'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useTorontoMode } from '@/context/TorontoModeContext';
import { expiryDates, contact, industryLogos } from '@/data/content';

// ISO 7816-2 chip — 6 gold contact pads in 2×3 grid
function ChipSVG() {
  return (
    <svg viewBox="0 0 44 32" className="w-10 h-7 sm:w-12 sm:h-9" aria-hidden>
      <rect x="1" y="1" width="42" height="30" rx="3" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.5" />
      <rect x="2" y="2" width="40" height="28" rx="2" fill="rgba(212,175,55,0.12)" />
      <rect x="6"  y="4"  width="13" height="7" rx="1" fill="rgba(212,175,55,0.55)" />
      <rect x="6"  y="13" width="13" height="6" rx="1" fill="rgba(212,175,55,0.50)" />
      <rect x="6"  y="21" width="13" height="7" rx="1" fill="rgba(212,175,55,0.55)" />
      <rect x="25" y="4"  width="13" height="7" rx="1" fill="rgba(212,175,55,0.55)" />
      <rect x="25" y="13" width="13" height="6" rx="1" fill="rgba(212,175,55,0.50)" />
      <rect x="25" y="21" width="13" height="7" rx="1" fill="rgba(212,175,55,0.55)" />
      <rect x="20" y="2" width="4" height="28" fill="rgba(0,0,0,0.25)" />
    </svg>
  );
}

// Contactless 3-arc wave
function ContactlessSVG() {
  return (
    <svg viewBox="0 0 14 20" className="w-4 h-5 sm:w-5 sm:h-6" fill="none" aria-hidden>
      <path d="M 2 4 A 8 8 0 0 1 2 16" stroke="rgba(255,255,255,0.18)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 5 6.5 A 5 5 0 0 1 5 13.5" stroke="rgba(255,255,255,0.28)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 8 8.5 A 2.5 2.5 0 0 1 8 11.5" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// Toronto skyline watermark
function SkylineSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 540 340" fill="currentColor" className={className} preserveAspectRatio="xMidYMax slice">
      <rect x="243" y="30" width="4" height="220" opacity="0.15" />
      <rect x="237" y="22" width="16" height="12" rx="2" opacity="0.15" />
      <ellipse cx="245" cy="100" rx="12" ry="6" opacity="0.12" />
      <rect x="236" y="94" width="18" height="16" rx="1" opacity="0.12" />
      <path d="M 200 270 Q 220 245 240 270 Z" opacity="0.08" />
      <rect x="200" y="270" width="40" height="12" opacity="0.08" />
      <rect x="140" y="180" width="22" height="110" opacity="0.1" />
      <rect x="165" y="200" width="18" height="90" opacity="0.08" />
      <rect x="186" y="210" width="14" height="80" opacity="0.06" />
      <rect x="110" y="230" width="26" height="60" opacity="0.07" />
      <rect x="260" y="170" width="24" height="120" opacity="0.1" />
      <rect x="288" y="195" width="20" height="95" opacity="0.08" />
      <rect x="312" y="210" width="16" height="80" opacity="0.06" />
      <rect x="332" y="225" width="22" height="65" opacity="0.07" />
      <rect x="215" y="150" width="20" height="140" opacity="0.1" />
      <polygon points="215,150 225,135 235,150" opacity="0.1" />
      <rect x="60" y="260" width="30" height="40" opacity="0.05" />
      <rect x="95" y="250" width="20" height="50" opacity="0.06" />
      <rect x="360" y="255" width="25" height="45" opacity="0.05" />
      <rect x="390" y="240" width="20" height="60" opacity="0.06" />
      <rect x="415" y="260" width="30" height="40" opacity="0.04" />
      <rect x="450" y="270" width="22" height="30" opacity="0.03" />
      <rect x="0" y="290" width="540" height="50" opacity="0.04" />
    </svg>
  );
}

interface HeroCardProps {
  onFlipChange?: (flipped: boolean) => void;
}

export default function HeroCard({ onFlipChange }: HeroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [dateIndex, setDateIndex] = useState(0);
  const [datePhase, setDatePhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [backHovered, setBackHovered] = useState(false);
  const [magX, setMagX] = useState(50);
  const { torontoMode } = useTorontoMode();

  // Cycle expiry dates every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setDatePhase('exit');
      setTimeout(() => {
        setDateIndex(i => (i + 1) % expiryDates.length);
        setDatePhase('enter');
        setTimeout(() => setDatePhase('idle'), 350);
      }, 350);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    const y = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setBackHovered(false);
  }, []);

  const handleBackMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMagX(((e.clientX - rect.left) / rect.width) * 100);
  }, []);

  const handleFlip = useCallback(() => {
    const next = !isFlipped;
    setIsFlipped(next);
    onFlipChange?.(next);
  }, [isFlipped, onFlipChange]);

  const expiry = expiryDates[dateIndex];
  const dateClass = datePhase === 'exit' ? 'fact-exit' : datePhase === 'enter' ? 'fact-enter' : '';

  const frontGrad = torontoMode
    ? 'linear-gradient(160deg, #0E8A45 0%, #065A2C 40%, #043D1E 100%)'
    : 'linear-gradient(160deg, #0F1D30 0%, #0A1525 40%, #060E1A 100%)';
  const backGrad = torontoMode
    ? 'linear-gradient(160deg, #043D1E 0%, #065A2C 40%, #0E8A45 100%)'
    : 'linear-gradient(160deg, #060E1A 0%, #0A1525 40%, #0F1D30 100%)';

  return (
    <div
      className="relative cursor-pointer group"
      style={{ perspective: '1200px' }}
      onClick={handleFlip}
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

        {/* ===== FRONT FACE ===== */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: 'hidden', background: frontGrad }}
        >
          {/* Skyline watermark */}
          <div className="absolute inset-0 text-white pointer-events-none">
            <SkylineSVG className="absolute bottom-0 left-0 w-full h-full" />
          </div>

          {/* Holographic foil overlay */}
          <div className="holo-overlay absolute inset-0 rounded-2xl pointer-events-none z-10" />

          <div className="relative z-20 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between">

            {/* Top row: chip + contactless */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 sm:gap-3">
                <ChipSVG />
                <ContactlessSVG />
              </div>
              <div className="text-right">
                <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-white/30 uppercase">
                  Payments &middot; Fintech &middot; Toronto
                </div>
              </div>
            </div>

            {/* Middle: card number */}
            <div className="font-mono text-sm sm:text-base lg:text-lg tracking-[0.3em] text-white/35">
              4506 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 0001
            </div>

            {/* Bottom: name + cycling expiry date */}
            <div className="flex justify-between items-end">
              <div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white leading-none">
                  TARIQUE KHAN
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-white/30 tracking-[0.15em] mt-1">
                  // BD &middot; CaaS &middot; BaaS &middot; Raccoon Logic
                </div>
              </div>
              <div className="text-right min-w-[85px] sm:min-w-[100px]">
                <div className="font-mono text-[7px] sm:text-[8px] text-white/20 uppercase tracking-[0.2em]">
                  VALID THRU
                </div>
                <div className={`font-mono text-lg sm:text-xl lg:text-2xl text-white/65 tracking-wider leading-none mt-0.5 ${dateClass}`}>
                  {expiry.date}
                </div>
                <div className={`font-mono text-[6px] sm:text-[7px] text-white/20 mt-1 tracking-wider leading-tight max-w-[100px] ml-auto ${dateClass}`}>
                  {expiry.note}
                </div>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 rounded-2xl flex items-center justify-center
                          bg-black/0 group-hover:bg-black/20 opacity-0 group-hover:opacity-100
                          transition-all duration-300 pointer-events-none z-30">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/80">
              Click to flip
            </span>
          </div>
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ${backHovered ? 'card-back-hovered' : ''}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: backGrad }}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
        >
          {/* Skyline watermark */}
          <div className="absolute inset-0 text-white pointer-events-none">
            <SkylineSVG className="absolute bottom-0 left-0 w-full h-full" />
          </div>

          <div className={`relative z-10 flex flex-col h-full ${isFlipped ? 'card-flipped' : ''}`}>

            {/* Magnetic stripe */}
            <div
              className="w-full relative overflow-hidden mt-5 sm:mt-6 flex-shrink-0"
              style={{ height: '44px' }}
              onMouseMove={handleBackMouseMove}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
              <div
                className="absolute top-0 h-full w-20 sm:w-24 pointer-events-none"
                style={{
                  left: `${magX}%`,
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                  transition: 'left 0.08s linear',
                }}
              />
              <div className="mag-stripe-shimmer absolute top-0 left-0 h-full w-16
                              bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>

            {/* Content below stripe */}
            <div className="mx-5 sm:mx-7 lg:mx-9 mt-3 sm:mt-4 flex-1 flex flex-col min-h-0">

              {/* Signature strip + CVV */}
              <div className="flex items-stretch gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex-1 border border-white/10 bg-white/5 rounded px-2 sm:px-3 py-1.5">
                  <div className="font-mono text-[6px] sm:text-[7px] text-white/25 uppercase tracking-widest mb-1">
                    Authorized Signature
                  </div>
                  <svg viewBox="0 0 160 30" className="w-full h-5 sm:h-6 overflow-visible">
                    <path
                      className="sig-path"
                      d="M 8,24 C 14,8 22,6 26,18 C 30,28 32,14 40,13 C 48,12 50,24 54,19
                         C 58,14 64,10 70,18 C 76,26 78,18 86,16 C 94,14 100,20 106,17
                         C 112,14 115,24 121,21 C 126,18 130,12 138,20"
                      fill="none"
                      stroke="rgba(255,255,255,0.60)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="bg-white/5 border border-white/10 rounded px-2 sm:px-3 py-1.5 text-center flex flex-col justify-center">
                  <div className="font-mono text-[6px] sm:text-[7px] text-white/25 uppercase tracking-wider">CVV</div>
                  <div className="font-mono text-xs sm:text-sm text-white/45">***</div>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                <div className="font-mono text-[7px] sm:text-[8px] text-white/25 uppercase tracking-widest mb-1">
                  // contact
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/25 uppercase tracking-wider w-12 sm:w-14">Email</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/65">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/25 uppercase tracking-wider w-12 sm:w-14">LinkedIn</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/65">{contact.linkedin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/25 uppercase tracking-wider w-12 sm:w-14">Based</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/65">{contact.location}</span>
                </div>
              </div>

              {/* Bottom: industry badges + network circles */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/8">
                <div className="flex gap-1 sm:gap-1.5 flex-wrap">
                  {industryLogos.map(logo => (
                    <span
                      key={logo.id}
                      className="font-mono text-[6px] sm:text-[7px] tracking-widest uppercase px-1.5 py-0.5
                                 border border-white/12 text-white/30"
                    >
                      {logo.label}
                    </span>
                  ))}
                </div>
                {/* Mastercard-style overlapping circles */}
                <div className="flex items-center flex-shrink-0 ml-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500/65" />
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400/65 -ml-2 sm:-ml-2.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
