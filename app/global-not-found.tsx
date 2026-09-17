import type { Metadata } from "next";
import { Logo } from "@/components/ddsm/Logo";
import { fontVariables } from "@/lib/ddsm-fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — DDSM",
  robots: { index: false, follow: false },
};

const LINKS = [
  { href: "/id", lang: "id-ID", label: "Beranda" },
  { href: "/en", lang: "en", label: "Home" },
  { href: "/zh", lang: "zh-Hans", label: "首页" },
] as const;

export default function GlobalNotFound() {
  return (
    <html lang="id-ID" className={fontVariables}>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center">
          <span className="rounded-xl bg-[#2a3a24] px-6 py-4">
            <Logo height={52} eager className="h-[52px] w-auto" />
          </span>
          <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.16em] text-ddsm-muted">404</p>
          <h1 className="mt-3 font-serif text-[40px] font-normal leading-[1.1] text-ddsm-ink sm:text-[52px]">
            Halaman tidak ditemukan
          </h1>
          <p lang="en" className="mt-3 text-[17px] text-ddsm-body">
            Page not found
          </p>
          <p lang="zh-Hans" className="mt-1 text-[17px] text-ddsm-body">
            页面不存在
          </p>

          <nav aria-label="Beranda" className="mt-10 flex flex-wrap justify-center gap-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                lang={l.lang}
                hrefLang={l.lang}
                className="inline-flex h-[42px] items-center rounded-[6px] bg-[#2a3a24] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#34472d]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
