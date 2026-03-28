'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useTorontoMode } from '@/context/TorontoModeContext';
import { expiryDates, contact, industryLogos } from '@/data/content';

// ISO 7816-2 chip — 6 gold contact pads in 2×3 grid
function ChipSVG() {
  return (
    <svg viewBox="0 0 44 32" className="w-10 h-7 sm:w-12 sm:h-9" aria-hidden="true">
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
    <svg viewBox="0 0 14 20" className="w-4 h-5 sm:w-5 sm:h-6" fill="none" aria-hidden="true">
      <path d="M 2 4 A 8 8 0 0 1 2 16" stroke="rgba(255,255,255,0.18)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 5 6.5 A 5 5 0 0 1 5 13.5" stroke="rgba(255,255,255,0.28)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 8 8.5 A 2.5 2.5 0 0 1 8 11.5" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// Toronto skyline — recognizable landmarks, more detail
function TorontoFrontSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 540 340" fill="currentColor" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* CN Tower — proper proportions with observation deck + antenna */}
      <rect x="268" y="40" width="4" height="10" opacity="0.18" />
      <rect x="267" y="50" width="6" height="8" rx="1" opacity="0.18" />
      <rect x="269" y="58" width="2" height="140" opacity="0.2" />
      <ellipse cx="270" cy="120" rx="14" ry="6" opacity="0.15" />
      <rect x="258" y="114" width="24" height="18" rx="3" opacity="0.18" />
      <rect x="263" y="132" width="14" height="8" rx="1" opacity="0.14" />
      <rect x="265" y="198" width="10" height="40" rx="5" opacity="0.12" />

      {/* SkyDome / Rogers Centre — distinctive dome shape */}
      <path d="M 215 280 Q 225 250 240 248 Q 255 246 270 248 Q 285 250 295 280 Z" opacity="0.12" />
      <rect x="215" y="280" width="80" height="12" rx="2" opacity="0.1" />
      <path d="M 235 260 Q 250 240 265 260" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.08" />

      {/* First Canadian Place — tallest office tower, triangular top */}
      <rect x="300" y="150" width="22" height="142" opacity="0.12" />
      <polygon points="300,150 311,132 322,150" opacity="0.12" />
      <rect x="303" y="155" width="16" height="4" opacity="0.06" />

      {/* TD Centre — Mies van der Rohe black boxes */}
      <rect x="330" y="190" width="18" height="102" opacity="0.1" />
      <rect x="352" y="205" width="16" height="87" opacity="0.08" />

      {/* Scotia Plaza */}
      <rect x="195" y="170" width="20" height="122" opacity="0.1" />
      <polygon points="195,170 205,158 215,170" opacity="0.08" />

      {/* Brookfield Place — angular top */}
      <rect x="375" y="210" width="18" height="82" opacity="0.08" />
      <polygon points="375,210 384,195 393,210" opacity="0.06" />

      {/* Royal Bank Plaza — gold towers */}
      <rect x="165" y="210" width="16" height="82" opacity="0.08" />
      <rect x="150" y="225" width="14" height="67" opacity="0.06" />

      {/* Condos — east side cluster */}
      <rect x="400" y="240" width="14" height="52" opacity="0.06" />
      <rect x="418" y="250" width="12" height="42" opacity="0.05" />
      <rect x="434" y="255" width="16" height="37" opacity="0.04" />
      <rect x="455" y="265" width="12" height="27" opacity="0.03" />

      {/* West side — older buildings, lower */}
      <rect x="100" y="260" width="20" height="32" opacity="0.05" />
      <rect x="125" y="250" width="18" height="42" opacity="0.06" />
      <rect x="75" y="268" width="22" height="24" opacity="0.04" />

      {/* Lake Ontario waterline */}
      <rect x="0" y="292" width="540" height="48" opacity="0.03" />
      <path d="M 0 295 Q 60 290 120 295 Q 180 300 240 295 Q 300 290 360 295 Q 420 300 480 295 Q 510 292 540 295"
            fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
    </svg>
  );
}

