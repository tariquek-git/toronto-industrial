'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

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
    '│  Pipeline: $700M+ US (active)               │',
    '│  Markets: Canada, United States              │',
    '│  Stack: CaaS, BaaS, API platforms,           │',
    '│         behavioral banking, digital adoption │',
    '│                                             │',
    '│  linkedin.com/in/tariquekhan1               │',
    '│  tarique@brimfinancial.com                   │',
    '└─────────────────────────────────────────────┘',
  ],
  signal: [
    '// dispatch.log — latest signals',
    '',
    '  [01] Lost in Buzzwords — Digital banking\'s identity crisis',
    '  [02] Blockchain\'s Identity Crisis — Still solving for "why"',
    '  [03] OSFI Fast-Track — Fintech licensing gets real',
    '  [04] BNPL Math Doesn\'t Work — The unit economics problem',
    '  [05] Legacy Tech Footage — Banks vs. core modernization',
    '  [06] Fintech vs Banks Rap Battle — Culture clash, in bars',
    '  [07] Open Banking Canada — Still waiting. Still.',
    '  [08] Hidden FX Rates — The margin nobody sees',
    '  [09] European Acquirer Landscape — Consolidation incoming',
    '  [10] Pay By Bank — Evolution of account-to-account',
    '',
    '→ Visit /signal for full articles',
  ],
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

const STACK_TERMS: Record<string, string[]> = {
  baas: [
    '// stack.lookup("BaaS")',
    '',
    '  Banking-as-a-Service',
    '',
    '  A model where licensed banks rent their charter,',
    '  compliance infrastructure, and deposit insurance',
    '  to fintechs who want to offer banking products',
    '  without becoming a bank.',
    '',
    '  Translation: The bank does the regulated stuff.',
    '  The fintech does the UX. Everyone pretends this',
    '  is simple. It is not.',
    '',
    '  See also: BIN sponsorship, CaaS',
  ],
  caas: [
    '// stack.lookup("CaaS")',
    '',
    '  Card-as-a-Service',
    '',
    '  The full stack for issuing credit, debit, or',
    '  prepaid cards — processor, BIN sponsor, scheme',
    '  registration, compliance, fraud, rewards — all',
    '  bundled as one API platform.',
    '',
    '  What Brim does. What I sell.',
    '',
    '  The pitch: "Launch a card program in 10-12 weeks',
    '  instead of 18 months."',
  ],
  bin: [
    '// stack.lookup("BIN Sponsorship")',
    '',
    '  Bank Identification Number Sponsorship',
    '',
    '  A BIN is the first 6-8 digits of a card number.',
    '  A BIN sponsor is the licensed bank that lets a',
    '  fintech issue cards under their banking license.',
    '',
    '  Hot take: The BIN sponsor IS the product.',
    '  Everything else is middleware.',
  ],
  interchange: [
    '// stack.lookup("Interchange")',
    '',
    '  The fee paid by the merchant\'s bank (acquirer)',
    '  to the cardholder\'s bank (issuer) on every',
    '  card transaction.',
    '',
    '  Typically 1.5-3% of transaction value.',
    '  It\'s the tax nobody reads but everybody pays.',
    '',
    '  Try: interchange <amount> for a breakdown',
  ],
  rpaa: [
    '// stack.lookup("RPAA")',
    '',
    '  Retail Payment Activities Act (Canada)',
    '',
    '  Canada\'s framework for regulating payment service',
    '  providers. Effective November 2024.',
    '',
    '  Not Y2K. It\'s the cost of doing business in',
    '  Canadian payments. The fintechs that treat it',
    '  as a selling point (not a blocker) win.',
    '',
    '  Overseen by the Bank of Canada.',
  ],
  'open banking': [
    '// stack.lookup("Open Banking")',
    '',
    '  A framework where banks share customer financial',
    '  data with third parties via APIs — with the',
    '  customer\'s consent.',
    '',
    '  Status in Canada: Still. Waiting. Still.',
    '  The UK did it in 2018. Australia in 2020.',
    '  Canada announced it would happen "soon" in 2018.',
    '  It is now 2026.',
  ],
};

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

  if (cmd === 'toronto') {
    onToggleToronto();
    return { lines: ['// toronto_mode.toggle() — look around.'], shouldClose: false };
  }

  if (cmd === 'stack') {
    const term = parts.slice(1).join(' ');
    if (!term) {
      return {
        lines: [
          '// Usage: stack <term>',
          '',
          '  Available terms:',
          '  baas, caas, bin, interchange, rpaa, open banking',
        ],
        shouldClose: false,
      };
    }
    const entry = STACK_TERMS[term];
    if (entry) return { lines: entry, shouldClose: false };
    return {
      lines: [
        `// stack.lookup("${term}") — not found`,
        '',
        '  Available: baas, caas, bin, interchange, rpaa, open banking',
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
        className="relative w-full max-w-2xl mx-4 border border-border-strong shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
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
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.type === 'input'
                  ? 'text-accent'
                  : line.type === 'system'
                  ? 'text-text-tertiary'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : 'text-text-secondary'
              } ${line.text === '' ? 'h-3' : ''}`}
              style={{ whiteSpace: 'pre' }}
            >
              {line.text}
            </div>
          ))}

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
