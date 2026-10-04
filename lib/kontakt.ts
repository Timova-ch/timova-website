/**
 * Formular «Demo anfragen»: Felder, Prüfung und Mailtext.
 * Wird vom Route Handler (app/api/kontakt) und vom Formular gemeinsam genutzt.
 */

export const MITARBEITENDE_OPTIONEN = ['bis 25', '26 bis 50', '51 bis 100', 'über 100'] as const;

/** Unter dieser Zeit (ms) zwischen Laden und Absenden gilt eine Anfrage als automatisiert. */
export const MINDEST_AUSFUELLZEIT_MS = 3000;
/** Ältere Formulare (Zeitstempel) werden nicht mehr angenommen. */
export const MAX_FORMULARALTER_MS = 24 * 60 * 60 * 1000;

export type Anfrage = {
  name: string;
  firma: string;
  email: string;
  telefon: string;
  mitarbeitende: string;
  nachricht: string;
};

export type Feld = keyof Anfrage | 'datenschutz';

export type Pruefergebnis =
  | { ok: true; anfrage: Anfrage }
  | { ok: false; fehler: Partial<Record<Feld, string>> };

const MAX = { name: 100, firma: 150, email: 200, telefon: 40, nachricht: 3000 } as const;

function text(wert: unknown): string {
  return typeof wert === 'string' ? wert.trim() : '';
}

// Bewusst einfach: ein @, kein Leerzeichen, ein Punkt in der Domain.
const EMAIL_MUSTER = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFON_MUSTER = /^[+0-9 ()./-]{6,40}$/;

export function pruefeAnfrage(eingabe: Record<string, unknown>): Pruefergebnis {
  const anfrage: Anfrage = {
    name: text(eingabe.name),
    firma: text(eingabe.firma),
    email: text(eingabe.email),
    telefon: text(eingabe.telefon),
    mitarbeitende: text(eingabe.mitarbeitende),
    nachricht: text(eingabe.nachricht)
  };
  const fehler: Partial<Record<Feld, string>> = {};

  if (!anfrage.name) fehler.name = 'Bitte geben Sie Ihren Namen an.';
  else if (anfrage.name.length > MAX.name) fehler.name = 'Der Name ist zu lang.';

  if (!anfrage.firma) fehler.firma = 'Bitte geben Sie Ihre Firma an.';
  else if (anfrage.firma.length > MAX.firma) fehler.firma = 'Der Firmenname ist zu lang.';

  if (!anfrage.email) fehler.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';
  else if (anfrage.email.length > MAX.email || !EMAIL_MUSTER.test(anfrage.email))
    fehler.email = 'Bitte prüfen Sie die E-Mail-Adresse.';

  if (anfrage.telefon && !TELEFON_MUSTER.test(anfrage.telefon))
    fehler.telefon = 'Bitte prüfen Sie die Telefonnummer.';

  if (anfrage.mitarbeitende && !(MITARBEITENDE_OPTIONEN as readonly string[]).includes(anfrage.mitarbeitende))
    fehler.mitarbeitende = 'Bitte wählen Sie einen Eintrag aus der Liste.';

  if (anfrage.nachricht.length > MAX.nachricht)
    fehler.nachricht = `Die Nachricht ist zu lang (höchstens ${MAX.nachricht} Zeichen).`;

  if (eingabe.datenschutz !== true && eingabe.datenschutz !== 'on' && eingabe.datenschutz !== 'true')
    fehler.datenschutz = 'Bitte bestätigen Sie die Datenschutzerklärung.';

  return Object.keys(fehler).length ? { ok: false, fehler } : { ok: true, anfrage };
}

/**
 * Spam-Merkmale: ausgefülltes Honeypot-Feld oder ein Formular, das zu schnell
 * (oder mit unmöglichem Zeitstempel) abgeschickt wurde.
 */
export function wirktAutomatisiert(eingabe: Record<string, unknown>, jetzt = Date.now()): boolean {
  if (text(eingabe.website) !== '') return true;
  const geladen = Number(eingabe.geladen);
  if (!Number.isFinite(geladen) || geladen <= 0) return true;
  const dauer = jetzt - geladen;
  return dauer < MINDEST_AUSFUELLZEIT_MS || dauer > MAX_FORMULARALTER_MS;
}

function html(wert: string): string {
  return wert
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const LEER = '(keine Angabe)';

export function mailInhalt(a: Anfrage): { betreff: string; text: string; html: string } {
  const zeilen: [string, string][] = [
    ['Name', a.name],
    ['Firma', a.firma],
    ['E-Mail', a.email],
    ['Telefon', a.telefon || LEER],
    ['Mitarbeitende', a.mitarbeitende || LEER]
  ];
  const nachricht = a.nachricht || LEER;
  // Zeilenumbrüche im Betreff wären ein Einfallstor für zusätzliche Header.
  const betreff = `Demo-Anfrage: ${a.firma}`.replace(/[\r\n]+/g, ' ').slice(0, 160);
  const text = [...zeilen.map(([k, v]) => `${k}: ${v}`), '', 'Nachricht:', nachricht].join('\n');
  const tabelle = zeilen
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5B6664">${k}</td><td style="padding:4px 0">${html(v)}</td></tr>`)
    .join('');
  const htmlText = `<div style="font-family:system-ui,sans-serif;color:#16201F"><h2 style="color:#0F4C4F;margin:0 0 12px">Neue Demo-Anfrage</h2><table>${tabelle}</table><p style="margin:16px 0 4px;color:#5B6664">Nachricht</p><p style="white-space:pre-wrap;margin:0">${html(nachricht)}</p></div>`;
  return { betreff, text, html: htmlText };
}
