'use client';

import { useState, useCallback } from 'react';
import { useKonamiCode } from '@/hooks/useKonamiCode';

export default function KonamiHandler() {
  const [toast, setToast] = useState<'entering' | 'exiting' | null>(null);

  const handleKonami = useCallback(() => {
    // Only trigger once per session
    try {
      if (sessionStorage.getItem('konami-unlocked')) return;
      sessionStorage.setItem('konami-unlocked', 'true');
    } catch {
      // sessionStorage unavailable
    }

    setToast('entering');
    setTimeout(() => setToast('exiting'), 3000);
    setTimeout(() => setToast(null), 3300);
  }, []);

  useKonamiCode(handleKonami);

  if (!toast) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 z-50 px-6 py-3 border border-accent/60 font-mono text-xs tracking-widest uppercase ${
        toast === 'entering' ? 'toast-enter' : 'toast-exit'
      }`}
      style={{
        backgroundColor: '#0A1525',
        color: '#FAF8F3',
        transform: 'translateX(-50%)',
      }}
    >
      {'\u{1F99D}'} ACHIEVEMENT UNLOCKED: You found the raccoon code
    </div>
  );
}
