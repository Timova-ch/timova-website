import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/impressum', '/datenschutz', '/unterauftragsverarbeiter'].map((pfad) => ({
    url: `${SITE_URL}${pfad}`,
    changeFrequency: pfad ? 'yearly' : 'monthly',
    priority: pfad ? 0.3 : 1
  }));
}
