'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import '@/app/card-effects.css';
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

// Toronto skyline watermark on card front — refined, recognizable silhouette
function TorontoFrontSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 280" fill="currentColor" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* CN Tower */}
      <rect x="218" y="30" width="3" height="12" opacity="0.18" />
      <rect x="216" y="42" width="7" height="6" rx="1" opacity="0.16" />
      <rect x="218" y="48" width="3" height="85" opacity="0.18" />
      <ellipse cx="219.5" cy="98" rx="12" ry="5" opacity="0.14" />
      <rect x="209" y="94" width="21" height="14" rx="2" opacity="0.16" />
      <rect x="213" y="108" width="13" height="6" rx="1" opacity="0.12" />
      <polygon points="215,114 224,114 222,200 217,200" opacity="0.12" />

      {/* Rogers Centre dome */}
      <path d="M 180 230 Q 195 210 210 207 Q 225 205 235 215 Q 245 225 248 240 Z" opacity="0.09" />

      {/* First Canadian Place */}
      <rect x="252" y="135" width="18" height="105" opacity="0.10" />
      <polygon points="252,135 261,120 270,135" opacity="0.10" />

      {/* TD Centre pair */}
      <rect x="275" y="165" width="14" height="75" opacity="0.08" />
      <rect x="292" y="175" width="12" height="65" opacity="0.07" />

      {/* Scotia Plaza */}
      <rect x="163" y="155" width="15" height="85" opacity="0.08" />
      <polygon points="163,155 170.5,143 178,155" opacity="0.07" />

      {/* Brookfield Place */}
      <rect x="310" y="185" width="14" height="55" opacity="0.06" />
      <polygon points="310,185 317,172 324,185" opacity="0.05" />

      {/* Royal Bank Plaza */}
      <rect x="140" y="185" width="12" height="55" opacity="0.06" />
      <rect x="130" y="195" width="10" height="45" opacity="0.05" />

      {/* Waterfront condos left */}
      <rect x="95" y="210" width="12" height="30" opacity="0.04" />
      <rect x="110" y="205" width="10" height="35" opacity="0.05" />

      {/* Waterfront condos right */}
      <rect x="330" y="205" width="12" height="35" opacity="0.05" />
      <rect x="345" y="210" width="10" height="30" opacity="0.04" />
      <rect x="360" y="215" width="14" height="25" opacity="0.03" />

      {/* Waterline */}
      <rect x="0" y="240" width="440" height="40" opacity="0.025" />
      <path d="M 0 243 Q 55 239 110 243 Q 165 247 220 243 Q 275 239 330 243 Q 385 247 440 243"
            fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.05" />
    </svg>
  );
}

// Back face — looking out FROM Toronto (lake, islands, horizon)
function TorontoBackSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 280" fill="currentColor" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* Horizon line */}
      <rect x="0" y="220" width="440" height="1" opacity="0.05" />

      {/* Toronto Islands silhouette */}
      <path d="M 60 224 Q 100 218 150 220 Q 190 218 230 222 Q 250 220 270 224" opacity="0.05" />
      <path d="M 290 224 Q 310 220 340 222 Q 360 220 380 224" opacity="0.04" />

      {/* Island trees */}
      <circle cx="120" cy="216" r="2.5" opacity="0.035" />
      <circle cx="135" cy="215" r="2" opacity="0.03" />
      <circle cx="170" cy="217" r="2.5" opacity="0.035" />
      <circle cx="320" cy="218" r="2" opacity="0.03" />

      {/* Billy Bishop airport */}
      <rect x="210" y="214" width="1.5" height="6" opacity="0.04" />
      <rect x="207" y="212" width="7" height="2.5" rx="1" opacity="0.035" />

      {/* Lake waves */}
      <path d="M 0 232 Q 35 229 70 232 Q 105 235 140 232 Q 175 229 210 232 Q 245 235 280 232 Q 315 229 350 232 Q 385 235 420 232 L 440 232"
            fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.035" />
      <path d="M 0 245 Q 40 242 80 245 Q 120 248 160 245 Q 200 242 240 245 Q 280 248 320 245 Q 360 242 400 245 L 440 245"
            fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.025" />

      {/* Distant shore hint */}
      <path d="M 0 218 Q 80 215 160 217 Q 240 215 320 217 Q 400 215 440 218"
            fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.025" />

      {/* Water fill */}
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
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    onFlipChange?.(isFlipped);
  }, [isFlipped, onFlipChange]);

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
      tabIndex={0}
      aria-label="Interactive card — click to flip"
      onClick={handleFlip}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip(); } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient light bleed — connects card to the scene */}
      <div
        className="card-ambient-light"
        style={{
          background: torontoMode
            ? 'radial-gradient(ellipse, rgba(255,189,46,0.15) 0%, rgba(14,138,69,0.08) 40%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(218,41,28,0.12) 0%, rgba(10,21,37,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      <div className="card-particles" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>

      <motion.div
        ref={cardRef}
        className="relative w-[calc(100vw-48px)] max-w-[340px] h-[calc((100vw-48px)*0.631)] max-h-[214px] sm:w-[420px] sm:max-w-none sm:h-[265px] sm:max-h-none lg:w-[480px] lg:h-[303px]"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        animate={{
          rotateY: isFlipped ? 180 + tilt.y : tilt.y,
          rotateX: tilt.x,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Edge glow */}
        <div className={`card-glow ${torontoMode ? 'card-glow-toronto' : 'card-glow-standard'}`} />

        {/* ===== FRONT FACE ===== */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl card-edge-highlight"
          style={{ backfaceVisibility: 'hidden', background: frontGrad }}
        >
          {/* Toronto skyline watermark — looking AT the city */}
          <div className="absolute inset-0 text-white pointer-events-none">
            <TorontoFrontSVG className="absolute bottom-0 left-0 w-full h-full" />
          </div>

          {/* Holographic foil overlay */}
          <div className="holo-overlay absolute inset-0 rounded-2xl pointer-events-none z-10" />

          <div className="relative z-20 p-5 sm:p-6 lg:p-7 h-full flex flex-col justify-between">

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
            <div className="font-mono text-xs sm:text-sm lg:text-base tracking-[0.3em] text-white/40 card-embossed">
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
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-wider text-white/95 leading-none card-embossed">
                  TARIQUE KHAN
                </div>
                <div className="font-mono text-[7px] sm:text-[8px] text-white/40 tracking-[0.12em] mt-1">
                  BD &middot; Fintech &middot; Enterprise Sales &middot; Toronto
                </div>
              </div>
              <div className="text-right min-w-[75px] sm:min-w-[90px]">
                <div className="font-mono text-[6px] sm:text-[7px] text-white/30 uppercase tracking-[0.2em]">
                  VALID THRU
                </div>
                <div className={`font-mono text-base sm:text-lg lg:text-xl text-white/75 tracking-wider leading-none mt-0.5 ${dateClass}`}>
                  {expiry.date}
                </div>
                <div className={`font-mono text-[5px] sm:text-[6px] text-white/25 mt-0.5 tracking-wider leading-tight max-w-[90px] ml-auto ${dateClass}`}>
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
          className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl card-edge-highlight ${backHovered ? 'card-back-hovered' : ''}`}
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
            <div className="mx-4 sm:mx-5 lg:mx-6 mt-2 sm:mt-3 flex-1 flex flex-col min-h-0">

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
                  <div className="font-mono text-xs sm:text-sm text-white/50">416</div>
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

      </motion.div>
    </div>
  );
}
