'use client';

import { useState, useEffect, useRef } from 'react';

export function useScrollDepth(): number {
  const [depth, setDepth] = useState(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return; // already scheduled
      rafId.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
        setDepth(pct);
        rafId.current = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return depth;
}
