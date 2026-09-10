"use client";

import { useEffect, useId, useState } from "react";
import { nav } from "@/content/sections";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";

type OpenMenu = "fisik" | "perusahaan" | null;

/**
 * Header bergaya amman.co.id: tanpa garis pemisah antar item, tipografi kecil
 * dan ringan, jarak antar menu lebar. Kesan lapangnya datang dari ruang
 * kosong, bukan dari kotak dan border.
 */
export function SiteHeader() {
  const [menu, setMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-60 border-b border-rule bg-paper">
      <div className="shell flex h-18 items-center">
        <a
          href="#top"
          className="font-display text-[18px] font-medium tracking-[0.34em] text-graphite"
        >
          {site.name}
        </a>

        {/* ---------- Desktop ---------- */}
        <nav className="ml-14 hidden items-center gap-9 lg:flex" aria-label="Navigasi utama">
          <TopLink href={nav.links[0].href}>{nav.links[0].label}</TopLink>

          <Dropdown
            group={nav.groups.fisik}
            open={menu === "fisik"}
            onOpen={() => setMenu("fisik")}
            onClose={() => setMenu(null)}
            width="w-[360px]"
          />

          {nav.links.slice(1).map((l) => (
            <TopLink key={l.label} href={l.href}>
              {l.label}
            </TopLink>
          ))}

          <Dropdown
            group={nav.groups.perusahaan}
            open={menu === "perusahaan"}
            onOpen={() => setMenu("perusahaan")}
            onClose={() => setMenu(null)}
            width="w-[320px]"
          />
        </nav>

        <div className="ml-auto flex items-center gap-6">
          <span className="hidden text-[12px] text-muted lg:inline">ID / EN</span>
          <a
            href="#unduh"
            className="pill border-graphite text-graphite transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <span>Masuk</span>
            <Arrow />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            className="label text-graphite lg:hidden"
          >
            {mobileOpen ? "Tutup" : "Menu"}
          </button>
        </div>
      </div>

      {/* ---------- Mobile ---------- */}
      <div id="menu-mobile" hidden={!mobileOpen} className="border-t border-rule bg-paper lg:hidden">
        <nav aria-label="Navigasi utama seluler" className="shell py-4">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block border-b border-rule py-3.5 font-display text-[15px] uppercase text-graphite"
            >
              {l.label}
            </a>
          ))}
          {Object.values(nav.groups).map((group) =>
            group.sections.map((s) => (
              <div key={`${group.label}-${s.head}`} className="py-4">
                <div className="label text-muted">
                  {group.label} · {s.head}
                </div>
                <div className="mt-3 flex flex-col gap-2.5">
                  {s.items.map((i) => (
                    <a
                      key={i.label}
                      href={i.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-[15px] text-graphite"
                    >
                      {i.label}
                    </a>
                  ))}
                </div>
              </div>
            )),
          )}
        </nav>
      </div>
    </header>
  );
}

function TopLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="label whitespace-nowrap text-graphite transition-opacity hover:opacity-60"
    >
      {children}
    </a>
  );
}

type DropdownProps = {
  group: (typeof nav.groups)[keyof typeof nav.groups];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  width: string;
};

function Dropdown({ group, open, onOpen, onClose, width }: DropdownProps) {
  const panelId = useId();

  return (
    <div
      className="relative flex"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      /* Menutup saat fokus keluar dari grup — jalur keyboard, bukan cuma hover. */
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
        onFocus={onOpen}
        className="label cursor-pointer whitespace-nowrap text-graphite transition-opacity hover:opacity-60"
      >
        {group.label}
      </button>

      {/* Panel putih ber-radius 8px, mengikuti bahasa kartu di Amman. */}
      <div
        id={panelId}
        hidden={!open}
        className={`absolute left-0 top-11.5 ${width} overflow-hidden rounded-lg border border-rule bg-paper shadow-[0_18px_50px_-18px_rgba(63,57,54,0.35)]`}
      >
        {group.sections.map((s) => (
          <div key={s.head}>
            <div className="label border-b border-rule bg-paper-2 px-5 py-2.5 text-muted">
              {s.head}
            </div>
            {s.items.map((i) => (
              <a
                key={i.label}
                href={i.href}
                onClick={onClose}
                className="flex items-baseline justify-between gap-4 border-b border-rule px-5 py-3.5 transition-colors last:border-b-0 hover:bg-paper-2"
              >
                <span className="text-[14px] text-graphite">{i.label}</span>
                {i.meta ? <span className="text-[11px] text-muted">{i.meta}</span> : null}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
