'use client';

import { useTorontoMode } from '@/context/TorontoModeContext';

export default function Header() {
  const { torontoMode } = useTorontoMode();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b border-border bg-bg/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wider text-primary">
            TARIQUE
          </span>
          <span className="font-mono text-[10px] tracking-widest text-text-tertiary uppercase">
            {torontoMode ? '// toronto.override' : '// payments \u2022 fintech'}
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-6">
          <a href="#hero" className="font-mono text-xs tracking-wide text-text-secondary hover:text-primary transition-colors uppercase">
            Home
          </a>
          <a href="#timeline" className="font-mono text-xs tracking-wide text-text-secondary hover:text-primary transition-colors uppercase">
            Timeline
          </a>
          <a href="#tiers" className="font-mono text-xs tracking-wide text-text-secondary hover:text-primary transition-colors uppercase">
            Clients
          </a>
          <a href="#connect" className="font-mono text-xs tracking-wide text-text-secondary hover:text-primary transition-colors uppercase">
            Connect
          </a>
        </nav>
      </div>
    </header>
  );
}
