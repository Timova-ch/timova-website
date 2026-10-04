import Link from 'next/link';
import { MapPin, ShieldCheck, Smartphone } from 'lucide-react';
import { Screenshot } from '../Screenshot';
import { Galerie } from '../Galerie';

const MERKMALE = [
  { icon: MapPin, text: 'Daten in Zürich' },
  { icon: ShieldCheck, text: 'Nach Schweizer DSG' },
  { icon: Smartphone, text: 'Ohne App-Installation' }
];

const SIZES = '(min-width: 1024px) 1024px, 100vw';

// Einheitliches Format 16:10; höhere Bilder werden oben bündig zugeschnitten.
const RAHMEN = 'aspect-[16/10] w-full object-cover object-top';

const BILDER = [
  {
    titel: 'Dienstplan',
    hell: '/bilder/dienstplan-woche-hell.png',
    dunkel: '/bilder/dienstplan-woche-dunkel.png',
    alt: 'Wochenansicht des Dienstplans in Timova: vier Mitarbeitende mit Früh-, Spät- und Nachtschichten von Montag bis Freitag, darunter die Besetzung je Schicht.',
    breite: 1440,
    hoehe: 900
  },
  {
    titel: 'Dashboard',
    hell: '/bilder/dashboard-mitarbeiter-hell.webp',
    alt: 'Dashboard eines Mitarbeiters: eigene Anfragen, Pendenzen und Diensttausch, was als Nächstes ansteht, die Apps Notizen und Telefonbuch und darunter der eigene Monatsplan.',
    breite: 2048,
    hoehe: 1280
  },
  {
    titel: 'Teamboard',
    hell: '/bilder/teamboard-hell.webp',
    alt: 'Teamboard mit Team-Infos, Meetings auf einem Zeitstrahl und den Aufgaben-Spalten To Do, In Arbeit und Done.',
    breite: 2048,
    hoehe: 1280
  },
  {
    titel: 'Ferienplaner',
    hell: '/bilder/ferienplaner-hell.webp',
    alt: 'Jahresurlaubsplaner im Juli: eingetragene Ferienwünsche des Teams, rot markierte Tage mit zu vielen gleichzeitigen Abwesenheiten und die Liste der Kollisionen.',
    breite: 2048,
    hoehe: 1422
  }
];

export function Hero() {
  return (
    <section className="overflow-hidden pb-16 pt-14 sm:pt-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">Dienstplan · Ferien · Skills · Team</p>
          <h1 className="text-4xl font-semibold leading-tight text-content sm:text-5xl lg:text-6xl">
            Dienstplan, Ferien, Skills und Team an einem Ort.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Timova bringt Dienstplanung, Ferienplanung, Qualifikationen und Teamorganisation zusammen. So weiss Ihr Team,
            wer wann arbeitet, wer was kann und was ansteht, ohne Excel, Papier und WhatsApp.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#kontakt" className="knopf-primaer">
              Demo anfragen
            </Link>
            <Link href="#funktionen" className="knopf-sekundaer">
              Funktionen ansehen
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {MERKMALE.map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-akzent" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -bottom-8 top-24 -z-10 rounded-[2rem] bg-gradient-to-br from-spaet/20 via-nacht/10 to-frueh/20 blur-2xl"
          />
          <Galerie
            label="Ansichten aus Timova"
            eintraege={BILDER.map((b, i) => ({
              titel: b.titel,
              inhalt: (
                <div className="overflow-hidden rounded-token-lg border border-line bg-surface shadow-2xl shadow-nacht/10">
                  <Screenshot
                    hell={b.hell}
                    dunkel={b.dunkel}
                    alt={b.alt}
                    breite={b.breite}
                    hoehe={b.hoehe}
                    sizes={SIZES}
                    prioritaet={i === 0}
                    className={RAHMEN}
                  />
                </div>
              )
            }))}
          />
        </div>
      </div>
    </section>
  );
}
