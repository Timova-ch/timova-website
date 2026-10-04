'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { MITARBEITENDE_OPTIONEN, type Feld } from '@/lib/kontakt';
import { KONTAKT_EMAIL } from '@/lib/site';

type Zustand =
  | { art: 'bereit' }
  | { art: 'sendet' }
  | { art: 'gesendet' }
  | { art: 'fehler'; meldung: string; felder: Partial<Record<Feld, string>> };

const feldKlasse =
  'mt-1.5 block w-full rounded-token border bg-surface px-3.5 py-2.5 text-base text-content placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

export function KontaktFormular() {
  const [zustand, setZustand] = useState<Zustand>({ art: 'bereit' });
  // Zeitpunkt des Ladens erst im Browser setzen: Die Seite ist statisch
  // vorgerendert, ein Wert aus dem Render wäre die Zeit des Builds.
  const geladen = useRef(0);
  const erfolg = useRef<HTMLDivElement>(null);
  useEffect(() => {
    geladen.current = Date.now();
  }, []);
  useEffect(() => {
    if (zustand.art === 'gesendet') erfolg.current?.focus();
  }, [zustand.art]);

  const fehler = zustand.art === 'fehler' ? zustand.felder : {};

  async function absenden(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const daten = Object.fromEntries(new FormData(event.currentTarget).entries());
    setZustand({ art: 'sendet' });
    try {
      const antwort = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...daten, datenschutz: daten.datenschutz === 'on', geladen: geladen.current })
      });
      const ergebnis = (await antwort.json().catch(() => ({}))) as {
        ok?: boolean;
        meldung?: string;
        fehler?: Partial<Record<Feld, string>>;
      };
      if (antwort.ok && ergebnis.ok) {
        setZustand({ art: 'gesendet' });
        return;
      }
      setZustand({
        art: 'fehler',
        meldung: ergebnis.meldung ?? `Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie an ${KONTAKT_EMAIL}.`,
        felder: ergebnis.fehler ?? {}
      });
    } catch {
      setZustand({
        art: 'fehler',
        meldung: `Keine Verbindung. Bitte versuchen Sie es erneut oder schreiben Sie an ${KONTAKT_EMAIL}.`,
        felder: {}
      });
    }
  }

  if (zustand.art === 'gesendet') {
    return (
      <div ref={erfolg} tabIndex={-1} role="status" className="flex flex-col items-center py-10 text-center outline-none">
        <CheckCircle2 className="h-12 w-12 text-success" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-semibold">Vielen Dank für Ihre Anfrage</h3>
        <p className="mt-2 max-w-md text-muted">
          Wir haben Ihre Nachricht erhalten und melden uns innert zwei Werktagen bei Ihnen.
        </p>
      </div>
    );
  }

  const beschriftung = (id: Feld, text: string, pflicht = false) => (
    <label htmlFor={id} className="block text-sm font-medium">
      {text}
      {pflicht ? (
        <span className="text-danger" aria-hidden="true">
          {' '}*
        </span>
      ) : null}
    </label>
  );

  const hinweis = (id: Feld) =>
    fehler[id] ? (
      <p id={`${id}-fehler`} className="mt-1 text-sm text-danger">
        {fehler[id]}
      </p>
    ) : null;

  const attribute = (id: Feld) => ({
    id,
    name: id,
    'aria-invalid': fehler[id] ? true : undefined,
    'aria-describedby': fehler[id] ? `${id}-fehler` : undefined,
    className: `${feldKlasse} ${fehler[id] ? 'border-danger' : 'border-line'}`
  });

  return (
    <form onSubmit={absenden} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <noscript>
        <p className="sm:col-span-2 rounded-token bg-surface-2 p-3 text-sm">
          Das Formular braucht JavaScript. Schreiben Sie uns sonst gerne an {KONTAKT_EMAIL}.
        </p>
      </noscript>
      <div>
        {beschriftung('name', 'Name', true)}
        <input type="text" autoComplete="name" required maxLength={100} {...attribute('name')} />
        {hinweis('name')}
      </div>
      <div>
        {beschriftung('firma', 'Firma', true)}
        <input type="text" autoComplete="organization" required maxLength={150} {...attribute('firma')} />
        {hinweis('firma')}
      </div>
      <div>
        {beschriftung('email', 'E-Mail', true)}
        <input type="email" autoComplete="email" required maxLength={200} {...attribute('email')} />
        {hinweis('email')}
      </div>
      <div>
        {beschriftung('telefon', 'Telefon')}
        <input type="tel" autoComplete="tel" maxLength={40} {...attribute('telefon')} />
        {hinweis('telefon')}
      </div>
      <div className="sm:col-span-2">
        {beschriftung('mitarbeitende', 'Anzahl Mitarbeitende')}
        <select defaultValue="" {...attribute('mitarbeitende')}>
          <option value="">Bitte wählen</option>
          {MITARBEITENDE_OPTIONEN.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {hinweis('mitarbeitende')}
      </div>
      <div className="sm:col-span-2">
        {beschriftung('nachricht', 'Nachricht')}
        <textarea rows={4} maxLength={3000} placeholder="Wie planen Sie heute? Was soll besser werden?" {...attribute('nachricht')} />
        {hinweis('nachricht')}
      </div>

      {/* Honeypot: für Menschen unsichtbar, Bots füllen es aus */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="datenschutz"
            name="datenschutz"
            required
            aria-invalid={fehler.datenschutz ? true : undefined}
            aria-describedby={fehler.datenschutz ? 'datenschutz-fehler' : undefined}
            className="mt-1 h-5 w-5 shrink-0 rounded border-line accent-[rgb(var(--c-primary))]"
          />
          <label htmlFor="datenschutz" className="text-sm leading-relaxed">
            Ich habe die{' '}
            <Link href="/datenschutz" className="text-akzent underline underline-offset-2">
              Datenschutzerklärung
            </Link>{' '}
            gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden.
            <span className="text-danger" aria-hidden="true">
              {' '}*
            </span>
          </label>
        </div>
        {hinweis('datenschutz')}
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span className="text-danger" aria-hidden="true">*</span> Pflichtfeld
        </p>
        <button type="submit" disabled={zustand.art === 'sendet'} className="knopf-primaer disabled:opacity-60">
          {zustand.art === 'sendet' ? 'Wird gesendet …' : 'Demo anfragen'}
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {zustand.art === 'fehler' ? (
          <p role="alert" className="rounded-token border border-danger/40 bg-danger/10 p-3 text-sm">
            {zustand.meldung}
          </p>
        ) : null}
      </div>
    </form>
  );
}
