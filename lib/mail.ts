import type { Anfrage } from './kontakt';
import { mailInhalt } from './kontakt';

const RESEND_URL = 'https://api.resend.com/emails';
const ABSENDER = 'Timova Website <noreply@timova.ch>';
const EMPFAENGER = 'kontakt@timova.ch';

export type Versand = { status: 'gesendet' } | { status: 'test' } | { status: 'fehler'; grund: string };

/**
 * Schickt die Anfrage über Resend. Ohne RESEND_API_KEY wird nichts versendet:
 * lokal läuft das Formular dann im Testmodus (nur Protokoll), auf Vercel ist
 * ein fehlender Schlüssel ein Fehler, damit keine Anfrage still verloren geht.
 */
export async function versendeAnfrage(anfrage: Anfrage): Promise<Versand> {
  const schluessel = process.env.RESEND_API_KEY?.trim();
  if (!schluessel) {
    if (process.env.VERCEL) return { status: 'fehler', grund: 'RESEND_API_KEY fehlt' };
    console.info('[kontakt] Testmodus ohne RESEND_API_KEY, keine E-Mail versendet:', {
      firma: anfrage.firma,
      mitarbeitende: anfrage.mitarbeitende
    });
    return { status: 'test' };
  }

  const { betreff, text, html } = mailInhalt(anfrage);
  try {
    const antwort = await fetch(RESEND_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${schluessel}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: ABSENDER,
        to: [EMPFAENGER],
        reply_to: anfrage.email,
        subject: betreff,
        text,
        html
      }),
      signal: AbortSignal.timeout(10_000)
    });
    if (!antwort.ok) return { status: 'fehler', grund: `Resend ${antwort.status}: ${await antwort.text()}` };
    return { status: 'gesendet' };
  } catch (fehler) {
    return { status: 'fehler', grund: String(fehler) };
  }
}
