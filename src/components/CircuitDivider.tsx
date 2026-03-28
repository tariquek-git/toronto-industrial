'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CircuitDivider() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="circuit-divider max-w-4xl mx-auto px-6">
      <svg viewBox="0 0 800 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* Main horizontal trace */}
        <path d="M0,20 L300,20" className="circuit-trace circuit-trace-animated" />
        <path d="M310,20 L330,10" className="circuit-trace circuit-trace-animated" />
        <path d="M330,10 L470,10" className="circuit-trace circuit-trace-animated" />
        <path d="M470,10 L490,20" className="circuit-trace circuit-trace-animated" />
        <path d="M500,20 L800,20" className="circuit-trace circuit-trace-animated" />

        {/* Branch traces */}
        <path d="M380,10 L380,30" className="circuit-trace circuit-trace-animated" />
        <path d="M380,30 L420,30" className="circuit-trace circuit-trace-animated" />

        {/* Junction nodes */}
        <circle cx="300" cy="20" r="2.5" className="circuit-node circuit-node-animated" />
        <circle cx="500" cy="20" r="2.5" className="circuit-node circuit-node-animated" />
        <circle cx="400" cy="10" r="1.5" className="circuit-node circuit-node-animated" />
        <circle cx="380" cy="30" r="2" className="circuit-node circuit-node-animated" />
        <circle cx="420" cy="30" r="2" className="circuit-node circuit-node-animated" />
      </svg>
    </div>
  );
}
