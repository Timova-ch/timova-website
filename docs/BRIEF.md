# Website timova.ch: Briefing

Stand 01.10.2026. Grundlage für den Cursor-Agenten. Sprache: Deutsch (Schweiz), ss statt ß, Sie-Form, keine Gedankenstriche als Stilmittel.

## Ziel
Eine schlanke, schnelle Produktseite für Timova. Ziel ist eine Demo-Anfrage. Zielgruppe: Schweizer Betriebe mit Schicht- oder Einsatzplanung (Logistik, Produktion, Pflege, Dienstleistung), 20 bis 300 Mitarbeitende, Entscheider sind Teamleitungen, Betriebsleitung, HR.

## Positionierung (Kernbotschaften)
1. Dienstpläne, Abwesenheiten und Ferien an einem Ort, statt Excel, Papier und WhatsApp.
2. Aus dem Betrieb für den Betrieb: entstanden im Schichtalltag eines Logistikbetriebs (ohne Firmennamen nennen).
3. Daten in der Schweiz: Datenbank in Zürich, Schweizer Anbieter, Verträge nach Schweizer Recht (DSG).
4. Einfach für Mitarbeitende: mobil nutzbar, Anträge und Diensttausch per Klick.
5. Faire Pakete nach aktiven Benutzern, Pilotphase mit Rabatt.

## Aufbau (Einseiter plus Rechtsseiten)
Startseite `/` mit Abschnitten und Ankern:
1. Hero: Titel, ein Satz Nutzen, Button «Demo anfragen» (#kontakt), Sekundär «Funktionen ansehen» (#funktionen). Screenshot Dienstplan (hell).
2. Problem → Lösung: drei kurze Punkte (heute: Excel-Listen, Rückfragen, Überblick fehlt; mit Timova: ...).
3. Funktionen (#funktionen), je Karte Icon, Titel, 1 bis 2 Sätze:
   - Dienstplan Woche und Monat mit Schichtmodellen (Früh, Spät, Nacht, frei definierbar)
   - Abwesenheiten und Ferien mit Antrag und Freigabe
   - Diensttausch zwischen Mitarbeitenden
   - Mehrere Standorte und Abteilungen, Rollen und Rechte
   - Mobile Ansicht für Mitarbeitende
   - E-Mail-Benachrichtigungen
   - Teamboard für Pendenzen und Notizen
   - Datenexport jederzeit (ZIP mit CSV)
4. Sicherheit und Schweiz (#sicherheit): Daten in Zürich, strikte Trennung der Kunden, verschlüsselte Übertragung und Speicherung, tägliche Datensicherung, Zwei-Faktor-Anmeldung für Administratoren, AVV nach DSG, Verfügbarkeit 99.5 % gemäss SLA.
5. Pakete (#pakete): drei Karten, Preis «auf Anfrage»:
   - Team: bis 25 aktive Benutzer
   - Betrieb: bis 50 aktive Benutzer (hervorgehoben)
   - Standorte: bis 100 aktive Benutzer, mehrere Standorte
   Darunter: «Mehr Benutzer? Wir erstellen gerne ein Angebot.» und Hinweis: Jahresvertrag, nur aktive Benutzer zählen, Einrichtung und Schulung auf Wunsch, Pilotphase 3 Monate mit 50 % Rabatt.
6. So läuft der Start: 1 Demo (30 Min.), 2 Einrichtung mit Ihren Schichtmodellen, 3 Pilot mit einem Team.
7. FAQ (4 bis 6 Fragen): Wo liegen die Daten? Wer zählt als Benutzer? Brauchen Mitarbeitende eine App? (nein, Browser, mobil optimiert) Kann ich Daten exportieren? Wie lange dauert die Einrichtung? Gibt es Support? (Werktage 8 bis 17 Uhr, support@timova.ch)
8. Kontakt (#kontakt): Formular «Demo anfragen».
Footer: Logo, © Jahr Timova, Links Impressum, Datenschutz, Unterauftragsverarbeiter, Kontakt info@timova.ch, Hinweis «Login» → https://app.timova.ch.

Weitere Seiten:
- `/impressum` (Text in impressum.md)
- `/datenschutz` (Text in datenschutz.md)
- `/unterauftragsverarbeiter` (Tabelle in datenschutz.md, Abschnitt Anhang)

## Formular «Demo anfragen»
Felder: Name*, Firma*, E-Mail*, Telefon, Anzahl Mitarbeitende (Auswahl: bis 25, 26 bis 50, 51 bis 100, über 100), Nachricht, Checkbox Datenschutz* (Link).
Versand serverseitig (Route Handler) über Resend an kontakt@timova.ch, Reply-To = Absender, Absender «Timova Website <noreply@timova.ch>». API-Key als Umgebungsvariable RESEND_API_KEY (eigener Key «timova-website», nie im Repo).
Spam-Schutz: Honeypot-Feld, Mindest-Ausfüllzeit, einfache Rate-Begrenzung pro IP, serverseitige Validierung. Keine Captchas von Drittanbietern.
Nach dem Senden: Erfolgsmeldung auf der Seite. Keine Speicherung in einer Datenbank.

## Design
- Markenpaket: timova-app/design/Timova-Brand (Logo, Icons, timova-tokens.css). Farben Nacht #0F4C4F, Spät #2F8F86, Früh #E3A33B, Nacht hell #8FD3CB. Schrift Outfit lokal (wie in der App, lib/fonts), keine Google-Fonts-Anfrage.
- Ruhig, klar, viel Weissraum, keine Stockfotos. Screenshots aus timova-app/docs/screenshots (nur Demo-Daten).
- Hell und dunkel (prefers-color-scheme), vollständig responsiv, Barrierefreiheit (Kontrast AA, Fokus sichtbar, alt-Texte).
- Favicon und Open-Graph-Bild aus dem Markenpaket.

## Technik
- Neues Repo Timova-ch/timova-website, **öffentlich** (keine Geheimnisse im Code), damit Vercel Hobby es deployen kann.
- Next.js 15 (App Router), TypeScript, Tailwind, statisch vorgerendert, nur der Formular-Route-Handler serverseitig.
- Keine Cookies, keine Analyse-Tools, keine externen Skripte oder Fonts.
- SEO: Title, Description, Open Graph, sitemap.xml, robots.txt. Bis zur Freigabe `noindex` über Umgebungsvariable (SITE_INDEXIERBAR=false).
- Sicherheits-Header (CSP ohne unsafe-inline wo möglich, HSTS, Referrer-Policy, X-Content-Type-Options).
- Lighthouse-Ziel: 95+ in allen Kategorien.
- CI mit GitHub Actions: lint, typecheck, build.
