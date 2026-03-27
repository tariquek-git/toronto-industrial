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

export function TorontoModeProvider({ children }: { children: ReactNode }) {
  const [torontoMode, setTorontoMode] = useState(false);
  const [toast, setToast] = useState<'entering' | 'exiting' | null>(null);

  useEffect(() => {
    if (torontoMode) {
      document.documentElement.dataset.toronto = 'true';
    } else {
      delete document.documentElement.dataset.toronto;
    }
  }, [torontoMode]);

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
          {torontoMode ? '// SYSTEM OVERRIDE: Toronto Mode Engaged' : '// SYSTEM RESET: Standard Mode'}
        </div>
      )}
    </TorontoModeContext.Provider>
  );
}

export function useTorontoMode() {
  return useContext(TorontoModeContext);
}
