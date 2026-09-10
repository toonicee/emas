/**
 * Data pasar.
 *
 * PENTING: angka di bawah ini masih placeholder yang dibawa dari kanvas desain.
 * Titik tukar ke API asli ada di `getMarketData()` — ganti isinya dengan fetch,
 * lalu naikkan `revalidate` di app/page.tsx sesuai frekuensi update yang mau
 * dipakai. Bentuk datanya sudah sengaja dibikin serializable supaya bisa
 * langsung dilempar dari Server Component ke Client Component.
 */

export type Direction = "up" | "down";

export type TickerItem = {
  k: string;
  v: string;
  d: string;
  dir: Direction;
};

export type PriceRow = {
  nama: string;
  ket: string;
  harga: string;
  delta: string;
  dir: Direction;
};

export type RangeDef = {
  label: string;
  n: number;
  seed: number;
  drift: number;
  axis: [string, string];
  caption: string;
};

export type MarketData = {
  /** ISO string — diformat di server supaya SSR dan klien selalu sama. */
  updatedAt: string;
  ticker: TickerItem[];
  prices: PriceRow[];
  ranges: RangeDef[];
  high: number;
  low: number;
};

export const ranges: RangeDef[] = [
  { label: "1H", n: 24, seed: 3, drift: 0.9, axis: ["00:00", "12:00"], caption: "24 jam terakhir" },
  { label: "1M", n: 28, seed: 7, drift: 1.4, axis: ["4 MINGGU LALU", "2 MINGGU LALU"], caption: "30 hari" },
  { label: "3B", n: 40, seed: 1, drift: 1.9, axis: ["JUN 2026", "JUL 2026"], caption: "3 bulan" },
  { label: "6B", n: 52, seed: 5, drift: 1.5, axis: ["MAR 2026", "JUN 2026"], caption: "6 bulan" },
  { label: "1T", n: 64, seed: 9, drift: 1.2, axis: ["SEP 2025", "MAR 2026"], caption: "12 bulan" },
  { label: "5T", n: 80, seed: 2, drift: 0.9, axis: ["2021", "2023"], caption: "5 tahun" },
];

export function getMarketData(): MarketData {
  return {
    updatedAt: "2026-09-10T14:32:00+07:00",
    ticker: [
      { k: "XAU/USD", v: "3.412,80", d: "+0,62%", dir: "up" },
      { k: "EMAS 24K", v: "Rp 2.148.500/gr", d: "+0,82%", dir: "up" },
      { k: "ANTAM 1GR", v: "Rp 2.204.000", d: "+0,74%", dir: "up" },
      { k: "UBS 1GR", v: "Rp 2.171.000", d: "−0,11%", dir: "down" },
      { k: "USD/IDR", v: "16.284", d: "−0,18%", dir: "down" },
      { k: "PERAK", v: "Rp 24.980/gr", d: "+1,04%", dir: "up" },
    ],
    prices: [
      { nama: "Beli", ket: "EMAS 24K · PER GRAM", harga: "Rp 2.148.500", delta: "+ Rp 17.500 (0,82%)", dir: "up" },
      { nama: "Jual", ket: "BUYBACK · PER GRAM", harga: "Rp 2.089.000", delta: "+ Rp 16.000 (0,77%)", dir: "up" },
      { nama: "Antam", ket: "BATANGAN 1 GRAM", harga: "Rp 2.204.000", delta: "+ Rp 16.200 (0,74%)", dir: "up" },
      { nama: "UBS", ket: "BATANGAN 1 GRAM", harga: "Rp 2.171.000", delta: "− Rp 2.400 (0,11%)", dir: "down" },
    ],
    ranges,
    high: 2191000,
    low: 2033500,
  };
}
