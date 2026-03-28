/**
 * Build-time OG image generator
 * Generates branded 1200x630 PNG images for all pages using Satori + resvg-js.
 * Run: npx tsx scripts/generate-og-images.ts
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Import data directly — tsx handles TypeScript
import { signals } from '../src/data/signals';
import { stackEntries } from '../src/data/stack';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'og');

// Ensure output directory exists
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

// --- Font loading from local TTF files ---

function loadFont(filename: string): Buffer {
  return readFileSync(join(__dirname, 'fonts', filename));
}

// --- SVG to PNG conversion ---

function svgToPng(svg: string): Buffer {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return resvg.render().asPng();
}

// --- OG image templates ---

interface SignalOGData {
  title: string;
  preview: string;
  category: string;
  color: string;
}

interface StackOGData {
  term: string;
  fullName: string;
  tldr: string;
  category: string;
  color: string;
}

interface PageOGData {
  title: string;
  subtitle: string;
  accentColor: string;
}

function signalImageJsx(signal: SignalOGData) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FAF8F3',
        padding: '60px',
        position: 'relative',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 14, color: '#8A9AAA', letterSpacing: '0.1em' },
            children: '// signal.read()',
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'Bebas Neue', fontSize: 64, color: '#0A1525', marginTop: 20, lineHeight: 1.1 },
            children: signal.title,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 18, color: '#5A6575', marginTop: 24, lineHeight: 1.6, overflow: 'hidden' },
            children: signal.preview.length > 160 ? signal.preview.substring(0, 157) + '...' : signal.preview,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', marginTop: 'auto', alignItems: 'center', gap: 16 },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', backgroundColor: signal.color, color: '#FFFFFF', padding: '6px 16px', fontFamily: 'DM Mono', fontSize: 12, letterSpacing: '0.05em' },
                  children: signal.category.toUpperCase(),
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 14, color: '#8A9AAA' },
                  children: 'Tarique Khan // toronto-industrial.vercel.app',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#DA291C' },
          },
        },
      ],
    },
  };
}

function stackImageJsx(entry: StackOGData) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FAF8F3',
        padding: '60px',
        position: 'relative',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 14, color: '#8A9AAA', letterSpacing: '0.1em' },
            children: '// stack.define()',
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'Bebas Neue', fontSize: 80, color: '#0A1525', marginTop: 16, lineHeight: 1.0 },
            children: entry.term,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 22, color: '#5A6575', marginTop: 8, lineHeight: 1.4 },
            children: entry.fullName,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 16, color: '#5A6575', marginTop: 24, lineHeight: 1.6, overflow: 'hidden' },
            children: entry.tldr.length > 180 ? entry.tldr.substring(0, 177) + '...' : entry.tldr,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', marginTop: 'auto', alignItems: 'center', gap: 16 },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', backgroundColor: entry.color, color: '#FFFFFF', padding: '6px 16px', fontFamily: 'DM Mono', fontSize: 12, letterSpacing: '0.05em' },
                  children: entry.category.toUpperCase(),
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 14, color: '#8A9AAA' },
                  children: 'Tarique Khan // toronto-industrial.vercel.app',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#DA291C' },
          },
        },
      ],
    },
  };
}

function pageImageJsx(page: PageOGData) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#FAF8F3',
        padding: '60px',
        position: 'relative',
        justifyContent: 'center',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 14, color: '#8A9AAA', letterSpacing: '0.1em' },
            children: '// toronto-industrial',
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'Bebas Neue', fontSize: 80, color: '#0A1525', marginTop: 20, lineHeight: 1.1 },
            children: page.title,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 20, color: '#5A6575', marginTop: 16, lineHeight: 1.5 },
            children: page.subtitle,
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', marginTop: 'auto', alignItems: 'center' },
            children: {
              type: 'div',
              props: {
                style: { display: 'flex', fontFamily: 'DM Mono', fontSize: 14, color: '#8A9AAA' },
                children: 'Tarique Khan // toronto-industrial.vercel.app',
              },
            },
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: page.accentColor },
          },
        },
      ],
    },
  };
}

// --- Main ---

async function main() {
  console.log('Loading fonts...');
  const bebasFont = loadFont('BebasNeue-Regular.ttf');
  const monoFont = loadFont('DMMono-Regular.ttf');
  console.log('Fonts loaded.');

  const fonts = [
    { name: 'Bebas Neue', data: bebasFont, weight: 400 as const, style: 'normal' as const },
    { name: 'DM Mono', data: monoFont, weight: 400 as const, style: 'normal' as const },
  ];

  const satoriOpts = { width: 1200, height: 630, fonts };
  let count = 0;

  // --- Signal posts ---
  for (const signal of signals) {
    const jsx = signalImageJsx({
      title: signal.title,
      preview: signal.excerpt,
      category: signal.categoryLabel,
      color: signal.color,
    });
    const svg = await satori(jsx as React.ReactNode, satoriOpts);
    const png = svgToPng(svg);
    writeFileSync(join(outDir, `signal-${signal.slug}.png`), png);
    console.log(`  signal-${signal.slug}.png`);
    count++;
  }

  // --- Stack entries ---
  for (const entry of stackEntries) {
    const jsx = stackImageJsx({
      term: entry.term,
      fullName: entry.fullName,
      tldr: entry.tldr,
      category: entry.categoryLabel,
      color: entry.color,
    });
    const svg = await satori(jsx as React.ReactNode, satoriOpts);
    const png = svgToPng(svg);
    writeFileSync(join(outDir, `stack-${entry.slug}.png`), png);
    console.log(`  stack-${entry.slug}.png`);
    count++;
  }

  // --- Static pages ---
  const pages: (PageOGData & { slug: string })[] = [
    { title: 'Stack', subtitle: 'Payments infrastructure terms explained by a fintech BD who actually uses them in deals.', slug: 'stack', accentColor: '#2563EB' },
    { title: 'Deal Anatomy', subtitle: 'How banks buy technology. Interactive walkthrough of the enterprise sales lifecycle.', slug: 'deal-anatomy', accentColor: '#DA291C' },
    { title: 'Interchange Calculator', subtitle: 'Interactive breakdown of credit card interchange fees. See exactly where your money goes.', slug: 'interchange', accentColor: '#B8860B' },
  ];

  for (const page of pages) {
    const jsx = pageImageJsx(page);
    const svg = await satori(jsx as React.ReactNode, satoriOpts);
    const png = svgToPng(svg);
    writeFileSync(join(outDir, `${page.slug}.png`), png);
    console.log(`  ${page.slug}.png`);
    count++;
  }

  console.log(`\nDone — generated ${count} OG images in public/og/`);
}

main().catch((err) => {
  console.error('OG image generation failed:', err);
  process.exit(1);
});
