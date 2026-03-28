'use client';

import { useState } from 'react';
import { useTorontoMode } from '@/context/TorontoModeContext';

export default function Header() {
  const { torontoMode } = useTorontoMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#hero', label: 'Home' },
    { href: '/#timeline', label: 'Timeline' },
    { href: '/#tiers', label: 'Clients' },
    { href: '/signal', label: 'Signal' },
    { href: '/#connect', label: 'Connect' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b border-border bg-bg/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="font-display text-2xl tracking-wider text-primary hover:text-accent transition-colors">
            TARIQUE
          </a>
          <span className="font-mono text-[10px] tracking-widest text-text-tertiary uppercase">
            {torontoMode ? '// toronto.override' : '// payments \u2022 fintech'}
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs tracking-wide text-text-secondary hover:text-primary transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 border-t border-border bg-bg/95 backdrop-blur-md ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm tracking-wide text-text-secondary hover:text-primary transition-colors uppercase py-3 border-b border-border/50 last:border-b-0"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
          <div className="font-mono text-[9px] text-text-tertiary tracking-[0.2em] uppercase mt-3 pt-2">
            {torontoMode ? '// toronto_mode: active' : '// nav.render()'}
          </div>
        </nav>
      </div>
    </header>
  );
}
