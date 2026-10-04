import { Hero } from '@/components/abschnitte/Hero';
import { ProblemLoesung } from '@/components/abschnitte/ProblemLoesung';
import { Funktionen } from '@/components/abschnitte/Funktionen';
import { Teamboard } from '@/components/abschnitte/Teamboard';
import { Skills } from '@/components/abschnitte/Skills';
import { Ferienplaner } from '@/components/abschnitte/Ferienplaner';
import { Sicherheit } from '@/components/abschnitte/Sicherheit';
import { Pakete } from '@/components/abschnitte/Pakete';
import { Start } from '@/components/abschnitte/Start';
import { Faq } from '@/components/abschnitte/Faq';
import { Kontakt } from '@/components/abschnitte/Kontakt';

export default function Startseite() {
  return (
    <>
      <Hero />
      <ProblemLoesung />
      <Funktionen />
      <Teamboard />
      <Skills />
      <Ferienplaner />
      <Sicherheit />
      <Pakete />
      <Start />
      <Faq />
      <Kontakt />
    </>
  );
}
