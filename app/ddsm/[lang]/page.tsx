import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ddsm/ContactSection";
import { SectionHeading, Shell } from "@/components/ddsm/ui";
import { getDict, isLocale, prices, type Feature } from "@/content/ddsm";
import { ddsmMetadata } from "@/lib/ddsm-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDict(lang);
  return ddsmMetadata({
    locale: lang,
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
  });
}

/** Satu kartu bento: gambar kartu utuh, alt berisi teks kartu dalam bahasa halaman. */
function BentoCard({
  src,
  width,
  height,
  sizes,
  item,
}: {
  src: string;
  width: number;
  height: number;
  sizes: string;
  item: Feature;
}) {
  return (
    <Image
      src={src}
      alt={`${item.title} — ${item.desc}`}
      width={width}
      height={height}
      sizes={sizes}
      className="h-auto w-full"
    />
  );
}

/** Satu kolom harga di kartu hero: label, harga per gram, perubahan harian. */
function PriceCell({
  label,
  value,
  delta,
  up = false,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <div>
      <p className="text-[15px] text-[#111]">{label}</p>
      {/* nowrap: di ponsel kolomnya ±150px, dan tanpa ini "/ gr" turun ke baris
          sendiri — harga per gram terbaca terpotong. */}
      <p className="mt-0.5 whitespace-nowrap text-[16px] font-bold leading-tight text-[#111] sm:text-[20px]">
        {value}
        <span className="text-[13px] font-semibold sm:text-[16px]">/ gr</span>
      </p>
      <p
        className={`mt-1 flex items-center gap-1.5 text-[12px] font-semibold ${
          up ? "text-[#2a7f3a]" : "text-[#d23b3b]"
        }`}
      >
        <svg aria-hidden viewBox="0 0 12 12" className={`h-3 w-3 ${up ? "" : "rotate-180"}`}>
          <path
            d="M6 10.5V1.5M2 5.5l4-4 4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Arah naik/turun tidak boleh hanya disampaikan lewat warna dan ikon
            tersembunyi; panah teks ini dibacakan pembaca layar dalam bahasa
            penggunanya sendiri. */}
        <span className="sr-only">{up ? "↑" : "↓"}</span>({delta})
      </p>
    </div>
  );
}

