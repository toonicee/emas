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
 * Pemilih bahasa berbentuk dropdown, tinggal di footer.
 *
 * Dibangun di atas <details>/<summary>, bukan tombol + state React. Alasannya:
 * membuka-tutupnya ditangani browser sendiri, jadi dropdown ini tetap bisa
 * dibuka walau JavaScript gagal dimuat, dan isinya tetap tiga <a> sungguhan —
 * bisa di-crawl mesin pencari dan bisa dibuka di tab baru. JavaScript di sini
 * cuma pemanis: menutup panel setelah memilih, saat menekan Escape, atau saat
 * mengklik di luar.
 *
 * Panelnya membuka ke ATAS: footer adalah elemen terakhir halaman, jadi panel
 * yang membuka ke bawah akan menjulur melewati dasar halaman dan memaksa
 * pengunjung menggulir hanya untuk melihat pilihannya.
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
    <details ref={ref} className={`group relative w-fit ${className ?? ""}`}>
      {/* Label untuk pembaca layar ditaruh sebagai teks sr-only, bukan
          aria-label: aria-label akan MENGGANTI teks yang terlihat ("English"),
          sehingga nama yang diucapkan tidak lagi memuat apa yang dilihat
          pengguna — pelanggaran kriteria label-in-name. */}
      <summary className="flex cursor-pointer list-none items-center gap-2.5 rounded-[5px] border border-white/35 px-2.5 py-[7px] text-[13px] font-medium text-white outline-none transition-colors hover:border-white/60 focus-visible:ring-2 focus-visible:ring-[#d4af37] [&::-webkit-details-marker]:hidden">
        <span className="sr-only">{dict.common.langSwitchLabel}: </span>
        <span aria-hidden className="text-[16px] leading-none">
          {current.flag}
        </span>
        <span>{current.name}</span>
        <svg
          aria-hidden
          viewBox="0 0 12 7"
          className="ml-1 h-[7px] w-[12px] transition-transform group-open:rotate-180"
        >
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </summary>

      <ul className="absolute bottom-full left-0 z-50 mb-1.5 w-max min-w-full overflow-hidden rounded-md border border-white/15 bg-[#262626] py-1 shadow-[0_-12px_28px_rgba(0,0,0,0.45)]">
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
                className={`flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors hover:bg-white/[0.07] hover:text-white ${
                  active ? "font-semibold text-white" : "text-white/75"
                }`}
              >
                <span aria-hidden className="text-[16px] leading-none">
                  {m.flag}
                </span>
                <span>{m.name}</span>
                {active && (
                  <svg
                    aria-hidden
                    viewBox="0 0 12 10"
                    className="ml-auto h-[10px] w-3 pl-0.5 text-[#d4af37]"
                  >
                    <path d="M1 5l3.5 3.5L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
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
