const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(value: number): string {
  /* Intl memakai "Rp" tanpa spasi; desain memakai "Rp 2.191.000". */
  return rupiah.format(value).replace(/^Rp\s?/, "Rp ");
}

const tanggalPanjang = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const jam = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

/** "Kamis, 10 September 2026 · 14:32 WIB" — diformat di server, sekali saja. */
export function formatStempelWaktu(iso: string): string {
  const d = new Date(iso);
  return `${tanggalPanjang.format(d)} · ${jam.format(d)} WIB`;
}
