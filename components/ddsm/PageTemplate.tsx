import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import type { Dict, SubPage } from "@/content/ddsm";
import { Btn, Eyebrow, FeatureCard, SectionHeading, Shell } from "./ui";

/**
 * Kerangka bersama kelima sub-halaman DDSM.
 *
 * Semua halaman memakai susunan yang sama — hero, pengantar, fitur, langkah,
 * FAQ, penutup — sehingga konsistensinya dijaga oleh satu berkas, bukan oleh
 * kedisiplinan menyalin markup lima kali.
 *
 * Animasi scroll memakai primitif bersama di components/motion (lihat README).
 * Hero tidak dianimasikan karena <h1>-nya elemen LCP. Daftar semantik (<ol>
 * langkah, daftar FAQ) dibungkus Reveal utuh, bukan Stagger: Stagger
 * membungkus tiap anak dengan <div>, dan <div> di dalam <ol> tidak valid.
 */
export function PageTemplate({ dict, page }: { dict: Dict; page: SubPage }) {
  return (
    <>
      {/* Hero sub-halaman: pita hijau tenang, bukan pengulangan hero beranda. */}
      <section className="bg-ddsm-forest py-16 text-ddsm-cream lg:py-24">
        <Shell>
          <Eyebrow tone="gold">{page.eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-[18ch] font-serif text-[38px] font-normal leading-[1.03] tracking-[-0.025em] sm:text-[52px] lg:text-[64px]">
            {page.title}
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-[#d5e0d3]">{page.lead}</p>
        </Shell>
      </section>

      <section className="bg-ddsm-sand py-20 lg:py-24">
        <Shell>
          <Stagger className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <h2 className="font-serif text-[28px] font-normal leading-[1.1] tracking-[-0.02em] text-ddsm-ink lg:text-[38px]">
              {page.intro.heading}
            </h2>
            <div className="space-y-5">
              {page.intro.body.map((p) => (
                <p key={p} className="text-[16px] leading-[1.75] text-ddsm-body">
                  {p}
                </p>
              ))}
            </div>
          </Stagger>
        </Shell>
      </section>

      <section className="bg-ddsm-paper py-20 lg:py-24">
        <Shell>
          <Reveal>
            <SectionHeading eyebrow={page.eyebrow} title={page.features.heading} lead={page.features.lead} />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.features.items.map((item, i) => (
              <FeatureCard key={item.title} title={item.title} desc={item.desc} index={i} />
            ))}
          </Stagger>
        </Shell>
      </section>

      <section className="bg-ddsm-green py-20 text-ddsm-cream lg:py-24">
        <Shell>
          <Reveal>
            <SectionHeading tone="light" title={page.steps.heading} lead={page.steps.lead} />
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-lg bg-ddsm-rule-dk sm:grid-cols-2">
              {page.steps.items.map((item) => (
                <li key={item.title} className="bg-ddsm-green p-6 lg:p-8">
                  <h3 className="font-serif text-[20px] font-normal leading-tight text-white lg:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-[#cfdccd]">{item.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Shell>
      </section>

      <section className="bg-ddsm-sand py-20 lg:py-24">
        <Shell>
          <Stagger className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading title={page.faq.heading} />
            {/* <details> — nol JavaScript, aksesibel bawaan, dan seluruh
                jawabannya tetap ada di HTML meski panelnya tertutup. */}
            <div className="border-t border-ddsm-rule">
              {page.faq.items.map((item) => (
                <details key={item.q} className="group border-b border-ddsm-rule">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[17px] font-semibold leading-snug text-ddsm-ink">{item.q}</h3>
                    <span
                      aria-hidden
                      className="shrink-0 text-[20px] font-light text-ddsm-muted transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[70ch] pb-6 text-[15px] leading-[1.75] text-ddsm-body">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Stagger>
        </Shell>
      </section>

      <section className="bg-ddsm-cream py-20 lg:py-24">
        <Shell>
          <Reveal>
            <div className="flex flex-col items-start gap-8 rounded-xl bg-ddsm-green px-8 py-12 text-ddsm-cream lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-14">
              <div className="max-w-xl">
                <h2 className="font-serif text-[28px] font-normal leading-[1.1] tracking-[-0.02em] text-white lg:text-[36px]">
                  {dict.cta.heading}
                </h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-[#d5e0d3]">{dict.cta.body}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Btn href="#contact" tone="gold">{dict.cta.primary}</Btn>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
