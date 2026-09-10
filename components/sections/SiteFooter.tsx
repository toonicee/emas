import Image from "next/image";
import { footerCols } from "@/content/sections";
import { site } from "@/content/site";

/**
 * Footer gelap dengan latar foto — penutup halaman di amman.co.id.
 * Baris paling bawah dibuat sangat ringkas: legal di kiri, kontak di tengah,
 * sosial di kanan.
 */
export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper">
      {/* Foto dekoratif, diredam kuat supaya tautan footer tetap terbaca. */}
      <Image
        src="/images/footer.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={65}
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/82" />

      <div className="shell relative grid gap-12 py-16 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] lg:py-20">
        <div>
          <div className="font-display text-[20px] font-medium tracking-[0.34em]">{site.name}</div>
          <p className="mt-6 max-w-[300px] text-[13px] leading-[1.6] text-dim">
            {site.legalName}
            <br />
            {site.address.street}, {site.address.city} {site.address.postalCode}
            <br />
            {site.phone}
          </p>
        </div>

        {footerCols.map((c) => (
          <div key={c.head}>
            <h2 className="label text-accent">{c.head}</h2>
            <div className="mt-5 flex flex-col gap-3">
              {c.items.map((i) => (
                <a
                  key={i}
                  href="#top"
                  className="text-[13.5px] text-dim-2 transition-opacity hover:opacity-60"
                >
                  {i}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="shell relative flex flex-wrap items-center justify-between gap-6 border-t border-rule-dk py-7 text-[12px] text-dim">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.license}
        </span>
        <div className="flex flex-wrap gap-6">
          {site.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              rel="noopener noreferrer"
              target="_blank"
              className="transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
