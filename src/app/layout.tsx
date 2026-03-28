import type { Metadata } from 'next';
import { Bebas_Neue, DM_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/context/ThemeContext';
import { TorontoModeProvider } from '@/context/TorontoModeContext';
import Terminal from '@/components/Terminal';
import KonamiHandler from '@/components/KonamiHandler';
import SeasonalEffects from '@/components/SeasonalEffects';
import ThemeToggle from '@/components/ThemeToggle';
import PageTransition from '@/components/PageTransition';
import GridSpotlight from '@/components/GridSpotlight';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toronto-industrial.vercel.app'),
  title: 'Tarique Khan // Fintech & Payments Expert',
  description: 'I sell technology to financial institutions. Card-as-a-service, API platforms, behavioral banking, digital adoption. Every product saves a bank money or makes them more.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tarique Khan // Fintech & Payments Expert',
    description: 'Helping banks, fintechs, and brands navigate card issuance and payments infrastructure.',
    type: 'website',
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tarique Khan — Payments Infrastructure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarique Khan // Fintech & Payments Expert',
    description: 'Helping banks, fintechs, and brands navigate card issuance and payments infrastructure.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="auto"
      className={`${bebasNeue.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
        <a
          href="#main-content"
          className="absolute -top-full left-4 z-[100] bg-accent text-white px-4 py-2 font-mono text-xs focus:top-4 transition-all"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Tarique Khan',
              jobTitle: 'Business Development',
              worksFor: {
                '@type': 'Organization',
                name: 'Brim Financial',
              },
              url: 'https://toronto-industrial.vercel.app',
              sameAs: ['https://linkedin.com/in/tariquekhan1'],
              knowsAbout: ['BaaS', 'CaaS', 'Payment Rails', 'RPAA', 'Credit Card Issuance', 'Enterprise Sales', 'Go-to-Market Strategy', 'Open Banking', 'Behavioral Banking', 'Digital Adoption', 'API Platforms', 'Fintech'],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Toronto',
                addressRegion: 'ON',
                addressCountry: 'CA',
              },
            }),
          }}
        />
        <ThemeProvider>
          <GridSpotlight />
          <TorontoModeProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <Terminal />
            <KonamiHandler />
            <SeasonalEffects />
            <ThemeToggle />
          </TorontoModeProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
