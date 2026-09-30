/** @type {import('next').NextConfig} */

// Bis alle Platzhalter gefüllt sind (docs/OFFEN.md), bleibt die Seite ausserhalb
// der Suchmaschinen. Nur der exakte Wert «true» schaltet die Indexierung frei.
const indexierbar = process.env.SITE_INDEXIERBAR === 'true';
const dev = process.env.NODE_ENV === 'development';

// Schutz: Solange in den Rechtstexten noch Platzhalter wie [FIRMA] stehen,
// bricht ein Build mit SITE_INDEXIERBAR=true ab.
if (indexierbar) {
  const fs = require('node:fs');
  const path = require('node:path');
  const ordner = path.join(__dirname, 'content');
  const offen = fs
    .readdirSync(ordner)
    .filter((d) => d.endsWith('.md'))
    .flatMap((d) =>
      [...fs.readFileSync(path.join(ordner, d), 'utf8').matchAll(/\[([^\]\n]+)\](?!\()/g)].map((t) => `${d}: ${t[0]}`)
    );
  if (offen.length) {
    throw new Error(`SITE_INDEXIERBAR=true, aber es sind noch Platzhalter offen (docs/OFFEN.md):\n${offen.join('\n')}`);
  }
}

// CSP: Keine externen Quellen. 'unsafe-inline' bei script-src bleibt nötig,
// weil Next die statisch vorgerenderten Seiten mit Inline-Skripten ausliefert;
// eine Nonce würde jede Seite dynamisch machen. style-src braucht es für die
// Inline-Styles von next/image und next/font.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}`,
  `connect-src 'self'${dev ? ' ws:' : ''}`,
  "form-action 'self'",
  "manifest-src 'self'",
  ...(dev ? [] : ['upgrade-insecure-requests'])
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  ...(indexierbar ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }])
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: { formats: ['image/avif', 'image/webp'] },
  // CSS direkt ins HTML: keine blockierende Stylesheet-Anfrage vor dem ersten Bild.
  experimental: { inlineCss: true },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  }
};

module.exports = nextConfig;
