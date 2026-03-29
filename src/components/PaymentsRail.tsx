'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Node {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  x: number;
  y: number;
}

const nodes: Node[] = [
  {
    id: 'cardholder',
    label: 'CARDHOLDER',
    sublabel: 'You',
    description: 'The person tapping, swiping, or clicking "pay." They see a seamless 2-second experience. Behind it, 6 parties are moving money.',
    x: 50,
    y: 30,
  },
  {
    id: 'merchant',
    label: 'MERCHANT',
    sublabel: 'Accepts Payment',
    description: 'The business accepting the card. They pay 2-3% of every transaction for the privilege (US rates; Canadian interchange varies by network and is typically lower). This funds the entire ecosystem.',
    x: 200,
    y: 30,
  },
  {
    id: 'acquirer',
    label: 'ACQUIRER',
    sublabel: 'Merchant\'s Bank',
    description: 'The merchant\'s payment processor (Stripe, Adyen, Moneris). They capture the transaction and route it to the card network. They keep ~0.3% of the merchant discount rate.',
    x: 350,
    y: 30,
  },
  {
    id: 'network',
    label: 'NETWORK',
    sublabel: 'Visa / MC',
    description: 'The card network (Visa, Mastercard, Interac) routes the authorization request from acquirer to issuer. They set interchange rates, enforce scheme rules, and keep ~0.4%.',
    x: 350,
    y: 150,
  },
  {
    id: 'issuer',
    label: 'ISSUER',
    sublabel: 'Your Bank',
    description: 'The bank that issued the card. They approve or decline the transaction, bear the credit risk, fund rewards, and keep ~1.8% (interchange). This is where CaaS platforms like Brim operate.',
    x: 200,
    y: 150,
  },
  {
    id: 'settlement',
    label: 'SETTLEMENT',
    sublabel: 'T+1 to T+3',
    description: 'Funds move from issuer → network → acquirer → merchant. Settlement happens 1-3 business days later. Faster than the 501 Queen streetcar.',
    x: 50,
    y: 150,
  },
];

/* Node center coordinates in SVG space (each box is 100x40, center = x+50, y+20) */
const nodeCenters = nodes.map((n) => ({ x: n.x + 50, y: n.y + 20 }));

/* Status messages shown as the dot reaches each node */
const statusMessages = [
  'Authorization request sent...',
  'Merchant received...',
  'Acquirer processing...',
  'Network routing...',
  'Issuer approved...',
  'Settlement complete \u2713',
];

