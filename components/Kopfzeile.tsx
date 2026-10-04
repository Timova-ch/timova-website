import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { APP_URL } from '@/lib/site';

const NAVIGATION = [
  { href: '/#funktionen', text: 'Funktionen' },
  { href: '/#sicherheit', text: 'Sicherheit' },
  { href: '/#pakete', text: 'Pakete' },
  { href: '/#faq', text: 'Fragen' }
];

export function Kopfzeile() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/75">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Timova, zur Startseite" className="rounded-token">
          <Logo className="h-7 sm:h-8" />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">
          {NAVIGATION.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-token px-3 py-2 text-sm font-medium text-muted hover:text-content">
              {n.text}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={APP_URL} className="hidden rounded-token px-3 py-2 text-sm font-medium text-muted hover:text-content sm:inline-flex">
            Login
          </a>
          <Link href="/#kontakt" className="knopf-primaer px-4 py-2 text-sm">
            Demo anfragen
          </Link>
          {/* Menü für kleine Bildschirme, ohne JavaScript */}
          <details className="group relative md:hidden">
            <summary
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-token border border-line bg-surface [&::-webkit-details-marker]:hidden"
              aria-label="Menü"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Menü"
              className="absolute right-0 top-12 w-56 rounded-token-lg border border-line bg-surface p-2 shadow-lg"
            >
              {NAVIGATION.map((n) => (
                <Link key={n.href} href={n.href} className="block rounded-token px-3 py-2.5 text-sm font-medium hover:bg-surface-2">
                  {n.text}
                </Link>
              ))}
              <a href={APP_URL} className="block rounded-token px-3 py-2.5 text-sm font-medium hover:bg-surface-2">
                Login
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
