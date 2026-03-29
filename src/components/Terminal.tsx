'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useTheme } from '@/context/ThemeContext';
import { getStackBySlug, getStackSorted } from '@/data/stack';
import { getSignalsSorted } from '@/data/signals';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

const COMMANDS: Record<string, string | string[]> = {
  help: [
    'Available commands:',
    '',
    '  help          — you\'re looking at it',
    '  about         — who is this guy',
    '  signal        — thought leadership & viewpoints',
    '  stack <term>  — look up a payments term',
    '  hire          — the CTA you\'ve been waiting for',
    '  deal          — anatomy of a fintech deal',
    '  toronto       — toggle Toronto Mode',
    '  interchange <amount> — calculate interchange split',
    '  clear         — clear the terminal',
    '  exit          — close this terminal',
    '',
    '// built client-side. no LLM was harmed in this terminal.',
  ],
  about: [
    '┌─────────────────────────────────────────────┐',
    '│  TARIQUE KHAN                               │',
    '│  Director, Business Development              │',
    '│  Brim Financial // Toronto, ON               │',
    '├─────────────────────────────────────────────┤',
    '│                                             │',
    '│  I sell technology to financial institutions.│',
    '│  Everything I\'ve ever sold either helps a   │',
    '│  bank save money or make more money.        │',
    '│                                             │',
    '│  Career: 4 fintechs, 1 advisory portfolio   │',
    '│  Focus: US + Canada enterprise pipeline       │',
    '│  Markets: Canada, United States              │',
    '│  Stack: CaaS, BaaS, API platforms,           │',
    '│         behavioral banking, digital adoption │',
    '│                                             │',
    '│  linkedin.com/in/tariquekhan1               │',
    '│  tarique@brimfinancial.com                   │',
    '└─────────────────────────────────────────────┘',
  ],
  signal: (() => {
    const sigs = getSignalsSorted();
    const lines: string[] = [
      '// dispatch.log — latest signals',
      '',
    ];
    sigs.forEach((s, i) => {
      lines.push(`  [${String(i + 1).padStart(2, '0')}] ${s.title} — ${s.subtitle}`);
    });
    lines.push('', '→ Visit /signal for full articles');
    return lines;
  })(),
  hire: [
    '// hire.exe — let\'s talk',
    '',
    '  Status:    Currently at Brim Financial',
    '  Open to:   Advisory, board seats, speaking',
    '  Best for:  Card issuance, BaaS, enterprise deals,',
    '             bank partnerships, go-to-market strategy',
    '',
    '  → Email:    tarique@brimfinancial.com',
    '  → LinkedIn: linkedin.com/in/tariquekhan1',
    '',
    '// The best deals start with a conversation.',
  ],
  deal: [
    '// deal_anatomy.exe — how fintech sells to banks',
    '',
    '  ┌──────────┐     ┌──────────┐     ┌──────────┐',
    '  │DISCOVERY │ ──→ │TECHNICAL │ ──→ │PROCURE-  │',
    '  │          │     │ SCOPING  │     │  MENT    │',
    '  └──────────┘     └──────────┘     └──────────┘',
    '       │                                 │',
    '       │    ← 80% of deals die here →    │',
    '       │                                 │',
    '  ┌──────────┐     ┌──────────┐     ┌──────────┐',
    '  │ LAUNCH   │ ←── │INTEGRA-  │ ←── │CONTRACT  │',
    '  │          │     │  TION    │     │          │',
    '  └──────────┘     └──────────┘     └──────────┘',
    '',
    '  Avg timeline: 6-18 months (yes, really)',
    '  Key insight: Procurement is the product.',
    '  The tech demo gets you in the door.',
    '  The compliance narrative closes the deal.',
  ],
  exit: '// terminal closed. raccoons remain.',
};

// Build stack term lookup from real data — supports slug, term (lowercase),
// and common short aliases like "bin" for "bin-sponsorship".
function lookupStackTerm(term: string): string[] | null {
  const allEntries = getStackSorted();

  // Try exact slug match first, then match against lowercased term field
  const entry = getStackBySlug(term)
    || allEntries.find((e) => e.term.toLowerCase() === term)
    || allEntries.find((e) => e.slug.startsWith(term));

  if (!entry) return null;

  const lines: string[] = [
    `// stack.lookup("${entry.term}")`,
    '',
    `  ${entry.fullName}`,
    '',
    `  ${entry.tldr}`,
    '',
    `  ${entry.body[0]}`,
  ];

  if (entry.related && entry.related.length > 0) {
    lines.push('', `  See also: ${entry.related.join(', ')}`);
  }

  return lines;
}

