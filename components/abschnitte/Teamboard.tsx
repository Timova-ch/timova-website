import { Vertiefung } from './Vertiefung';

export function Teamboard() {
  return (
    <Vertiefung
      id="teamboard"
      kicker="Teamboard"
      titel="Teamboard: Pendenzen, Projekte und Notizen"
      einleitung="Was im Team ansteht, liegt nicht mehr in Chats und Mails. Jeder Standort hat sein eigenes Teamboard, das alle im Team sehen."
      punkte={[
        {
          titel: 'Pendenzen mit Status und Verantwortlichen',
          text: 'Jede Pendenz hat einen Zeitraum, eine verantwortliche Person, ein Team und einen Status: Offen, In Bearbeitung, Erledigt oder Gestoppt. Unterelemente gliedern grössere Vorhaben. Anlegen kann jede Person im Team; ändern dürfen die Planung und wer die Pendenz angelegt hat.'
        },
        {
          titel: 'Verlauf zu jeder Pendenz',
          text: 'Updates, Links und Antworten bleiben bei der Pendenz statt in einem Chat. Wer mit @ erwähnt wird, erhält eine Benachrichtigung.'
        },
        {
          titel: 'Projekte bis in den Dienstplan',
          text: 'Eine Pendenz lässt sich als Projekt führen. Die Planung teilt Mitarbeitende ganz- oder halbtags für das Projekt ein, und der Einsatz erscheint direkt im Dienstplan.'
        },
        {
          titel: 'Infos, Meetings, Aufgaben und Notizen',
          text: 'Team-Infos, Meetings auf einem Zeitstrahl und ein Aufgabenboard mit To Do, In Arbeit und Done, filterbar nach Abteilung. Dazu persönliche Notizen in Ordnern, mit Bildern, gezielt teilbar zum Lesen oder Bearbeiten.'
        }
      ]}
      bilder={[
        {
          src: '/bilder/pendenzen-hell.webp',
          alt: 'Pendenzenliste im Teamboard: «Notfallkonzept überarbeiten» als Projekt markiert, mit Zeitraum 5. bis 23. Oktober, Verantwortlicher, Team, Status «In Bearbeitung» und zwei Unterelementen; darunter weitere Pendenzen mit Status «Offen».',
          breite: 2048,
          hoehe: 1280
        },
        {
          src: '/bilder/pendenz-verlauf-hell.webp',
          alt: 'Verlauf einer Pendenz: Einträge mit Erwähnung «@Alex Muster», einer Antwort und einem «Gefällt mir».',
          breite: 2048,
          hoehe: 1280,
          titel: 'Verlauf einer Pendenz'
        },
        {
          src: '/bilder/teamboard-hell.webp',
          alt: 'Teamboard mit Team-Infos, Meetings auf einem Zeitstrahl und den Aufgaben-Spalten To Do, In Arbeit und Done.',
          breite: 2048,
          hoehe: 1280,
          titel: 'Infos, Meetings und Aufgaben'
        }
      ]}
    />
  );
}
