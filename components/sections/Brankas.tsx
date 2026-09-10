import { brankas } from "@/content/sections";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PillLink } from "@/components/ui/PillLink";

export function Brankas() {
  return (
    <section id="brankas" className="bg-ink text-paper" aria-labelledby="brankas-judul">
      <div className="shell py-20 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="label text-accent">{brankas.eyebrow}</p>
            <h2
              id="brankas-judul"
              className="display mt-6 max-w-[14ch] text-[32px] text-paper lg:text-[50px]"
            >
              {brankas.title}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.55] text-dim-2">
              {brankas.lead}
            </p>
            <div className="mt-8">
              <PillLink href={brankas.cta.href} tone="light">
                {brankas.cta.label}
              </PillLink>
            </div>
          </Reveal>

          <Stagger>
            {brankas.rows.map((r) => (
              <StaggerItem key={r.label}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 border-b border-rule-dk py-4.5">
                  <span className="text-[15px] text-paper">{r.label}</span>
                  <span className="text-right text-[12px] tracking-[0.06em] text-dim">{r.val}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
