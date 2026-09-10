"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/* Server tidak pernah merender keadaan tersembunyi, jadi snapshot server
   selalu `false` — aman dan tidak pernah menyebabkan hydration mismatch. */
const getServerSnapshot = () => false;

/**
 * Pengganti `useReducedMotion()` milik Motion — matchMedia langsung, tanpa
 * menyeret library animasi apa pun ke dalam bundel.
 *
 * useSyncExternalStore, bukan useState+useEffect: media query adalah state
 * eksternal, dan cara ini menghindari setState di dalam effect (yang dilarang
 * oleh React Compiler) sekaligus bebas dari tearing.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
