import { Vertiefung } from './Vertiefung';

export function Ferienplaner() {
  return (
    <Vertiefung
      id="ferienplaner"
      kicker="Ferienplanung"
      titel="Jahresurlaubsplaner"
      einleitung="Ferienwünsche fürs ganze Jahr sammeln, abstimmen und übernehmen, bevor der Dienstplan steht. Alle sehen, wer wann frei haben möchte."
      punkte={[
        {
          titel: 'Ferien fürs ganze Jahr planen',
          text: 'Die Planung schaltet ein Ferienjahr frei. Danach trägt jede Person ihre Wünsche selbst ein, als Urlaub, Schule, Extern oder Home Office, Monat für Monat. Feiertage und Tage ohne Betrieb zählen nicht, Schulferien sind markiert. Eine Frist legt fest, bis wann Mitarbeitende selbst ändern können.'
        },
        {
          titel: 'Gleichzeitige Abwesenheiten im Blick',
          text: 'Für jeden Tag zeigt der Planer, wie viele abwesend sind und wie viele es höchstens sein sollten. Wird der Grenzwert überschritten, erscheint der Zeitraum in der Liste der Kollisionen, als Warnung, nicht als Sperre.'
        },
        {
          titel: 'Vormerkungen und Vorjahr',
          text: 'Absprachen wie «hat Vorrang» oder «ist dran» halten Sie als Vormerkung für einen Zeitraum fest, auch für die Folgejahre. Zusätzlich sieht die Planung, wer in den Schulferien und an Feiertagen des Vorjahres frei hatte.'
        },
        {
          titel: 'Übernahme, Anträge und Freigabe',
          text: 'Mit «Plan finalisieren» werden die Wünsche zu bewilligten Ferien und erscheinen im Dienstplan. Unter dem Jahr stellen Mitarbeitende Anträge, die Planung gibt sie frei. Jede Person sieht ihr Jahr im persönlichen Jahresplan.'
        }
      ]}
      bilder={[
        {
          src: '/bilder/ferienplaner-hell.webp',
          alt: 'Ferienplaner 2027 im Juli: acht Mitarbeitende mit eingetragenen Ferien, Schul- und Home-Office-Tagen; in der Zeile «Urlaub / Limit» sind Tage mit 3 von 2 und 4 von 2 rot markiert, rechts die Liste der Kollisionen.',
          breite: 2048,
          hoehe: 1422
        }
      ]}
    />
  );
}
