"use client";

import type { CSSProperties, ReactNode } from "react";
import { useArmedReveal } from "./useArmedReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

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
