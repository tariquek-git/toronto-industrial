'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-border-strong p-8">
        <p className="font-mono text-[10px] tracking-widest uppercase text-text-tertiary mb-4">// error.catch()</p>
        <h1 className="font-display text-4xl text-text-primary mb-2">SYSTEM FAULT</h1>
        <p className="font-mono text-sm text-text-secondary mb-6">
          Something broke in the pipeline. No interchange was earned during this transaction.
        </p>
        <p className="font-mono text-[10px] text-text-tertiary mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="font-mono text-xs tracking-widest uppercase px-6 py-3 bg-accent text-white hover:bg-accent-hover transition-colors"
        >
          Retry Transaction →
        </button>
      </div>
    </div>
  );
}