export default async function DdsmHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);
  const t = dict.home.ticker;
  const b = dict.home.bento;

  return (
    <>
      {/*
        HERO — mengikuti komp: latar terang, lingkaran emas di tengah yang
        terpotong di tepi atas dan bawah hero, judul serif, satu baris lead,
        dua tombol, lalu kartu harga yang duduk tepat di garis batas hero dengan
        seksi berikutnya.

        Lingkarannya adalah hero-ellipse.webp (±179 kB) hasil
        scripts/render-ddsm-assets.cjs dari ellipse.svg — SVG-nya sendiri
        26 MB dan tidak disajikan langsung. `preload` karena gambar ini elemen
        terbesar di atas lipatan, jadi kandidat LCP; di Next 16 `priority`
        sudah deprecated dan diganti `preload`.

        Batas lebar judul ditulis dalam `em` (9.6em ≈ 610px pada 64px) supaya
        pemenggalan "…gold, / secured for you" sama di semua breakpoint.
        `break-keep` (word-break: keep-all) membuat aksara Han hanya boleh
        dipatahkan di tanda baca — tanpa itu judul Mandarin terpenggal di
        tengah kata ("为纯金而 / 建…"). Teks Latin tidak terpengaruh.
        <h1> tidak dianimasikan — lihat prinsip SEO di README.
      */}
      <section className="relative isolate overflow-hidden bg-ddsm-sand">
        <Image
          src="/images/ddsm/hero-ellipse.webp"
          alt=""
          width={1880}
          height={1760}
          preload
          sizes="(max-width: 767px) 160vw, 720px"
          className="pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[160vw] max-w-none -translate-x-1/2 md:top-[-120px] md:w-[720px]"
        />

        <div className="mx-auto max-w-3xl px-5 pb-[118px] pt-10 text-center sm:px-8 md:pt-12">
          <h1 className="mx-auto max-w-[9.6em] text-balance break-keep font-serif text-[40px] font-normal leading-[1.1] tracking-[-0.01em] text-[#111] sm:text-[54px] lg:text-[64px]">
            {dict.home.hero.title}
          </h1>

          <p className="mx-auto mt-2 max-w-md text-[15px] font-medium leading-[1.5] text-[#1c1c1c]">
            {dict.home.hero.lead}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`/ddsm/${lang}/company`}
              className="inline-flex h-[42px] items-center rounded-[6px] border-[1.5px] border-[#2a3a24] bg-[#efebe5] px-[17px] text-[13px] font-bold text-[#1c1c1c] transition-colors hover:bg-white"
            >
              {dict.home.hero.secondary}
            </a>
            <a
              href="#contact"
              className="inline-flex h-[42px] items-center rounded-[6px] bg-[#2a3a24] px-[17px] text-[13px] font-bold text-white transition-colors hover:bg-[#34472d]"
            >
              {dict.home.hero.primary}
            </a>
          </div>
        </div>
      </section>

      {/* Kartu harga duduk di garis batas hero. Pembungkusnya transparan di
          48px teratas — tepat sebesar tumpangan -mt-12, jadi hero terlihat di
          baliknya — dan berwarna seksi intro di bawahnya. Batas dua latar
          karena itu selalu jatuh di tepi bawah hero, berapa pun tinggi kartu
          (di ponsel kartunya bertumpuk dan jauh lebih tinggi). */}
      <div className="relative z-10 -mt-12 bg-[linear-gradient(to_bottom,transparent_48px,#e2ded8_48px)] px-5 sm:px-8">
        <div className="mx-auto grid max-w-[746px] grid-cols-2 items-center gap-x-6 gap-y-4 rounded-[10px] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(40,30,20,0.06)] sm:grid-cols-[1.45fr_1fr_0.9fr] sm:px-[30px]">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[14px] text-[#222]">{t.date}</p>
            <p className="mt-0.5 font-serif text-[28px] font-normal leading-[1.15] text-[#111] sm:text-[30px]">
              {t.label}
            </p>
          </div>
          <PriceCell label={t.buy} value="Rp 2.810.000" delta={t.buyDelta} up />
          <PriceCell label={t.sell} value="Rp 2.623.000" delta={t.sellDelta} />
        </div>
      </div>

      <section className="bg-[#e2ded8] pb-20 pt-16 lg:pb-24 lg:pt-20">
        <Shell>
          <SectionHeading
            align="center"
            eyebrow={dict.home.intro.eyebrow}
            title={dict.home.intro.heading}
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <h3 className="max-w-md font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-ddsm-ink lg:text-[34px]">
              {dict.home.intro.sideHeading}
            </h3>
            <p className="text-[16px] leading-[1.8] text-ddsm-body">
              {dict.home.intro.body}
            </p>
          </div>

          {/*
            Bento lima kartu. Gambarnya adalah kartu utuh dari komp desain
            (public/images/asset1–5.svg), dirender ke WebP oleh
            scripts/render-ddsm-assets.cjs — alasannya ada di skrip itu.

            Teks kartu SUDAH MENYATU di dalam gambar dan berbahasa Inggris di
            ketiga versi bahasa. Supaya mesin pencari dan pembaca layar tetap
            mendapat isinya dalam bahasa halaman, alt tiap gambar diisi judul +
            deskripsi kartu dari kamus (`home.bento`).

            Lebar kolom baris bawah (1 / 1 / 1,35) sengaja sama dengan rasio
            lebar asetnya (345 / 345 / 466), jadi ketiga kartu otomatis sama
            tinggi tanpa perlu dipotong.
          */}
          <div className="mt-14 grid gap-4 lg:gap-5">
            <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
              <BentoCard src="/images/ddsm/bento-1.webp" width={1182} height={570} sizes="(max-width: 768px) 100vw, 50vw" item={b.certified} />
              <BentoCard src="/images/ddsm/bento-2.webp" width={1182} height={570} sizes="(max-width: 768px) 100vw, 50vw" item={b.rates} />
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_1.35fr] lg:gap-5">
              <BentoCard src="/images/ddsm/bento-3.webp" width={690} height={570} sizes="(max-width: 768px) 100vw, 30vw" item={b.compliant} />
              <BentoCard src="/images/ddsm/bento-4.webp" width={690} height={570} sizes="(max-width: 768px) 100vw, 30vw" item={b.legacy} />
              <BentoCard src="/images/ddsm/bento-5.webp" width={932} height={570} sizes="(max-width: 768px) 100vw, 40vw" item={b.cta} />
            </div>
          </div>
        </Shell>
      </section>

      <section className="bg-ddsm-paper py-20 lg:py-24">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <SectionHeading
              eyebrow={dict.home.market.eyebrow}
              title={dict.home.market.heading}
              lead={dict.home.market.lead}
            />

            <div className="overflow-x-auto rounded-xl border border-[#d5ded3] bg-white shadow-[0_12px_28px_rgba(44,60,43,0.07)]">
              <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
                <caption className="sr-only">
                  {dict.home.market.heading}
                </caption>
                <thead className="bg-ddsm-green-2 text-white">
                  <tr>
                    {dict.home.market.cols.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={`px-5 py-3.5 text-[13px] font-semibold ${i === 3 ? "text-right" : ""}`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prices.map((row) => (
                    <tr
                      key={row.weight}
                      className="border-b border-[#e4e9e3] last:border-0"
                    >
                      <td className="px-5 py-3.5 font-semibold text-ddsm-ink">
                        {row.weight}
                      </td>
                      <td className="px-5 py-3.5 text-ddsm-body">{row.buy}</td>
                      <td className="px-5 py-3.5 text-ddsm-body">{row.sell}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="rounded bg-[#e6f4e6] px-2.5 py-1 text-[12px] font-semibold text-[#2f7d43]">
                          {dict.home.market.available}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Shell>
      </section>

      <ContactSection dict={dict} />
    </>
  );
}
