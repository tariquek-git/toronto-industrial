'use client';

import { useScrollDepth } from '@/hooks/useScrollDepth';

interface TorontoSkylineProps {
  offsetX: number;
  offsetY: number;
}

export default function TorontoSkyline({ offsetX, offsetY }: TorontoSkylineProps) {
  const scrollDepth = useScrollDepth();
  const fillOpacity = 0.04 + (scrollDepth / 100) * 0.21;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <svg
        viewBox="0 0 1600 500"
        fill="currentColor"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] text-primary"
        preserveAspectRatio="xMidYMax meet"
        style={{ opacity: fillOpacity, transition: 'opacity 0.15s ease-out' }}
        aria-hidden="true"
      >
        {/* ============================================
            TORONTO SKYLINE — Looking north from the lake
            ============================================ */}

        {/* CN Tower — the icon, full detail */}
        {/* Antenna mast */}
        <rect x="718" y="12" width="3" height="18" />
        {/* Antenna base */}
        <rect x="715" y="30" width="9" height="10" rx="1" />
        {/* Upper shaft */}
        <rect x="717" y="40" width="5" height="80" />
        {/* SkyPod observation deck */}
        <ellipse cx="719.5" cy="108" rx="12" ry="5" />
        <rect x="709" y="103" width="21" height="12" rx="2" />
        {/* Main pod / restaurant level */}
        <ellipse cx="719.5" cy="140" rx="22" ry="9" />
        <rect x="700" y="132" width="39" height="20" rx="3" />
        <rect x="705" y="152" width="29" height="8" rx="1" />
        {/* Lower shaft tapers */}
        <polygon points="712,160 727,160 724,340 715,340" />
        {/* Support legs at base */}
        <polygon points="715,330 710,370 718,370" opacity="0.8" />
        <polygon points="724,330 729,370 721,370" opacity="0.8" />

        {/* Rogers Centre / SkyDome — retractable dome */}
        <path d="M 640 380 Q 660 340 690 332 Q 720 328 740 340 Q 755 350 760 380 Z" />
        <rect x="640" y="380" width="120" height="15" rx="2" />
        {/* Dome ribs */}
        <path d="M 670 360 Q 700 335 730 360" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M 685 350 Q 700 338 715 350" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />

        {/* First Canadian Place — tallest office tower, white with triangular crown */}
        <rect x="770" y="160" width="30" height="230" />
        <polygon points="770,160 785,135 800,160" />
        {/* Window grid lines */}
        <line x1="780" y1="170" x2="780" y2="390" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="790" y1="170" x2="790" y2="390" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />

        {/* TD Centre — two Mies van der Rohe black towers */}
        <rect x="808" y="210" width="26" height="180" />
        <rect x="838" y="230" width="22" height="160" />
        {/* Horizontal bands */}
        <rect x="808" y="250" width="26" height="1" opacity="0.3" />
        <rect x="808" y="290" width="26" height="1" opacity="0.3" />
        <rect x="808" y="330" width="26" height="1" opacity="0.3" />

        {/* Commerce Court / Scotia Plaza — stepped crown */}
        <rect x="620" y="200" width="24" height="190" />
        <polygon points="620,200 632,180 644,200" />
        <rect x="600" y="230" width="18" height="160" />

        {/* Brookfield Place — angular glass top */}
        <rect x="865" y="240" width="22" height="150" />
        <polygon points="865,240 876,218 887,240" />

        {/* Royal Bank Plaza — the gold towers */}
        <rect x="575" y="250" width="20" height="140" />
        <rect x="555" y="270" width="16" height="120" />

        {/* One King West — slender heritage tower */}
        <rect x="895" y="260" width="14" height="130" />
        <rect x="897" y="252" width="10" height="10" rx="1" />

        {/* Bay Adelaide Centre */}
        <rect x="650" y="220" width="20" height="170" />

        {/* Aura at College Park — tallest residential */}
        <rect x="530" y="190" width="16" height="200" />
        <rect x="533" y="184" width="10" height="8" rx="1" />

        {/* The L Tower — curved glass */}
        <path d="M 920 280 Q 925 260 930 280 L 930 390 L 920 390 Z" />

        {/* ICE Condos — twin towers */}
        <rect x="500" y="270" width="14" height="120" />
        <rect x="518" y="280" width="12" height="110" />

        {/* CityPlace cluster — west waterfront condos */}
        <rect x="440" y="300" width="16" height="90" />
        <rect x="460" y="310" width="14" height="80" />
        <rect x="478" y="295" width="12" height="95" />
        <rect x="420" y="320" width="14" height="70" />

        {/* East Bayfront / Canary District */}
        <rect x="950" y="310" width="18" height="80" />
        <rect x="972" y="320" width="16" height="70" />
        <rect x="992" y="330" width="20" height="60" />
        <rect x="1016" y="340" width="14" height="50" />

        {/* Far west — Liberty Village / Parkdale */}
        <rect x="300" y="350" width="25" height="40" />
        <rect x="330" y="340" width="20" height="50" />
        <rect x="355" y="345" width="28" height="45" />
        <rect x="388" y="335" width="22" height="55" />

        {/* Far east — Leslieville / Riverside */}
        <rect x="1040" y="350" width="22" height="40" />
        <rect x="1068" y="355" width="18" height="35" />
        <rect x="1092" y="360" width="25" height="30" />

        {/* Harbourfront / Queens Quay — low waterfront buildings */}
        <rect x="580" y="375" width="340" height="15" rx="1" opacity="0.5" />

        {/* Toronto Islands — faint in the foreground (viewer is from lake) */}
        <path d="M 200 420 Q 350 408 500 415 Q 600 410 700 418 Q 800 412 900 416 Q 1000 410 1100 418 Q 1250 412 1400 420"
              fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />

        {/* Lake Ontario water surface */}
        <rect x="0" y="420" width="1600" height="80" opacity="0.08" />
        {/* Gentle wave lines */}
        <path d="M 0 430 Q 80 426 160 430 Q 240 434 320 430 Q 400 426 480 430 Q 560 434 640 430 Q 720 426 800 430 Q 880 434 960 430 Q 1040 426 1120 430 Q 1200 434 1280 430 Q 1360 426 1440 430 Q 1520 434 1600 430"
              fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.06" />
        <path d="M 0 445 Q 100 441 200 445 Q 300 449 400 445 Q 500 441 600 445 Q 700 449 800 445 Q 900 441 1000 445 Q 1100 449 1200 445 Q 1300 441 1400 445 Q 1500 449 1600 445"
              fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.04" />

        {/* Ground / shoreline fill */}
        <rect x="0" y="390" width="1600" height="30" opacity="0.15" />

        {/* Reflections on water — vertical streaks */}
        <rect x="717" y="400" width="4" height="40" opacity="0.04" />
        <rect x="783" y="400" width="3" height="35" opacity="0.03" />
        <rect x="820" y="400" width="3" height="30" opacity="0.025" />
        <rect x="630" y="400" width="3" height="25" opacity="0.02" />
      </svg>
    </div>
  );
}
