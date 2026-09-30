import { NextResponse } from 'next/server';
import { pruefeAnfrage, wirktAutomatisiert } from '@/lib/kontakt';
import { erlaubt } from '@/lib/ratenbegrenzung';
import { versendeAnfrage } from '@/lib/mail';
import { KONTAKT_EMAIL } from '@/lib/site';

export const runtime = 'nodejs';

const MAX_BYTES = 16_000;

function antwort(status: number, daten: Record<string, unknown>) {
  return NextResponse.json(daten, { status, headers: { 'Cache-Control': 'no-store' } });
}

function clientIp(request: Request): string {
  const weitergeleitet = request.headers.get('x-forwarded-for');
  return weitergeleitet?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unbekannt';
}

/** Nur Anfragen von der eigenen Seite (Origin gleich Host). */
function gleicherUrsprung(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === (request.headers.get('x-forwarded-host') ?? request.headers.get('host'));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!gleicherUrsprung(request)) {
    return antwort(403, { ok: false, meldung: 'Anfrage nicht erlaubt.' });
  }
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return antwort(415, { ok: false, meldung: 'Ungültiges Format.' });
  }
  if (!erlaubt(clientIp(request))) {
    return antwort(429, {
      ok: false,
      meldung: `Zu viele Anfragen. Bitte versuchen Sie es später erneut oder schreiben Sie an ${KONTAKT_EMAIL}.`
    });
  }

  let eingabe: Record<string, unknown>;
  try {
    const roh = await request.text();
    if (roh.length > MAX_BYTES) return antwort(413, { ok: false, meldung: 'Die Anfrage ist zu gross.' });
    const daten: unknown = JSON.parse(roh);
    if (!daten || typeof daten !== 'object' || Array.isArray(daten)) throw new Error('kein Objekt');
    eingabe = daten as Record<string, unknown>;
  } catch {
    return antwort(400, { ok: false, meldung: 'Ungültige Anfrage.' });
  }

  // Automatisierte Anfragen bekommen eine Erfolgsmeldung, damit sie nicht
  // nachbessern, werden aber nicht versendet.
  if (wirktAutomatisiert(eingabe)) {
    return antwort(200, { ok: true });
  }

  const pruefung = pruefeAnfrage(eingabe);
  if (!pruefung.ok) {
    return antwort(422, { ok: false, meldung: 'Bitte prüfen Sie die markierten Felder.', fehler: pruefung.fehler });
  }

  const versand = await versendeAnfrage(pruefung.anfrage);
  if (versand.status === 'fehler') {
    console.error('[kontakt] Versand fehlgeschlagen:', versand.grund);
    return antwort(502, {
      ok: false,
      meldung: `Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns direkt an ${KONTAKT_EMAIL}.`
    });
  }
  return antwort(200, { ok: true, ...(versand.status === 'test' ? { test: true } : {}) });
}
