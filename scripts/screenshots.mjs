// Screenshots der Website in hell/dunkel, Desktop und mobil, nach docs/screenshots.
// Prüft nebenbei das Formular (Fehler und Erfolg) und meldet Konsolenfehler.
// Aufruf: Server starten (npm start), dann BASIS=http://localhost:3000 node scripts/screenshots.mjs
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';

const BASIS = process.env.BASIS ?? 'http://localhost:3000';
const ZIEL = 'docs/screenshots';
mkdirSync(ZIEL, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const probleme = [];

async function seite(schema, geraet) {
  const kontext = await browser.newContext({
    colorScheme: schema,
    ...(geraet === 'mobil'
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
      : { viewport: { width: 1440, height: 900 } })
  });
  const p = await kontext.newPage();
  p.on('console', (m) => m.type() === 'error' && !m.text().includes('status of 422') && probleme.push(`${schema}/${geraet}: ${m.text()}`));
  p.on('pageerror', (e) => probleme.push(`${schema}/${geraet}: ${e.message}`));
  return p;
}

async function ganzeSeite(p, pfad, datei) {
  await p.goto(BASIS + pfad, { waitUntil: 'networkidle' });
  // Lazy-Bilder laden: einmal durchscrollen
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await p.waitForLoadState('networkidle');
  // Nur sichtbare Bilder abwarten: Die Galerie lädt verborgene Ansichten erst beim Anzeigen.
  await p.evaluate(() =>
    Promise.all(
      [...document.images]
        .filter((i) => i.checkVisibility())
        .map((i) => i.complete || new Promise((r) => (i.onload = i.onerror = r)))
    )
  );
  await p.screenshot({ path: `${ZIEL}/${datei}`, fullPage: true });
}

for (const schema of ['light', 'dark']) {
  const name = schema === 'light' ? 'hell' : 'dunkel';
  for (const geraet of ['desktop', 'mobil']) {
    const p = await seite(schema, geraet);
    await ganzeSeite(p, '/', `start-${geraet}-${name}.png`);
    if (geraet === 'desktop') {
      // Jede Ansicht der Galerie im Hero und die drei Vertiefungen einzeln
      for (const tab of ['Dienstplan', 'Dashboard', 'Teamboard', 'Ferienplaner']) {
        await p.getByRole('tab', { name: tab }).click();
        const panel = p.locator('[role=tabpanel]:not([hidden]) img');
        await panel.evaluate((i) => i.complete || new Promise((r) => (i.onload = i.onerror = r)));
        await p.locator('[role=tablist]').locator('xpath=..').screenshot({ path: `${ZIEL}/galerie-${tab.toLowerCase()}-${name}.png` });
      }
      for (const id of ['teamboard', 'skills', 'ferienplaner']) {
        await p.locator(`#${id}`).screenshot({ path: `${ZIEL}/abschnitt-${id}-${name}.png` });
      }
      await ganzeSeite(p, '/impressum', `impressum-${name}.png`);
    }
    if (geraet === 'mobil') {
      await p.goto(BASIS + '/', { waitUntil: 'networkidle' });
      await p.locator('summary[aria-label="Menü"]').click();
      await p.screenshot({ path: `${ZIEL}/menue-mobil-${name}.png` });
    }
    await p.context().close();
  }
}

// Formular: erst leer absenden (Fehler), dann korrekt (Erfolg im Testmodus)
const p = await seite('light', 'desktop');
await p.goto(BASIS + '/#kontakt', { waitUntil: 'networkidle' });
await p.waitForTimeout(3500);
await p.getByRole('button', { name: 'Demo anfragen', exact: true }).last().click();
await p.getByText('Bitte prüfen Sie die markierten Felder.').waitFor();
await p.locator('#kontakt').screenshot({ path: `${ZIEL}/formular-fehler.png` });
await p.fill('#name', 'Alex Muster');
await p.fill('#firma', 'Muster AG');
await p.fill('#email', 'alex@muster.ch');
await p.selectOption('#mitarbeitende', '26 bis 50');
await p.fill('#nachricht', 'Wir planen heute mit Excel.');
await p.check('#datenschutz');
await p.getByRole('button', { name: 'Demo anfragen', exact: true }).last().click();
await p.getByText('Vielen Dank für Ihre Anfrage').waitFor();
await p.locator('#kontakt').screenshot({ path: `${ZIEL}/formular-gesendet.png` });
await p.context().close();

await browser.close();
if (probleme.length) {
  console.error('Konsolenfehler:\n' + probleme.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Screenshots erstellt, Formular geprüft, keine Konsolenfehler.');
}
