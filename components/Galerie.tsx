'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type Props = {
  /** Beschriftung der Registerkarten und der jeweilige Inhalt (Screenshot). */
  eintraege: { titel: string; inhalt: ReactNode }[];
  label: string;
};

/**
 * Wechsel zwischen Screenshots als Registerkarten (WAI-ARIA Tabs, Pfeiltasten).
 * Verborgene Bilder sind `hidden` und `loading="lazy"`: Der Browser lädt sie erst,
 * wenn sie gezeigt werden.
 */
export function Galerie({ eintraege, label }: Props) {
  const [aktiv, setAktiv] = useState(0);
  const basis = useId();
  const knoepfe = useRef<(HTMLButtonElement | null)[]>([]);

  function taste(e: KeyboardEvent<HTMLButtonElement>) {
    const n = eintraege.length;
    const ziel =
      e.key === 'ArrowRight' ? (aktiv + 1) % n
      : e.key === 'ArrowLeft' ? (aktiv - 1 + n) % n
      : e.key === 'Home' ? 0
      : e.key === 'End' ? n - 1
      : null;
    if (ziel === null) return;
    e.preventDefault();
    setAktiv(ziel);
    knoepfe.current[ziel]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="mx-auto mb-5 grid w-full grid-cols-2 gap-1 rounded-token-lg border border-line bg-surface p-1 sm:flex sm:w-fit sm:justify-center">
        {eintraege.map((e, i) => (
          <button
            key={e.titel}
            ref={(el) => {
              knoepfe.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${basis}-tab-${i}`}
            aria-selected={i === aktiv}
            aria-controls={`${basis}-panel-${i}`}
            tabIndex={i === aktiv ? 0 : -1}
            onClick={() => setAktiv(i)}
            onKeyDown={taste}
            className={`whitespace-nowrap rounded-token px-3 py-2 text-sm font-medium transition sm:px-4 ${
              i === aktiv ? 'bg-primary text-on-primary' : 'text-muted hover:bg-surface-2 hover:text-content'
            }`}
          >
            {e.titel}
          </button>
        ))}
      </div>
      {eintraege.map((e, i) => (
        <div
          key={e.titel}
          role="tabpanel"
          id={`${basis}-panel-${i}`}
          aria-labelledby={`${basis}-tab-${i}`}
          hidden={i !== aktiv}
        >
          {e.inhalt}
        </div>
      ))}
    </div>
  );
}
