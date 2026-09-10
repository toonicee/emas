import { faq } from "@/content/sections";
import { Reveal } from "@/components/motion/Reveal";

/**
 * FAQ ini WAJIB tampil sebagai konten yang terlihat.
 *
 * Pedoman Google: structured data FAQPage hanya boleh memuat tanya-jawab yang
 * benar-benar terlihat pengguna di halaman yang sama. Menaruh JSON-LD FAQ tanpa
 * padanan visual adalah pelanggaran dan bisa kena manual action.
 *
 * Dibangun dengan <details>/<summary> — nol JavaScript, sudah aksesibel dari
 * sananya, dan isinya tetap ada di HTML meski panelnya tertutup.
 */
export function Faq() {
  return (
    <section id="faq" className="bg-paper-2" aria-labelledby="faq-judul">
      <div className="shell py-20 lg:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <p className="label text-muted">Bantuan</p>
            <h2 id="faq-judul" className="display mt-6 text-[32px] text-graphite lg:text-[50px]">
              Pertanyaan umum
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="border-t border-rule">
              {faq.map((item) => (
                <details key={item.q} className="group border-b border-rule">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[17px] leading-[1.4] text-graphite lg:text-[19px]">
                      {item.q}
                    </h3>
                    <span
                      aria-hidden
                      className="shrink-0 text-[20px] font-light text-muted transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[74ch] pb-7 text-[15px] leading-[1.6] text-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
