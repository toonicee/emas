"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
/* Diimpor dari "content/ddsm/types" langsung, bukan lewat barrel
   "@/content/ddsm". Barrel-nya merangkai `DICTS` di level modul, dan sekali
   komponen klien menyentuhnya seluruh isi ketiga kamus ikut masuk bundel
   browser — ±22 kB gz copy yang tidak pernah dipakai di sisi klien. types.ts
   tidak mengimpor kamus apa pun, jadi aman. */
import { LOCALE_META, LOCALES, type Dict, type Locale } from "@/content/ddsm/types";

/**
 * Pemilih bahasa berbentuk dropdown.
 *
 * Dibangun di atas <details>/<summary>, bukan tombol + state React. Alasannya:
 * membuka-tutupnya ditangani browser sendiri, jadi dropdown ini tetap bisa
 * dibuka walau JavaScript gagal dimuat, dan isinya tetap tiga <a> sungguhan —
 * bisa di-crawl mesin pencari dan bisa dibuka di tab baru. JavaScript di sini
 * cuma pemanis: menutup panel setelah memilih, saat menekan Escape, atau saat
 * mengklik di luar.
 *
 * Path bahasa lain dihitung dari pathname berjalan — segmen indeks ke-2 pada
 * "/ddsm/<lang>/<slug>" ditukar — sehingga pengunjung tetap berada di halaman
 * yang sama saat berpindah bahasa, bukan dilempar ke beranda.
 */
export function LangSwitch({ dict, className }: { dict: Dict; className?: string }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !ref.current?.open) return;
      ref.current.open = false;
      /* Fokus dikembalikan ke tombolnya, kalau tidak fokus keyboard jatuh ke
         awal halaman setelah panel tertutup. */
      ref.current.querySelector("summary")?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) {
        ref.current.open = false;
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const pathFor = (target: Locale) => {
    const parts = (pathname || `/ddsm/${dict.locale}`).split("/");
    // ["", "ddsm", "<lang>", ...sisa]
    if (parts[1] === "ddsm" && parts.length > 2) {
      parts[2] = target;
      return parts.join("/");
    }
    return `/ddsm/${target}`;
  };

  const current = LOCALE_META[dict.locale];

  return (
    <details ref={ref} className={`group relative ${className ?? ""}`}>
      <summary
        aria-label={dict.common.langSwitchLabel}
        className="flex cursor-pointer list-none items-center gap-1.5 rounded-md px-2.5 py-2 text-[12px] font-semibold text-ddsm-cream transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ddsm-gold [&::-webkit-details-marker]:hidden"
      >
        <span aria-hidden className="text-[14px] leading-none">
          {current.flag}
        </span>
        <span>{current.code}</span>
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className="h-[6px] w-[10px] transition-transform group-open:rotate-180"
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </summary>

      <ul className="absolute right-0 z-50 mt-1.5 min-w-[184px] overflow-hidden rounded-lg border border-black/10 bg-ddsm-paper py-1 shadow-lg">
        {LOCALES.map((loc) => {
          const m = LOCALE_META[loc];
          const active = loc === dict.locale;
          return (
            <li key={loc}>
              <Link
                href={pathFor(loc)}
                hrefLang={m.htmlLang}
                lang={m.htmlLang}
                aria-current={active ? "true" : undefined}
                onClick={close}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors hover:bg-black/[0.05] ${
                  active ? "font-semibold text-ddsm-ink" : "text-ddsm-body"
                }`}
              >
                <span aria-hidden className="text-[15px] leading-none">
                  {m.flag}
                </span>
                <span>{m.name}</span>
                {active && (
                  <svg aria-hidden viewBox="0 0 12 10" className="ml-auto h-[10px] w-3">
                    <path
                      d="M1 5l3.5 3.5L11 1.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
