import { Activity, DatabaseBackup, FileSignature, KeyRound, Lock, MapPin, Split } from 'lucide-react';

const PUNKTE = [
  { icon: MapPin, titel: 'Daten in Zürich', text: 'Die Datenbank der Anwendung liegt in einem Rechenzentrum in Zürich.' },
  { icon: Split, titel: 'Strikte Trennung', text: 'Jeder Kunde sieht nur seine eigenen Daten. Die Trennung ist in der Datenbank selbst verankert.' },
  { icon: Lock, titel: 'Verschlüsselt', text: 'Übertragung und Speicherung der Daten erfolgen verschlüsselt.' },
  { icon: DatabaseBackup, titel: 'Tägliche Datensicherung', text: 'Ihre Daten werden jeden Tag gesichert.' },
  { icon: KeyRound, titel: 'Zwei-Faktor-Anmeldung', text: 'Für Administratoren Pflicht, für alle anderen Benutzer freiwillig.' },
  { icon: FileSignature, titel: 'AVV nach DSG', text: 'Auftragsverarbeitungsvertrag nach Schweizer Datenschutzgesetz, Verträge nach Schweizer Recht.' },
  { icon: Activity, titel: 'Verfügbarkeit 99.5 %', text: 'Zugesichert im Service Level Agreement.' }
];

export function Sicherheit() {
  return (
    <section id="sicherheit" className="abschnitt bg-nacht text-white dark:bg-surface dark:text-content" aria-labelledby="sicherheit-titel">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-nacht-hell">Sicherheit und Schweiz</p>
            <h2 id="sicherheit-titel" className="text-3xl font-semibold sm:text-4xl">
              Ihre Daten bleiben in der Schweiz
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80 dark:text-muted">
              Dienstpläne und Abwesenheiten sind Personendaten. Timova behandelt sie so: gespeichert in Zürich, geschützt
              nach Schweizer Datenschutzgesetz, vertraglich geregelt.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {PUNKTE.map(({ icon: Icon, titel, text }, i) => (
              <li
                key={titel}
                className={`flex gap-4 ${i === PUNKTE.length - 1 && PUNKTE.length % 2 ? 'sm:col-span-2' : ''} rounded-token-lg border border-white/15 bg-white/5 p-5 dark:border-line dark:bg-canvas`}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-frueh" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">{titel}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/80 dark:text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
