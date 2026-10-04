import { ChevronDown } from 'lucide-react';
import { SUPPORT_EMAIL } from '@/lib/site';

const FRAGEN: { frage: string; antwort: React.ReactNode }[] = [
  {
    frage: 'Wo liegen die Daten?',
    antwort:
      'Die Datenbank der Anwendung liegt in Zürich. Die Dienstleister, die wir einsetzen, sind auf der Seite Unterauftragsverarbeiter aufgeführt.'
  },
  {
    frage: 'Wer zählt als Benutzer?',
    antwort:
      'Es zählen nur aktive Benutzer, also Personen mit einem aktiven Zugang. Deaktivieren Sie ein Konto, zum Beispiel nach einem Austritt, zählt es nicht mehr.'
  },
  {
    frage: 'Brauchen Mitarbeitende eine App?',
    antwort:
      'Nein. Timova läuft im Browser, es muss nichts installiert werden. Auf dem Handy sehen Mitarbeitende ihre Dienste, stellen Anträge und tauschen Dienste. Dienstplanung, Ferienplaner und Teamboard sind für den Computer gedacht.'
  },
  {
    frage: 'Berücksichtigt die Planung die Qualifikationen?',
    antwort:
      'Ja. Der Autoplaner teilt in einer Abteilung nur Personen ein, die den passenden Skill haben, und plant bei Bedarf zuerst jemanden mit einem verlangten Spezialskill ein. Die Noten von 1 bis 6 dienen der Übersicht und der Planung von Anlernphasen, auf den Autoplaner haben sie keinen Einfluss.'
  },
  {
    frage: 'Wie läuft die Ferienplanung ab?',
    antwort:
      'Die Planung schaltet ein Ferienjahr frei, auf Wunsch mit Frist. Mitarbeitende tragen ihre Wünsche selbst ein, Timova zeigt Tage mit zu vielen gleichzeitigen Abwesenheiten. Am Ende übernimmt die Planung die Wünsche mit einem Klick als bewilligte Ferien in den Dienstplan.'
  },
  {
    frage: 'Wer sieht das Teamboard?',
    antwort:
      'Alle Mitarbeitenden eines Standorts sehen dessen Teamboard. Pendenzen anlegen und kommentieren können alle; ändern dürfen die Planung und wer die Pendenz angelegt hat. Jeder Standort hat sein eigenes Teamboard, andere Betriebe sehen nichts davon.'
  },
  {
    frage: 'Kann ich meine Daten exportieren?',
    antwort:
      'Ja, jederzeit. Administratoren laden die Daten ihres Betriebs als ZIP mit CSV-Dateien herunter, auch nach Vertragsende.'
  },
  {
    frage: 'Wie lange dauert die Einrichtung?',
    antwort:
      'Das hängt von der Zahl der Schichtmodelle und Abteilungen ab. Für ein Team ist Timova meist innert weniger Tage startklar.'
  },
  {
    frage: 'Gibt es Support?',
    antwort: (
      <>
        Ja, an Werktagen von 8 bis 17 Uhr per E-Mail an{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-akzent underline underline-offset-2">
          {SUPPORT_EMAIL}
        </a>
        .
      </>
    )
  }
];

export function Faq() {
  return (
    <section id="faq" className="abschnitt" aria-labelledby="faq-titel">
      <div className="container max-w-3xl">
        <div className="text-center">
          <p className="kicker">Fragen</p>
          <h2 id="faq-titel" className="ueberschrift">
            Häufige Fragen
          </h2>
        </div>
        <div className="mt-10 divide-y divide-line rounded-token-lg border border-line bg-surface">
          {FRAGEN.map((f) => (
            <details key={f.frage} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold">{f.frage}</h3>
                <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-6 pb-5 leading-relaxed text-muted">{f.antwort}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
