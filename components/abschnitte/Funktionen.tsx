import { ArrowLeftRight, Bell, Building2, CalendarDays, Download, KanbanSquare, Palmtree, Smartphone } from 'lucide-react';
import { Screenshot } from '../Screenshot';

const FUNKTIONEN = [
  {
    icon: CalendarDays,
    titel: 'Dienstplan für Woche und Monat',
    text: 'Planen Sie mit Ihren eigenen Schichtmodellen, ob Früh, Spät, Nacht oder frei definiert. Die Besetzung je Tag sehen Sie direkt darunter.'
  },
  {
    icon: Palmtree,
    titel: 'Abwesenheiten und Ferien',
    text: 'Mitarbeitende stellen Anträge, Planende geben sie frei. Ferien und Abwesenheiten erscheinen automatisch im Plan.'
  },
  {
    icon: ArrowLeftRight,
    titel: 'Diensttausch',
    text: 'Mitarbeitende bieten Dienste zum Tausch an und übernehmen sie gegenseitig. Sie behalten die Freigabe.'
  },
  {
    icon: Building2,
    titel: 'Standorte, Abteilungen, Rollen',
    text: 'Mehrere Standorte und Abteilungen in einem Konto. Rollen und Rechte legen fest, wer was sieht und plant.'
  },
  {
    icon: Smartphone,
    titel: 'Mobile Ansicht',
    text: 'Mitarbeitende sehen ihre Dienste und Anträge auf dem Handy, direkt im Browser.'
  },
  {
    icon: Bell,
    titel: 'E-Mail-Benachrichtigungen',
    text: 'Bei neuen Anträgen und Entscheiden informiert Timova die richtigen Personen per E-Mail.'
  },
  {
    icon: KanbanSquare,
    titel: 'Teamboard',
    text: 'Pendenzen und Notizen fürs Team an einem Ort, statt verstreut in Chats und Mails.'
  },
  {
    icon: Download,
    titel: 'Datenexport jederzeit',
    text: 'Administratoren laden alle Daten ihres Betriebs selbst herunter, als ZIP mit CSV-Dateien.'
  }
];

export function Funktionen() {
  return (
    <section id="funktionen" className="abschnitt" aria-labelledby="funktionen-titel">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">Funktionen</p>
          <h2 id="funktionen-titel" className="ueberschrift">
            Alles, was die Einsatzplanung braucht
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Kein Baukasten mit hundert Optionen, sondern die Funktionen, die im Schichtbetrieb täglich gebraucht werden.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FUNKTIONEN.map(({ icon: Icon, titel, text }) => (
            <li key={titel} className="rounded-token-lg border border-line bg-surface p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-token bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker">Für Mitarbeitende</p>
            <h3 className="text-2xl font-semibold sm:text-3xl">Einfach genug für alle im Team</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Keine App zum Installieren, kein Handbuch. Mitarbeitende öffnen Timova im Browser, sehen ihren nächsten
              Dienst und wer mit ihnen arbeitet. Ferien beantragen oder einen Dienst tauschen geht mit wenigen Klicks.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[280px]">
            <div className="overflow-hidden rounded-[2rem] border-[6px] border-nacht-600 bg-surface shadow-2xl shadow-nacht/20 dark:border-line">
              <Screenshot
                hell="/bilder/mobil-dashboard.png"
                alt="Mobile Ansicht von Timova: Tagesansicht mit der Frühschicht und den Kolleginnen und Kollegen im selben Dienst, darunter die Knöpfe «Anfrage stellen» und «Meine Anfragen»."
                breite={780}
                hoehe={1180}
                sizes="280px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