function calculateInterchange(amount: number): string[] {
  const issuerRate = 0.018;
  const networkRate = 0.004;
  const acquirerRate = 0.003;
  const totalRate = issuerRate + networkRate + acquirerRate;

  const issuerCut = amount * issuerRate;
  const networkCut = amount * networkRate;
  const acquirerCut = amount * acquirerRate;
  const merchantNet = amount - amount * totalRate;

  return [
    `// interchange.calc($${amount.toFixed(2)})`,
    '',
    `  Transaction:    $${amount.toFixed(2)}`,
    `  ─────────────────────────────`,
    `  Issuer (1.8%):  $${issuerCut.toFixed(2)}   ← the bank that issued the card`,
    `  Network (0.4%): $${networkCut.toFixed(2)}   ← Visa / Mastercard`,
    `  Acquirer (0.3%):$${acquirerCut.toFixed(2)}   ← merchant's payment processor`,
    `  ─────────────────────────────`,
    `  Total fees:     $${(amount * totalRate).toFixed(2)}  (${(totalRate * 100).toFixed(1)}%)`,
    `  Merchant net:   $${merchantNet.toFixed(2)}`,
    '',
    '  // Rates are illustrative (consumer credit, dining).',
    '  // Actual rates vary by card type, MCC, and network.',
  ];
}

function processCommand(input: string, onToggleToronto: () => void): { lines: string[]; shouldClose: boolean } {
  const trimmed = input.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];

  if (!cmd) return { lines: [], shouldClose: false };

  if (cmd === 'clear') return { lines: [], shouldClose: false };

  if (cmd === 'exit' || cmd === 'quit' || cmd === 'q') {
    return { lines: [COMMANDS.exit as string], shouldClose: true };
  }

  // --- Secret commands (not in help) ---

  if (cmd === 'raccoon') {
    return {
      lines: [
        '    /\\___/\\',
        '   (  o o  )',
        '   (  =^=  )',
        '    )     (   // toronto\'s finest',
        '   (       )',
        '  ( (  )  ) )',
        ' (__(__)__)__)',
      ],
      shouldClose: false,
    };
  }

  if (cmd === 'matrix') {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    const matrixLine = () => Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * chars.length)]).join(' ');
    return {
      lines: [
        '> Entering the matrix...',
        matrixLine(),
        matrixLine(),
        matrixLine(),
        matrixLine(),
        '> Wake up, Tarique...',
      ],
      shouldClose: false,
    };
  }

  if (cmd === 'version') {
    return {
      lines: ['toronto-industrial v1.0.0 // next@16.2.1 // react@19 // built with claude'],
      shouldClose: false,
    };
  }

  if (cmd === 'ping' && parts[1] === 'toronto') {
    return {
      lines: [
        'PING toronto-industrial.vercel.app',
        '64 bytes: seq=1 ttl=64 time=0.42ms',
        '64 bytes: seq=2 ttl=64 time=0.38ms',
        '64 bytes: seq=3 ttl=64 time=0.41ms',
        '--- 3 packets transmitted, 0% loss ---',
        '// latency lower than most bank APIs',
      ],
      shouldClose: false,
    };
  }

  if (cmd === 'whoami') {
    const hex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
      lines: [`visitor_${hex} // clearance: public // role: curious`],
      shouldClose: false,
    };
  }

  // --- End secret commands ---

  if (cmd === 'toronto') {
    onToggleToronto();
    return { lines: ['// toronto_mode.toggle() — look around.'], shouldClose: false };
  }

  if (cmd === 'stack') {
    const term = parts.slice(1).join(' ');
    if (!term) {
      const slugs = getStackSorted().map((e) => e.slug).join(', ');
      return {
        lines: [
          '// Usage: stack <term>',
          '',
          '  Available terms:',
          `  ${slugs}`,
        ],
        shouldClose: false,
      };
    }
    const result = lookupStackTerm(term);
    if (result) return { lines: result, shouldClose: false };
    const slugs = getStackSorted().map((e) => e.slug).join(', ');
    return {
      lines: [
        `// stack.lookup("${term}") — not found`,
        '',
        `  Available: ${slugs}`,
      ],
      shouldClose: false,
    };
  }

  if (cmd === 'interchange') {
    const amount = parseFloat(parts[1]);
    if (isNaN(amount) || amount <= 0) {
      return {
        lines: ['// Usage: interchange <amount>', '// Example: interchange 100'],
        shouldClose: false,
      };
    }
    return { lines: calculateInterchange(amount), shouldClose: false };
  }

  const result = COMMANDS[cmd];
  if (result) {
    return {
      lines: Array.isArray(result) ? result : [result],
      shouldClose: false,
    };
  }

  return {
    lines: [
      `// command not found: ${cmd}`,
      '// type "help" for available commands',
    ],
    shouldClose: false,
  };
}

