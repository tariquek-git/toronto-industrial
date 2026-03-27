'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useTorontoMode } from '@/context/TorontoModeContext';

const expiryFacts = [
  { value: '03/26', label: 'VALID THRU' },
  { value: 'T+0', label: 'SETTLEMENT' },
  { value: '< 100ms', label: 'LATENCY p95' },
  { value: '∞ RAILS', label: 'PAYMENT NETWORKS' },
  { value: '24/7', label: 'UPTIME TARGET' },
  { value: '4506', label: 'BIN PREFIX' },
  { value: '$0.00', label: 'ANNUAL FEE*' },
  { value: 'Y2K+26', label: 'EPOCH' },
];

function SkylineSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 540 340" fill="currentColor" className={className} preserveAspectRatio="xMidYMax slice">
      {/* CN Tower */}
      <rect x="243" y="30" width="4" height="220" opacity="0.15" />
      <rect x="237" y="22" width="16" height="12" rx="2" opacity="0.15" />
      <ellipse cx="245" cy="100" rx="12" ry="6" opacity="0.12" />
      <rect x="236" y="94" width="18" height="16" rx="1" opacity="0.12" />

      {/* Rogers Centre */}
      <path d="M 200 270 Q 220 245 240 270 Z" opacity="0.08" />
      <rect x="200" y="270" width="40" height="12" opacity="0.08" />

      {/* Left cluster */}
      <rect x="140" y="180" width="22" height="110" opacity="0.1" />
      <rect x="165" y="200" width="18" height="90" opacity="0.08" />
      <rect x="186" y="210" width="14" height="80" opacity="0.06" />
      <rect x="110" y="230" width="26" height="60" opacity="0.07" />

      {/* Right cluster */}
      <rect x="260" y="170" width="24" height="120" opacity="0.1" />
      <rect x="288" y="195" width="20" height="95" opacity="0.08" />
      <rect x="312" y="210" width="16" height="80" opacity="0.06" />
      <rect x="332" y="225" width="22" height="65" opacity="0.07" />

      {/* First Canadian Place */}
      <rect x="215" y="150" width="20" height="140" opacity="0.1" />
      <polygon points="215,150 225,135 235,150" opacity="0.1" />

      {/* Far edges */}
      <rect x="60" y="260" width="30" height="40" opacity="0.05" />
      <rect x="95" y="250" width="20" height="50" opacity="0.06" />
      <rect x="360" y="255" width="25" height="45" opacity="0.05" />
      <rect x="390" y="240" width="20" height="60" opacity="0.06" />
      <rect x="415" y="260" width="30" height="40" opacity="0.04" />
      <rect x="450" y="270" width="22" height="30" opacity="0.03" />

      {/* Ground */}
      <rect x="0" y="290" width="540" height="50" opacity="0.04" />
    </svg>
  );
}

export default function HeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [factFading, setFactFading] = useState(false);
  const { torontoMode } = useTorontoMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setFactFading(true);
      setTimeout(() => {
        setFactIndex(i => (i + 1) % expiryFacts.length);
        setFactFading(false);
      }, 300);
    }, 2800);
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
  }, []);

  const fact = expiryFacts[factIndex];

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
        {/* ===== FRONT FACE ===== */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            background: torontoMode
              ? 'linear-gradient(160deg, #0E8A45 0%, #065A2C 40%, #043D1E 100%)'
              : 'linear-gradient(160deg, #0F1D30 0%, #0A1525 40%, #060E1A 100%)',
          }}
        >
          {/* Skyline watermark on card */}
          <div className="absolute inset-0 text-white pointer-events-none">
            <SkylineSVG className="absolute bottom-0 left-0 w-full h-full" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between">
            {/* Top: chip + branding */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-11 h-8 sm:w-12 sm:h-9 rounded-md border border-white/15 bg-white/5 flex items-center justify-center">
                  <div className="w-7 h-5 sm:w-8 sm:h-6 rounded-sm bg-gradient-to-br from-yellow-300/60 to-yellow-600/50" />
                </div>
                <div className="hidden sm:block w-5 h-5 rounded-full border border-white/10" />
              </div>
              <div className="text-right">
                <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-white/30 uppercase">
                  Business Development
                </div>
              </div>
            </div>

            {/* Middle: card number */}
            <div className="font-mono text-sm sm:text-base tracking-[0.3em] text-white/40">
              4506 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 0001
            </div>

            {/* Bottom: name + cycling expiry */}
            <div className="flex justify-between items-end">
              <div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white leading-none">
                  TARIQUE
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] text-white/30 tracking-[0.15em] mt-1">
                  Payments &bull; Fintech &bull; Toronto
                </div>
              </div>
              <div className="text-right min-w-[80px] sm:min-w-[100px]">
                <div className="font-mono text-[7px] sm:text-[8px] text-white/25 uppercase tracking-[0.2em] mb-1">
                  {fact.label}
                </div>
                <div
                  className="font-mono text-sm sm:text-base text-white/60 tracking-wider transition-all duration-300"
                  style={{
                    opacity: factFading ? 0 : 1,
                    transform: factFading ? 'translateY(4px)' : 'translateY(0)',
                  }}
                >
                  {fact.value}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: torontoMode
              ? 'linear-gradient(160deg, #043D1E 0%, #065A2C 40%, #0E8A45 100%)'
              : 'linear-gradient(160deg, #060E1A 0%, #0A1525 40%, #0F1D30 100%)',
          }}
        >
          {/* Skyline watermark on back too */}
          <div className="absolute inset-0 text-white pointer-events-none">
            <SkylineSVG className="absolute bottom-0 left-0 w-full h-full" />
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Magnetic stripe */}
            <div className="w-full h-10 sm:h-12 bg-black/40 mt-5 sm:mt-6" />

            {/* Signature strip */}
            <div className="mx-6 sm:mx-8 lg:mx-10 mt-4 sm:mt-5 flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded px-4 py-3 sm:py-4 border border-white/5">
                <div className="font-display text-xl sm:text-2xl lg:text-3xl tracking-wider text-white/70 italic"
                  style={{ fontStyle: 'italic' }}
                >
                  Tarique Khan
                </div>
              </div>
              <div className="bg-white/10 border border-white/5 rounded px-3 py-3 sm:py-4 text-center">
                <div className="font-mono text-[7px] text-white/25 uppercase tracking-wider">CVV</div>
                <div className="font-mono text-sm sm:text-base text-white/50">***</div>
              </div>
            </div>

            {/* Contact info */}
            <div className="mx-6 sm:mx-8 lg:mx-10 mt-4 sm:mt-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/25 uppercase tracking-wider w-12 sm:w-14">Email</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/60">tarique@bfrm.io</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/25 uppercase tracking-wider w-12 sm:w-14">LinkedIn</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/60">/in/tariquekhan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/25 uppercase tracking-wider w-12 sm:w-14">Based</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/60">Toronto, ON</span>
                </div>
              </div>

              <div className="font-mono text-[7px] sm:text-[8px] text-white/15 tracking-widest uppercase pb-2 sm:pb-0">
                This card is a platform. Flip to return.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
