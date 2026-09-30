import Link from 'next/link';
import { MapPin, ShieldCheck, Smartphone } from 'lucide-react';
import { Screenshot } from '../Screenshot';

const MERKMALE = [
  { icon: MapPin, text: 'Daten in Zürich' },
  { icon: ShieldCheck, text: 'Nach Schweizer DSG' },
  { icon: Smartphone, text: 'Ohne App-Installation' }
];

export function Hero() {
  return (
    <section className="overflow-hidden pb-16 pt-14 sm:pt-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">Dienstplan und Einsatzplanung</p>
          <h1 className="text-4xl font-semibold leading-tight text-content sm:text-5xl lg:text-6xl">
            Ihr Dienstplan an einem Ort. Nicht in fünf Listen.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Timova bringt Dienstpläne, Abwesenheiten und Ferien zusammen, damit Ihr Team weiss, wer wann arbeitet,
            ohne Excel, Papier und WhatsApp.
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

        <div className="relative mx-auto mt-14 max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -bottom-8 top-10 -z-10 rounded-[2rem] bg-gradient-to-br from-spaet/20 via-nacht/10 to-frueh/20 blur-2xl"
          />
          <div className="overflow-hidden rounded-token-lg border border-line bg-surface shadow-2xl shadow-nacht/10">
            <Screenshot
              hell="/bilder/dienstplan-woche-hell.png"
              dunkel="/bilder/dienstplan-woche-dunkel.png"
              alt="Wochenansicht des Dienstplans in Timova: vier Mitarbeitende mit Früh-, Spät- und Nachtschichten von Montag bis Freitag, darunter die Besetzung je Schicht."
              breite={1440}
              hoehe={900}
              sizes="(min-width: 1024px) 1024px, 100vw"
              prioritaet
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
