import { mitra } from "@/content/sections";
import { Reveal } from "@/components/motion/Reveal";

export function Mitra() {
  return (
    <section className="shell pb-20 lg:pb-28" aria-labelledby="mitra-judul">
      <Reveal>
        <div className="border-t border-rule pt-10">
          <h2 id="mitra-judul" className="label text-muted">
            Mitra distribusi
          </h2>
          <div className="mt-7 flex flex-wrap items-center gap-x-12 gap-y-5">
            {mitra.map((m) => (
              <span
                key={m}
                className="font-display text-[17px] tracking-[0.14em] text-graphite lg:text-[19px]"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
