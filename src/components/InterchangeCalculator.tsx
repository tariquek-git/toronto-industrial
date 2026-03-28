'use client';

import { useState, useMemo } from 'react';

type CardType = 'consumer_credit' | 'consumer_debit' | 'commercial_credit' | 'commercial_debit';
type MerchantCategory = 'dining' | 'grocery' | 'gas' | 'travel' | 'online' | 'general';

const cardTypeLabels: Record<CardType, string> = {
  consumer_credit: 'Consumer Credit',
  consumer_debit: 'Consumer Debit',
  commercial_credit: 'Commercial Credit',
  commercial_debit: 'Commercial Debit',
};

const categoryLabels: Record<MerchantCategory, string> = {
  dining: 'Dining',
  grocery: 'Grocery',
  gas: 'Gas',
  travel: 'Travel',
  online: 'Online Retail',
  general: 'General',
};

// Canadian market interchange rates (approximate)
const interchangeRates: Record<CardType, Record<MerchantCategory, number>> = {
  consumer_credit: {
    dining: 1.65, grocery: 1.40, gas: 1.50, travel: 1.80, online: 1.75, general: 1.65,
  },
  consumer_debit: {
    dining: 0.80, grocery: 0.60, gas: 0.65, travel: 0.80, online: 0.85, general: 0.80,
  },
  commercial_credit: {
    dining: 2.20, grocery: 2.00, gas: 2.10, travel: 2.30, online: 2.25, general: 2.20,
  },
  commercial_debit: {
    dining: 1.20, grocery: 1.00, gas: 1.05, travel: 1.25, online: 1.30, general: 1.20,
  },
};

const NETWORK_ASSESSMENT_RATE = 0.13; // percent
const ACQUIRER_RATE = 0.15; // percent
const ACQUIRER_FLAT = 0.10; // dollars per transaction

function formatDollar(n: number): string {
  return `$${n.toFixed(2)}`;
}

function formatPct(n: number): string {
  return `${n.toFixed(3)}%`;
}

