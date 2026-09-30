import localFont from 'next/font/local';

/**
 * Markenschrift Outfit, lokal wie in der App (keine Anfrage an Google).
 * Variable Outfit v15, Lizenz SIL OFL 1.1 (fonts/OFL.txt).
 */
export const outfit = localFont({
  src: [
    { path: './fonts/outfit-latin.woff2', weight: '500 700', style: 'normal' }
  ],
  variable: '--font-brand',
  display: 'swap'
});
