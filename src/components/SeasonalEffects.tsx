'use client';

import { useTorontoMode } from '@/context/TorontoModeContext';
import { useMemo } from 'react';

/**
 * Seasonal effects overlay — snow particles in winter months,
 * subtle leaf/pollen in other seasons. Only active in Toronto Mode.
 */
export default function SeasonalEffects() {
  const { torontoMode } = useTorontoMode();

  const month = new Date().getMonth(); // 0-11
  const isWinter = month === 11 || month === 0 || month === 1 || month === 2; // Dec-Mar
  // const isAutumn = month >= 9 && month <= 10; // Oct-Nov

  // Generate random snowflake positions (stable across renders)
  const particles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.5,
      drift: -20 + Math.random() * 40,
    }));
  }, []);

  if (!torontoMode || !isWinter) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white snow-particle"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // @ts-expect-error CSS custom property
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
