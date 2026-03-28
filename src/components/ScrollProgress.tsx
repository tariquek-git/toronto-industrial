'use client';

import { useScrollDepth } from '@/hooks/useScrollDepth';

export default function ScrollProgress() {
  const depth = useScrollDepth();

  return (
    <div className="fixed top-14 left-0 right-0 z-30 h-[3px] pointer-events-none">
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${depth}%`,
          backgroundColor: 'var(--accent)',
          opacity: depth > 0 ? 0.8 : 0,
        }}
      />
    </div>
  );
}