export default function Terminal() {
  const { resolvedDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', text: '// tarique_terminal v0.1.0' },
    { type: 'system', text: '// type "help" for commands, "exit" to close' },
    { type: 'system', text: '' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [torontoToggle, setTorontoToggle] = useState<(() => void) | null>(null);

  // Import toronto toggle dynamically to avoid circular deps
  useEffect(() => {
    // We'll get the toggle from the DOM event system instead
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.toggle) setTorontoToggle(() => detail.toggle);
    };
    window.addEventListener('terminal-toronto-toggle', handler);
    return () => window.removeEventListener('terminal-toronto-toggle', handler);
  }, []);

  const toggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  useKeyboardShortcut('k', toggleOpen, { metaKey: true, ctrlKey: true });

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Scroll to bottom on new lines
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', text: `$ ${input}` },
    ];

    if (input.trim().toLowerCase() === 'clear') {
      setLines([
        { type: 'system', text: '// terminal cleared' },
        { type: 'system', text: '' },
      ]);
      setInput('');
      return;
    }

    const { lines: outputLines, shouldClose } = processCommand(
      input,
      () => {
        // Dispatch a custom event to toggle Toronto mode
        window.dispatchEvent(new CustomEvent('terminal-toggle-toronto'));
      }
    );

    outputLines.forEach(line => {
      newLines.push({
        type: line.startsWith('//') ? 'system' : 'output',
        text: line,
      });
    });
    newLines.push({ type: 'output', text: '' });

    setLines(newLines);
    setInput('');

    if (shouldClose) {
      setTimeout(() => setOpen(false), 800);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Terminal window */}
      <div
        className={`relative w-full max-w-2xl mx-4 border border-border-strong shadow-2xl terminal-enter${resolvedDark ? ' terminal-crt' : ''}`}
        style={{ backgroundColor: '#0A1220' }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-strong">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={() => setOpen(false)}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
              <div className="w-3 h-3 rounded-full bg-green-500/30" />
            </div>
            <span className="font-mono text-[10px] text-text-tertiary tracking-widest uppercase ml-2">
              tarique@toronto ~ %
            </span>
          </div>
          <span className="font-mono text-[9px] text-text-tertiary tracking-wider">
            ⌘K to toggle
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-4 max-h-[60vh] overflow-y-auto font-mono text-sm leading-relaxed"
          style={{ scrollbarWidth: 'thin' }}
        >
          {lines.map((line, i) => {
            const isOutput = line.type === 'output';
            const isSystem = line.type === 'system';
            return (
              <div
                key={i}
                className={`${
                  line.type === 'input'
                    ? 'text-accent'
                    : isSystem
                    ? 'text-text-tertiary'
                    : line.type === 'error'
                    ? 'text-red-400'
                    : 'text-text-secondary'
                } ${line.text === '' ? 'h-3' : ''}`}
                style={{
                  whiteSpace: 'pre',
                  ...(resolvedDark && (isOutput || isSystem) ? { color: 'rgba(168, 216, 168, 0.9)' } : {}),
                }}
              >
                {line.text}
              </div>
            );
          })}

          {/* Input line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-accent text-sm">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-sm caret-accent"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
