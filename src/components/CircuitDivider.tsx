'use client';

export default function CircuitDivider() {
  return (
    <div className="circuit-divider max-w-4xl mx-auto px-6">
      <svg viewBox="0 0 800 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* Main horizontal trace */}
        <line x1="0" y1="20" x2="300" y2="20" className="circuit-trace" />
        <line x1="310" y1="20" x2="330" y2="10" className="circuit-trace" />
        <line x1="330" y1="10" x2="470" y2="10" className="circuit-trace" />
        <line x1="470" y1="10" x2="490" y2="20" className="circuit-trace" />
        <line x1="500" y1="20" x2="800" y2="20" className="circuit-trace" />

        {/* Branch traces */}
        <line x1="380" y1="10" x2="380" y2="30" className="circuit-trace" />
        <line x1="380" y1="30" x2="420" y2="30" className="circuit-trace" />

        {/* Junction nodes */}
        <circle cx="300" cy="20" r="2.5" className="circuit-node" />
        <circle cx="500" cy="20" r="2.5" className="circuit-node" />
        <circle cx="400" cy="10" r="1.5" className="circuit-node" />
        <circle cx="380" cy="30" r="2" className="circuit-node" />
        <circle cx="420" cy="30" r="2" className="circuit-node" />
      </svg>
    </div>
  );
}
