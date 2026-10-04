import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Marked } from 'marked';

const marked = new Marked({ gfm: true, breaks: true });

/**
 * Liest einen Rechtstext aus content/ und wandelt ihn beim Build in HTML.
 * Offene Platzhalter in eckigen Klammern (z. B. [FIRMA]) bleiben sichtbar und
 * werden markiert, bis sie gefüllt sind (docs/OFFEN.md).
 */
export function rechtstext(datei: 'impressum' | 'datenschutz' | 'unterauftragsverarbeiter'): string {
  const quelle = readFileSync(path.join(process.cwd(), 'content', `${datei}.md`), 'utf8');
  return marked.parse(markierePlatzhalter(quelle), { async: false });
}

/**
 * Markiert [PLATZHALTER] im Markdown, bevor es umgewandelt wird. Links
 * ([Text](/pfad)) bleiben unberührt. Unterstriche im Platzhalter
 * (CHE-___.___.___) werden maskiert, sonst liest Markdown sie als Betonung.
 */
export function markierePlatzhalter(markdown: string): string {
  return markdown.replace(
    /\[([^\]\n]+)\](?!\()/g,
    (treffer) => `<mark class="platzhalter">${treffer.replace(/_/g, '&#95;')}</mark>`
  );
}
