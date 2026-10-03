// Screenshots aus der laufenden App (lokal, Demo-Daten Muster AG, Standort Nord)
// nach public/bilder als WebP. Braucht Google Chrome.
//
// Aufruf: App lokal starten (timova-app: supabase start, npm run dev auf Port 3000), dann
//   APP=http://localhost:3000 node scripts/app-screenshots.mjs
//
// Die Demo-Daten (Pendenzen, Skills, Ferienwünsche 2027 …) stehen nicht im Seed der App,
// sie wurden am 03.10.2026 lokal über die Oberfläche angelegt. Fehlen sie, zeigen die
// Bilder leere Listen.
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const APP = process.env.APP ?? 'http://localhost:3000';
const PASSWORT = 'Timova-Demo-2026!';
const ZIEL = 'public/bilder';
const b = await chromium.launch({ channel: 'chrome' });

async function sitzung(email, { mobil = false, hoehe = 900 } = {}) {
  const ctx = await b.newContext({
    colorScheme: mobil ? 'dark' : 'light',
    locale: 'de-CH',
    timezoneId: 'Europe/Zurich',
    ...(mobil
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }
      : { viewport: { width: 1440, height: hoehe }, deviceScaleFactor: 2 })
  });
  // Thema der App (next-themes, Schlüssel «timova-theme»); am Telefon ist die App immer dunkel.
  // Den Entwicklungshinweis von Next ausblenden.
  await ctx.addInitScript((thema) => {
    try {
      localStorage.setItem('timova-theme', thema);
    } catch {}
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = 'nextjs-portal{display:none!important}';
      document.head.appendChild(s);
    });
  }, mobil ? 'dark' : 'light');
  const p = await ctx.newPage();
  await p.goto(APP + '/login', { waitUntil: 'networkidle' });
  await p.fill('input[type=email]', email);
  await p.fill('input[type=password]', PASSWORT);
  await p.locator('button[type=submit]').click();
  await p.waitForURL((u) => !u.pathname.startsWith('/login'));
  return p;
}

async function ruhe(p) {
  await p.waitForLoadState('networkidle');
  await p.mouse.move(5, 400);
  await p.waitForTimeout(1200);
}

async function speichern(p, name, breite = 2048) {
  const png = await p.screenshot();
  await sharp(png).resize({ width: breite }).webp({ quality: 82 }).toFile(`${ZIEL}/${name}.webp`);
  console.log(name);
}

const zeile = (p, t) =>
  p.locator(`input[placeholder="Bezeichnung…"][value="${t}"]`).first().locator('xpath=ancestor::*[.//button[@aria-label="Status ändern"]][1]');

{
  const p = await sitzung('mitarbeiter1.nord@example.ch');
  await p.goto(APP + '/dashboard');
  await ruhe(p);
  await speichern(p, 'dashboard-mitarbeiter-hell');
  await p.context().close();
}
{
  const p = await sitzung('planung.nord@example.ch', { hoehe: 1180 });
  await p.goto(APP + '/dashboard');
  await ruhe(p);
  await p.getByRole('button', { name: 'Team', exact: true }).click();
  await p.getByRole('button', { name: /Nächster/ }).first().click();
  await ruhe(p);
  await speichern(p, 'dashboard-planung-hell');
  await p.context().close();
}
{
  const p = await sitzung('planung.nord@example.ch');
  await p.goto(APP + '/teamboard');
  await ruhe(p);
  await speichern(p, 'teamboard-hell');
  await zeile(p, 'Notfallkonzept überarbeiten').getByRole('button', { name: 'Ausklappen' }).click().catch(() => {});
  await p.getByRole('heading', { name: 'Pendenzen' }).scrollIntoViewIfNeeded();
  await p.evaluate(() => window.scrollBy(0, -90));
  await ruhe(p);
  await speichern(p, 'pendenzen-hell');
  await zeile(p, 'Notfallkonzept überarbeiten').getByRole('button', { name: 'Updates / Notizen' }).click();
  await p.getByText('Untergeschoss geprüft').waitFor();
  await ruhe(p);
  await speichern(p, 'pendenz-verlauf-hell');
  await p.context().close();
}
{
  const p = await sitzung('planung.nord@example.ch');
  await p.goto(APP + '/einsatz/skills');
  await ruhe(p);
  await speichern(p, 'skills-hell');
  await p.goto(APP + '/einsatz/empfehlungen');
  await ruhe(p);
  await speichern(p, 'skills-empfehlungen-hell');
  await p.context().close();
}
{
  // Admin-Sicht: nur dort steht die Liste der Kollisionen.
  const p = await sitzung('admin.nord@example.ch', { hoehe: 1000 });
  await p.goto(APP + '/urlaubsplan?year=2027&month=2027-07');
  await ruhe(p);
  for (const t of ['Im Vorjahr frei', 'Vormerkungen']) await p.getByText(t, { exact: true }).click();
  await ruhe(p);
  await speichern(p, 'ferienplaner-hell');
  await p.context().close();
}
{
  // Das Teamboard ist in der App am Telefon nicht freigegeben, daher nur das Dashboard.
  const p = await sitzung('mitarbeiter1.nord@example.ch', { mobil: true });
  await p.goto(APP + '/dashboard');
  await ruhe(p);
  await p.getByText('Woche', { exact: true }).first().click();
  for (let i = 0; i < 2; i++) await p.locator('button:has(svg.lucide-chevron-right)').first().click();
  await ruhe(p);
  await speichern(p, 'mobil-dashboard-woche', 780);
  await p.context().close();
}
await b.close();
