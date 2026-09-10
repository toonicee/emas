import type { RangeDef } from "@/content/market";

const WIDTH = 720;
const HEIGHT = 300;

/**
 * Generator deret harga deterministik — murni fungsi dari (n, seed, drift),
 * jadi hasil di server dan di browser selalu identik. Ini penting: kalau
 * dereknya pakai Math.random(), React akan melempar hydration mismatch.
 *
 * Ganti fungsi ini dengan data historis asli saat API harga sudah tersedia.
 */
export function series(n: number, seed: number, drift: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const w =
      Math.sin((i + seed) * 0.85) * 18 +
      Math.sin((i + seed) * 0.27) * 30 +
      Math.cos((i + seed) * 1.9) * 7;
    const v = 165 + w - i * drift;
    pts.push([(i / (n - 1)) * WIDTH, Math.max(24, Math.min(HEIGHT - 18, v))]);
  }
  return pts;
}

export function polylinePoints(range: RangeDef): string {
  return series(range.n, range.seed, range.drift)
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

export const chartViewBox = `0 0 ${WIDTH} ${HEIGHT}`;
