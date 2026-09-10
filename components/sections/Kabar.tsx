import { kabar } from "@/content/sections";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArrowLink } from "@/components/ui/PillLink";

/**
 * Daftar editorial — tanggal, kategori, judul, dan metadata berada dalam satu
 * baris yang mudah dipindai. Seluruh baris adalah satu target tautan supaya
 * nyaman digunakan pada layar sentuh dan tidak mengulang CTA untuk tiap item.
 */
export function Kabar() {
  return (
    <section id="kabar" className="shell py-20 lg:py-28" aria-labelledby="kabar-judul">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-graphite pb-5">
          <div>
            <h2 id="kabar-judul" className="display text-[32px] text-graphite lg:text-[50px]">
              Kabar, promo & program
            </h2>
          </div>
          <ArrowLink href="#kabar" className="text-graphite">
            Semua tulisan
          </ArrowLink>
        </div>
      </Reveal>

      <Stagger className="border-b border-rule">
        {kabar.map((k) => (
          <StaggerItem key={k.title}>
            <article>
              <a
                href="#kabar"
                className="group grid gap-x-6 gap-y-3 border-t border-rule py-6 transition-colors hover:bg-paper-2 sm:grid-cols-[minmax(110px,0.65fr)_minmax(120px,0.7fr)_minmax(0,2.4fr)_minmax(110px,0.65fr)] sm:items-baseline sm:px-4 lg:gap-x-8 lg:px-5"
              >
                <time dateTime={k.datetime} className="text-[12px] tracking-[0.1em] text-muted">
                  {k.date}
                </time>

                <span className="label text-muted">{k.cat}</span>

                <h3 className="text-[18px] leading-[1.35] text-graphite transition-opacity group-hover:opacity-60 lg:text-[20px]">
                  {k.title}
                </h3>

                <span className="text-[13px] text-muted sm:text-right">{k.meta}</span>
              </a>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