// Back face — "the other side" — looking out FROM Toronto (lake, islands, horizon)
function TorontoBackSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 540 340" fill="currentColor" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* Horizon line — the view looking south from the city */}
      <rect x="0" y="280" width="540" height="1" opacity="0.06" />

      {/* Toronto Islands — low flat silhouette */}
      <path d="M 80 282 Q 120 276 180 278 Q 220 276 260 280 Q 280 278 300 282" opacity="0.06" />
      <path d="M 350 282 Q 380 278 420 280 Q 450 278 470 282" opacity="0.05" />

      {/* Island trees — tiny puffs */}
      <circle cx="140" cy="275" r="3" opacity="0.04" />
      <circle cx="155" cy="274" r="2.5" opacity="0.035" />
      <circle cx="200" cy="276" r="3" opacity="0.04" />
      <circle cx="390" cy="276" r="2.5" opacity="0.035" />

      {/* Billy Bishop airport tower — tiny */}
      <rect x="248" y="272" width="2" height="8" opacity="0.05" />
      <rect x="245" y="270" width="8" height="3" rx="1" opacity="0.04" />

      {/* Lake texture — subtle waves */}
      <path d="M 0 290 Q 40 288 80 290 Q 120 292 160 290 Q 200 288 240 290 Q 280 292 320 290 Q 360 288 400 290 Q 440 292 480 290 Q 520 288 540 290"
            fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />
      <path d="M 0 300 Q 50 298 100 300 Q 150 302 200 300 Q 250 298 300 300 Q 350 302 400 300 Q 450 298 500 300 Q 530 302 540 300"
            fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.03" />
      <path d="M 0 310 Q 60 308 120 310 Q 180 312 240 310 Q 300 308 360 310 Q 420 312 480 310 Q 530 308 540 310"
            fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.025" />

      {/* Distant shore — Niagara escarpment hint */}
      <path d="M 0 278 Q 100 275 200 277 Q 300 275 400 277 Q 500 275 540 278"
            fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.03" />
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
    const timeoutRefs: ReturnType<typeof setTimeout>[] = [];
    const interval = setInterval(() => {
      setDatePhase('exit');
      const t1 = setTimeout(() => {
        setDateIndex(i => (i + 1) % expiryDates.length);
        setDatePhase('enter');
        const t2 = setTimeout(() => setDatePhase('idle'), 350);
        timeoutRefs.push(t2);
      }, 350);
      timeoutRefs.push(t1);
    }, 3500);
    return () => {
      clearInterval(interval);
      timeoutRefs.forEach(t => clearTimeout(t));
    };
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
    setIsFlipped(prev => {
      const next = !prev;
      onFlipChange?.(next);
      return next;
    });
  }, [onFlipChange]);

  const expiry = expiryDates[dateIndex];
  const dateClass = datePhase === 'exit' ? 'fact-exit' : datePhase === 'enter' ? 'fact-enter' : '';

  const frontGrad = torontoMode
    ? 'linear-gradient(160deg, #0E8A45 0%, #065A2C 40%, #043D1E 100%)'
    : 'linear-gradient(160deg, #0F1D30 0%, #0A1525 40%, #060E1A 100%)';
  const backGrad = torontoMode
    ? 'linear-gradient(160deg, #043D1E 0%, #054525 60%, #076035 100%)'
    : 'linear-gradient(160deg, #060E1A 0%, #0C1828 60%, #10202F 100%)';

  return (
    <div
      className="relative cursor-pointer group"
      style={{ perspective: '1200px' }}
      role="button"
      aria-label="Interactive card — click to flip"
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
          {/* Toronto skyline watermark — looking AT the city */}
          <div className="absolute inset-0 text-white pointer-events-none">
            <TorontoFrontSVG className="absolute bottom-0 left-0 w-full h-full" />
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
                <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  Payments &middot; Fintech &middot; Toronto
                </div>
              </div>
            </div>

            {/* Middle: card number */}
            <div className="font-mono text-sm sm:text-base lg:text-lg tracking-[0.3em] text-white/40">
              4506 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 0001
            </div>

            {/* Bottom: name + cycling expiry date */}
            <div className="flex justify-between items-end">
              <div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-white/95 leading-none">
                  TARIQUE KHAN
                </div>
                <div className="font-mono text-[8px] sm:text-[10px] text-white/40 tracking-[0.15em] mt-1.5">
                  // BD &middot; CaaS &middot; BaaS &middot; Raccoon Logic
                </div>
              </div>
              <div className="text-right min-w-[85px] sm:min-w-[105px]">
                <div className="font-mono text-[7px] sm:text-[8px] text-white/30 uppercase tracking-[0.2em]">
                  VALID THRU
                </div>
                <div className={`font-mono text-lg sm:text-xl lg:text-2xl text-white/75 tracking-wider leading-none mt-0.5 ${dateClass}`}>
                  {expiry.date}
                </div>
                <div className={`font-mono text-[6px] sm:text-[7px] text-white/25 mt-1 tracking-wider leading-tight max-w-[105px] ml-auto ${dateClass}`}>
                  {expiry.note}
                </div>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 rounded-2xl flex items-center justify-center
                          bg-black/0 group-hover:bg-black/15 opacity-0 group-hover:opacity-100
                          transition-all duration-300 pointer-events-none z-30">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/90">
              Click to flip
            </span>
          </div>
        </div>

        {/* ===== BACK FACE — the view from the other side ===== */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ${backHovered ? 'card-back-hovered' : ''}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: backGrad }}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
        >
          {/* Looking OUT from Toronto — lake, islands, horizon */}
          <div className="absolute inset-0 text-white pointer-events-none">
            <TorontoBackSVG className="absolute bottom-0 left-0 w-full h-full" />
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
                  <div className="font-mono text-[6px] sm:text-[7px] text-white/30 uppercase tracking-widest mb-1">
                    Authorized Signature
                  </div>
                  <svg viewBox="0 0 160 30" className="w-full h-5 sm:h-6 overflow-visible">
                    <path
                      className="sig-path"
                      d="M 8,24 C 14,8 22,6 26,18 C 30,28 32,14 40,13 C 48,12 50,24 54,19
                         C 58,14 64,10 70,18 C 76,26 78,18 86,16 C 94,14 100,20 106,17
                         C 112,14 115,24 121,21 C 126,18 130,12 138,20"
                      fill="none"
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="bg-white/5 border border-white/10 rounded px-2 sm:px-3 py-1.5 text-center flex flex-col justify-center">
                  <div className="font-mono text-[6px] sm:text-[7px] text-white/30 uppercase tracking-wider">CVV</div>
                  <div className="font-mono text-xs sm:text-sm text-white/50">***</div>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                <div className="font-mono text-[7px] sm:text-[8px] text-white/30 uppercase tracking-widest mb-1">
                  // contact
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-wider w-14">Email</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/70">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-wider w-14">LinkedIn</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/70">{contact.linkedin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-wider w-14">Based</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/70">{contact.location}</span>
                </div>
              </div>

              {/* Bottom: industry badges */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/8">
                <div className="flex gap-1 sm:gap-1.5 flex-wrap">
                  {industryLogos.map(logo => (
                    <span
                      key={logo.id}
                      className="font-mono text-[6px] sm:text-[7px] tracking-widest uppercase px-1.5 py-0.5
                                 border border-white/12 text-white/35"
                    >
                      {logo.label}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-[6px] sm:text-[7px] text-white/20 tracking-widest uppercase">
                  Toronto, ON
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
