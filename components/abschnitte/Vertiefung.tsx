import { Check } from 'lucide-react';
import { Screenshot } from '../Screenshot';

export type VertiefungsBild = {
  src: string;
  alt: string;
  breite: number;
  hoehe: number;
  /** Unterschrift unter dem Bild. */
  titel?: string;
};

type Props = {
  id: string;
  kicker: string;
  titel: string;
  einleitung: string;
  punkte: { titel: string; text: string }[];
  bilder: [VertiefungsBild, ...VertiefungsBild[]];
  /** Bild links statt rechts (ab lg). */
  bildLinks?: boolean;
  /** Abschnitt mit Fläche statt Seitenhintergrund. */
  flaeche?: boolean;
};

/** Vertiefung einer Funktion: Text mit Punkten, daneben Screenshots aus der App. */
export function Vertiefung({ id, kicker, titel, einleitung, punkte, bilder, bildLinks, flaeche }: Props) {
  const [haupt, ...weitere] = bilder;
  return (
    <section
      id={id}
      className={`abschnitt ${flaeche ? 'border-y border-line bg-surface' : ''}`}
      aria-labelledby={`${id}-titel`}
    >
      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className={bildLinks ? 'lg:order-2' : undefined}>
            <p className="kicker">{kicker}</p>
            <h2 id={`${id}-titel`} className="ueberschrift">
              {titel}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{einleitung}</p>
            <ul className="mt-8 space-y-5">
              {punkte.map((p) => (
                <li key={p.titel} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{p.titel}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={`space-y-6 ${bildLinks ? 'lg:order-1' : ''}`}>
            <Bild bild={haupt} sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw" />
            {weitere.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {weitere.map((b) => (
                  <Bild key={b.src} bild={b} sizes="(min-width: 1280px) 340px, (min-width: 640px) 50vw, 100vw" />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Bild({ bild, sizes }: { bild: VertiefungsBild; sizes: string }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-token-lg border border-line bg-surface shadow-xl shadow-nacht/10">
        <Screenshot
          hell={bild.src}
          alt={bild.alt}
          breite={bild.breite}
          hoehe={bild.hoehe}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      {bild.titel ? <figcaption className="mt-2 text-sm text-muted">{bild.titel}</figcaption> : null}
    </figure>
  );
}
