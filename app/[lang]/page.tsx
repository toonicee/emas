import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ddsm/ContactSection";
import { HeroGold } from "@/components/ddsm/HeroGold";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { SectionHeading, Shell } from "@/components/ddsm/ui";
import { getDict, isLocale, LOCALE_META, type Feature, type Locale } from "@/content/ddsm";
import { ddsmMetadata } from "@/lib/ddsm-seo";
import { getStock } from "@/lib/ddsm-stock";

export const revalidate = 60;

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

const IDR = new Intl.NumberFormat("id-ID");
const GRAMS = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 4 });
const TZ = "Asia/Jakarta";
const formatDate = (d: Date, locale: Locale) =>
  new Intl.DateTimeFormat(LOCALE_META[locale].htmlLang, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(d);
const formatTime = (d: Date, locale: Locale) =>
  new Intl.DateTimeFormat(LOCALE_META[locale].htmlLang, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: TZ,
  }).format(d);

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

function PriceCell({ label, value, unavailable }: { label: string; value: string | null; unavailable: string }) {
  return (
    <div>
      <p className="text-[15px] text-[#111]">{label}</p>
      {value ? (
        <p className="mt-0.5 whitespace-nowrap text-[16px] font-bold leading-tight text-[#111] sm:text-[20px]">
          {value}
          <span className="text-[13px] font-semibold sm:text-[16px]">/ gr</span>
        </p>
      ) : (
        <p className="mt-1 text-[14px] text-ddsm-muted">{unavailable}</p>
      )}
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
  const m = dict.home.market;

  const stock = await getStock();
  const perGram = stock?.items.find((it) => it.grams === 1);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ddsm-sand">
        <HeroGold className="ddsm-hero-parallax pointer-events-none absolute left-1/2 top-[-80px] -z-10 w-[160vw] -translate-x-1/2 md:top-[-120px] md:w-[720px]">
          <Image
            src="/images/ddsm/hero-ellipse.webp"
            alt=""
            width={1880}
            height={1760}
            preload
            sizes="(max-width: 767px) 160vw, 720px"
            className="block h-auto w-full max-w-none"
          />
        </HeroGold>

        <div className="mx-auto max-w-3xl px-5 pb-[118px] pt-10 text-center sm:px-8 md:pt-12">
          <h1 className="mx-auto max-w-[9.6em] text-balance break-keep font-serif text-[40px] font-normal leading-[1.1] tracking-[-0.01em] text-[#111] sm:text-[54px] lg:text-[64px]">
            {dict.home.hero.title}
          </h1>

          <p className="mx-auto mt-2 max-w-md text-[15px] font-medium leading-[1.5] text-[#1c1c1c]">
            {dict.home.hero.lead}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#products"
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

      <div className="relative z-10 -mt-12 bg-[linear-gradient(to_bottom,transparent_48px,#e2ded8_48px)] px-5 sm:px-8">
        <div className="mx-auto grid max-w-[746px] grid-cols-1 items-center gap-x-6 gap-y-4 rounded-[10px] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(40,30,20,0.06)] sm:grid-cols-[1.45fr_1fr] sm:px-[30px]">
          <div>
            {stock && <p className="text-[14px] text-[#222]">{formatDate(stock.syncedAt, lang)}</p>}
            <p className="mt-0.5 font-serif text-[28px] font-normal leading-[1.15] text-[#111] sm:text-[30px]">
              {t.label}
            </p>
          </div>
          <PriceCell
            label={t.buy}
            value={perGram ? `Rp ${IDR.format(perGram.buyIdr)}` : null}
            unavailable={t.unavailable}
          />
        </div>
      </div>

      <section id="intro" className="bg-[#e2ded8] pb-20 pt-16 lg:pb-24 lg:pt-20">
        <Shell>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow={dict.home.intro.eyebrow}
              title={dict.home.intro.heading}
            />
          </Reveal>

          <Stagger className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <h3 className="max-w-md font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-ddsm-ink lg:text-[34px]">
              {dict.home.intro.sideHeading}
            </h3>
            <p className="text-[16px] leading-[1.8] text-ddsm-body">
              {dict.home.intro.body}
            </p>
          </Stagger>

          <div id="products" className="mt-14 grid gap-4 lg:gap-5">
            <Stagger className="grid gap-4 md:grid-cols-2 lg:gap-5">
              <BentoCard src="/images/ddsm/bento-1.webp" width={1182} height={570} sizes="(max-width: 768px) 100vw, 50vw" item={b.certified} />
              <BentoCard src="/images/ddsm/bento-2.webp" width={1182} height={570} sizes="(max-width: 768px) 100vw, 50vw" item={b.rates} />
            </Stagger>
            <Stagger className="grid gap-4 md:grid-cols-[1fr_1fr_1.35fr] lg:gap-5">
              <BentoCard src="/images/ddsm/bento-3.webp" width={690} height={570} sizes="(max-width: 768px) 100vw, 30vw" item={b.compliant} />
              <BentoCard src="/images/ddsm/bento-4.webp" width={690} height={570} sizes="(max-width: 768px) 100vw, 30vw" item={b.legacy} />
              <BentoCard src="/images/ddsm/bento-5.webp" width={932} height={570} sizes="(max-width: 768px) 100vw, 40vw" item={b.cta} />
            </Stagger>
          </div>
        </Shell>
      </section>

      <section id="market" className="bg-ddsm-paper py-20 lg:py-24">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow={m.eyebrow} title={m.heading} lead={m.lead} />
            </Reveal>

            <Reveal delay={0.08} className="min-w-0">
              <div className="overflow-x-auto rounded-xl border border-[#d5ded3] bg-white shadow-[0_12px_28px_rgba(44,60,43,0.07)]">
                <table className="w-full min-w-[420px] border-collapse text-left text-[14px]">
                  <caption className="sr-only">{m.heading}</caption>
                  <thead className="bg-ddsm-green-2 text-white">
                    <tr>
                      {m.cols.map((c, i) => (
                        <th
                          key={c}
                          scope="col"
                          className={`px-5 py-3.5 text-[13px] font-semibold ${i === m.cols.length - 1 ? "text-right" : ""}`}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stock ? (
                      stock.items.map((row) => (
                        <tr key={row.grams} className="border-b border-[#e4e9e3] last:border-0">
                          <td className="px-5 py-3.5 font-semibold text-ddsm-ink">{GRAMS.format(row.grams)} gr</td>
                          <td className="px-5 py-3.5 text-ddsm-body">Rp {IDR.format(row.buyIdr)}</td>
                          <td className="px-5 py-3.5 text-right">
                            <span
                              className={`rounded px-2.5 py-1 text-[12px] font-semibold ${
                                row.inStock ? "bg-[#e6f4e6] text-[#2f7d43]" : "bg-[#eeecea] text-ddsm-muted"
                              }`}
                            >
                              {row.inStock ? m.available : m.soldOut}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={m.cols.length} className="px-5 py-8 text-center text-ddsm-muted">
                          {m.unavailable}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {stock && (
                <p className="mt-3 text-right text-[12px] text-ddsm-muted">
                  {m.updated.replace("{time}", formatTime(stock.syncedAt, lang))}
                </p>
              )}
            </Reveal>
          </div>
        </Shell>
      </section>

      <ContactSection dict={dict} />
    </>
  );
}
