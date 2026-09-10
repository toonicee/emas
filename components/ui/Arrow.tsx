/**
 * Panah garis tipis. Dipakai di tombol pill dan tautan "selengkapnya" —
 * di amman.co.id nyaris setiap call-to-action membawa panah ini.
 */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="17"
      height="10"
      viewBox="0 0 17 10"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        d="M0 5h15M11.5 1 15.5 5l-4 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}
