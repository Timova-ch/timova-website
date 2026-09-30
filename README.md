# timova.ch

Produktseite für [Timova](https://app.timova.ch), Dienstplan und Einsatzplanung
aus der Schweiz. Einseiter mit Rechtsseiten, statisch vorgerendert; nur das
Formular «Demo anfragen» läuft serverseitig.

Grundlage: [`docs/BRIEF.md`](docs/BRIEF.md). Offene Punkte vor der Freigabe:
[`docs/OFFEN.md`](docs/OFFEN.md).

## Technik

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3
- Schrift Outfit lokal (`app/fonts`, SIL OFL 1.1), keine externen Skripte, Fonts oder Cookies
- Farben aus dem Markenpaket (`app/globals.css`), hell und dunkel über `prefers-color-scheme`
- Rechtstexte als Markdown in `content/`, beim Build in HTML umgewandelt
- Sicherheits-Header und CSP in `next.config.js`

## Befehle

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm test             # Formular-Prüfung, Route Handler (ohne echten Versand), Rechtstexte
npm run build
npm start
```

Weitere Skripte (brauchen Google Chrome):

```bash
node scripts/og-bild.mjs                                   # public/og.png neu erzeugen
BASIS=http://localhost:3000 node scripts/screenshots.mjs   # docs/screenshots, prüft Formular
```

## Umgebungsvariablen

Siehe [`.env.example`](.env.example). Werte nie ins Repo.

| Variable | Wirkung |
|---|---|
| `RESEND_API_KEY` | Versand des Formulars an kontakt@timova.ch. Ohne Wert lokal Testmodus (nur Protokoll, kein Versand); auf Vercel meldet das Formular dann einen Fehler mit Hinweis auf info@timova.ch. |
| `SITE_INDEXIERBAR` | Nur `true` erlaubt Suchmaschinen. Sonst `noindex` (Meta-Tag, `X-Robots-Tag`, `robots.txt` mit `Disallow: /`). Der Build bricht ab, wenn noch Platzhalter offen sind. |

## Formular «Demo anfragen»

`POST /api/kontakt` (JSON). Schutz ohne Captcha-Dienste: Honeypot-Feld,
Mindest-Ausfüllzeit (3 s), Rate-Begrenzung je IP (5 in 10 Minuten, je
Instanz), Prüfung der Herkunft (Origin), serverseitige Validierung. Keine
Speicherung, Versand über die Resend-API mit Reply-To auf die anfragende Person.

## Prüfung (lokal, 01.10.2026)

Lighthouse 12, Produktions-Build:

| Seite | Gerät | Performance | Barrierefreiheit | Best Practices | SEO |
|---|---|---|---|---|---|
| `/` hell | mobil | 99 | 100 | 100 | 100* |
| `/` hell | Desktop | 100 | 100 | 100 | 100* |
| `/` dunkel | mobil | 99 | 100 | 100 | 100* |
| `/` dunkel | Desktop | 100 | 100 | 100 | 100* |
| `/datenschutz` | mobil | 99 | 100 | 100 | 100* |

\* mit `SITE_INDEXIERBAR=true`. Im Auslieferungszustand (noindex) meldet
Lighthouse bewusst SEO 69 («Seite ist von der Indexierung ausgeschlossen»).

Screenshots hell und dunkel, Desktop und mobil: [`docs/screenshots`](docs/screenshots).
