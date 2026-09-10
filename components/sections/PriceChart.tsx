"use client";

import { useState } from "react";
import type { MarketData } from "@/content/market";
import { pasar } from "@/content/sections";
import { chartViewBox, polylinePoints } from "@/lib/chart";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

export function PriceChart({ market }: { market: MarketData }) {
  const [active, setActive] = useState(2);
  const range = market.ranges[active];

  return (
    <section id="pasar" className="bg-ink text-paper" aria-labelledby="pasar-judul">
      <div className="shell py-20 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <p className="label text-accent">{pasar.eyebrow}</p>
            <h2 id="pasar-judul" className="display mt-6 text-[32px] text-paper lg:text-[50px]">
              {pasar.title}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.55] text-dim-2">{pasar.lead}</p>

            {/* Pemilih rentang sebagai deretan pill — bentuk kontrol khas Amman.
                Yang aktif jadi blok kuning padat dengan teks hitam (17,4:1). */}
            <div
              className="mt-9 flex flex-wrap gap-2"
              role="group"
              aria-label="Rentang waktu grafik"
            >
              {market.ranges.map((r, i) => (
                <button
                  key={r.label}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  className={`cursor-pointer rounded-full border px-5 py-2 font-display text-[13px] transition-colors ${
                    i === active
                      ? "border-accent bg-accent text-ink"
                      : "border-rule-dk text-dim-2 hover:border-dim hover:text-paper"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <div className="label text-dim">Tertinggi</div>
                <CountUp value={market.high} className="mt-2 block text-[22px] text-paper" />
              </div>
              <div>
                <div className="label text-dim">Terendah</div>
                <CountUp value={market.low} className="mt-2 block text-[22px] text-paper" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-baseline justify-between gap-3 border-b border-rule-dk pb-4">
              <span className="label text-paper">XAU/IDR · per gram</span>
              <span className="text-[12px] text-dim">{range.caption}</span>
            </div>

            <svg
              viewBox={chartViewBox}
              className="mt-6 block h-auto w-full"
              role="img"
              aria-label={`Grafik harga emas 24 karat per gram untuk rentang ${range.caption}. Tertinggi Rp ${market.high.toLocaleString("id-ID")}, terendah Rp ${market.low.toLocaleString("id-ID")}.`}
            >
              {[30, 105, 180, 255].map((y) => (
                <line key={y} x1="0" y1={y} x2="720" y2={y} stroke="#2A2724" strokeWidth="1" />
              ))}
              <polyline
                points={polylinePoints(range)}
                fill="none"
                stroke="#E9F40B"
                strokeWidth="1.75"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            <div className="mt-4 flex justify-between border-t border-rule-dk pt-4 text-[11px] tracking-[0.1em] text-dim">
              <span>{range.axis[0]}</span>
              <span>{range.axis[1]}</span>
              <span>HARI INI</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
