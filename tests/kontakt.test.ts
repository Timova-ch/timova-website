import { describe, expect, it } from 'vitest';
import { mailInhalt, pruefeAnfrage, wirktAutomatisiert } from '@/lib/kontakt';
import { markierePlatzhalter } from '@/lib/rechtstext';

const gueltig = {
  name: 'Alex Muster',
  firma: 'Muster AG',
  email: 'alex@muster.ch',
  telefon: '+41 61 000 00 00',
  mitarbeitende: '26 bis 50',
  nachricht: 'Wir planen heute in Excel.',
  datenschutz: true
};

describe('pruefeAnfrage', () => {
  it('nimmt eine vollständige Anfrage an und kürzt Leerzeichen', () => {
    const r = pruefeAnfrage({ ...gueltig, name: '  Alex Muster  ' });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.anfrage.name).toBe('Alex Muster');
  });

  it('verlangt Pflichtfelder und die Datenschutz-Bestätigung', () => {
    const r = pruefeAnfrage({});
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.fehler).sort()).toEqual(['datenschutz', 'email', 'firma', 'name']);
  });

  it('weist ungültige E-Mail, Telefonnummer und unbekannte Auswahl ab', () => {
    const r = pruefeAnfrage({ ...gueltig, email: 'kein-at', telefon: 'abc', mitarbeitende: '1000' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.fehler).sort()).toEqual(['email', 'mitarbeitende', 'telefon']);
  });

  it('begrenzt die Länge der Nachricht', () => {
    const r = pruefeAnfrage({ ...gueltig, nachricht: 'x'.repeat(3001) });
    expect(r.ok).toBe(false);
  });

  it('ignoriert Werte, die keine Texte sind', () => {
    const r = pruefeAnfrage({ ...gueltig, name: { $ne: '' } });
    expect(r.ok).toBe(false);
  });
});

describe('wirktAutomatisiert', () => {
  const jetzt = 1_000_000_000;
  it('erkennt das Honeypot-Feld', () => {
    expect(wirktAutomatisiert({ website: 'http://spam', geladen: jetzt - 10_000 }, jetzt)).toBe(true);
  });
  it('erkennt zu schnelles Absenden und fehlenden Zeitstempel', () => {
    expect(wirktAutomatisiert({ geladen: jetzt - 500 }, jetzt)).toBe(true);
    expect(wirktAutomatisiert({}, jetzt)).toBe(true);
  });
  it('lässt normale Anfragen durch', () => {
    expect(wirktAutomatisiert({ website: '', geladen: jetzt - 20_000 }, jetzt)).toBe(false);
  });
});

describe('mailInhalt', () => {
  it('maskiert HTML und hält den Betreff einzeilig', () => {
    const r = pruefeAnfrage({ ...gueltig, firma: 'Böse <b>AG</b>\nBcc: x@y.ch', nachricht: '<script>alert(1)</script>' });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const m = mailInhalt(r.anfrage);
    expect(m.betreff).not.toMatch(/[\r\n]/);
    expect(m.html).not.toContain('<script>');
    expect(m.html).toContain('&lt;script&gt;');
  });
});

describe('markierePlatzhalter', () => {
  it('markiert Klammern, lässt Links in Ruhe', () => {
    expect(markierePlatzhalter('[FIRMA], [Link](/x)')).toBe('<mark class="platzhalter">[FIRMA]</mark>, [Link](/x)');
  });
  it('maskiert Unterstriche im Platzhalter', () => {
    expect(markierePlatzhalter('[UID CHE-___]')).toBe('<mark class="platzhalter">[UID CHE-&#95;&#95;&#95;]</mark>');
  });
});

describe('Rechtstexte', () => {
  it.each(['impressum', 'datenschutz', 'unterauftragsverarbeiter'] as const)('%s hat Inhalt und Überschrift', async (datei) => {
    const { rechtstext } = await import('@/lib/rechtstext');
    const html = rechtstext(datei);
    expect(html).toMatch(/<h1>/);
    expect(html).not.toMatch(/<em>/);
    expect(html.length).toBeGreaterThan(500);
  });
});
