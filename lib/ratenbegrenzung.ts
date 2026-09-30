/**
 * Einfache Rate-Begrenzung je IP im Speicher der laufenden Instanz.
 * Auf Vercel hat jede Funktionsinstanz ihren eigenen Zähler; das reicht gegen
 * einzelne Skripte, ist aber keine harte Grenze über alle Instanzen.
 */
const FENSTER_MS = 10 * 60 * 1000;
const MAX_ANFRAGEN = 5;
const MAX_EINTRAEGE = 5000;

const zugriffe = new Map<string, number[]>();

export function erlaubt(ip: string, jetzt = Date.now()): boolean {
  const frisch = (zugriffe.get(ip) ?? []).filter((t) => jetzt - t < FENSTER_MS);
  if (frisch.length >= MAX_ANFRAGEN) {
    zugriffe.set(ip, frisch);
    return false;
  }
  frisch.push(jetzt);
  zugriffe.set(ip, frisch);
  if (zugriffe.size > MAX_EINTRAEGE) aufraeumen(jetzt);
  return true;
}

function aufraeumen(jetzt: number) {
  for (const [ip, zeiten] of zugriffe) {
    if (zeiten.every((t) => jetzt - t >= FENSTER_MS)) zugriffe.delete(ip);
  }
}

/** Nur für Tests. */
export function zuruecksetzen() {
  zugriffe.clear();
}
