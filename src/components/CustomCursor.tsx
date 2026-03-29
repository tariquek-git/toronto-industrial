'use client';
import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'clickable' | 'hero' | 'text-input';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const rafId = useRef(0);

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Don't render if reduced motion preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMove = (e: MouseEvent) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);

        const target = e.target as Element | null;
        if (!target) {
          setCursorState('default');
          rafId.current = 0;
          return;
        }

        // Check text inputs first
        if (target.closest('input, textarea')) {
          setCursorState('text-input');
        }
        // Check clickable elements
        else if (target.closest('a, button, [role="button"]')) {
          setCursorState('clickable');
        }
        // Check hero card
        else if (target.closest('[data-hero-card]')) {
          setCursorState('hero');
        }
        // Default
        else {
          setCursorState('default');
        }

        rafId.current = 0;
      });
    };

    const handleLeave = () => setVisible(false);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Check media queries on mount to decide whether to render at all
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldRender(isFinePointer && !prefersReducedMotion);
  }, []);

  if (!shouldRender) return null;

  const isDefault = cursorState === 'default';
  const isClickable = cursorState === 'clickable';
  const isHero = cursorState === 'hero';
  const isTextInput = cursorState === 'text-input';

  const size = isClickable ? 32 : 24;
  const halfSize = size / 2;
  const strokeWidth = isClickable ? 2 : 1.5;
  const gap = isClickable ? 4 : 3;
  const lineLen = isClickable ? 10 : 6;

  const opacity = isTextInput ? 0 : isClickable ? 0.7 : 0.4;
  const rotation = isHero ? 45 : 0;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 9998,
        transform: `translate(${pos.x - halfSize}px, ${pos.y - halfSize}px) rotate(${rotation}deg)`,
        transition: 'transform 50ms ease-out, opacity 150ms ease',
        opacity: visible ? opacity : 0,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: 'width 150ms ease, height 150ms ease',
        }}
      >
        {/* Top line */}
        <line
          x1={halfSize}
          y1={halfSize - gap - lineLen}
          x2={halfSize}
          y2={halfSize - gap}
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Bottom line */}
        <line
          x1={halfSize}
          y1={halfSize + gap}
          x2={halfSize}
          y2={halfSize + gap + lineLen}
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Left line */}
        <line
          x1={halfSize - gap - lineLen}
          y1={halfSize}
          x2={halfSize - gap}
          y2={halfSize}
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Right line */}
        <line
          x1={halfSize + gap}
          y1={halfSize}
          x2={halfSize + gap + lineLen}
          y2={halfSize}
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Center dot (clickable state only) */}
        {isClickable && (
          <circle
            cx={halfSize}
            cy={halfSize}
            r={2}
            fill="var(--accent)"
          />
        )}
      </svg>
    </div>
  );
}
