'use client';
import { useRef, useState, useCallback, useEffect } from 'react';

interface TiltStyle {
  transform: string;
  boxShadow: string;
  transition: string;
}

const DEFAULT_STYLE: TiltStyle = {
  transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)',
  boxShadow: '0 4px 6px var(--shadow)',
  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
};

export function useTiltHover(maxTilt: number = 2) {
  const ref = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [style, setStyle] = useState<TiltStyle>(DEFAULT_STYLE);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) translateY(-4px)`,
      boxShadow: `0 12px 24px var(--shadow), 0 0 0 1px var(--border)`,
      transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
    });
  }, [maxTilt, reducedMotion]);

  const handleLeave = useCallback(() => {
    if (reducedMotion) return;
    setStyle(DEFAULT_STYLE);
  }, [reducedMotion]);

  return { ref, style, handleMove, handleLeave };
}
