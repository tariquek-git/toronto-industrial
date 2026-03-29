'use client';

import { useEffect, useRef, useState } from 'react';

const SESSION_KEY = 'wordmark-animated';

export default function AnimatedWordmark() {
  const [showFill, setShowFill] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(true);
  const textRef = useRef<SVGTextElement>(null);
  const [pathLength, setPathLength] = useState(300);

  useEffect(() => {
    // Measure actual text path length for accurate stroke animation
    if (textRef.current) {
      const len = textRef.current.getComputedTextLength();
      setPathLength(len > 0 ? len * 2 : 300);
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || sessionStorage.getItem(SESSION_KEY)) {
      setSkipAnimation(true);
      setShowFill(true);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, '1');
    setSkipAnimation(false);

    // After stroke draws in (1.2s), fade in the fill
    const fillTimer = setTimeout(() => setShowFill(true), 1200);

    return () => clearTimeout(fillTimer);
  }, []);

  return (
    <a
      href="/"
      className="block hover:opacity-80 transition-opacity"
      aria-label="TARIQUE — home"
    >
      <svg
        viewBox="0 0 160 36"
        className="h-7 md:h-8"
        style={{ width: 'auto' }}
        role="img"
        aria-label="TARIQUE"
      >
        {!skipAnimation && (
          <style>{`
            @keyframes wm-stroke-draw {
              from { stroke-dashoffset: ${pathLength}; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        )}
        <text
          ref={textRef}
          x="2"
          y="29"
          style={{
            fontFamily: '"Bebas Neue", var(--font-display), sans-serif',
            fontSize: '32px',
            fontWeight: 400,
            letterSpacing: '0.12em',
            fill: skipAnimation || showFill ? 'var(--primary)' : 'none',
            fillOpacity: skipAnimation ? 1 : showFill ? 1 : 0,
            transition: showFill ? 'fill-opacity 0.4s ease-out' : 'none',
            stroke: 'var(--primary)',
            strokeWidth: skipAnimation ? 0 : 0.8,
            ...(skipAnimation
              ? {}
              : {
                  strokeDasharray: pathLength,
                  strokeDashoffset: pathLength,
                  animation: 'wm-stroke-draw 1.2s ease-out forwards',
                }),
          }}
        >
          TARIQUE
        </text>
      </svg>
    </a>
  );
}
