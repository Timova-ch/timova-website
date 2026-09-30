import { Mail, Clock } from 'lucide-react';
import { KontaktFormular } from '../KontaktFormular';
import { KONTAKT_EMAIL } from '@/lib/site';

export function Kontakt() {
  return (
    <section id="kontakt" className="abschnitt border-t border-line bg-surface" aria-labelledby="kontakt-titel">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <div>
            <p className="kicker">Kontakt</p>
            <h2 id="kontakt-titel" className="ueberschrift">
              Demo anfragen
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Erzählen Sie uns kurz von Ihrem Betrieb. Wir melden uns innert zwei Werktagen und vereinbaren einen Termin
              für eine Demo von 30 Minuten.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-akzent" aria-hidden="true" />
                <a href={`mailto:${KONTAKT_EMAIL}`} className="font-medium hover:underline">
                  {KONTAKT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Clock className="h-5 w-5 text-akzent" aria-hidden="true" />
                Werktage 8 bis 17 Uhr
              </li>
            </ul>
          </div>
          <div className="rounded-token-lg border border-line bg-canvas p-6 sm:p-8">
            <KontaktFormular />
          </div>
        </div>
      </div>
    </section>
  );
}
