import type { Dict } from "@/content/ddsm";
import { Reveal } from "@/components/motion/Reveal";
import { Shell } from "./ui";

/**
 * Formulir kontak. Belum terhubung ke backend — begitu endpoint siap, ubah
 * <form> ini memakai Server Action dan validasi zod, tanpa perlu menambah
 * JavaScript di sisi klien.
 */
/** Tanda wajib merah. aria-hidden: atribut `required` pada input sudah
    menyampaikan status wajib ke pembaca layar, jadi bintang ini tidak perlu
    ikut diucapkan. */
function Req() {
  return (
    <span aria-hidden className="text-[#e5484d]">
      {" "}*
    </span>
  );
}

export function ContactSection({ dict }: { dict: Dict }) {
  const f = dict.home.contact.fields;
  const inputCls =
    "block h-11 w-full rounded-lg border border-[#d9dcd8] bg-white px-3.5 text-[14px] text-ddsm-ink outline-none transition-colors placeholder:text-[#9ea39d] focus:border-ddsm-green-2 focus:ring-2 focus:ring-ddsm-green-2/20";
  const labelCls = "block text-[14px] font-semibold text-[#1a1a1a]";

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
          <form className="rounded-2xl bg-white p-6 text-ddsm-ink shadow-[0_18px_38px_rgba(0,0,0,0.18)] sm:p-7">
            <div className="space-y-4">
              <div>
                <label className={labelCls} htmlFor="ddsm-name">
                  {f.name}
                  <Req />
                </label>
                <input id="ddsm-name" required name="name" autoComplete="name" placeholder={f.namePh} className={`mt-2 ${inputCls}`} />
              </div>

              <div>
                <label className={labelCls} htmlFor="ddsm-email">
                  {f.email}
                  <Req />
                </label>
                <input id="ddsm-email" required name="email" type="email" autoComplete="email" placeholder={f.emailPh} className={`mt-2 ${inputCls}`} />
              </div>

              <div>
                <label className={labelCls} htmlFor="ddsm-phone">
                  {f.phone}
                  <Req />
                </label>
                <input id="ddsm-phone" required name="phone" type="tel" autoComplete="tel" placeholder={f.phonePh} className={`mt-2 ${inputCls}`} />
              </div>

              <div>
                <label className={labelCls} htmlFor="ddsm-cat">
                  {f.category}
                  <Req />
                </label>
                {/* Panah bawaan <select> berbeda di tiap browser; appearance-none
                    + ikon sendiri membuatnya sama dengan komp. `invalid:` membuat
                    teks "belum dipilih" tampil abu-abu seperti placeholder input
                    lain — select wajib dengan nilai "" dianggap :invalid. */}
                <div className="relative mt-2">
                  <select
                    id="ddsm-cat"
                    required
                    name="category"
                    defaultValue=""
                    className={`${inputCls} appearance-none pr-10 invalid:text-[#9ea39d]`}
                  >
                    <option value="" disabled>
                      {f.categoryPh}
                    </option>
                    {dict.home.contact.categories.map((c) => (
                      <option key={c} className="text-ddsm-ink">
                        {c}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden
                    viewBox="0 0 14 8"
                    className="pointer-events-none absolute right-3.5 top-1/2 h-2 w-3.5 -translate-y-1/2 text-[#8f948e]"
                  >
                    <path d="M1 1l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              <div>
                <label className={labelCls} htmlFor="ddsm-msg">
                  {f.message}
                </label>
                <textarea
                  id="ddsm-msg"
                  name="message"
                  rows={4}
                  placeholder={f.messagePh}
                  className="mt-2 block min-h-24 w-full resize-y rounded-lg border border-[#d9dcd8] bg-white px-3.5 py-3 text-[14px] text-ddsm-ink outline-none transition-colors placeholder:text-[#9ea39d] focus:border-ddsm-green-2 focus:ring-2 focus:ring-ddsm-green-2/20"
                />
              </div>
            </div>

            <label className="mt-6 flex items-center gap-3 text-[14px] text-[#1a1a1a]">
              <input type="checkbox" required className="size-[18px] shrink-0 accent-ddsm-green" />
              {f.consent}
            </label>

            <button
              type="submit"
              className="mt-6 flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#22381e] text-[15px] font-semibold text-white transition-colors hover:bg-[#2c4827]"
            >
              {f.submit}
            </button>
          </form>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
