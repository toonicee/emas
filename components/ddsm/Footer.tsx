import Link from "next/link";
import { ddsmPath, type Dict } from "@/content/ddsm";
import { Shell } from "./ui";

export function Footer({ dict }: { dict: Dict }) {
  return (
    <footer className="bg-[#161817] py-14 text-ddsm-dim">
      <Shell>
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_1.3fr]">
          <div>
            <div className="text-[17px] font-bold tracking-[0.1em] text-ddsm-gold">
              DDS<span className="text-ddsm-cream">M</span>
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.7]">
              {dict.footer.address}
              <br />
              {dict.footer.hours}
            </p>
            <div className="mt-5 flex flex-col gap-2 text-[14px]">
              <a href={`mailto:${dict.footer.email}`} className="w-fit hover:text-ddsm-gold">
                {dict.footer.email}
              </a>
              <span>{dict.footer.phone}</span>
            </div>
          </div>

          <nav aria-label={dict.common.menu}>
            <div className="flex flex-col gap-3 text-[14px]">
              {dict.nav.map((item) => (
                <Link
                  key={item.slug}
                  href={ddsmPath(dict.locale, item.slug)}
                  className="w-fit hover:text-ddsm-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <p className="text-[13px] leading-[1.7] text-[#8d968c]">{dict.footer.disclaimer}</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#333936] pt-6 text-[12px] text-[#798178]">
          <span>{dict.footer.rights}</span>
          <span>{dict.footer.legal.join(" · ")}</span>
        </div>
      </Shell>
    </footer>
  );
}
