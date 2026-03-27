'use client';

import { useTorontoMode } from '@/context/TorontoModeContext';

export default function RaccoonToggle() {
  const { torontoMode, toggle } = useTorontoMode();

  return (
    <button
      onClick={toggle}
      aria-label={torontoMode ? 'Disable Toronto Mode' : 'Enable Toronto Mode'}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl cursor-pointer border border-border-strong hover:scale-110 active:scale-95 transition-transform shadow-lg"
      style={{
        backgroundColor: torontoMode ? '#0E8A45' : '#0A1525',
        boxShadow: torontoMode
          ? '0 4px 20px rgba(14, 138, 69, 0.4)'
          : '0 4px 20px rgba(10, 21, 37, 0.3)',
      }}
    >
      <span role="img" aria-hidden="true" className={torontoMode ? 'animate-bounce' : ''}>
        🦝
      </span>
    </button>
  );
}
