import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/kontakt/route';
import { zuruecksetzen } from '@/lib/ratenbegrenzung';

const HOST = 'timova.ch';

function anfrage(daten: Record<string, unknown>, kopf: Record<string, string> = {}) {
  return new Request(`https://${HOST}/api/kontakt`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      host: HOST,
      origin: `https://${HOST}`,
      'x-forwarded-for': '203.0.113.7',
      ...kopf
    },
    body: JSON.stringify(daten)
  });
}

const gueltig = () => ({
  name: 'Alex Muster',
  firma: 'Muster AG',
  email: 'alex@muster.ch',
  telefon: '',
  mitarbeitende: 'bis 25',
  nachricht: 'Hallo',
  datenschutz: true,
  website: '',
  geladen: Date.now() - 10_000
});

describe('POST /api/kontakt', () => {
  const fetchSpy = vi.fn();

  beforeEach(() => {
    zuruecksetzen();
    vi.stubGlobal('fetch', fetchSpy);
    fetchSpy.mockReset();
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('VERCEL', '');
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('läuft ohne RESEND_API_KEY im Testmodus und versendet nichts', async () => {
    const res = await POST(anfrage(gueltig()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, test: true });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('meldet auf Vercel einen fehlenden Schlüssel als Fehler', async () => {
    vi.stubEnv('VERCEL', '1');
    const res = await POST(anfrage(gueltig()));
    expect(res.status).toBe(502);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('schickt mit RESEND_API_KEY an Resend, mit Reply-To der Absenderin', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    fetchSpy.mockResolvedValue(new Response('{"id":"1"}', { status: 200 }));
    const res = await POST(anfrage(gueltig()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.resend.com/emails');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer re_test');
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      from: 'Timova Website <noreply@timova.ch>',
      to: ['kontakt@timova.ch'],
      reply_to: 'alex@muster.ch',
      subject: 'Demo-Anfrage: Muster AG'
    });
  });

  it('meldet einen Fehler von Resend verständlich', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    fetchSpy.mockResolvedValue(new Response('kaputt', { status: 500 }));
    const res = await POST(anfrage(gueltig()));
    expect(res.status).toBe(502);
    expect((await res.json()).meldung).toContain('info@timova.ch');
  });

  it('gibt Feldfehler mit 422 zurück', async () => {
    const res = await POST(anfrage({ ...gueltig(), email: 'x', datenschutz: false }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(Object.keys(json.fehler).sort()).toEqual(['datenschutz', 'email']);
  });

  it('verwirft Honeypot und zu schnelle Formulare still', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    const r1 = await POST(anfrage({ ...gueltig(), website: 'spam' }));
    const r2 = await POST(anfrage({ ...gueltig(), geladen: Date.now() }));
    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('lehnt fremde Herkunft und falsches Format ab', async () => {
    expect((await POST(anfrage(gueltig(), { origin: 'https://boese.example' }))).status).toBe(403);
    expect((await POST(anfrage(gueltig(), { 'content-type': 'text/plain' }))).status).toBe(415);
  });

  it('begrenzt Anfragen je IP', async () => {
    const status: number[] = [];
    for (let i = 0; i < 6; i++) status.push((await POST(anfrage(gueltig()))).status);
    expect(status.slice(0, 5).every((s) => s === 200)).toBe(true);
    expect(status[5]).toBe(429);
    // andere IP ist nicht betroffen
    expect((await POST(anfrage(gueltig(), { 'x-forwarded-for': '198.51.100.1' }))).status).toBe(200);
  });
});