export default function PaymentsRail() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const revealRef = useScrollReveal<HTMLElement>();

  /* Transaction simulator state */
  const [simRunning, setSimRunning] = useState(false);
  const [simStatus, setSimStatus] = useState<string | null>(null);
  const [simHighlight, setSimHighlight] = useState<number | null>(null);
  const [dotPos, setDotPos] = useState<{ x: number; y: number } | null>(null);
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number; opacity: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const runTransaction = useCallback(() => {
    if (simRunning) return;
    setSimRunning(true);
    setSimStatus(statusMessages[0]);
    setSimHighlight(0);

    /* Reduced motion: just cycle through status text with no dot animation */
    if (prefersReducedMotion.current) {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step < nodes.length) {
          setSimStatus(statusMessages[step]);
          setSimHighlight(step);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setSimRunning(false);
            setSimStatus(null);
            setSimHighlight(null);
          }, 1200);
        }
      }, 500);
      return;
    }

    /* Build waypoints: travel from node 0 center to node 1 center, etc. */
    const centers = nodeCenters;
    const segmentDuration = 500; /* ms per segment travel */
    const pauseDuration = 300;   /* ms pause at each node */
    const totalSegments = centers.length - 1;

    let currentSegment = 0;
    let segmentStart = performance.now();
    let pausing = true; /* start with a brief pause on node 0 */
    let pauseStart = performance.now();
    const trail: { x: number; y: number; opacity: number }[] = [];

    setDotPos(centers[0]);

    const tick = (now: number) => {
      if (pausing) {
        if (now - pauseStart >= pauseDuration) {
          pausing = false;
          segmentStart = now;
          if (currentSegment >= totalSegments) {
            /* Animation complete — hold final state briefly then clean up */
            setTimeout(() => {
              setSimRunning(false);
              setSimStatus(null);
              setSimHighlight(null);
              setDotPos(null);
              setTrailPositions([]);
            }, 1200);
            return;
          }
        } else {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
      }

      const elapsed = now - segmentStart;
      const t = Math.min(elapsed / segmentDuration, 1);
      /* ease-in-out */
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const from = centers[currentSegment];
      const to = centers[currentSegment + 1];
      const x = from.x + (to.x - from.x) * eased;
      const y = from.y + (to.y - from.y) * eased;

      setDotPos({ x, y });

      /* Update trail */
      trail.push({ x, y, opacity: 1 });
      /* Keep last ~20 trail points, fade them */
      const maxTrail = 20;
      if (trail.length > maxTrail) trail.splice(0, trail.length - maxTrail);
      const trailCopy = trail.map((p, i) => ({
        ...p,
        opacity: (i + 1) / trail.length * 0.5,
      }));
      setTrailPositions(trailCopy);

      if (t >= 1) {
        /* Arrived at next node */
        currentSegment++;
        setSimStatus(statusMessages[currentSegment]);
        setSimHighlight(currentSegment);
        pausing = true;
        pauseStart = now;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [simRunning]);

  /* Clean up on unmount */
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activeInfo = nodes.find((n) => n.id === activeNode);

  return (
    <section ref={revealRef} className="scroll-reveal py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4">
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-primary">
            THE RAIL
          </h2>
          <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
            // payments.flow &mdash; tap a node
          </span>
        </div>
        <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-2xl mb-10">
          Every card transaction passes through 6 parties in under 2 seconds.
          This is the infrastructure I sell into.
        </p>

        {/* Visualizer */}
        <div className="border border-border-strong bg-surface/30 p-4 sm:p-8">
          {/* SVG Rail */}
          <div className="overflow-x-auto md:overflow-visible -mx-4 px-4">
            <div className="min-w-[500px] md:min-w-0">
            <div className="relative w-full" style={{ paddingBottom: '45%' }}>
            <svg
              viewBox="0 0 450 210"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              {/* Connection lines */}
              {/* Cardholder → Merchant */}
              <line x1="100" y1="50" x2="200" y2="50" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4" />
              <polygon points="195,47 200,50 195,53" fill="var(--border-strong)" />

              {/* Merchant → Acquirer */}
              <line x1="250" y1="50" x2="350" y2="50" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4" />
              <polygon points="345,47 350,50 345,53" fill="var(--border-strong)" />

              {/* Acquirer → Network */}
              <line x1="390" y1="70" x2="390" y2="150" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4" />
              <polygon points="387,145 390,150 393,145" fill="var(--border-strong)" />

              {/* Network → Issuer */}
              <line x1="350" y1="170" x2="250" y2="170" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4" />
              <polygon points="255,173 250,170 255,167" fill="var(--border-strong)" />

              {/* Issuer → Settlement */}
              <line x1="200" y1="170" x2="100" y2="170" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4" />
              <polygon points="105,173 100,170 105,167" fill="var(--border-strong)" />

              {/* Settlement → Cardholder (return) */}
              <line x1="70" y1="150" x2="70" y2="70" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
              <polygon points="67,75 70,70 73,75" fill="var(--accent)" opacity="0.4" />

              {/* Node boxes */}
              {nodes.map((node, idx) => {
                const isActive = activeNode === node.id;
                const isBaas = node.id === 'issuer' || node.id === 'network';
                const isSimHighlighted = simHighlight === idx;
                return (
                  <g
                    key={node.id}
                    onClick={() => setActiveNode(isActive ? null : node.id)}
                    className="cursor-pointer"
                    role="button"
                    aria-label={`View ${node.label} details`}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveNode(isActive ? null : node.id); } }}
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width="100"
                      height="40"
                      rx="0"
                      fill={isActive ? 'var(--accent)' : 'var(--surface)'}
                      stroke={isActive ? 'var(--accent)' : isSimHighlighted ? 'var(--accent)' : isBaas ? 'var(--accent)' : 'var(--border-strong)'}
                      strokeWidth={isActive ? '2' : isSimHighlighted ? '2' : '1'}
                      opacity={isActive ? '1' : '0.9'}
                    />
                    {/* Sim highlight glow rect */}
                    {isSimHighlighted && !isActive && (
                      <rect
                        x={node.x - 2}
                        y={node.y - 2}
                        width="104"
                        height="44"
                        rx="0"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1"
                        opacity="0.4"
                        className="sim-node-glow"
                      />
                    )}
                    <text
                      x={node.x + 50}
                      y={node.y + 18}
                      textAnchor="middle"
                      className="font-display"
                      fontSize="10"
                      letterSpacing="0.1em"
                      fill={isActive ? 'white' : 'var(--text-primary)'}
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x + 50}
                      y={node.y + 31}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="7"
                      letterSpacing="0.05em"
                      fill={isActive ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)'}
                    >
                      {node.sublabel}
                    </text>

                    {/* BaaS/CaaS indicator */}
                    {isBaas && !isActive && (
                      <text
                        x={node.x + 50}
                        y={node.y - 5}
                        textAnchor="middle"
                        fontSize="6"
                        letterSpacing="0.15em"
                        fill="var(--accent)"
                      >
                        {node.id === 'issuer' ? 'CaaS' : 'SCHEME'}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Transaction simulator trail */}
              {trailPositions.map((tp, i) => (
                <circle
                  key={`trail-${i}`}
                  cx={tp.x}
                  cy={tp.y}
                  r={3}
                  fill="var(--accent)"
                  opacity={tp.opacity}
                />
              ))}

              {/* Transaction simulator dot */}
              {dotPos && (
                <>
                  {/* Glow */}
                  <circle
                    cx={dotPos.x}
                    cy={dotPos.y}
                    r={12}
                    fill="var(--accent)"
                    opacity={0.2}
                    className="sim-dot-glow"
                  />
                  {/* Core dot */}
                  <circle
                    cx={dotPos.x}
                    cy={dotPos.y}
                    r={4}
                    fill="var(--accent)"
                    className="sim-dot"
                  />
                </>
              )}

              {/* Flow label */}
              <text x="225" y="100" textAnchor="middle" fontSize="7" letterSpacing="0.15em" fill="var(--text-tertiary)" className="font-mono">
                AUTHORIZATION (~2 sec)
              </text>
              <text x="225" y="200" textAnchor="middle" fontSize="7" letterSpacing="0.15em" fill="var(--text-tertiary)" className="font-mono">
                SETTLEMENT (T+1 to T+3)
              </text>
            </svg>
          </div>
            </div>
          </div>

          {/* Transaction simulator controls */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={runTransaction}
              disabled={simRunning}
              className="font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200"
              style={{
                borderColor: simRunning ? 'var(--border-strong)' : 'var(--accent)',
                color: simRunning ? 'var(--text-tertiary)' : 'var(--accent)',
                background: 'var(--surface)',
                cursor: simRunning ? 'not-allowed' : 'pointer',
                opacity: simRunning ? 0.5 : 1,
              }}
              aria-label="Run transaction simulation"
            >
              {simRunning ? '// running...' : '> Run Transaction'}
            </button>
            {simStatus && (
              <span
                className="font-mono text-[10px] sm:text-xs tracking-wider"
                style={{ color: 'var(--accent)' }}
                role="status"
                aria-live="polite"
              >
                {simStatus}
              </span>
            )}
          </div>

          {/* Info panel */}
          <div
            className={`mt-4 border-t border-border-strong pt-4 transition-all duration-300 ${
              activeInfo ? 'opacity-100' : 'opacity-40'
            }`}
          >
            {activeInfo ? (
              <>
                <div className="font-mono text-[9px] sm:text-[10px] text-accent tracking-[0.2em] uppercase mb-2">
                  // {activeInfo.id}.explain()
                </div>
                <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed break-words">
                  {activeInfo.description}
                </p>
              </>
            ) : (
              <div className="font-mono text-[10px] text-text-tertiary tracking-wider">
                // click any node to see how it works
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
