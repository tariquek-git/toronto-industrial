'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface TorontoModeContextType {
  torontoMode: boolean;
  toggle: () => void;
}

const TorontoModeContext = createContext<TorontoModeContextType>({
  torontoMode: false,
  toggle: () => {},
});

const STORAGE_KEY = 'toronto-mode';

export function TorontoModeProvider({ children }: { children: ReactNode }) {
  const [torontoMode, setTorontoMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<'entering' | 'exiting' | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'true') {
        setTorontoMode(true);
      }
    } catch {
      // localStorage unavailable (SSR, private browsing, etc.)
    }
    setHydrated(true);
  }, []);

  // Sync to DOM and localStorage whenever mode changes
  useEffect(() => {
    if (torontoMode) {
      document.documentElement.dataset.toronto = 'true';
    } else {
      delete document.documentElement.dataset.toronto;
    }

    // Only persist after initial hydration to avoid overwriting stored value
    if (hydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, String(torontoMode));
      } catch {
        // localStorage unavailable
      }
    }
  }, [torontoMode, hydrated]);

  const toggle = useCallback(() => {
    setTorontoMode(prev => {
      const next = !prev;
      // Show toast
      setToast('entering');
      setTimeout(() => setToast('exiting'), 2500);
      setTimeout(() => setToast(null), 2800);
      return next;
    });
  }, []);

  // Listen for terminal toggle events
  useEffect(() => {
    const handler = () => toggle();
    window.addEventListener('terminal-toggle-toronto', handler);
    return () => window.removeEventListener('terminal-toggle-toronto', handler);
  }, [toggle]);

  return (
    <TorontoModeContext.Provider value={{ torontoMode, toggle }}>
      {children}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 z-50 px-6 py-3 border border-border-strong font-mono text-xs tracking-widest uppercase ${
            toast === 'entering' ? 'toast-enter' : 'toast-exit'
          }`}
          style={{
            backgroundColor: torontoMode ? '#0E8A45' : '#0A1525',
            color: torontoMode ? '#FFBD2E' : '#FAF8F3',
          }}
        >
          {torontoMode ? '// SYSTEM OVERRIDE: Toronto Mode Engaged' : '// SYSTEM RESET: Raccoons contained. For now.'}
        </div>
      )}
    </TorontoModeContext.Provider>
  );
}

export function useTorontoMode() {
  return useContext(TorontoModeContext);
}
