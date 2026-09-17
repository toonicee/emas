"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { LOCALE_META, LOCALES, type Dict, type Locale } from "@/content/ddsm/types";

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
    const parts = (pathname || `/${dict.locale}`).split("/");
    if ((LOCALES as readonly string[]).includes(parts[1])) {
      parts[1] = target;
      return parts.join("/");
    }
    return `/${target}`;
  };

  const current = LOCALE_META[dict.locale];

  return (
    <details ref={ref} className={`group relative w-fit ${className ?? ""}`}>
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
