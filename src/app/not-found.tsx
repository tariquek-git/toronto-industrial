import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* 404 */}
        <h1 className="font-display text-[12rem] leading-none text-primary tracking-tight select-none">
          404
        </h1>

        {/* Headline */}
        <h2 className="font-display text-4xl text-accent uppercase tracking-wide mt-2">
          Transaction Declined
        </h2>

        {/* Subtitle */}
        <p className="font-mono text-sm text-text-secondary mt-4 leading-relaxed">
          {'// route.not_found — this endpoint was never deployed'}
        </p>

        {/* Extra dry detail */}
        <p className="font-mono text-xs text-text-tertiary mt-6 leading-relaxed max-w-sm mx-auto">
          The requested path returned no settlement record.
          <br />
          No interchange was earned. No basis points were harmed.
        </p>

        {/* Return link */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-block font-mono text-sm uppercase tracking-widest text-primary border border-border-strong px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Return to origin
          </Link>
        </div>

        {/* Raccoon footer */}
        <p className="font-mono text-[10px] text-text-tertiary mt-16 tracking-wide uppercase">
          Even raccoons know this path leads nowhere.
        </p>
      </div>
    </div>
  );
}
