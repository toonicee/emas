import type { MarketData } from "@/content/market";
import { hero } from "@/content/sections";
import { formatStempelWaktu } from "@/lib/format";
import { PillLink } from "@/components/ui/PillLink";

/**
 * Blok above-the-fold.
 *
 * Tidak ada satu pun komponen JavaScript di sini — semua entrance-nya CSS
 * (`.rise` di globals.css), jadi bagian pertama halaman tidak menunggu
 * JavaScript apa pun.
 *
 * <h1> sengaja TIDAK dianimasikan. Dia hampir pasti jadi elemen LCP, dan
 * fade-in dari opacity 0 membuat browser menganggapnya belum ter-paint —
 * LCP molor sebesar durasi animasi.
 *
 * Tipografinya mengikuti amman.co.id: uppercase, weight 320, line-height 1.
 */
export function Hero({ market }: { market: MarketData }) {
  return (
    <section id="top" className="shell pb-16 pt-14 lg:pb-28 lg:pt-24">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-24">
        <div>
          <p className="label text-muted">{hero.eyebrow}</p>

          <h1 className="display mt-8 max-w-[13ch] text-[40px] text-graphite sm:text-[58px] lg:mt-10 lg:text-[82px]">
            {hero.title}
          </h1>

          <div className="rise rise-1 mt-10 grid max-w-[760px] gap-6 sm:grid-cols-2 sm:gap-10">
            {hero.lead.map((p) => (
              <p key={p} className="text-[16px] leading-[1.45] text-graphite">
                {p}
              </p>
            ))}
          </div>

          <div className="rise rise-2 mt-10 flex flex-wrap gap-3">
            <PillLink href={hero.primaryCta.href} tone="dark">
              {hero.primaryCta.label}
            </PillLink>
            <PillLink href={hero.secondaryCta.href} tone="dark">
              {hero.secondaryCta.label}
            </PillLink>
          </div>
        </div>

        {/* Panel harga. Angka tetap berbobot 400 dan tabular — gaya ringan
            Amman bagus untuk judul, tapi deret harga harus tetap terbaca. */}
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between gap-3 border-b border-graphite pb-3">
            <h2 className="label text-graphite">Harga Acuan</h2>
            <time dateTime={market.updatedAt} className="text-right text-[11px] text-muted">
              {formatStempelWaktu(market.updatedAt)}
            </time>
          </div>

          <dl>
            {market.prices.map((row) => (
              <div
                key={row.nama + row.ket}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-rule py-5"
              >
                <div>
                  <dt className="font-display text-[15px] uppercase text-graphite">{row.nama}</dt>
                  <p className="mt-1 text-[11px] tracking-[0.1em] text-muted">{row.ket}</p>
                </div>
                <dd className="text-right">
                  <div className="text-[22px] font-normal text-graphite">{row.harga}</div>
                  <div
                    className={`mt-1 text-[12px] ${row.dir === "up" ? "text-up" : "text-down"}`}
                  >
                    {row.delta}
                  </div>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-[12px] leading-[1.5] text-muted">{hero.priceNote}</p>
        </div>
      </div>
    </section>
  );
}
