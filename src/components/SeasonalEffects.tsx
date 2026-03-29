'use client';

import { useMemo } from 'react';

type Season = 'winter' | 'spring' | 'summer' | 'fall';

function getSeason(): Season {
  const month = new Date().getMonth(); // 0-11
  if (month === 11 || month === 0 || month === 1) return 'winter';
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  return 'fall';
}

const PARTICLE_COUNT = 25;

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  drift: number;
  rotation: number;
  variant: number; // 0 or 1 for color variation
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 6 + Math.random() * 9,
    size: 2 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.2,
    drift: -30 + Math.random() * 60,
    rotation: Math.random() * 360,
    variant: Math.random() > 0.5 ? 1 : 0,
  }));
}

/** Inline SVG petal for spring cherry blossoms */
function PetalShape({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="6" cy="6" rx="4" ry="6" fill="#FFB7C5" />
      <ellipse cx="6" cy="6" rx="2" ry="4" fill="#FFC8D6" opacity="0.6" />
    </svg>
  );
}

/** Inline SVG leaf for fall */
function LeafShape({ size, opacity, variant }: { size: number; opacity: number; variant: number }) {
  const color = variant === 0 ? '#D2691E' : '#8B4513';
  const highlight = variant === 0 ? '#E8833A' : '#A0632B';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 1 C3 3, 1 7, 7 13 C13 7, 11 3, 7 1Z"
        fill={color}
      />
      <path
        d="M7 3 L7 11"
        stroke={highlight}
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
  );
}

export default function SeasonalEffects() {
  const season = useMemo(() => getSeason(), []);
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  // Determine the CSS animation class and particle rendering per season
  const renderParticle = (p: Particle) => {
    const baseStyle: React.CSSProperties = {
      left: `${p.left}%`,
      top: '-20px',
      animationDelay: `${p.delay}s`,
      animationDuration: `${p.duration}s`,
      // @ts-expect-error CSS custom properties
      '--drift': `${p.drift}px`,
      '--rotation': `${p.rotation}deg`,
    };

    switch (season) {
      case 'winter':
        return (
          <div
            key={p.id}
            className="absolute rounded-full bg-white seasonal-snow"
            style={{
              ...baseStyle,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
            }}
          />
        );

      case 'spring': {
        const petalSize = p.size * 2.5;
        return (
          <div
            key={p.id}
            className="absolute seasonal-blossom"
            style={{
              ...baseStyle,
              width: `${petalSize}px`,
              height: `${petalSize}px`,
            }}
          >
            <PetalShape size={petalSize} opacity={p.opacity} />
          </div>
        );
      }

      case 'summer':
        return (
          <div
            key={p.id}
            className="absolute rounded-full seasonal-firefly"
            style={{
              ...baseStyle,
              width: `${Math.max(2, p.size * 0.6)}px`,
              height: `${Math.max(2, p.size * 0.6)}px`,
              backgroundColor: '#FFD700',
              opacity: p.opacity,
              boxShadow: '0 0 4px 1px rgba(255, 215, 0, 0.4)',
            }}
          />
        );

      case 'fall': {
        const leafSize = p.size * 2.8;
        return (
          <div
            key={p.id}
            className="absolute seasonal-leaf"
            style={{
              ...baseStyle,
              width: `${leafSize}px`,
              height: `${leafSize}px`,
            }}
          >
            <LeafShape size={leafSize} opacity={p.opacity} variant={p.variant} />
          </div>
        );
      }
    }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden seasonal-container"
      aria-hidden="true"
    >
      {particles.map(renderParticle)}
    </div>
  );
}
