"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { formatRupiah } from "@/lib/format";

const DURATION = 1100;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Penghitung angka naik.
 *
 * Nilai final dirender apa adanya di HTML server — jadi tanpa JavaScript
 * angkanya tetap benar, bukan "0". Hitungan baru dimulai kalau elemen memang
 * masih di bawah lipatan saat hydration dan kemudian di-scroll ke viewport.
 *
 * Angka yang tampil DIDERIVASI, bukan disimpan langsung: `tween` hanya berlaku
 * saat animasi memang berjalan. Kalau pengguna menyalakan prefers-reduced-motion
 * di tengah jalan, tampilan langsung balik ke nilai penuh alih-alih tersangkut
 * di angka terakhir yang sempat ter-set.
 *
 * Tween-nya pakai requestAnimationFrame langsung, bukan mesin animasi library,
 * supaya tidak ada satu byte pun tambahan di bundel demi satu angka.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tween, setTween] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const display = reduced || tween === null ? value : tween;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setTween(0);

    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const step = (now: number) => {
          if (!start) start = now;
          const t = Math.min((now - start) / DURATION, 1);
          setTween(Math.round(easeOutExpo(t) * value));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={className}>
      {formatRupiah(display)}
    </span>
  );
}