export default function InterchangeCalculator() {
  const [amount, setAmount] = useState(100);
  const [cardType, setCardType] = useState<CardType>('consumer_credit');
  const [category, setCategory] = useState<MerchantCategory>('general');

  const breakdown = useMemo(() => {
    const txnAmount = Math.max(0, amount || 0);
    const interchangePct = interchangeRates[cardType][category];
    const interchangeFee = txnAmount * (interchangePct / 100);
    const networkFee = txnAmount * (NETWORK_ASSESSMENT_RATE / 100);
    const acquirerFee = txnAmount * (ACQUIRER_RATE / 100) + ACQUIRER_FLAT;
    const totalFees = interchangeFee + networkFee + acquirerFee;
    const merchantNet = txnAmount - totalFees;
    const totalPct = txnAmount > 0 ? (totalFees / txnAmount) * 100 : 0;

    // For bar widths — percentage of total transaction
    const interchangeWidth = txnAmount > 0 ? (interchangeFee / txnAmount) * 100 : 0;
    const networkWidth = txnAmount > 0 ? (networkFee / txnAmount) * 100 : 0;
    const acquirerWidth = txnAmount > 0 ? (acquirerFee / txnAmount) * 100 : 0;
    const merchantWidth = txnAmount > 0 ? (merchantNet / txnAmount) * 100 : 0;

    return {
      txnAmount,
      interchangePct,
      interchangeFee,
      networkFee,
      acquirerFee,
      totalFees,
      merchantNet,
      totalPct,
      interchangeWidth,
      networkWidth,
      acquirerWidth,
      merchantWidth,
    };
  }, [amount, cardType, category]);

  const segments = [
    {
      label: 'Issuer (Interchange)',
      color: 'var(--accent)',
      width: breakdown.interchangeWidth,
      amount: breakdown.interchangeFee,
      pct: breakdown.interchangePct,
      note: 'Largest cut — funds rewards, credit risk',
    },
    {
      label: 'Network (Assessment)',
      color: 'var(--primary)',
      width: breakdown.networkWidth,
      amount: breakdown.networkFee,
      pct: NETWORK_ASSESSMENT_RATE,
      note: 'Visa/Mastercard scheme fee',
    },
    {
      label: 'Acquirer (Processing)',
      color: 'var(--text-secondary)',
      width: breakdown.acquirerWidth,
      amount: breakdown.acquirerFee,
      pct: breakdown.txnAmount > 0 ? (breakdown.acquirerFee / breakdown.txnAmount) * 100 : 0,
      note: `${ACQUIRER_RATE}% + ${formatDollar(ACQUIRER_FLAT)} per txn`,
    },
    {
      label: 'Merchant Net',
      color: 'var(--primary-muted)',
      width: breakdown.merchantWidth,
      amount: breakdown.merchantNet,
      pct: breakdown.txnAmount > 0 ? (breakdown.merchantNet / breakdown.txnAmount) * 100 : 0,
      note: 'What they actually deposit',
    },
  ];

  return (
    <div className="border border-border-strong bg-surface/30">
      {/* Header strip */}
      <div className="border-b border-border-strong px-4 sm:px-6 py-3 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
          // calc.run()
        </span>
        <span className="font-mono text-[9px] tracking-wider text-text-tertiary">
          CDN MARKET &middot; APPROX RATES
        </span>
      </div>

      {/* Inputs */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Amount */}
          <div>
            <label className="block font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary mb-2">
              Transaction Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-text-tertiary">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min={0}
                step={0.01}
                className="w-full bg-background border border-border-strong font-mono text-sm text-primary pl-7 pr-3 py-2.5 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Card Type */}
          <div>
            <label className="block font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary mb-2">
              Card Type
            </label>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value as CardType)}
              className="w-full bg-background border border-border-strong font-mono text-sm text-primary px-3 py-2.5 focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
            >
              {(Object.keys(cardTypeLabels) as CardType[]).map((ct) => (
                <option key={ct} value={ct}>{cardTypeLabels[ct]}</option>
              ))}
            </select>
          </div>

          {/* Merchant Category */}
          <div>
            <label className="block font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary mb-2">
              Merchant Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MerchantCategory)}
              className="w-full bg-background border border-border-strong font-mono text-sm text-primary px-3 py-2.5 focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
            >
              {(Object.keys(categoryLabels) as MerchantCategory[]).map((mc) => (
                <option key={mc} value={mc}>{categoryLabels[mc]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Visual Bar */}
      <div className="p-4 sm:p-6">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary">
            Fee Distribution
          </span>
          <span className="font-mono text-[10px] text-text-tertiary">
            Total fees: <span className="text-accent">{formatDollar(breakdown.totalFees)}</span>
            {' '}({formatPct(breakdown.totalPct)})
          </span>
        </div>

        {/* Stacked horizontal bar */}
        <div className="w-full h-12 sm:h-14 flex overflow-hidden border border-border-strong">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="relative h-full flex items-center justify-center overflow-hidden"
              style={{
                width: `${Math.max(seg.width, 0)}%`,
                backgroundColor: seg.color,
                transition: 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                opacity: 0.85,
              }}
            >
              {seg.width > 8 && (
                <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold whitespace-nowrap drop-shadow-sm">
                  {formatDollar(seg.amount)}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bar legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5"
                style={{ backgroundColor: seg.color, opacity: 0.85 }}
              />
              <span className="font-mono text-[9px] text-text-secondary">
                {seg.label}
              </span>
            </div>
          ))}
        </div>

        {/* Detailed breakdown */}
        <div className="mt-6 border-t border-border-strong pt-4 space-y-3">
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-text-tertiary mb-3">
            // breakdown.detail()
          </div>

          {segments.map((seg, i) => (
            <div key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className="w-1 h-full min-h-[36px] shrink-0 mt-0.5"
                  style={{ backgroundColor: seg.color, opacity: 0.85 }}
                />
                <div>
                  <div className="font-mono text-xs text-primary">
                    {seg.label}
                  </div>
                  <div className="font-mono text-[10px] text-text-tertiary mt-0.5">
                    {seg.note}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-sm text-primary tabular-nums">
                  {formatDollar(seg.amount)}
                </div>
                <div className="font-mono text-[10px] text-text-tertiary tabular-nums">
                  {formatPct(seg.pct)}
                </div>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="pt-3 border-t border-accent/30 flex items-center justify-between">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent">
              Merchant receives
            </div>
            <div className="text-right">
              <span className="font-mono text-lg text-accent tabular-nums">
                {formatDollar(breakdown.merchantNet)}
              </span>
              <span className="font-mono text-[10px] text-text-tertiary ml-2">
                of {formatDollar(breakdown.txnAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-border-strong px-4 sm:px-6 py-3">
        <span className="font-mono text-[9px] text-text-tertiary tracking-wider">
          Rates are approximate Canadian market figures. Actual interchange varies by issuer, network, and merchant agreement.
        </span>
      </div>
    </div>
  );
}
