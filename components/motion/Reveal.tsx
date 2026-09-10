"use client";

import type { CSSProperties, ReactNode } from "react";
import { useArmedReveal } from "./useArmedReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Detik. */
  delay?: number;
  /** Jarak geser masuk, dalam piksel. */
  y?: number;
};

/**
 * Pembungkus scroll-reveal. Hanya menyentuh `opacity` dan `transform`, jadi
 * tidak pernah memicu layout dan tidak menyumbang CLS.
 *
 * Komponen ini tidak menganimasikan apa pun sendiri — dia cuma membalik
 * atribut `data-phase`; seluruh transisinya didefinisikan di globals.css.
 */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const { ref, phase } = useArmedReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-phase={phase}
      className={className ? `reveal ${className}` : "reveal"}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
