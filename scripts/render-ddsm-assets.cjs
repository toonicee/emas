/**
 * Merender aset DDSM dari SVG sumber di public/images/ menjadi WebP 2x di
 * public/images/ddsm/:
 *   - asset{1..5}.svg -> bento-{1..5}.webp   kartu bento beranda
 *   - ellipse.svg     -> hero-ellipse.webp    lingkaran emas di hero
 *
 * Kenapa tidak memakai SVG-nya langsung: berkas-berkas itu hanyalah pembungkus
 * PNG besar ber-base64 (kelima kartu bento ±7,8 MB, ellipse.svg sendiri
 * 26 MB), dan next/image tidak mengoptimalkan SVG — berkasnya akan diunduh
 * mentah oleh setiap pengunjung. WebP hasil render ini kemudian dikecilkan lagi
 * oleh next/image per lebar layar.
 *
 * SVG tetap menjadi sumbernya. Jalankan ulang setiap kali salah satunya diganti:
 *   node scripts/render-ddsm-assets.cjs
 */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public", "images");
const OUT = path.join(ROOT, "ddsm");
const SCALE = 2; // 2x supaya tetap tajam di layar rapat

// urutan = urutan kartu di beranda
const BENTO = [
  ["asset1.svg", "bento-1.webp"], // Certified Physical Gold
  ["asset2.svg", "bento-2.webp"], // Transparent Live Rates
  ["asset3.svg", "bento-3.webp"], // Fully Compliant & Licensed
  ["asset4.svg", "bento-4.webp"], // Legacy Asset Protection
  ["asset5.svg", "bento-5.webp"], // Your gold journey
];

const report = (name, info) =>
  console.log(`${name}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} kB`);

async function renderBento() {
  for (const [src, out] of BENTO) {
    const info = await sharp(path.join(ROOT, src), { density: 72 * SCALE })
      // kualitas tinggi + alpha penuh: ada teks di dalam gambar, dan sudut
      // membulat kartunya adalah area transparan
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(path.join(OUT, out));
    report(`${src} -> ddsm/${out}`, info);
  }
}

/**
 * ellipse.svg tidak bisa dirender librsvg (sharp): XML-nya 26 MB, melewati
 * batas parser. Isinya sederhana, jadi dirakit ulang langsung dari PNG
 * tertanamnya, mengikuti struktur SVG-nya persis:
 *   1. PNG diskalakan & diletakkan di kotak lingkaran sesuai matriks <pattern>
 *      (patternContentUnits="objectBoundingBox"),
 *   2. lapisan warna dengan mix-blend-mode soft-light,
 *   3. dipotong menjadi lingkaran,
 *   4. dibalik vertikal — <circle> memakai transform matrix(1 0 0 -1 0 ty),
 *   5. dipotong ke kanvas SVG (bagian atas lingkaran memang terpotong).
 * Angka-angkanya dibaca dari berkas, bukan ditulis mati. Kalau ellipse.svg
 * diganti dengan struktur yang berbeda, skrip ini berhenti dengan pesan yang
 * menyebut bagian mana yang tidak lagi cocok.
 */
async function renderEllipse() {
  const svg = fs.readFileSync(path.join(ROOT, "ellipse.svg"), "utf8");
  const need = (re, what) => {
    const m = svg.match(re);
    if (!m) throw new Error(`ellipse.svg: struktur berubah, tidak menemukan ${what}`);
    return m;
  };

  const [, W, H] = need(/<svg[^>]*\bwidth="([\d.]+)"[^>]*\bheight="([\d.]+)"/, "ukuran <svg>").map(Number);
  const [, cx, cy, r, ty] = need(
    /<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)" transform="matrix\(1 0 0 -1 0 ([\d.]+)\)"/,
    "<circle> berbalik vertikal",
  ).map(Number);
  if (cx !== r || cy !== r || W !== 2 * r) throw new Error("ellipse.svg: lingkaran tidak lagi mengisi lebar kanvas");
  const m = need(/<use[^>]*transform="matrix\(([^)]+)\)"/, "matriks <pattern>")[1].split(/\s+/).map(Number);
  const [, iw, ih] = need(/<image[^>]*\bwidth="(\d+)" height="(\d+)"/, "ukuran <image>").map(Number);
  const tint = need(/fill="(#[0-9A-Fa-f]{6})" style="mix-blend-mode:soft-light"/, "lapisan soft-light")[1];
  const png = Buffer.from(need(/base64,([^"]+)"/, "PNG tertanam")[1], "base64");

  const box = Math.round(2 * r * SCALE); // sisi kotak lingkaran, px keluaran
  const w = Math.round(iw * m[0] * box); // matriks pattern: satuan bbox -> px
  const h = Math.round(ih * m[3] * box);
  const left = Math.round(-m[4] * box);
  const top = Math.round(m[5] * box);
  if (left < 0 || left + box > w) throw new Error("ellipse.svg: foto tidak lagi menutup lebar lingkaran");

  const placed = await sharp(png)
    .resize(w, h, { fit: "fill" })
    .extract({ left, top: 0, width: box, height: Math.min(h, box - top) })
    .png()
    .toBuffer();
  const blank = { width: box, height: box, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } };
  const step1 = await sharp({ create: blank }).composite([{ input: placed, left: 0, top }]).png().toBuffer();
  const step2 = await sharp(step1)
    .composite([{ input: { create: { ...blank, background: tint } }, blend: "soft-light" }])
    .png()
    .toBuffer();
  const circle = Buffer.from(
    `<svg width="${box}" height="${box}"><circle cx="${box / 2}" cy="${box / 2}" r="${box / 2}" fill="#fff"/></svg>`,
  );
  const step3 = await sharp(step2).composite([{ input: circle, blend: "dest-in" }]).png().toBuffer();

  // baris ke-ρ hasil balik = y lokal (2r − ρ); kanvas y' = ty − y lokal, jadi
  // kanvas mulai dari ρ = 2r − ty
  const info = await sharp(await sharp(step3).flip().png().toBuffer())
    .extract({ left: 0, top: Math.round((2 * r - ty) * SCALE), width: box, height: Math.round(H * SCALE) })
    .webp({ quality: 86, alphaQuality: 100, effort: 6 })
    .toFile(path.join(OUT, "hero-ellipse.webp"));
  report("ellipse.svg -> ddsm/hero-ellipse.webp", info);
}

(async () => {
  await renderBento();
  await renderEllipse();
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
