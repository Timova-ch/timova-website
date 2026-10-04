import Link from 'next/link';
import { Logo } from './Logo';
import { APP_URL, KONTAKT_EMAIL } from '@/lib/site';

export function Fusszeile() {
  const jahr = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Logo className="h-7" />
          <p className="text-sm text-muted">Dienstplan und Einsatzplanung aus der Schweiz.</p>
          <p className="text-sm text-muted">© {jahr} Timova</p>
        </div>
        <nav aria-label="Fusszeile" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
          <Link href="/impressum" className="py-1 text-muted hover:text-content">Impressum</Link>
          <Link href="/datenschutz" className="py-1 text-muted hover:text-content">Datenschutz</Link>
          <Link href="/unterauftragsverarbeiter" className="py-1 text-muted hover:text-content">Unterauftragsverarbeiter</Link>
          <a href={`mailto:${KONTAKT_EMAIL}`} className="py-1 text-muted hover:text-content">{KONTAKT_EMAIL}</a>
          <Link href="/#kontakt" className="py-1 text-muted hover:text-content">Kontakt</Link>
          <a href={APP_URL} className="py-1 font-medium text-akzent hover:underline">Login für Kunden</a>
        </nav>
      </div>
    </footer>
  );
}
