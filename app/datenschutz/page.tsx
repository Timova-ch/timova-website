import type { Metadata } from 'next';
import { Rechtsseite } from '@/components/Rechtsseite';
import { rechtstext } from '@/lib/rechtstext';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  alternates: { canonical: '/datenschutz' }
};

export default function DatenschutzSeite() {
  return <Rechtsseite html={rechtstext('datenschutz')} />;
}
