"use client";

import { Children, type CSSProperties, type ReactNode } from "react";
import { useArmedReveal } from "./useArmedReveal";

const STEP = 0.07;

/**
 * Versi berantai dari Reveal: anak-anaknya masuk berurutan.
 *
 * Fase tidak perlu dioper lewat context — CSS mencocokkannya dengan selector
 * turunan `.stagger[data-phase] .stagger-item`, dan tiap anak cukup membawa
 * delay-nya sendiri sebagai custom property.
 */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, phase } = useArmedReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-phase={phase}
      className={className ? `stagger ${className}` : "stagger"}
    >
      {Children.map(children, (child, i) => (
        <div
          className="stagger-item"
          style={{ "--reveal-delay": `${i * STEP}s`, "--reveal-y": "14px" } as CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/**
 * Dipertahankan sebagai pembungkus transparan supaya penulisan di section tetap
 * eksplisit (`<Stagger><StaggerItem>…`). Delay dan fase sudah diurus parent.
 */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}
