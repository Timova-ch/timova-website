const SCHRITTE = [
  { titel: 'Demo', text: 'In 30 Minuten zeigen wir Ihnen Timova an einem Beispiel, das Ihrem Betrieb ähnelt.' },
  { titel: 'Einrichtung', text: 'Wir richten Timova mit Ihren Schichtmodellen, Abteilungen und Regeln ein.' },
  { titel: 'Pilot', text: 'Ein Team arbeitet drei Monate mit Timova. Danach entscheiden Sie.' }
];

export function Start() {
  return (
    <section className="abschnitt border-y border-line bg-surface" aria-labelledby="start-titel">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">So läuft der Start</p>
          <h2 id="start-titel" className="ueberschrift">
            In drei Schritten zum ersten Plan
          </h2>
        </div>
        <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {SCHRITTE.map((s, i) => (
            <li key={s.titel} className="rounded-token-lg border border-line bg-canvas p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary font-brand text-lg font-semibold text-on-primary">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{s.titel}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
