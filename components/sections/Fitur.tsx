import { fiturIntro } from "@/content/sections";
import { Reveal } from "@/components/motion/Reveal";
import { FiturAccordion } from "./FiturAccordion";

export function Fitur() {
  return (
    <section className="shell pb-20 lg:pb-28" aria-labelledby="fitur-judul">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal>
          <h2 id="fitur-judul" className="display text-[32px] text-graphite lg:text-[50px]">
            {fiturIntro.title}
          </h2>
          <p className="mt-5 text-[16px] leading-[1.45] text-graphite">{fiturIntro.lead}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <FiturAccordion />
        </Reveal>
      </div>
    </section>
  );
}
