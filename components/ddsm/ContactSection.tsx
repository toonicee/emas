import type { Dict } from "@/content/ddsm";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";
import { Shell } from "./ui";

/**
 * Seksi kontak: judul di kiri, formulir di kanan.
 *
 * Formulirnya (ContactForm, client component) tersambung ke Google Sheet lewat
 * Server Action — lihat app/ddsm/contact-action.ts. Yang dioper ke klien hanya
 * copy kontak, bukan seluruh kamus: props client component ikut terserialisasi
 * ke payload halaman.
 */
export function ContactSection({ dict }: { dict: Dict }) {
  return (
    <section id="contact" className="scroll-mt-20 bg-ddsm-green py-20 text-ddsm-cream lg:py-24">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <h2 className="font-serif text-[34px] font-normal leading-[1.06] tracking-[-0.02em] sm:text-[44px]">
              {dict.home.contact.heading}
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-[#d5e0d3]">
              {dict.home.contact.lead}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <ContactForm copy={dict.home.contact} locale={dict.locale} />
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
