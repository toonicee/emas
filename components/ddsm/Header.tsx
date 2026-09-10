"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ddsmPath, type Dict } from "@/content/ddsm";
import { LangSwitch } from "./LangSwitch";
import { Arrow, Shell } from "./ui";

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
    <header className="sticky top-0 z-50 bg-ddsm-forest text-ddsm-cream">
      <Shell>
        <div className="flex h-16 items-center gap-6">
          <Link
            href={ddsmPath(dict.locale)}
            className="text-[17px] font-bold tracking-[0.1em] text-ddsm-gold"
          >
            DDS<span className="text-ddsm-cream">M</span>
          </Link>

          <nav aria-label={dict.common.menu} className="hidden items-center gap-7 lg:flex">
            {dict.nav.map((item) => {
              const href = ddsmPath(dict.locale, item.slug);
              return (
                <Link
                  key={item.slug}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`text-[13px] font-medium transition-colors hover:text-ddsm-gold ${
                    isActive(href) ? "text-ddsm-gold" : "text-ddsm-cream"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LangSwitch dict={dict} />

            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-md bg-ddsm-gold px-4 py-2.5 text-[13px] font-semibold text-ddsm-forest transition-colors hover:bg-[#ffd83c] sm:inline-flex"
            >
              {dict.common.invest}
              <Arrow />
            </a>

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
      </Shell>

      <div id="ddsm-menu" hidden={!open} className="border-t border-white/10 lg:hidden">
        <Shell>
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
                  className="border-b border-white/10 py-3.5 text-[15px] font-medium last:border-b-0"
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 mb-4 inline-flex w-fit items-center gap-2 rounded-md bg-ddsm-gold px-5 py-3 text-[14px] font-semibold text-ddsm-forest"
            >
              {dict.common.invest}
              <Arrow />
            </a>
          </nav>
        </Shell>
      </div>
    </header>
  );
}
