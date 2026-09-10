"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Dict, type Locale } from "@/content/ddsm";

const FLAG: Record<Locale, string> = { id: "🇮🇩", en: "🇬🇧" };
const CODE: Record<Locale, string> = { id: "ID", en: "EN" };
const NAME: Record<Locale, string> = { id: "Bahasa Indonesia", en: "English" };

/**
 * Pemilih bahasa. Sengaja dua tautan nyata, bukan dropdown atau tombol
 * JavaScript: keduanya bisa di-crawl, bisa dibuka di tab baru, dan tetap
 * berfungsi tanpa JS.
 *
 * Path bahasa lain dihitung dari pathname berjalan — segmen indeks ke-2 pada
 * "/ddsm/<lang>/<slug>" ditukar — sehingga pengunjung tetap berada di halaman
 * yang sama saat berpindah bahasa, bukan dilempar ke beranda.
 */
export function LangSwitch({ dict, className }: { dict: Dict; className?: string }) {
  const pathname = usePathname();

  const pathFor = (target: Locale) => {
    const parts = (pathname || `/ddsm/${dict.locale}`).split("/");
    // ["", "ddsm", "<lang>", ...sisa]
    if (parts[1] === "ddsm" && parts.length > 2) {
      parts[2] = target;
      return parts.join("/");
    }
    return `/ddsm/${target}`;
  };

  return (
    <div
      className={`flex items-center gap-1 ${className ?? ""}`}
      role="group"
      aria-label={dict.common.langSwitchLabel}
    >
      {LOCALES.map((loc) => {
        const active = loc === dict.locale;
        return (
          <Link
            key={loc}
            href={pathFor(loc)}
            hrefLang={loc}
            aria-current={active ? "true" : undefined}
            title={NAME[loc]}
            className={`flex items-center gap-1.5 rounded px-2 py-1.5 text-[12px] font-semibold transition-colors ${
              active ? "bg-white/12 text-ddsm-gold" : "text-ddsm-cream/70 hover:text-ddsm-cream"
            }`}
          >
            <span aria-hidden className="text-[14px] leading-none">
              {FLAG[loc]}
            </span>
            <span>{CODE[loc]}</span>
            <span className="sr-only">{NAME[loc]}</span>
          </Link>
        );
      })}
    </div>
  );
}
