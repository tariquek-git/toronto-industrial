'use client';

import { useTorontoMode } from '@/context/TorontoModeContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { connectPaths, contact } from '@/data/content';

const torontoColors = ['#FFBD2E', '#0E8A45', '#C8956B'];

export default function ConnectSection() {
  const ref = useScrollReveal<HTMLElement>();
  const { torontoMode } = useTorontoMode();

  return (
    <section ref={ref} id="connect" className="scroll-reveal max-w-4xl mx-auto px-6 py-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-12">
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-primary">
          LET&apos;S TALK
        </h2>
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
          // connection.request — pick your path
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {connectPaths.map((path, index) => {
          const color = torontoMode ? torontoColors[index] : path.color;
          return (
          <div
            key={path.id}
            className="border border-border-strong p-6 bg-surface/30 hover:bg-surface/60 transition-all duration-300 group"
          >
            <span
              className="font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1 border rounded inline-block mb-4"
              style={{ borderColor: color, color }}
            >
              {path.audience}
            </span>

            <h3 className="font-display text-xl tracking-wider text-primary mb-3">
              {path.hook.toUpperCase()}
            </h3>

            <p className="font-mono text-xs text-text-secondary leading-relaxed">
              {path.detail}
            </p>

            <a
              href={`mailto:${contact.email}?subject=Re: ${path.audience}`}
              className="inline-block mt-4 font-mono text-[10px] tracking-widest uppercase text-accent hover:text-accent-hover transition-colors"
            >
              Start conversation &rarr;
            </a>
          </div>
          );
        })}
      </div>

      {/* Direct contact */}
      <div className="border-t border-border-strong pt-8">
        <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-4">
          // direct.channels
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <a
            href={`mailto:${contact.email}`}
            className="font-mono text-sm text-text-secondary hover:text-accent transition-colors group"
          >
            <span className="text-text-tertiary text-[10px] uppercase tracking-wider block mb-0.5">Email</span>
            {contact.email}
          </a>
          <a
            href={`https://${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-text-secondary hover:text-accent transition-colors group"
          >
            <span className="text-text-tertiary text-[10px] uppercase tracking-wider block mb-0.5">LinkedIn</span>
            {contact.linkedin}
          </a>
          <a
            href="/tarique-khan-resume.pdf"
            download
            className="font-mono text-sm text-text-secondary hover:text-accent transition-colors group"
          >
            <span className="text-text-tertiary text-[10px] uppercase tracking-wider block mb-0.5">Resume</span>
            &darr; Download Resume (PDF)
          </a>
          <div className="font-mono text-sm text-text-secondary">
            <span className="text-text-tertiary text-[10px] uppercase tracking-wider block mb-0.5">Based</span>
            {contact.location}
          </div>
        </div>
      </div>
    </section>
  );
}
