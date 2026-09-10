import type { Dict } from "@/content/ddsm";
import { Arrow, Shell } from "./ui";

/**
 * Formulir kontak. Belum terhubung ke backend — begitu endpoint siap, ubah
 * <form> ini memakai Server Action dan validasi zod, tanpa perlu menambah
 * JavaScript di sisi klien.
 */
export function ContactSection({ dict }: { dict: Dict }) {
  const f = dict.home.contact.fields;
  const inputCls =
    "mt-2 block w-full rounded-md border border-ddsm-rule px-3.5 py-2.5 text-[15px] font-normal text-ddsm-ink outline-none placeholder:text-[#a8afa7] focus:border-ddsm-green-2 focus:ring-2 focus:ring-ddsm-green-2/25";
  const labelCls = "block text-[13px] font-semibold text-ddsm-ink";

  return (
    <section id="contact" className="scroll-mt-20 bg-ddsm-green py-20 text-ddsm-cream lg:py-24">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ddsm-gold">
              {dict.home.contact.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-[34px] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[44px]">
              {dict.home.contact.heading}
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-[#d5e0d3]">
              {dict.home.contact.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${dict.footer.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-ddsm-gold hover:text-ddsm-gold"
              >
                {dict.footer.email} <Arrow />
              </a>
            </div>
          </div>

          <form className="rounded-xl bg-white p-6 text-ddsm-ink shadow-[0_18px_38px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="ddsm-name">{f.name}</label>
                <input id="ddsm-name" required name="name" autoComplete="name" placeholder={f.namePh} className={inputCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="ddsm-email">{f.email}</label>
                <input id="ddsm-email" required name="email" type="email" autoComplete="email" placeholder={f.emailPh} className={inputCls} />
              </div>
            </div>

            <div className="mt-5">
              <label className={labelCls} htmlFor="ddsm-phone">{f.phone}</label>
              <input id="ddsm-phone" required name="phone" type="tel" autoComplete="tel" placeholder={f.phonePh} className={inputCls} />
            </div>

            <div className="mt-5">
              <label className={labelCls} htmlFor="ddsm-cat">{f.category}</label>
              <select id="ddsm-cat" required name="category" defaultValue="" className={`${inputCls} bg-white`}>
                <option value="" disabled>{f.categoryPh}</option>
                {dict.home.contact.categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className={labelCls} htmlFor="ddsm-msg">{f.message}</label>
              <textarea id="ddsm-msg" name="message" rows={4} placeholder={f.messagePh} className={`${inputCls} resize-y`} />
            </div>

            <label className="mt-5 flex items-start gap-2.5 text-[13px] leading-snug text-ddsm-body">
              <input type="checkbox" required className="mt-0.5 accent-ddsm-green-2" />
              {f.consent}
            </label>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-md bg-ddsm-green px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#265b30]"
            >
              {f.submit} <Arrow />
            </button>
          </form>
        </div>
      </Shell>
    </section>
  );
}
