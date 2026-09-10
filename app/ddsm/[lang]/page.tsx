import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ddsm/ContactSection";
import { Btn, Eyebrow, SectionHeading, Shell } from "@/components/ddsm/ui";
import { getDict, isLocale, prices } from "@/content/ddsm";
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

export default async function DdsmHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);
  const t = dict.home.ticker;
  const b = dict.home.bento;

  return (
    <>
      {/*
        HERO

        Versi sebelumnya memakai kotak melayang ber-`rounded-b-[46%]`, yang
        menghasilkan bentuk seperti balon: bidang oranye raksasa dengan potongan
        elips curam dan ruang kosong menganga di dalamnya.

        Sekarang: pita full-bleed dengan lengkung bawah yang jauh lebih landai
        (50% × 14%), padding terukur, dan skala tipografi yang tersambung —
        eyebrow 11 → judul 44–76 → lead 17 → tombol 14. Karakternya tetap,
        keseimbangannya kembali.
      */}
      <section
        className="relative isolate overflow-hidden bg-ddsm-amber"
        style={{ borderBottomLeftRadius: "50% 14%", borderBottomRightRadius: "50% 14%" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,rgba(91,43,0,.2)_1px,transparent_1px),linear-gradient(rgba(255,221,119,.4)_1px,transparent_1px)] [background-size:48px_54px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,236,166,.85),transparent_48%),linear-gradient(160deg,transparent_45%,rgba(120,52,0,.28))]"
        />

        <Shell className="relative">
          <div className="mx-auto max-w-4xl px-1 pt-14 pb-24 text-center sm:pt-16 lg:pt-20 lg:pb-28">
            <Eyebrow tone="brown">{dict.home.hero.eyebrow}</Eyebrow>

            <h1 className="mt-5 text-balance font-serif text-[36px] font-semibold leading-[1.06] tracking-[-0.03em] text-[#1d1709] sm:text-[50px] lg:text-[62px]">
              {dict.home.hero.title}
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-[17px] leading-[1.6] text-[#4a2900]">
              {dict.home.hero.lead}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Btn href="#contact" tone="solid">{dict.home.hero.primary}</Btn>
              <Btn href={`/ddsm/${lang}/company`} tone="cream">{dict.home.hero.secondary}</Btn>
            </div>
          </div>
        </Shell>
      </section>

      {/* Kartu harga menumpang di atas lengkung hero. */}
      <Shell>
        <div className="relative z-10 -mt-16 grid gap-5 rounded-xl bg-white px-6 py-6 shadow-[0_16px_40px_rgba(42,32,17,0.14)] sm:grid-cols-[1.3fr_1fr_1fr] sm:items-center sm:gap-8 sm:px-8">
          <div className="border-b border-ddsm-rule pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
            <p className="text-[12px] text-ddsm-muted">{t.date}</p>
            <p className="mt-1 font-serif text-[22px] font-semibold leading-tight text-ddsm-ink">
              {t.label}
            </p>
          </div>
          <div>
            <p className="text-[12px] font-medium text-ddsm-muted">{t.buy}</p>
            <p className="mt-1 text-[20px] font-semibold text-ddsm-ink">
              Rp 2.810.000<span className="text-[13px] font-normal text-ddsm-muted"> / gr</span>
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-[#2f7d43]">↑ {t.buyDelta}</p>
          </div>
          <div>
            <p className="text-[12px] font-medium text-ddsm-muted">{t.sell}</p>
            <p className="mt-1 text-[20px] font-semibold text-ddsm-ink">
              Rp 2.623.000<span className="text-[13px] font-normal text-ddsm-muted"> / gr</span>
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-[#b23f3b]">↓ {t.sellDelta}</p>
          </div>
        </div>
      </Shell>

      <section className="py-20 lg:py-24">
        <Shell>
          <SectionHeading
            align="center"
            eyebrow={dict.home.intro.eyebrow}
            title={dict.home.intro.heading}
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <h3 className="max-w-md font-serif text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-ddsm-ink lg:text-[34px]">
              {dict.home.intro.sideHeading}
            </h3>
            <p className="text-[16px] leading-[1.8] text-ddsm-body">{dict.home.intro.body}</p>
          </div>

          {/*
            Bento lima kartu, mengikuti komp desain di `public/images/asset*`.

            Aset kiriman itu adalah kartu jadi dengan teks Inggris yang sudah
            di-outline menjadi vektor/raster. Dipasang apa adanya, versi
            Indonesia dan Mandarin ikut menampilkan teks Inggris, dan teksnya
            lenyap dari mesin pencari maupun pembaca layar. Karena itu yang
            dipakai di sini hanya OBJEK 3D-nya — hasil ekstraksi sprite sheet
            di dalam SVG, tersimpan di `public/images/ddsm/`. Teks tetap HTML
            hidup, jadi tiga bahasa tetap jalan.

            Kartu ponsel dan chip harga tetap dibangun dari CSS: mockup ponsel
            pada aset itu ber-branding SUVARNA, dan memasangnya di halaman DDSM
            mengulang persis kebocoran lintas-merek yang sudah ditutup.

            Warna latar diambil piksel-per-piksel dari aset aslinya.
          */}
          <div className="mt-14 grid gap-4 lg:gap-5">
            <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
              <article className="relative flex min-h-[250px] flex-col overflow-hidden rounded-2xl bg-[#22381e] p-7 lg:p-8">
                <div className="relative z-10">
                  <h3 className="text-balance font-serif text-[20px] font-semibold leading-[1.2] text-white lg:text-[23px]">
                    {b.certified.title}
                  </h3>
                  <p className="mt-2.5 max-w-[46ch] text-[14px] leading-[1.6] text-[#cfdccd]">
                    {b.certified.desc}
                  </p>
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-4 flex items-end justify-between"
                >
                  <Image
                    src="/images/ddsm/coin-plain.png"
                    alt=""
                    width={300}
                    height={139}
                    className="-ml-8 w-[142px] lg:w-[158px]"
                  />
                  <Image
                    src="/images/ddsm/pouch.png"
                    alt=""
                    width={352}
                    height={340}
                    className="w-[122px] lg:w-[136px]"
                  />
                  <Image
                    src="/images/ddsm/coin-hole.png"
                    alt=""
                    width={300}
                    height={194}
                    className="-mr-7 w-[148px] lg:w-[164px]"
                  />
                </div>
              </article>

              <article className="relative flex min-h-[250px] flex-col justify-center overflow-hidden rounded-2xl bg-[#efeae6] p-7 lg:p-8">
                <div className="relative z-10 max-w-[56%]">
                  <h3 className="text-balance font-serif text-[20px] font-semibold leading-[1.2] text-ddsm-ink lg:text-[23px]">
                    {b.rates.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-ddsm-body">{b.rates.desc}</p>
                </div>

                {/* Angkanya sengaja sama dengan kartu harga di atas halaman —
                    dua "harga hari ini" yang berbeda dalam satu halaman
                    terbaca sebagai bug, bukan sebagai hiasan. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-7 top-1/2 h-[208px] w-[132px] -translate-y-1/2 rotate-[-8deg] rounded-[22px] border-[3px] border-[#20241f] bg-ddsm-forest p-3 shadow-[0_18px_36px_rgba(30,40,28,0.28)]"
                >
                  <span className="mx-auto mb-2 block h-[3px] w-8 rounded-full bg-white/25" />
                  <p className="text-[7px] font-semibold tracking-[0.14em] text-ddsm-gold">DDSM</p>
                  <p className="mt-3 text-[7px] text-ddsm-dim">{t.buy} / gr</p>
                  <p className="text-[13px] font-semibold text-white">Rp 2.810.000</p>
                  <p className="text-[7px] font-semibold text-[#7ad18f]">↑ {t.buyDelta}</p>
                  <div className="mt-3 flex h-[56px] items-end gap-[3px]">
                    {[38, 52, 44, 66, 58, 78, 70, 92].map((v, i) => (
                      <span
                        key={i}
                        style={{ height: `${v}%` }}
                        className="flex-1 rounded-[1px] bg-ddsm-gold/70"
                      />
                    ))}
                  </div>
                </div>
              </article>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1.35fr] lg:gap-5">
              <article className="relative flex min-h-[250px] flex-col justify-center overflow-hidden rounded-2xl bg-[#d4af37] p-7">
                <div className="relative z-10 max-w-[62%]">
                  <h3 className="text-balance font-serif text-[20px] font-semibold leading-[1.2] text-[#2a2005] lg:text-[22px]">
                    {b.compliant.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-[1.6] text-[#3d2f06]">
                    {b.compliant.desc}
                  </p>
                </div>

                <div aria-hidden className="pointer-events-none absolute -right-4 top-8 space-y-2">
                  {[
                    { l: t.buy, v: "Rp 2.810.000", d: `↑ ${t.buyDelta}`, up: true },
                    { l: t.sell, v: "Rp 2.623.000", d: `↓ ${t.sellDelta}`, up: false },
                  ].map((c, i) => (
                    <div
                      key={c.l}
                      className={`w-[118px] rounded-lg bg-white px-2.5 py-2 shadow-[0_8px_18px_rgba(80,60,10,0.24)] ${
                        i === 0 ? "rotate-[-5deg]" : "ml-3 rotate-[3deg]"
                      }`}
                    >
                      <p className="text-[7px] text-ddsm-muted">{c.l} / gr</p>
                      <p className="text-[11px] font-semibold text-ddsm-ink">{c.v}</p>
                      <p
                        className={`text-[7px] font-semibold ${c.up ? "text-[#2f7d43]" : "text-[#b23f3b]"}`}
                      >
                        {c.d}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/*
                Latar amber diambil dari asetnya, tapi teksnya TIDAK putih
                seperti di komp: putih di atas #d3933c hanya 2,6:1 — di bawah
                ambang baca, bahkan untuk teks besar. Cokelat tua di bawah ini
                ±7:1 dan mempertahankan warna kartunya.
              */}
              <article className="relative flex min-h-[250px] items-center gap-3 overflow-hidden rounded-2xl bg-[#d3933c] p-6">
                <Image
                  src="/images/ddsm/safe.png"
                  alt=""
                  width={388}
                  height={400}
                  aria-hidden
                  className="w-[112px] shrink-0 lg:w-[126px]"
                />
                <div>
                  <h3 className="text-balance font-serif text-[19px] font-semibold leading-[1.2] text-[#3a2405] lg:text-[21px]">
                    {b.legacy.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#462d07]">{b.legacy.desc}</p>
                </div>
              </article>

              <article className="relative flex min-h-[250px] flex-col justify-center overflow-hidden rounded-2xl bg-[#273b22] p-7 lg:p-8">
                <div className="relative z-10 max-w-[54%]">
                  <h3 className="text-balance font-serif text-[20px] font-semibold leading-[1.2] text-white lg:text-[23px]">
                    {b.cta.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-[1.6] text-[#cfdccd]">{b.cta.desc}</p>
                </div>
                <Image
                  src="/images/ddsm/bars.png"
                  alt=""
                  width={760}
                  height={517}
                  aria-hidden
                  className="pointer-events-none absolute -right-5 bottom-0 w-[200px] lg:w-[224px]"
                />
              </article>
            </div>
          </div>
        </Shell>
      </section>

      {/* Pita visual. Peredamnya sengaja pekat: versi sebelumnya menaruh teks
          putih di atas foto emas terang dengan opacity 55%, dan hasilnya
          nyaris tidak terbaca. */}
      <section className="relative isolate overflow-hidden bg-ddsm-green">
        <Image
          src="/images/logam-mulia.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-ddsm-green/85" />
        <Shell className="relative">
          <div className="max-w-xl py-20 lg:py-24">
            <Eyebrow tone="gold">{dict.pages["physical-gold"].eyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.02em] text-white lg:text-[42px]">
              {dict.pages["physical-gold"].title}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-[#d5e0d3]">
              {dict.pages["physical-gold"].lead}
            </p>
            <div className="mt-8">
              <Btn href={`/ddsm/${lang}/physical-gold`} tone="gold">
                {dict.common.readMore}
              </Btn>
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
                <caption className="sr-only">{dict.home.market.heading}</caption>
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
                    <tr key={row.weight} className="border-b border-[#e4e9e3] last:border-0">
                      <td className="px-5 py-3.5 font-semibold text-ddsm-ink">{row.weight}</td>
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
