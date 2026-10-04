import {
  ArrowLeftRight,
  Building2,
  CalendarDays,
  Download,
  GraduationCap,
  KanbanSquare,
  Palmtree,
  Smartphone,
  Sun
} from 'lucide-react';
import { Screenshot } from '../Screenshot';

const FUNKTIONEN: { icon: typeof Sun; titel: string; text: string; ziel?: string }[] = [
  {
    icon: CalendarDays,
    titel: 'Dienstplan für Woche und Monat',
    text: 'Planen Sie mit Ihren eigenen Abteilungen und Schichten, von Hand oder mit dem Autoplaner. Die Besetzung je Tag sehen Sie direkt darunter.'
  },
  {
    icon: Palmtree,
    titel: 'Abwesenheiten und Anträge',
    text: 'Mitarbeitende stellen Anträge, Planende geben sie frei. Ferien und Abwesenheiten erscheinen automatisch im Plan.'
  },
  {
    icon: Sun,
    titel: 'Jahresurlaubsplaner',
    text: 'Ferienwünsche fürs ganze Jahr sammeln, gleichzeitige Abwesenheiten prüfen und gesammelt übernehmen.',
    ziel: '#ferienplaner'
  },
  {
    icon: GraduationCap,
    titel: 'Skills und Anlernphasen',
    text: 'Qualifikationen je Person mit Note 1 bis 6. Der Autoplaner beachtet die Skills, Anlernphasen sind im Plan markiert.',
    ziel: '#skills'
  },
  {
    icon: KanbanSquare,
    titel: 'Teamboard',
    text: 'Pendenzen mit Status, Verantwortlichen und Verlauf, Projekte, Infos, Meetings und Aufgaben für jeden Standort.',
    ziel: '#teamboard'
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
    titel: 'Mobil und per E-Mail informiert',
    text: 'Mitarbeitende sehen Dienste und Anträge auf dem Handy, direkt im Browser. Bei neuen Anträgen und Entscheiden informiert Timova per E-Mail.'
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
            Kein Baukasten mit hundert Optionen, sondern die Funktionen, die im Schichtbetrieb täglich gebraucht werden:
            vom Dienstplan über die Ferien bis zu Skills und Teamboard.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUNKTIONEN.map(({ icon: Icon, titel, text, ziel }) => (
            <li key={titel} className="rounded-token-lg border border-line bg-surface p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-token bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">
                {ziel ? (
                  <a href={ziel} className="underline decoration-line underline-offset-4 hover:text-akzent">
                    {titel}
                  </a>
                ) : (
                  titel
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker">Für Mitarbeitende</p>
            <h3 className="text-2xl font-semibold sm:text-3xl">Einfach genug für alle im Team</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Keine App zum Installieren, kein Handbuch. Mitarbeitende öffnen Timova im Browser und sehen ihre Dienste für
              Tag, Woche oder Monat. Ferien beantragen oder einen Dienst tauschen geht mit wenigen Klicks, auch auf dem
              Handy.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[280px]">
            <div className="overflow-hidden rounded-[2rem] border-[6px] border-nacht-600 bg-surface shadow-2xl shadow-nacht/20 dark:border-line">
              <Screenshot
                hell="/bilder/mobil-dashboard-woche.webp"
                alt="Timova auf dem Handy in dunkler Darstellung: Wochenansicht eines Mitarbeiters für die Kalenderwoche 42 mit Nachtdienst von Montag bis Freitag."
                breite={780}
                hoehe={1688}
                sizes="280px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="lg:order-2">
            <p className="kicker">Für die Planung</p>
            <h3 className="text-2xl font-semibold sm:text-3xl">Das Wichtigste auf der Startseite</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Das Dashboard zeigt offene Anfragen und Pendenzen, wer diese Woche Springer ist, welche Anlernphase ansteht
              und ob die Ferienplanung offen ist. Darunter der eigene Plan oder auf Knopfdruck der des ganzen Teams.
            </p>
          </div>
          <div className="overflow-hidden rounded-token-lg border border-line bg-surface shadow-xl shadow-nacht/10 lg:order-1">
            <Screenshot
              hell="/bilder/dashboard-planung-hell.webp"
              alt="Dashboard der Planung: Kacheln zu Anfragen, Pendenzen, Diensttausch, Springer der Woche, bevorstehender Anlernphase und Urlaubsplanung, darunter die Wochenansicht des ganzen Teams mit Früh- und Spätdiensten."
              breite={2048}
              hoehe={1678}
              sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
