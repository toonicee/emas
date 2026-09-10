import Image from "next/image";
import { tentang } from "@/content/sections";
import { PillLink } from "@/components/ui/PillLink";

/**
 * Band foto full-bleed dengan teks overlay — pola "WHO WE ARE" di amman.co.id:
 * judul uppercase besar di kiri atas, paragraf dan CTA di kanan bawah.
 *
 * Tingginya dikunci lewat class, bukan diisi gambar intrinsik, supaya ruangnya
 * sudah ter-reserve dan tidak ada layout shift ketika aset final dipasang.
 *
 * Saat foto asli siap: taruh <Image fill sizes="100vw" priority={false} /> di
 * dalam wadah ini dan pertahankan lapisan gelap di atasnya — teks putih butuh
 * peredam supaya kontrasnya tetap aman di atas foto terang.
 */
export function VaultPhoto() {
  return (
    <section className="relative isolate overflow-hidden bg-ink" aria-labelledby="tentang-judul">
      {/* Foto dekoratif: alt kosong, karena maknanya sudah dibawa judul dan
          paragraf di sebelahnya. Lapisan gelap di atasnya menjaga kontras teks
          putih tetap aman berapa pun terangnya foto. */}
      <Image
        src="/images/brankas.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        quality={72}
      />
      <div aria-hidden className="absolute inset-0 bg-ink/65" />

      <div className="shell relative flex min-h-[440px] flex-col justify-between gap-16 py-16 lg:min-h-[560px] lg:py-20">
        <div>
          <p className="label text-accent">{tentang.eyebrow}</p>
          <h2
            id="tentang-judul"
            className="display mt-6 max-w-[12ch] text-[36px] text-paper sm:text-[52px] lg:text-[68px]"
          >
            {tentang.title}
          </h2>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[480px]">
            <p className="text-[15px] leading-[1.55] text-dim-2">{tentang.body}</p>
            <div className="mt-7">
              <PillLink href={tentang.cta.href} tone="light">
                {tentang.cta.label}
              </PillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
