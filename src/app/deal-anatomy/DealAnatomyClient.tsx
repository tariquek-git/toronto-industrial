'use client';

import { useState } from 'react';
import Link from 'next/link';
import { dealStages, getSurvivalRate } from '@/data/deal-anatomy';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function StageCard({
  stage,
  isExpanded,
  onToggle,
  index,
}: {
  stage: (typeof dealStages)[number];
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const surviving = getSurvivalRate(index + 1);
  const survivingBefore = getSurvivalRate(index);

  return (
    <div ref={ref} className="scroll-reveal relative">
      {/* Timeline connector */}
      {index < dealStages.length - 1 && (
        <div className="absolute left-6 top-full w-px h-6 bg-border-strong" />
      )}

      <button
        onClick={onToggle}
        className="w-full text-left group"
        aria-expanded={isExpanded}
      >
        <div
          className={`border transition-all duration-300 p-6 ${
            isExpanded
              ? 'border-accent/60 bg-surface/50'
              : 'border-border-strong hover:border-accent/30'
          }`}
        >
          {/* Stage header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Stage number + duration */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border border-accent/40 text-accent">
                  Stage {String(stage.id).padStart(2, '0')}
                </span>
                <span className="font-mono text-[9px] text-text-tertiary tracking-wider">
                  {stage.duration}
                </span>
                <span className="font-mono text-[9px] text-red-400/80 tracking-wider">
                  {stage.killRate}
                </span>
              </div>

              {/* Name */}
              <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-primary group-hover:text-accent transition-colors">
                {stage.name.toUpperCase()}
              </h2>

              {/* Mini description when collapsed */}
              {!isExpanded && (
                <p className="font-mono text-sm text-text-secondary leading-relaxed mt-2 line-clamp-2">
                  {stage.description}
                </p>
              )}
            </div>

            {/* Survival indicator */}
            <div className="shrink-0 text-right">
              <div className="font-mono text-[9px] text-text-tertiary tracking-wider uppercase mb-1">
                Surviving
              </div>
              <div className="font-display text-2xl text-primary">
                {surviving}
              </div>
              <div className="font-mono text-[9px] text-text-tertiary">
                of 100
              </div>
            </div>
          </div>

          {/* Expanded content */}
          {isExpanded && (
            <div className="mt-6 space-y-6">
              {/* Description */}
              <div>
                <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-3">
                  // deal.lifecycle()[{index}] &mdash; {stage.name.toLowerCase()}
                </div>
                <p className="font-mono text-sm sm:text-base text-text-primary leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Insight */}
              <div className="border-l-2 border-accent/40 pl-4">
                <div className="font-mono text-[9px] text-accent tracking-[0.2em] uppercase mb-2">
                  // what actually happens
                </div>
                <p className="font-mono text-sm text-text-secondary leading-relaxed">
                  {stage.insight}
                </p>
              </div>

              {/* Kill rate detail */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1 bg-border-strong overflow-hidden">
                  <div
                    className="h-full bg-red-400/60 transition-all duration-700"
                    style={{ width: `${stage.killPercent}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-red-400/80 shrink-0">
                  {survivingBefore - surviving} deals lost
                </span>
              </div>

              {/* Tips */}
              <div>
                <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-3">
                  // field notes
                </div>
                <ul className="space-y-2">
                  {stage.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-mono text-[10px] text-accent shrink-0 mt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs text-text-secondary leading-relaxed">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

function PipelineFunnel() {
  const ref = useScrollReveal<HTMLDivElement>();
  const stages = dealStages.map((stage, i) => ({
    name: stage.name,
    surviving: getSurvivalRate(i + 1),
    before: getSurvivalRate(i),
  }));

  return (
    <div ref={ref} className="scroll-reveal mb-16">
      <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-4">
        // pipeline.funnel() &mdash; 100 deals in, {stages[stages.length - 1].surviving} survive
      </div>
      <div className="border border-border-strong p-6 bg-surface/30">
        {/* Start label */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-text-tertiary tracking-wider">
            100 deals enter
          </span>
          <span className="font-mono text-[10px] text-text-tertiary tracking-wider">
            {stages[stages.length - 1].surviving} survive
          </span>
        </div>

        {/* Funnel bars */}
        <div className="space-y-1.5">
          {stages.map((stage, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-text-tertiary w-28 shrink-0 text-right tracking-wider">
                {stage.name}
              </span>
              <div className="flex-1 h-6 bg-border/30 relative overflow-hidden">
                <div
                  className="h-full bg-accent/20 border-r border-accent/40 transition-all duration-700 flex items-center"
                  style={{ width: `${stage.surviving}%` }}
                >
                  <span className="font-mono text-[9px] text-accent pl-2">
                    {stage.surviving}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[9px] text-red-400/60 w-8 shrink-0">
                -{stage.before - stage.surviving}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DealAnatomyClient() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const introRef = useScrollReveal<HTMLDivElement>();
  const closingRef = useScrollReveal<HTMLDivElement>();

  const handleToggle = (id: number) => {
    setExpandedStage((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            href="/stack"
            className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary hover:text-accent transition-colors mb-8"
          >
            &larr; Back to Stack
          </Link>

          {/* Page header */}
          <div ref={introRef} className="scroll-reveal mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 mb-4">
              <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-primary">
                DEAL ANATOMY
              </h1>
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
                // deal.lifecycle()
              </span>
            </div>

            <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-2xl mb-4">
              Selling technology to a bank is a 6&ndash;18 month process that most
              people outside enterprise sales have never seen. This is the full
              lifecycle &mdash; every stage, every trap, every insight I&apos;ve learned
              from doing this for years. Click each stage to see what actually happens.
            </p>

            <p className="font-mono text-xs text-text-tertiary leading-relaxed max-w-2xl">
              Start with 100 qualified opportunities. Watch how many survive.
            </p>
          </div>

          {/* Pipeline funnel visualization */}
          <PipelineFunnel />

          {/* Timeline stages */}
          <div className="space-y-6 mb-16">
            {dealStages.map((stage, i) => (
              <StageCard
                key={stage.id}
                stage={stage}
                isExpanded={expandedStage === stage.id}
                onToggle={() => handleToggle(stage.id)}
                index={i}
              />
            ))}
          </div>

          {/* Closing statement */}
          <div ref={closingRef} className="scroll-reveal">
            <div className="border border-border-strong bg-surface/30 p-6 sm:p-8">
              <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-[0.2em] mb-4">
                // deal.summary()
              </div>
              <p className="font-mono text-sm sm:text-base text-text-primary leading-relaxed mb-4">
                This is why enterprise sales takes 6&ndash;12 months. If someone tells
                you they can close a bank deal in 30 days, they&apos;re selling to the
                wrong person.
              </p>
              <p className="font-mono text-xs text-text-tertiary leading-relaxed">
                The tech demo gets you in the door. The compliance narrative closes the
                deal. Procurement is the product.
              </p>
            </div>

            {/* Author attribution */}
            <div className="border-t border-border-strong pt-6 mt-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-strong flex items-center justify-center">
                  <span className="font-display text-lg text-primary">TK</span>
                </div>
                <div>
                  <div className="font-mono text-sm text-primary">Tarique Khan</div>
                  <div className="font-mono text-[10px] text-text-tertiary tracking-wider">
                    Director, Business Development &middot; Brim Financial &middot; Toronto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
