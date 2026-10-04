import { ArrowRight } from 'lucide-react';

const PUNKTE = [
  {
    heute: 'Der Plan steckt in Excel-Listen, die nur eine Person wirklich versteht.',
    timova: 'Ein gemeinsamer Plan, den alle sehen und den Planende direkt bearbeiten.'
  },
  {
    heute: 'Ferienwünsche und Tauschanfragen kommen per Zettel, Anruf oder WhatsApp.',
    timova: 'Anträge und Diensttausch per Klick, mit Freigabe und Benachrichtigung.'
  },
  {
    heute: 'Wer fehlt, wer einspringt und ob die Schicht besetzt ist, sieht man erst am Morgen.',
    timova: 'Besetzung je Schicht und Tag auf einen Blick, Lücken sind sofort sichtbar.'
  }
];

export function ProblemLoesung() {
  return (
    <section className="abschnitt border-y border-line bg-surface" aria-labelledby="problem-titel">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">Aus dem Betrieb für den Betrieb</p>
          <h2 id="problem-titel" className="ueberschrift">
            Planung, die nicht mehr an einer Person hängt
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Timova ist im Schichtalltag eines Logistikbetriebs entstanden. Gebaut für die Fragen, die dort jeden Tag
            gestellt werden.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:gap-6">
          <div className="hidden grid-cols-[1fr_auto_1fr] gap-6 px-6 text-sm font-semibold uppercase tracking-wider md:grid">
            <span className="text-muted">Heute</span>
            <span className="w-6" />
            <span className="text-akzent">Mit Timova</span>
          </div>
          {PUNKTE.map((p) => (
            <div
              key={p.heute}
              className="grid gap-3 rounded-token-lg border border-line bg-canvas p-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6"
            >
              <p className="text-muted">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider md:hidden">Heute</span>
                {p.heute}
              </p>
              <ArrowRight className="hidden h-6 w-6 text-akzent md:block" aria-hidden="true" />
              <p className="font-medium text-content">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-akzent md:hidden">
                  Mit Timova
                </span>
                {p.timova}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
