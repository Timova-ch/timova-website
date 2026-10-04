import type { MetadataRoute } from 'next';
import { SITE_URL, istIndexierbar } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (!istIndexierbar()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: `${SITE_URL}/sitemap.xml` };
}
