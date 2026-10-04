# Offene Punkte vor der Freigabe

Solange hier etwas offen ist, bleibt die Website auf `noindex`
(`SITE_INDEXIERBAR` nicht auf `true`). Ein Build mit `SITE_INDEXIERBAR=true`
bricht ab, solange in `content/*.md` noch ein Platzhalter in eckigen Klammern steht.

Die Texte der Rechtsseiten stehen in `content/` (Quelle der Website).
`docs/impressum.md` und `docs/datenschutz.md` sind die ursprünglichen Vorlagen.

## Platzhalter in den Rechtstexten

| Platzhalter | Datei | Stelle |
|---|---|---|
| `[FIRMA]` | `content/impressum.md` | Anbieter |
| `[FIRMA]` (2×) | `content/datenschutz.md` | 1. Verantwortlicher |
| `[ADRESSE]` | `content/impressum.md` | Anbieter |
| `[ADRESSE]` | `content/datenschutz.md` | 1. Verantwortlicher |
| `[TELEFON]` | `content/impressum.md` | Kontakt |
| `[Eingetragen im Handelsregister … UID CHE-___.___.___ \| Kein Eintrag im Handelsregister]` | `content/impressum.md` | Handelsregister: eine Variante wählen, UID ergänzen |
| `[MWST-Nummer CHE-___.___.___ MWST \| Nicht mehrwertsteuerpflichtig]` | `content/impressum.md` | Mehrwertsteuer: eine Variante wählen |
| `[DATUM]` | `content/datenschutz.md` | Stand |
| `[DATUM]` | `content/unterauftragsverarbeiter.md` | Stand |

## Aussagen zum Bestätigen

Diese Formulierungen stehen nicht wörtlich im Briefing. Bitte prüfen und bei
Bedarf in `components/abschnitte/` anpassen:

- Kontakt und Erfolgsmeldung: «Wir melden uns innert zwei Werktagen».
- FAQ Einrichtung: «Für ein Team ist Timova meist innert weniger Tage startklar.»
- Pakete: Zeilen je Karte («Ein Standort», «Ein Standort, mehrere Abteilungen», «Support per E-Mail») und das Etikett «Empfohlen» beim Paket Betrieb.
- Pakete: «Ausgetretene Mitarbeitende zählen nicht mit.»
- Sicherheit: «Die Trennung ist in der Datenbank selbst verankert.» und «Zwei-Faktor-Anmeldung … für alle anderen Benutzer freiwillig».
- Abschnitte Teamboard, Skills und Jahresurlaubsplaner sowie die neuen FAQ
  (Stand 03.10.2026): gegen den Code von timova-app geprüft. Ändert sich dort
  etwas (z. B. Rechte bei Pendenzen, Einfluss der Skill-Noten auf den
  Autoplaner, Liste der Kollisionen nur für Admins), Text nachziehen.
- Handy: Teamboard, Dienstplanung und Ferienplaner sind in der App am Telefon
  nicht freigegeben (`lib/mobileViewport.ts`), die App ist dort immer dunkel.
  Die Website sagt das so (FAQ «Brauchen Mitarbeitende eine App?»).

## Betrieb

- Resend: Domain `timova.ch` verifiziert, eigener API-Key «timova-website» (nur Senden) als `RESEND_API_KEY` in Vercel.
- Postfach oder Weiterleitung `kontakt@timova.ch` muss existieren (Empfänger des Formulars).
- Nach dem Füllen aller Platzhalter: `SITE_INDEXIERBAR=true` in Vercel (Production) setzen und neu deployen.
