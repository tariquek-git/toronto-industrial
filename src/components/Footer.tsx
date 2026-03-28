'use client';

import StreetcarTrack from './StreetcarTrack';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      {/* Streetcar Track */}
      <StreetcarTrack />

      {/* Footer content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="font-display text-2xl tracking-wider text-primary">
              TARIQUE
            </div>
            <div className="font-mono text-[10px] tracking-[0.15em] text-text-tertiary uppercase mt-1">
              Business Development // Brim Financial
            </div>
          </div>

          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/tariquekhan1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-secondary hover:text-accent transition-colors uppercase tracking-wide"
            >
              LinkedIn
            </a>
            <a
              href="mailto:tarique@brimfinancial.com"
              className="font-mono text-xs text-text-secondary hover:text-accent transition-colors uppercase tracking-wide"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="font-mono text-[10px] text-text-tertiary tracking-widest uppercase">
            Built with raccoon logic // Toronto, {new Date().getFullYear()} // hand-assembled in Toronto
          </div>
          <div className="font-mono text-[10px] text-text-tertiary tracking-widest">
            v1.0.0 // PCI DSS: pending self-assessment // <span className="hidden sm:inline">try &#x2318;K</span><span className="sm:hidden">try ctrl+K</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
