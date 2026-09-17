"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ddsmPath, type Dict } from "@/content/ddsm";
import { Logo } from "./Logo";

const FRAME = "mx-auto w-full max-w-[880px] px-5 sm:px-8";

export function Header({ dict }: { dict: Dict }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hrefFor = (section: string) => `${ddsmPath(dict.locale)}#${section}`;

  return (
    <header className="sticky top-0 z-50 bg-[#2a3a24] text-ddsm-cream">
      <div className={FRAME}>
        <div className="flex h-[70px] items-center">
          <Link href={ddsmPath(dict.locale)} className="shrink-0">
            <Logo height={46} eager className="h-[38px] w-auto lg:h-[46px]" />
          </Link>

          <nav aria-label={dict.common.menu} className="ml-[60px] hidden items-center gap-7 lg:flex">
            {dict.nav.map((item) => (
              <Link
                key={item.section}
                href={hrefFor(item.section)}
                className="font-serif text-[15px] font-normal text-ddsm-cream transition-colors hover:text-[#d4af37]"
              >
                {item.label}
              </Link>
            ))}
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
            {dict.nav.map((item) => (
              <Link
                key={item.section}
                href={hrefFor(item.section)}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3.5 font-serif text-[17px] font-normal last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
