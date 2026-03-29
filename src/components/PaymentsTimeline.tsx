'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { paymentsHistory } from '@/data/payments-history';

export default function PaymentsTimeline() {
  const revealRef = useScrollReveal<HTMLElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 300;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section ref={revealRef} className="scroll-reveal py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4">
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-primary">
            THE TIMELINE
          </h2>
          <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
            // payments.history &mdash; 1950&ndash;2024
          </span>
        </div>
        <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-2xl mb-10">
          74 years of infrastructure decisions that built the modern payments stack.
          Scroll to trace the lineage.
        </p>

        {/* Timeline container */}
        <div className="relative">
          {/* Desktop scroll arrows */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll timeline left"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 items-center justify-center border font-mono text-xs transition-all duration-200"
            style={{
              borderColor: canScrollLeft ? 'var(--border-strong)' : 'var(--border)',
              color: canScrollLeft ? 'var(--text-primary)' : 'var(--text-tertiary)',
              backgroundColor: 'var(--surface)',
              opacity: canScrollLeft ? 1 : 0.3,
              cursor: canScrollLeft ? 'pointer' : 'default',
            }}
            disabled={!canScrollLeft}
          >
            &larr;
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll timeline right"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 items-center justify-center border font-mono text-xs transition-all duration-200"
            style={{
              borderColor: canScrollRight ? 'var(--border-strong)' : 'var(--border)',
              color: canScrollRight ? 'var(--text-primary)' : 'var(--text-tertiary)',
              backgroundColor: 'var(--surface)',
              opacity: canScrollRight ? 1 : 0.3,
              cursor: canScrollRight ? 'pointer' : 'default',
            }}
            disabled={!canScrollRight}
          >
            &rarr;
          </button>

          {/* Scroll area */}
          <div
            ref={scrollRef}
            className="overflow-x-auto timeline-scroll"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Hide scrollbar for Webkit */}
            <style>{`
              .timeline-scroll::-webkit-scrollbar { display: none; }
            `}</style>
            <div
              className="flex gap-0 relative"
              style={{ width: `${paymentsHistory.length * 280}px`, paddingBottom: '8px' }}
            >
              {/* Horizontal rail line */}
              <div
                className="absolute left-4 right-4"
                style={{
                  top: '38px',
                  height: '1px',
                  backgroundColor: 'var(--accent)',
                  opacity: 0.5,
                }}
              />

              {/* Cards */}
              {paymentsHistory.map((entry, i) => (
                <div
                  key={entry.year}
                  className="flex-shrink-0"
                  style={{
                    width: '280px',
                    scrollSnapAlign: 'start',
                    paddingLeft: i === 0 ? '0' : '0',
                  }}
                >
                  {/* Node dot */}
                  <div className="flex items-center mb-6" style={{ height: '20px' }}>
                    <div className="relative mx-auto" style={{ width: '240px' }}>
                      <div
                        className="absolute left-0"
                        style={{
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          border: '2px solid var(--accent)',
                          backgroundColor: i === 0 || i === paymentsHistory.length - 1
                            ? 'var(--accent)'
                            : 'var(--surface)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Card content */}
                  <div
                    className="mx-2 p-4 transition-colors duration-200"
                    style={{
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-strong)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    {/* Year */}
                    <div
                      className="font-display text-2xl tracking-wider mb-1"
                      style={{ color: 'var(--accent)' }}
                    >
                      {entry.year}
                    </div>

                    {/* Title */}
                    <div
                      className="font-display text-sm tracking-wider uppercase mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {entry.title}
                    </div>

                    {/* Description */}
                    <p
                      className="font-mono text-[11px] leading-relaxed mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {entry.description}
                    </p>

                    {/* Aside / witty comment */}
                    {entry.aside && (
                      <p
                        className="font-mono text-[10px] leading-relaxed italic"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        // {entry.aside}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fade edges — wider on mobile for stronger scroll affordance */}
          <div
            className="absolute top-0 left-0 bottom-0 w-6 md:w-6 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, var(--bg), transparent)',
              opacity: canScrollLeft ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-10 md:w-6 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, var(--bg), transparent)',
              opacity: canScrollRight ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          />
          {/* Mobile scroll hint */}
          {canScrollRight && (
            <div className="md:hidden flex items-center justify-center mt-3 gap-1">
              <span className="font-mono text-[10px] text-text-tertiary tracking-wider">swipe</span>
              <span className="font-mono text-[10px] text-text-tertiary">&rarr;</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
