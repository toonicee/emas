import type { ReactNode } from "react";

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10 ${className ?? ""}`}>
      {children}
    </div>
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
        className={`mt-3 font-serif text-[30px] font-normal leading-[1.06] tracking-[-0.02em] sm:text-[38px] lg:text-[46px] ${
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
