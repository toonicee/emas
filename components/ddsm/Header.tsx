"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ddsmPath, type Dict } from "@/content/ddsm";

/*
 * Header DDSM, mengikuti komp desain: logo "DDSM" emas polos dengan sans
 * tebal (gaya yang sama persis dengan logo footer) dan menu memakai serif —
 * DM Serif Text yang sudah dimuat untuk judul, jadi tidak ada font tambahan.
 *
 * Kontainernya sengaja sama dengan footer (max-w 880px), bukan <Shell>: di
 * komp, logo header dan logo footer berdiri di garis kiri yang sama.
 */
const FRAME = "mx-auto w-full max-w-[880px] px-5 sm:px-8";

export function Header({ dict }: { dict: Dict }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-[#2a3a24] text-ddsm-cream">
      <div className={FRAME}>
        <div className="flex h-[70px] items-center">
          <Link
            href={ddsmPath(dict.locale)}
            className="text-[24px] font-extrabold leading-none tracking-[0.06em] text-[#d4af37]"
          >
            DDSM
          </Link>

          <nav aria-label={dict.common.menu} className="ml-[60px] hidden items-center gap-7 lg:flex">
            {dict.nav.map((item) => {
              const href = ddsmPath(dict.locale, item.slug);
              return (
                <Link
                  key={item.slug}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`font-serif text-[15px] font-normal transition-colors hover:text-[#d4af37] ${
                    isActive(href) ? "text-[#d4af37]" : "text-ddsm-cream"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="ddsm-menu"
              className="rounded-md border border-ddsm-cream/30 px-3 py-2 text-[12px] font-semibold lg:hidden"
            >
              {open ? dict.common.close : dict.common.menu}
            </button>
          </div>
        </div>
      </div>

      <div id="ddsm-menu" hidden={!open} className="border-t border-white/10 lg:hidden">
        <div className={FRAME}>
          <nav aria-label={dict.common.menu} className="flex flex-col py-2">
            {dict.nav.map((item) => {
              const href = ddsmPath(dict.locale, item.slug);
              return (
                <Link
                  key={item.slug}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  /* Ditutup di sini, bukan lewat useEffect atas perubahan
                     pathname: setState di dalam effect dilarang React Compiler,
                     dan menutup di handler klik lebih langsung. */
                  onClick={() => setOpen(false)}
                  className={`border-b border-white/10 py-3.5 font-serif text-[17px] font-normal last:border-b-0 ${
                    isActive(href) ? "text-[#d4af37]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
