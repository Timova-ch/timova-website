import Link from 'next/link';

export default function NichtGefunden() {
  return (
    <div className="container flex max-w-xl flex-col items-center py-24 text-center">
      <p className="kicker">Fehler 404</p>
      <h1 className="text-3xl font-semibold sm:text-4xl">Diese Seite gibt es nicht</h1>
      <p className="mt-4 text-muted">Vielleicht hat sich die Adresse geändert.</p>
      <Link href="/" className="knopf-primaer mt-8">
        Zur Startseite
      </Link>
    </div>
  );
}
