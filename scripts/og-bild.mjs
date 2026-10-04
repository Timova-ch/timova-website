// Erzeugt public/og.png (1200 × 630) aus Logo, Schrift und einem Screenshot.
// Aufruf: node scripts/og-bild.mjs  (braucht Google Chrome)
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const b64 = (p) => readFileSync(p).toString('base64');
const logo = b64('public/brand/timova-logo-farbig-dunkel.svg');
const schrift = b64('app/fonts/outfit-latin.woff2');
const bild = b64('public/bilder/dienstplan-woche-hell.png');

const html = `<!doctype html><html><head><style>
@font-face { font-family: Outfit; src: url(data:font/woff2;base64,${schrift}) format('woff2'); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #0F4C4F; font-family: Outfit, sans-serif; color: #fff; overflow: hidden; position: relative; }
.text { position: absolute; left: 72px; top: 72px; width: 560px; }
.logo { height: 56px; }
h1 { margin-top: 64px; font-size: 60px; line-height: 1.08; font-weight: 600; letter-spacing: -0.01em; }
p { margin-top: 28px; font-size: 26px; color: #8FD3CB; font-weight: 500; }
.bild { position: absolute; left: 680px; top: 110px; width: 760px; border-radius: 18px; box-shadow: 0 30px 80px rgba(0,0,0,.35); border: 1px solid rgba(255,255,255,.2); }
.balken { position: absolute; left: 0; bottom: 0; height: 10px; width: 100%; background: linear-gradient(90deg, #8FD3CB 0 33%, #2F8F86 33% 66%, #E3A33B 66%); }
</style></head><body>
<div class="text"><img class="logo" src="data:image/svg+xml;base64,${logo}"><h1>Dienstplan und Einsatzplanung aus der Schweiz</h1><p>Schichten, Ferien und Abwesenheiten</p></div>
<img class="bild" src="data:image/png;base64,${bild}">
<div class="balken"></div>
</body></html>`;

const browser = await chromium.launch({ channel: 'chrome' });
const seite = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await seite.setContent(html, { waitUntil: 'load' });
await seite.evaluate(() => document.fonts.ready);
await seite.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('public/og.png erzeugt');
