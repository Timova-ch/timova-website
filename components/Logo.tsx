/** Timova-Logo aus dem Markenpaket, hell/dunkel über prefers-color-scheme. */
export function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG, keine Optimierung nötig */}
      <img src="/brand/timova-logo-farbig.svg" alt="Timova" width={215} height={48} className="h-full w-auto dark:hidden" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/timova-logo-farbig-dunkel.svg"
        alt="Timova"
        width={215}
        height={48}
        className="hidden h-full w-auto dark:block"
      />
    </span>
  );
}
