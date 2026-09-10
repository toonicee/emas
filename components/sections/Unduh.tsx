import Image from "next/image";
import { unduh } from "@/content/sections";
import { Reveal } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/PillLink";

export function Unduh() {
  return (
    <section id="unduh" className="shell py-20 lg:py-32" aria-labelledby="unduh-judul">
      <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <h2
            id="unduh-judul"
            className="display max-w-[15ch] text-[36px] text-graphite sm:text-[50px] lg:text-[72px]"
          >
            {unduh.title}
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {unduh.stores.map((s, i) => (
              <PillLink key={s.label} href={s.href} tone={i === 0 ? "accent" : "dark"}>
                {s.label}
              </PillLink>
            ))}
          </div>

          <p className="mt-6 text-[14px] text-muted">{unduh.note}</p>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Mockup ini dirender dari scripts/app-mockup.html, bukan foto stok —
              jadi UI di dalamnya benar-benar memakai token desain SUVARNA. */}
          <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-paper-2">
            <Image
              src="/images/app-mockup.jpg"
              alt="Tampilan aplikasi SUVARNA: saldo emas 12,4805 gram beserta harga beli dan jual hari ini"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              quality={82}
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
