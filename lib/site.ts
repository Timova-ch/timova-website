/** Zentrale Angaben der Website. */
export const SITE_URL = 'https://timova.ch';
export const APP_URL = 'https://app.timova.ch';
export const KONTAKT_EMAIL = 'info@timova.ch';
export const SUPPORT_EMAIL = 'support@timova.ch';

/** Nur der exakte Wert «true» gibt die Seite für Suchmaschinen frei. */
export function istIndexierbar(): boolean {
  return process.env.SITE_INDEXIERBAR === 'true';
}
