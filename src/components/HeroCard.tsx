'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import '@/app/card-effects.css';
import { useTorontoMode } from '@/context/TorontoModeContext';
import { useTheme } from '@/context/ThemeContext';
import { expiryDates, contact, industryLogos } from '@/data/content';

// ISO 7816-2 chip — 6 gold contact pads in 2×3 grid
function ChipSVG({ dark }: { dark?: boolean }) {
  const base = dark ? 'rgba(212,175,55,' : 'rgba(180,145,40,';
  const border = dark ? 'rgba(212,175,55,0.35)' : 'rgba(160,130,30,0.4)';
  const bg = dark ? 'rgba(212,175,55,0.12)' : 'rgba(180,145,40,0.15)';
  const pad = dark ? 0.55 : 0.6;
  const padMid = dark ? 0.5 : 0.55;
  const divider = dark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.15)';

  return (
    <svg viewBox="0 0 44 32" className="w-11 h-8 sm:w-14 sm:h-10 lg:w-16 lg:h-11" aria-hidden="true">
      <rect x="1" y="1" width="42" height="30" rx="3" fill="none" stroke={border} strokeWidth="0.5" />
      <rect x="2" y="2" width="40" height="28" rx="2" fill={bg} />
      <rect x="6"  y="4"  width="13" height="7" rx="1" fill={`${base}${pad})`} />
      <rect x="6"  y="13" width="13" height="6" rx="1" fill={`${base}${padMid})`} />
      <rect x="6"  y="21" width="13" height="7" rx="1" fill={`${base}${pad})`} />
      <rect x="25" y="4"  width="13" height="7" rx="1" fill={`${base}${pad})`} />
      <rect x="25" y="13" width="13" height="6" rx="1" fill={`${base}${padMid})`} />
      <rect x="25" y="21" width="13" height="7" rx="1" fill={`${base}${pad})`} />
      <rect x="20" y="2" width="4" height="28" fill={divider} />
    </svg>
  );
}

