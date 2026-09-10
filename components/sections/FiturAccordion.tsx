"use client";

import { useId, useState } from "react";
import { fitur } from "@/content/sections";

/**
 * Accordion fitur. Tinggi dianimasikan lewat trik grid-template-rows 0fr -> 1fr,
 * bukan `height: auto` yang tidak bisa ditransisikan.
 *
 * Perubahan tinggi di sini tidak mencemari skor CLS: pergeseran layout yang
 * terjadi dalam 500 ms setelah interaksi pengguna memang dikecualikan dari
 * perhitungan Cumulative Layout Shift.
 */
export function FiturAccordion() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="border-t border-rule">
      {fitur.map((f, i) => {
        const isOpen = i === open;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-tombol-${i}`;

        return (
          <div key={f.title} className="border-b border-rule">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="group grid w-full cursor-pointer grid-cols-[44px_minmax(0,1fr)_28px] items-baseline gap-4 py-6 text-left lg:grid-cols-[64px_minmax(0,1fr)_28px] lg:gap-6"
            >
              <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-[22px] text-graphite lg:text-[30px]">{f.title}</span>
              <span
                aria-hidden
                className={`justify-self-end text-[20px] font-light text-muted transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-7 text-[15px] leading-[1.55] text-muted lg:ml-[88px]">
                  {f.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
