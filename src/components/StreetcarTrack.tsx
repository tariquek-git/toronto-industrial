'use client';

import { useScrollDepth } from '@/hooks/useScrollDepth';

export default function StreetcarTrack() {
  const scrollDepth = useScrollDepth();

  return (
    <div className="relative w-full h-16 overflow-hidden">
      {/* Track line */}
      <div className="absolute bottom-4 left-0 right-0 h-px bg-border-strong" />
      <div className="absolute bottom-3.5 left-0 right-0 h-px bg-border opacity-50" />

      {/* Track ties */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="w-px h-2 bg-border-strong" />
        ))}
      </div>

      {/* Streetcar */}
      <div
        className="absolute bottom-2 transition-none"
        style={{
          left: `${scrollDepth}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <svg width="80" height="36" viewBox="0 0 80 36" fill="none" className="text-primary">
          {/* Body */}
          <rect x="5" y="8" width="70" height="20" rx="4" fill="currentColor" opacity="0.85" />

          {/* Roof */}
          <rect x="10" y="4" width="60" height="6" rx="3" fill="currentColor" opacity="0.6" />

          {/* Pantograph */}
          <line x1="40" y1="4" x2="40" y2="0" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <line x1="35" y1="0" x2="45" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.5" />

          {/* Windows */}
          <rect x="12" y="12" width="8" height="8" rx="1" fill="var(--bg)" opacity="0.7" />
          <rect x="23" y="12" width="8" height="8" rx="1" fill="var(--bg)" opacity="0.7" />
          <rect x="34" y="12" width="8" height="8" rx="1" fill="var(--bg)" opacity="0.7" />
          <rect x="45" y="12" width="8" height="8" rx="1" fill="var(--bg)" opacity="0.7" />
          <rect x="56" y="12" width="8" height="8" rx="1" fill="var(--bg)" opacity="0.7" />

          {/* Wheels */}
          <circle cx="18" cy="30" r="3" fill="currentColor" opacity="0.7" />
          <circle cx="62" cy="30" r="3" fill="currentColor" opacity="0.7" />

          {/* 504 Route number */}
          <text x="40" y="26" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="var(--bg)" opacity="0.8">
            504
          </text>
        </svg>
      </div>

      {/* Route label */}
      <div className="absolute bottom-0 right-4 font-mono text-[9px] text-text-tertiary tracking-widest uppercase">
        504 King // scroll: {Math.round(scrollDepth)}%
      </div>
    </div>
  );
}