// Contactless 3-arc wave
function ContactlessSVG({ dark }: { dark?: boolean }) {
  const color = dark ? 'rgba(255,255,255,' : 'rgba(10,21,37,';
  return (
    <svg viewBox="0 0 14 20" className="w-5 h-6 sm:w-6 sm:h-7" fill="none" aria-hidden="true">
      <path d="M 2 4 A 8 8 0 0 1 2 16" stroke={`${color}${dark ? '0.18' : '0.15'})`} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 5 6.5 A 5 5 0 0 1 5 13.5" stroke={`${color}${dark ? '0.28' : '0.22'})`} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 8 8.5 A 2.5 2.5 0 0 1 8 11.5" stroke={`${color}${dark ? '0.42' : '0.35'})`} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// Toronto skyline — shared with background, cropped to card center
// Uses the same landmarks as TorontoSkyline.tsx but with viewBox cropped to center
function CardSkylineSVG({ className, dark }: { className?: string; dark?: boolean }) {
  const opacity = dark ? 0.12 : 0.07;
  const opacityHigh = dark ? 0.18 : 0.10;
  const opacityLow = dark ? 0.08 : 0.05;
  const opacityWater = dark ? 0.06 : 0.035;

  return (
    <svg viewBox="380 80 840 420" fill="currentColor" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* CN Tower */}
      <rect x="718" y="12" width="3" height="18" opacity={opacityHigh} />
      <rect x="715" y="30" width="9" height="10" rx="1" opacity={opacity} />
      <rect x="717" y="40" width="5" height="80" opacity={opacityHigh} />
      <ellipse cx="719.5" cy="108" rx="12" ry="5" opacity={opacity} />
      <rect x="709" y="103" width="21" height="12" rx="2" opacity={opacity} />
      <ellipse cx="719.5" cy="140" rx="22" ry="9" opacity={opacity} />
      <rect x="700" y="132" width="39" height="20" rx="3" opacity={opacity} />
      <rect x="705" y="152" width="29" height="8" rx="1" opacity={opacityLow} />
      <polygon points="712,160 727,160 724,340 715,340" opacity={opacityLow} />
      <polygon points="715,330 710,370 718,370" opacity={opacityLow * 0.8} />
      <polygon points="724,330 729,370 721,370" opacity={opacityLow * 0.8} />

      {/* Rogers Centre dome */}
      <path d="M 640 380 Q 660 340 690 332 Q 720 328 740 340 Q 755 350 760 380 Z" opacity={opacityLow} />
      <rect x="640" y="380" width="120" height="15" rx="2" opacity={opacityLow} />

      {/* First Canadian Place */}
      <rect x="770" y="160" width="30" height="230" opacity={opacityLow} />
      <polygon points="770,160 785,135 800,160" opacity={opacityLow} />

      {/* TD Centre */}
      <rect x="808" y="210" width="26" height="180" opacity={opacityLow} />
      <rect x="838" y="230" width="22" height="160" opacity={opacityLow * 0.9} />

      {/* Scotia Plaza */}
      <rect x="620" y="200" width="24" height="190" opacity={opacityLow} />
      <polygon points="620,200 632,180 644,200" opacity={opacityLow * 0.9} />
      <rect x="600" y="230" width="18" height="160" opacity={opacityLow * 0.8} />

      {/* Brookfield Place */}
      <rect x="865" y="240" width="22" height="150" opacity={opacityLow * 0.9} />
      <polygon points="865,240 876,218 887,240" opacity={opacityLow * 0.8} />

      {/* Royal Bank Plaza */}
      <rect x="575" y="250" width="20" height="140" opacity={opacityLow * 0.8} />
      <rect x="555" y="270" width="16" height="120" opacity={opacityLow * 0.7} />

      {/* Bay Adelaide Centre */}
      <rect x="650" y="220" width="20" height="170" opacity={opacityLow} />

      {/* Aura */}
      <rect x="530" y="190" width="16" height="200" opacity={opacityLow * 0.8} />

      {/* L Tower */}
      <path d="M 920 280 Q 925 260 930 280 L 930 390 L 920 390 Z" opacity={opacityLow * 0.7} />

      {/* ICE Condos */}
      <rect x="500" y="270" width="14" height="120" opacity={opacityLow * 0.7} />
      <rect x="518" y="280" width="12" height="110" opacity={opacityLow * 0.6} />

      {/* CityPlace cluster */}
      <rect x="440" y="300" width="16" height="90" opacity={opacityLow * 0.6} />
      <rect x="460" y="310" width="14" height="80" opacity={opacityLow * 0.5} />
      <rect x="478" y="295" width="12" height="95" opacity={opacityLow * 0.6} />
      <rect x="420" y="320" width="14" height="70" opacity={opacityLow * 0.4} />

      {/* East Bayfront */}
      <rect x="950" y="310" width="18" height="80" opacity={opacityLow * 0.6} />
      <rect x="972" y="320" width="16" height="70" opacity={opacityLow * 0.5} />
      <rect x="992" y="330" width="20" height="60" opacity={opacityLow * 0.4} />
      <rect x="1016" y="340" width="14" height="50" opacity={opacityLow * 0.3} />

      {/* Harbourfront */}
      <rect x="580" y="375" width="340" height="15" rx="1" opacity={opacityLow * 0.5} />

      {/* Shoreline */}
      <rect x="380" y="390" width="840" height="30" opacity={opacityWater} />

      {/* Water */}
      <rect x="380" y="420" width="840" height="80" opacity={opacityWater * 0.6} />
      <path d="M 380 430 Q 460 426 540 430 Q 620 434 700 430 Q 780 426 860 430 Q 940 434 1020 430 Q 1100 426 1180 430 L 1220 430"
            fill="none" stroke="currentColor" strokeWidth="0.8" opacity={opacityWater * 0.8} />
    </svg>
  );
}

// Back face — looking out FROM Toronto (lake, islands, horizon)
function TorontoBackSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 280" fill="currentColor" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect x="0" y="220" width="440" height="1" opacity="0.05" />
      <path d="M 60 224 Q 100 218 150 220 Q 190 218 230 222 Q 250 220 270 224" opacity="0.05" />
      <path d="M 290 224 Q 310 220 340 222 Q 360 220 380 224" opacity="0.04" />
      <circle cx="120" cy="216" r="2.5" opacity="0.035" />
      <circle cx="135" cy="215" r="2" opacity="0.03" />
      <circle cx="170" cy="217" r="2.5" opacity="0.035" />
      <circle cx="320" cy="218" r="2" opacity="0.03" />
      <rect x="210" y="214" width="1.5" height="6" opacity="0.04" />
      <rect x="207" y="212" width="7" height="2.5" rx="1" opacity="0.035" />
      <path d="M 0 232 Q 35 229 70 232 Q 105 235 140 232 Q 175 229 210 232 Q 245 235 280 232 Q 315 229 350 232 Q 385 235 420 232 L 440 232"
            fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.035" />
      <path d="M 0 245 Q 40 242 80 245 Q 120 248 160 245 Q 200 242 240 245 Q 280 248 320 245 Q 360 242 400 245 L 440 245"
            fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.025" />
      <path d="M 0 218 Q 80 215 160 217 Q 240 215 320 217 Q 400 215 440 218"
            fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.025" />
      <rect x="0" y="225" width="440" height="55" opacity="0.02" />
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
  const [cardDigits, setCardDigits] = useState(['4','5','0','6']);
  const [lastFour, setLastFour] = useState(['0','0','0','1']);
  const [isRolling, setIsRolling] = useState(false);
  const { torontoMode } = useTorontoMode();
  const { resolvedDark } = useTheme();

  // Determine card color scheme
  const isDark = resolvedDark;

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
    const x = ((e.clientY - centerY) / (rect.height / 2)) * -6;
    const y = ((e.clientX - centerX) / (rect.width / 2)) * 6;
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
    setIsFlipped(prev => !prev);
  }, []);

  const rollCardNumber = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRolling) return;
    setIsRolling(true);
    const newFirst = ['4', '5', String(Math.floor(Math.random() * 10)), String(Math.floor(Math.random() * 10))];
    const newLast = Array.from({length: 4}, () => String(Math.floor(Math.random() * 10)));
    [...newFirst, ...newLast].forEach((digit, i) => {
      setTimeout(() => {
        if (i < 4) setCardDigits(prev => { const n = [...prev]; n[i] = digit; return n; });
        else setLastFour(prev => { const n = [...prev]; n[i-4] = digit; return n; });
      }, i * 80 + Math.random() * 50);
    });
    setTimeout(() => setIsRolling(false), 800);
  }, [isRolling]);

  // Notify parent of flip state changes (skip initial mount)
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    onFlipChange?.(isFlipped);
  }, [isFlipped, onFlipChange]);

  const expiry = expiryDates[dateIndex];
  const dateClass = datePhase === 'exit' ? 'fact-exit' : datePhase === 'enter' ? 'fact-enter' : '';

  // Color schemes: light-standard, dark-standard, light-toronto, dark-toronto
  let frontGrad: string;
  let backGrad: string;
  let textColor: string;
  let textMuted: string;
  let textFaint: string;
  let textGhost: string;

  if (torontoMode) {
    if (isDark) {
      frontGrad = 'linear-gradient(160deg, #0E8A45 0%, #065A2C 40%, #043D1E 100%)';
      backGrad = 'linear-gradient(160deg, #043D1E 0%, #054525 60%, #076035 100%)';
      textColor = 'rgba(255,255,255,0.95)';
      textMuted = 'rgba(255,255,255,0.40)';
      textFaint = 'rgba(255,255,255,0.30)';
      textGhost = 'rgba(255,255,255,0.20)';
    } else {
      frontGrad = 'linear-gradient(160deg, #E8E0D2 0%, #D5CDBD 40%, #C8C0B0 100%)';
      backGrad = 'linear-gradient(160deg, #DDD5C7 0%, #D0C8BA 60%, #E0D8CA 100%)';
      textColor = 'rgba(26,42,31,0.90)';
      textMuted = 'rgba(26,42,31,0.35)';
      textFaint = 'rgba(26,42,31,0.25)';
      textGhost = 'rgba(26,42,31,0.15)';
    }
  } else {
    if (isDark) {
      frontGrad = 'linear-gradient(160deg, #0F1D30 0%, #0A1525 40%, #060E1A 100%)';
      backGrad = 'linear-gradient(160deg, #060E1A 0%, #0C1828 60%, #10202F 100%)';
      textColor = 'rgba(255,255,255,0.95)';
      textMuted = 'rgba(255,255,255,0.40)';
      textFaint = 'rgba(255,255,255,0.30)';
      textGhost = 'rgba(255,255,255,0.20)';
    } else {
      // LIGHT MODE — warm cream card
      frontGrad = 'linear-gradient(160deg, #F5F0E6 0%, #EDE7D9 40%, #E8E0D0 100%)';
      backGrad = 'linear-gradient(160deg, #EDE7D9 0%, #E5DFD1 60%, #F0EADC 100%)';
      textColor = 'rgba(10,21,37,0.85)';
      textMuted = 'rgba(10,21,37,0.35)';
      textFaint = 'rgba(10,21,37,0.25)';
      textGhost = 'rgba(10,21,37,0.15)';
    }
  }

  // Card skyline text color matches card text
  const skylineTextClass = isDark ? 'text-white' : (torontoMode ? 'text-[#1A2A1F]' : 'text-[#0A1525]');

  return (
    <div
      className="relative cursor-pointer group"
      data-hero-card
      style={{ perspective: '1800px' }}
      role="button"
      tabIndex={0}
      aria-label="Interactive card — click to flip"
      onClick={handleFlip}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(); } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient light bleed */}
      <div
        className="card-ambient-light"
        style={{
          background: torontoMode
            ? 'radial-gradient(ellipse, rgba(255,189,46,0.12) 0%, rgba(14,138,69,0.06) 40%, transparent 70%)'
            : isDark
              ? 'radial-gradient(ellipse, rgba(218,41,28,0.12) 0%, rgba(10,21,37,0.06) 40%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(218,41,28,0.06) 0%, rgba(245,240,230,0.08) 40%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      <div className="card-particles" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>

      <motion.div
        ref={cardRef}
        className={`relative
          w-[calc(100vw-32px)] max-w-[560px] h-[calc((100vw-32px)*0.631)] max-h-[353px]
          sm:w-[620px] sm:max-w-none sm:h-[391px] sm:max-h-none
          lg:w-[740px] lg:h-[467px]
          xl:w-[800px] xl:h-[505px]`}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        animate={{
          rotateY: isFlipped ? 180 + tilt.y : tilt.y,
          rotateX: tilt.x,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 22 }}
      >
        {/* Edge glow */}
        <div className={`card-glow ${isDark ? '' : 'card-glow-light'} ${torontoMode ? 'card-glow-toronto' : 'card-glow-standard'}`} />

        {/* ===== FRONT FACE ===== */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'card-edge-highlight' : 'card-edge-highlight-light'}`}
          style={{ backfaceVisibility: 'hidden', background: frontGrad }}
        >
          {/* Toronto skyline — shared coordinate system with background */}
          <div className={`absolute inset-0 ${skylineTextClass} pointer-events-none`}>
            <CardSkylineSVG className="absolute bottom-0 left-0 w-full h-full" dark={isDark} />
          </div>

          {/* Holographic foil overlay */}
          <div className={`absolute inset-0 rounded-2xl pointer-events-none z-10 ${isDark ? 'holo-overlay' : 'holo-overlay-light'}`} />

          <div className="relative z-20 p-5 sm:p-7 lg:p-8 xl:p-9 h-full flex flex-col justify-between">

            {/* Top row: chip + contactless */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 sm:gap-3">
                <ChipSVG dark={isDark} />
                <ContactlessSVG dark={isDark} />
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] sm:text-[10px] lg:text-[11px] tracking-[0.15em] uppercase"
                     style={{ color: textMuted }}>
                  Payments &middot; Fintech &middot; Toronto
                </div>
              </div>
            </div>

            {/* Middle: card number */}
            <div className={`font-mono text-sm sm:text-base lg:text-lg xl:text-xl tracking-[0.3em] ${isDark ? 'card-embossed' : 'card-embossed-light'}`}
                 style={{ color: textMuted }}>
              <span onClick={rollCardNumber} className="cursor-pointer" title="Click to shuffle">
                {cardDigits.map((d, i) => (
                  <span key={`f${i}`} className={`card-digit ${isRolling ? 'rolling' : ''}`}>{d}</span>
                ))}
                {' '}&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;{' '}
                {lastFour.map((d, i) => (
                  <span key={`l${i}`} className={`card-digit ${isRolling ? 'rolling' : ''}`}>{d}</span>
                ))}
              </span>
            </div>

            {/* Bottom: name + cycling expiry date */}
            <div className="flex justify-between items-end">
              <div>
                <div className={`font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-wider leading-none ${isDark ? 'card-embossed' : 'card-embossed-light'}`}
                     style={{ color: textColor }}>
                  TARIQUE KHAN
                </div>
                <div className="font-mono text-[9px] sm:text-[9px] lg:text-[10px] tracking-[0.12em] mt-1"
                     style={{ color: textMuted }}>
                  BD &middot; Fintech &middot; Enterprise Sales &middot; Toronto
                </div>
              </div>
              <div className="text-right min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]">
                <div className="font-mono text-[8px] sm:text-[8px] lg:text-[9px] uppercase tracking-[0.2em]"
                     style={{ color: textFaint }}>
                  VALID THRU
                </div>
                <div className={`font-mono text-lg sm:text-xl lg:text-2xl xl:text-3xl tracking-wider leading-none mt-0.5 ${dateClass}`}
                     style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(10,21,37,0.55)' }}>
                  {expiry.date}
                </div>
                <div className={`font-mono text-[7px] sm:text-[7px] lg:text-[8px] mt-0.5 tracking-wider leading-tight max-w-[100px] ml-auto ${dateClass}`}
                     style={{ color: textGhost }}>
                  {expiry.note}
                </div>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className={`absolute inset-0 rounded-2xl flex items-center justify-center
                          opacity-0 group-hover:opacity-100
                          transition-all duration-300 pointer-events-none z-30`}
               style={{ background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)' }}>
            <span className="font-mono text-[10px] sm:text-xs lg:text-sm tracking-[0.2em] uppercase"
                  style={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(10,21,37,0.6)' }}>
              Click to flip
            </span>
          </div>
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'card-edge-highlight' : 'card-edge-highlight-light'} ${backHovered ? 'card-back-hovered' : ''}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: backGrad }}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
        >
          {/* Looking OUT from Toronto */}
          <div className={`absolute inset-0 ${skylineTextClass} pointer-events-none`}>
            <TorontoBackSVG className="absolute bottom-0 left-0 w-full h-full" />
          </div>

          <div className={`relative z-10 flex flex-col h-full ${isFlipped ? 'card-flipped' : ''}`}>

            {/* Magnetic stripe */}
            <div
              className="w-full relative overflow-hidden mt-6 sm:mt-7 lg:mt-8 flex-shrink-0"
              style={{ height: '52px' }}
              onMouseMove={handleBackMouseMove}
            >
              <div className="absolute inset-0" style={{
                background: isDark
                  ? 'linear-gradient(to right, #1a1a1a, #2a2a2a, #1a1a1a)'
                  : 'linear-gradient(to right, #8a8070, #9a9080, #8a8070)'
              }} />
              <div
                className="absolute top-0 h-full w-20 sm:w-24 pointer-events-none"
                style={{
                  left: `${magX}%`,
                  transform: 'translateX(-50%)',
                  background: isDark
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                  transition: 'left 0.08s linear',
                }}
              />
              <div className="mag-stripe-shimmer absolute top-0 left-0 h-full w-16
                              bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>

            {/* Content below stripe */}
            <div className="mx-5 sm:mx-6 lg:mx-8 mt-3 sm:mt-4 flex-1 flex flex-col min-h-0">

              {/* Signature strip + CVV */}
              <div className="flex items-stretch gap-2 sm:gap-3 mb-3 sm:mb-5">
                <div className="flex-1 rounded px-3 sm:px-4 py-2"
                     style={{
                       border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(10,21,37,0.10)'}`,
                       background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)',
                     }}>
                  <div className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest mb-1"
                       style={{ color: textFaint }}>
                    Authorized Signature
                  </div>
                  <svg viewBox="0 0 160 30" className="w-full h-6 sm:h-7 overflow-visible">
                    <path
                      className="sig-path"
                      d="M 8,24 C 14,8 22,6 26,18 C 30,28 32,14 40,13 C 48,12 50,24 54,19
                         C 58,14 64,10 70,18 C 76,26 78,18 86,16 C 94,14 100,20 106,17
                         C 112,14 115,24 121,21 C 126,18 130,12 138,20"
                      fill="none"
                      stroke={isDark ? 'rgba(255,255,255,0.65)' : 'rgba(10,21,37,0.45)'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="rounded px-3 sm:px-4 py-2 text-center flex flex-col justify-center"
                     style={{
                       border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(10,21,37,0.10)'}`,
                       background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)',
                     }}>
                  <div className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider"
                       style={{ color: textFaint }}>CVV</div>
                  <div className="font-mono text-sm sm:text-base" style={{ color: textMuted }}>416</div>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-5">
                <div className="font-mono text-[7px] sm:text-[9px] uppercase tracking-widest mb-1"
                     style={{ color: textFaint }}>
                  // contact
                </div>
                {[
                  { label: 'Email', value: contact.email },
                  { label: 'LinkedIn', value: contact.linkedin },
                  { label: 'Based', value: contact.location },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider w-16"
                          style={{ color: textFaint }}>{label}</span>
                    <span className="font-mono text-[10px] sm:text-sm"
                          style={{ color: isDark ? 'rgba(255,255,255,0.70)' : 'rgba(10,21,37,0.60)' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Bottom: industry badges */}
              <div className="flex items-center justify-between mt-auto pt-2"
                   style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,21,37,0.08)'}` }}>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {industryLogos.map(logo => (
                    <span
                      key={logo.id}
                      className="font-mono text-[6px] sm:text-[8px] tracking-widest uppercase px-1.5 py-0.5"
                      style={{
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(10,21,37,0.10)'}`,
                        color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(10,21,37,0.35)',
                      }}
                    >
                      {logo.label}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-[6px] sm:text-[8px] tracking-widest uppercase"
                     style={{ color: textGhost }}>
                  Toronto, ON
                </div>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
