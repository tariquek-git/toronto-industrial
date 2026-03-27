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
  title: 'Tarique Khan // Payments Infrastructure',
  description: 'Director, Business Development at Brim Financial. Building credit card programs for banks, fintechs, and brands across Canada and the United States.',
  openGraph: {
    title: 'Tarique Khan // Payments Infrastructure',
    description: 'Director, Business Development at Brim Financial. BaaS, CaaS, Payment Rails.',
    type: 'website',
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
        <TorontoModeProvider>
          {children}
        </TorontoModeProvider>
      </body>
    </html>
  );
}
