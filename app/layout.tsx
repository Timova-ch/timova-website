import type { Metadata, Viewport } from 'next';
import './globals.css';
import { outfit } from './fonts';
import { Kopfzeile } from '@/components/Kopfzeile';
import { Fusszeile } from '@/components/Fusszeile';
import { SITE_URL, istIndexierbar } from '@/lib/site';

const TITEL = 'Timova: Dienstplan, Ferien und Teamorganisation aus der Schweiz';
const BESCHREIBUNG =
  'Dienstplan, Jahresurlaubsplaner, Skills und Teamboard an einem Ort statt in Excel, Papier und WhatsApp. Für Schweizer Betriebe mit Schichtbetrieb, Daten in Zürich.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITEL, template: '%s | Timova' },
  description: BESCHREIBUNG,
  applicationName: 'Timova',
  alternates: { canonical: '/' },
  robots: istIndexierbar() ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: SITE_URL,
    siteName: 'Timova',
    title: TITEL,
    description: BESCHREIBUNG,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Timova: Dienstplan, Ferien, Skills und Team an einem Ort' }]
  },
  twitter: { card: 'summary_large_image', title: TITEL, description: BESCHREIBUNG, images: ['/og.png'] },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '32x32' }],
    apple: '/apple-touch-icon.png'
  },
  formatDetection: { telephone: false }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F7F6' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1413' }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={outfit.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-token focus:bg-surface focus:px-4 focus:py-2"
        >
          Zum Inhalt springen
        </a>
        <Kopfzeile />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Fusszeile />
      </body>
    </html>
  );
}
