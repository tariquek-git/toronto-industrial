import type { Metadata } from 'next';
import { Bebas_Neue, DM_Mono } from 'next/font/google';
import { TorontoModeProvider } from '@/context/TorontoModeContext';
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
  title: 'Tarique Khan // Payments Infrastructure',
  description: 'Business Development at Brim Financial. Building credit card programs for banks, fintechs, and brands across Canada and the United States. BaaS, CaaS, RPAA.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tarique Khan // Payments Infrastructure',
    description: 'Business Development at Brim Financial. BaaS, CaaS, Payment Rails. Toronto.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarique Khan // Payments Infrastructure',
    description: 'Business Development at Brim Financial. BaaS, CaaS, Payment Rails.',
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
              sameAs: ['https://linkedin.com/in/tariquekhan'],
              knowsAbout: ['BaaS', 'CaaS', 'Payment Rails', 'RPAA', 'Credit Card Issuance'],
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
        </TorontoModeProvider>
      </body>
    </html>
  );
}
