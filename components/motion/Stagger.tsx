"use client";

import { Children, type CSSProperties, type ReactNode } from "react";
import { useArmedReveal } from "./useArmedReveal";

const STEP = 0.07;

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

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}
