import Link from 'next/link';
import { Check } from 'lucide-react';

const PAKETE = [
  {
    name: 'Team',
    umfang: 'bis 25 aktive Benutzer',
    fuer: 'Für ein Team oder eine Abteilung.',
    punkte: ['Alle Funktionen', 'Ein Standort', 'Support per E-Mail']
  },
  {
    name: 'Betrieb',
    umfang: 'bis 50 aktive Benutzer',
    fuer: 'Für Betriebe mit mehreren Abteilungen.',
    punkte: ['Alle Funktionen', 'Ein Standort, mehrere Abteilungen', 'Support per E-Mail'],
    hervorgehoben: true
  },
  {
    name: 'Standorte',
    umfang: 'bis 100 aktive Benutzer',
    fuer: 'Für Unternehmen mit mehreren Standorten.',
    punkte: ['Alle Funktionen', 'Mehrere Standorte', 'Support per E-Mail']
  }
];

const HINWEISE = [
  'Jahresvertrag',
  'Es zählen nur aktive Benutzer',
  'Einrichtung und Schulung auf Wunsch',
  'Pilotphase 3 Monate mit 50 % Rabatt'
];

export function Pakete() {
  return (
    <section id="pakete" className="abschnitt" aria-labelledby="pakete-titel">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">Pakete</p>
          <h2 id="pakete-titel" className="ueberschrift">
            Faire Pakete nach aktiven Benutzern
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Sie bezahlen für die Personen, die Timova tatsächlich nutzen. Ausgetretene Mitarbeitende zählen nicht mit.
          </p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {PAKETE.map((p) => (
            <li
              key={p.name}
              className={`relative flex flex-col rounded-token-lg border bg-surface p-7 ${
                p.hervorgehoben ? 'border-primary shadow-xl shadow-nacht/10 ring-1 ring-primary' : 'border-line'
              }`}
            >
              {p.hervorgehoben ? (
                <span className="absolute -top-3 left-7 rounded-full bg-frueh px-3 py-1 text-xs font-semibold text-[#16201F]">
                  Empfohlen
                </span>
              ) : null}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.fuer}</p>
              <p className="mt-6 font-brand text-2xl font-semibold text-primary">{p.umfang}</p>
              <p className="mt-1 text-sm text-muted">Preis auf Anfrage</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.punkte.map((punkt) => (
                  <li key={punkt} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-akzent" aria-hidden="true" />
                    {punkt}
                  </li>
                ))}
              </ul>
              <Link
                href="#kontakt"
                className={`mt-8 ${p.hervorgehoben ? 'knopf-primaer' : 'knopf-sekundaer'}`}
                aria-label={`Offerte anfragen für das Paket ${p.name}`}
              >
                Offerte anfragen
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-10 max-w-5xl text-center">
          <p className="font-medium">Mehr Benutzer? Wir erstellen gerne ein Angebot.</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {HINWEISE.map((h) => (
              <li key={h} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-akzent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
