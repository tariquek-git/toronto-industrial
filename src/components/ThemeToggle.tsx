'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, resolvedDark, cycleTheme } = useTheme();

  const label = theme === 'auto' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light';
  const icon = resolvedDark ? '◐' : '○';

  return (
    <button
      onClick={cycleTheme}
      title={`Theme: ${label} (click to cycle)`}
      aria-label={`Current theme: ${label}. Click to change.`}
      className="fixed bottom-6 right-24 z-40 w-10 h-10 rounded-full flex items-center justify-center text-sm cursor-pointer border border-border-strong hover:scale-110 active:scale-95 transition-all font-mono bg-surface text-text-secondary hover:text-text-primary"
    >
      {icon}
    </button>
  );
}
