'use client';

import { useScrollDepth } from '@/hooks/useScrollDepth';

export default function ScrollProgress() {
  const depth = useScrollDepth();

  const percentage = Math.round(depth);

  return (
    <div className="fixed top-14 left-0 right-0 z-30 pointer-events-none">
      <div className="relative h-[3px]">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${depth}%`,
            backgroundColor: 'var(--accent)',
            opacity: depth > 0 ? 0.8 : 0,
          }}
        />
      </div>
      {percentage > 0 && (
        <div className="absolute top-1 right-4 font-mono text-[9px] tracking-widest uppercase text-text-tertiary opacity-60">
          // processing: {percentage}%
        </div>
      )}
    </div>
  );
}
