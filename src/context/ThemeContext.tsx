'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  resolvedDark: boolean; // true if actually displaying dark (auto resolves based on system)
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'auto',
  resolvedDark: false,
  cycleTheme: () => {},
});

const STORAGE_KEY = 'theme-preference';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('auto');
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark' || stored === 'auto') {
        setTheme(stored);
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Sync to DOM
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    if (hydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {}
    }
  }, [theme, hydrated]);

  // Resolve whether we're actually in dark mode
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolvedDark = theme === 'dark' || (theme === 'auto' && systemDark);

  // Cycle: auto → dark → light → auto
  const cycleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'auto') return 'dark';
      if (prev === 'dark') return 'light';
      return 'auto';
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedDark, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
