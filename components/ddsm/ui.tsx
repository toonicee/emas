import type { ReactNode } from "react";

/**
 * Primitif tampilan DDSM.
 *
 * Skala tipografi di sini sengaja dibuat eksplisit. Versi sebelumnya memakai
 * judul 52px berdampingan dengan teks 9px — jaraknya terlalu jauh, sehingga
 * badan teks tidak terbaca dan halaman terasa timpang. Skalanya sekarang:
 * label 11 · small 13 · body 15 · lead 17 · h3 22–30 · h2 30–48 · h1 40–76.
 */

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="16" height="10" viewBox="0 0 16 10" fill="none"
      aria-hidden focusable="false" className={className}
    >
      <path d="M0 5h14M10.5 1 14.5 5l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "gold" | "brown" }) {
  const color =
    tone === "gold" ? "text-ddsm-gold" : tone === "brown" ? "text-[#5c3400]" : "text-ddsm-muted";
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${color}`}>{children}</p>
  );
}

type BtnTone = "solid" | "outline" | "cream" | "gold";

const BTN: Record<BtnTone, string> = {
  solid: "bg-ddsm-green text-white hover:bg-[#265b30]",
  outline: "border border-current text-ddsm-ink hover:bg-ddsm-ink hover:text-white",
  cream: "bg-ddsm-cream text-ddsm-green hover:bg-white",
  /* Gold hanya aman sebagai blok padat dengan teks gelap — 8,4:1. */
  gold: "bg-ddsm-gold text-ddsm-forest hover:bg-[#ffd83c]",
};

export function Btn({
  href, children, tone = "solid", className,
}: { href: string; children: ReactNode; tone?: BtnTone; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-md px-6 py-3.5 text-[14px] font-semibold transition-colors ${BTN[tone]} ${className ?? ""}`}
    >
      {children}
      <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

export function SectionHeading({
  eyebrow, title, lead, tone = "dark", align = "left", className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className ?? ""}`}>
      {eyebrow ? (
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
            isLight ? "text-ddsm-gold" : "text-ddsm-muted"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 font-serif text-[30px] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[38px] lg:text-[46px] ${
          isLight ? "text-white" : "text-ddsm-ink"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 text-[16px] leading-[1.65] ${isLight ? "text-[#d5e0d3]" : "text-ddsm-body"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** Kartu fitur — dipakai di beranda dan seluruh sub-halaman. */
export function FeatureCard({
  title, desc, index, tone = "light",
}: { title: string; desc: string; index?: number; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <div
      className={`flex h-full flex-col rounded-lg border p-6 lg:p-7 ${
        isDark ? "border-ddsm-rule-dk bg-ddsm-green/60" : "border-ddsm-rule bg-white"
      }`}
    >
      {index !== undefined ? (
        <span className={`text-[11px] font-semibold tracking-[0.16em] ${isDark ? "text-ddsm-gold" : "text-ddsm-green-2"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <h3
        className={`mt-3 font-serif text-[21px] font-semibold leading-[1.2] lg:text-[23px] ${
          isDark ? "text-white" : "text-ddsm-ink"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-3 text-[15px] leading-[1.65] ${isDark ? "text-[#cfdccd]" : "text-ddsm-body"}`}>
        {desc}
      </p>
    </div>
  );
}
