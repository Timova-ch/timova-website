import type { Metadata } from 'next';
import { Rechtsseite } from '@/components/Rechtsseite';
import { rechtstext } from '@/lib/rechtstext';

export const metadata: Metadata = {
  title: 'Unterauftragsverarbeiter',
  alternates: { canonical: '/unterauftragsverarbeiter' }
};

export default function UnterauftragsverarbeiterSeite() {
  return <Rechtsseite html={rechtstext('unterauftragsverarbeiter')} />;
}
