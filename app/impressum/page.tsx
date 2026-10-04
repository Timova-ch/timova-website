import type { Metadata } from 'next';
import { Rechtsseite } from '@/components/Rechtsseite';
import { rechtstext } from '@/lib/rechtstext';

export const metadata: Metadata = {
  title: 'Impressum',
  alternates: { canonical: '/impressum' }
};

export default function ImpressumSeite() {
  return <Rechtsseite html={rechtstext('impressum')} />;
}
