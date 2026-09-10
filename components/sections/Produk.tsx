import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/PillLink";
import { ProdukPanels } from "./ProdukPanels";

export function Produk() {
  return (
    <section id="produk" className="shell py-20 lg:py-28" aria-labelledby="produk-judul">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="produk-judul" className="display text-[32px] text-graphite lg:text-[50px]">
              Emas fisik
            </h2>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.45] text-graphite">
              Tukar saldo digital jadi logam yang bisa kamu genggam — batangan, koin, atau
              perhiasan, semuanya bersertifikat dan diantar berasuransi.
            </p>
          </div>
          <ArrowLink href="#produk" className="text-graphite">
            Semua produk
          </ArrowLink>
        </div>

        <ProdukPanels />
      </Reveal>
    </section>
  );
}
