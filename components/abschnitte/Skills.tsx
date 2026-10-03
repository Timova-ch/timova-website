import { Vertiefung } from './Vertiefung';

export function Skills() {
  return (
    <Vertiefung
      id="skills"
      kicker="Skills"
      titel="Skills und Qualifikationen"
      einleitung="Wer kann was, und wie gut? Timova hält die Qualifikationen jeder Person fest, berücksichtigt sie beim Planen und zeigt, wo im Team Können fehlt."
      bildLinks
      flaeche
      punkte={[
        {
          titel: 'Qualifikationen je Person',
          text: 'Jede Abteilung ist ein Skill, dazu kommen eigene Spezialskills wie Erste Hilfe. Pro Person legen Sie fest, ob ein Skill Haupt-Skill ist oder nur als Backup (Reserve) gilt.'
        },
        {
          titel: 'Bewertung von 1 bis 6',
          text: 'Jeder Skill lässt sich mit einer Note von 1 (nicht erlernt) bis 6 (Experte) bewerten. Die Skilltabelle zeigt alle Noten auf einen Blick, die Statistik die Verteilung je Abteilung.'
        },
        {
          titel: 'Beim Planen berücksichtigt',
          text: 'Der Autoplaner teilt in einer Abteilung nur Personen ein, die den Skill haben. Verlangt eine Abteilung einen Spezialskill, plant er dort zuerst jemanden damit ein und meldet, wenn das nicht geht. Die Noten selbst beeinflussen den Autoplaner nicht.'
        },
        {
          titel: 'Anlernphasen und Empfehlungen',
          text: 'Für eine Anlernphase weisen Sie eine Person für einen Zeitraum einer Abteilung zu, auf Wunsch mit Betreuerin oder Betreuer; im Dienstplan ist sie markiert. Die Auswertung zeigt, wo Können fehlt, und schlägt Wochen vor, in denen jemand mitlaufen kann, betreut von einer Person mit Note 5 oder 6.'
        }
      ]}
      bilder={[
        {
          src: '/bilder/skills-hell.webp',
          alt: 'Skilltabelle: acht Mitarbeitende mit farbigen Noten von 1 bis 6 je Abteilung (F, N, S) und je Spezialskill (Erste Hilfe, Kasse).',
          breite: 2048,
          hoehe: 1280
        },
        {
          src: '/bilder/skills-empfehlungen-hell.webp',
          alt: 'Empfehlungen: je Abteilung, wie viele den Skill haben und wie viele davon anlernen dürfen, darunter ein Vorschlag für eine Woche zum Anlernen mit Betreuung.',
          breite: 2048,
          hoehe: 1280,
          titel: 'Wo fehlt Können, und wann ist Platz zum Anlernen?'
        }
      ]}
    />
  );
}
