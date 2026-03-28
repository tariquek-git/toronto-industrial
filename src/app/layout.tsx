import type { Metadata } from 'next';
import { Bebas_Neue, DM_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { TorontoModeProvider } from '@/context/TorontoModeContext';
import Terminal from '@/components/Terminal';
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tarique Khan — Payments Infrastructure' }],
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
      className={`${bebasNeue.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
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
        <TorontoModeProvider>
          {children}
          <Terminal />
        </TorontoModeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
