/** Rahmen für Impressum, Datenschutz und Unterauftragsverarbeiter. */
export function Rechtsseite({ html }: { html: string }) {
  return (
    <div className="container max-w-3xl py-14 sm:py-20">
      {/* Inhalt stammt aus content/*.md im Repo, nicht aus Eingaben */}
      <article className="rechtstext" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
