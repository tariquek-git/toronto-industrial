'use client';

import { useEffect, useRef, useState } from 'react';

// Bold, industrial/monospace-style path data for "TARIQUE"
// Each letter designed on a grid roughly 24 units wide, 32 units tall
const LETTER_PATHS: Record<string, { d: string; width: number }> = {
  T: {
    d: 'M0,4 L24,4 M12,4 L12,32',
    width: 24,
  },
  A: {
    d: 'M0,32 L10,4 L20,4 L20,32 M0,20 L20,20',
    width: 20,
  },
  R: {
    d: 'M0,4 L0,32 M0,4 L16,4 L20,8 L20,16 L16,20 L0,20 M12,20 L20,32',
    width: 20,
  },
  I: {
    d: 'M0,4 L12,4 M6,4 L6,32 M0,32 L12,32',
    width: 12,
  },
  Q: {
    d: 'M4,4 L18,4 L22,8 L22,28 L18,32 L4,32 L0,28 L0,8 L4,4 M14,24 L22,32',
    width: 22,
  },
  U: {
    d: 'M0,4 L0,28 L4,32 L16,32 L20,28 L20,4',
    width: 20,
  },
  E: {
    d: 'M18,4 L0,4 L0,32 L18,32 M0,18 L14,18',
    width: 18,
  },
};

const LETTER_GAP = 8;

function buildFullPath(): { paths: { d: string; transform: string }[]; totalWidth: number } {
  const word = 'TARIQUE';
  const paths: { d: string; transform: string }[] = [];
  let x = 0;

  for (const char of word) {
    const letter = LETTER_PATHS[char];
    if (letter) {
      paths.push({ d: letter.d, transform: `translate(${x}, 0)` });
      x += letter.width + LETTER_GAP;
    }
  }

  return { paths, totalWidth: x - LETTER_GAP };
}

const { paths, totalWidth } = buildFullPath();
const VIEW_HEIGHT = 36;
const SESSION_KEY = 'wordmark-animated';

export default function AnimatedWordmark() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [showFill, setShowFill] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || sessionStorage.getItem(SESSION_KEY)) {
      setSkipAnimation(true);
      setShowFill(true);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, '1');
    setSkipAnimation(false);

    // After stroke draws in (1.5s), fade in the fill
    const fillTimer = setTimeout(() => setShowFill(true), 1500);

    return () => clearTimeout(fillTimer);
  }, []);

  return (
    <a
      href="/"
      className="block hover:opacity-80 transition-opacity"
      aria-label="TARIQUE — home"
    >
      <svg
        ref={svgRef}
        viewBox={`-2 0 ${totalWidth + 4} ${VIEW_HEIGHT}`}
        className="h-7 md:h-8"
        style={{ width: 'auto' }}
        role="img"
        aria-label="TARIQUE"
      >
        {!skipAnimation && (
          <style>{`
            @keyframes wm-draw {
              from { stroke-dashoffset: 200; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        )}
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            transform={p.transform}
            stroke="var(--primary)"
            strokeWidth={3}
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill={showFill ? 'var(--primary)' : 'none'}
            style={
              skipAnimation
                ? { fillOpacity: 1 }
                : {
                    strokeDasharray: 200,
                    strokeDashoffset: 200,
                    animation: 'wm-draw 1.5s ease-out forwards',
                    fillOpacity: showFill ? 1 : 0,
                    transition: 'fill-opacity 0.5s ease-out',
                  }
            }
          />
        ))}
      </svg>
    </a>
  );
}
