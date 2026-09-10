"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** useLayoutEffect memperingatkan saat SSR; di server pakai useEffect. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type RevealPhase = "open" | "closed";

/**
 * Inti dari janji "animasi tidak merusak SEO".
 *
 * Fase awal selalu `open`, jadi HTML hasil server render sudah terlihat penuh —
 * crawler, pembaca layar, dan skenario JS gagal semuanya dapat konten utuh.
 * Baru setelah hydration elemen "di-arm": kalau posisinya masih di bawah lipatan
 * layar, dia disembunyikan tanpa transisi lalu di-reveal saat masuk viewport.
 *
 * Elemen yang sudah terlihat saat hydration sengaja dilewati — menyembunyikannya
 * di detik itu justru menyebabkan kedip dan bisa menunda LCP.
 */
export function useArmedReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<RevealPhase>("open");
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setPhase("closed");
  }, [reduced]);

  useEffect(() => {
    if (phase !== "closed") return;
    const el = ref.current;
    if (!el) return;

    /* IntersectionObserver, bukan listener scroll — tidak ada callback yang
       jalan tiap frame, jadi INP tidak ikut terbebani. */
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPhase("open");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [phase]);

  return { ref, phase };
}
