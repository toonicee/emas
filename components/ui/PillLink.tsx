import type { ReactNode } from "react";
import { Arrow } from "./Arrow";

type Tone = "dark" | "light" | "accent";

/**
 * Tombol pill bergaris — bentuk CTA utama di amman.co.id.
 * Radius 50px, border 1px, Work Sans 14/400; semuanya diukur dari situsnya.
 *
 * `tone` menentukan latar tempat tombol berdiri, bukan warna tombolnya:
 *   dark   -> di atas latar terang
 *   light  -> di atas latar hitam / foto
 *   accent -> blok kuning padat, teksnya WAJIB hitam (17,4:1)
 */
const TONE: Record<Tone, string> = {
  dark: "border-graphite text-graphite hover:bg-ink hover:border-ink hover:text-paper",
  light: "border-paper/60 text-paper hover:bg-paper hover:border-paper hover:text-ink",
  accent: "border-accent bg-accent text-ink hover:bg-ink hover:border-ink hover:text-accent",
};

export function PillLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <a href={href} className={`pill ${TONE[tone]} ${className ?? ""}`}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

/** Varian teks tanpa border — pola "Read More →" di kartu berita Amman. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`arrow ${className ?? ""}`}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
