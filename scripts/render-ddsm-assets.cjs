const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public", "images");
const OUT = path.join(ROOT, "ddsm");
const APP = path.join(__dirname, "..", "app");
const SCALE = 2;

const BENTO = [
  ["asset1.svg", "bento-1.webp"],
  ["asset2.svg", "bento-2.webp"],
  ["asset3.svg", "bento-3.webp"],
  ["asset4.svg", "bento-4.webp"],
  ["asset5.svg", "bento-5.webp"],
];

const LOGO_GOLD = "#d4af37";
const ICON_BG = "#2a3a24";
const LOGO_WIDTH = 900;
const INK = 8;

const report = (name, info) =>
  console.log(`${name}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} kB`);

async function renderBento() {
  for (const [src, out] of BENTO) {
    const info = await sharp(path.join(ROOT, src), { density: 72 * SCALE })
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(path.join(OUT, out));
    report(`${src} -> ddsm/${out}`, info);
  }
}

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

  const box = Math.round(2 * r * SCALE);
  const w = Math.round(iw * m[0] * box);
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

  const info = await sharp(await sharp(step3).flip().png().toBuffer())
    .extract({ left: 0, top: Math.round((2 * r - ty) * SCALE), width: box, height: Math.round(H * SCALE) })
    .webp({ quality: 86, alphaQuality: 100, effort: 6 })
    .toFile(path.join(OUT, "hero-ellipse.webp"));
  report("ellipse.svg -> ddsm/hero-ellipse.webp", info);
}

function alphaBox(alpha, width, x0, x1, y0, y1) {
  let left = x1;
  let right = -1;
  let top = y1;
  let bottom = -1;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      if (alpha[y * width + x] > INK) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) throw new Error("DDSM-logo.png: tidak ada piksel logo di area yang diperiksa");
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

async function recolor(src, box, color) {
  const region = await sharp(src).ensureAlpha().extract(box).png().toBuffer();
  const alpha = await sharp(region).extractChannel(3).raw().toBuffer();
  return sharp({ create: { width: box.width, height: box.height, channels: 3, background: color } })
    .joinChannel(alpha, { raw: { width: box.width, height: box.height, channels: 1 } })
    .png()
    .toBuffer();
}

async function renderLogo() {
  const src = path.join(ROOT, "DDSM-logo.png");
  const { data: alpha, info } = await sharp(src)
    .ensureAlpha()
    .extractChannel(3)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  const full = alphaBox(alpha, W, 0, W, 0, H);
  const logo = await sharp(await recolor(src, full, LOGO_GOLD))
    .resize({ width: LOGO_WIDTH })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "logo-gold.png"));
  report("DDSM-logo.png -> ddsm/logo-gold.png", logo);

  const rowHasInk = (y) => {
    for (let x = full.left; x < full.left + full.width; x++) if (alpha[y * W + x] > INK) return true;
    return false;
  };
  let mainBottom = full.top;
  while (mainBottom < full.top + full.height && rowHasInk(mainBottom)) mainBottom++;

  const colHasInk = (x) => {
    for (let y = full.top; y < mainBottom; y++) if (alpha[y * W + x] > INK) return true;
    return false;
  };
  let markRight = full.left;
  while (markRight < full.left + full.width && colHasInk(markRight)) markRight++;
  const mark = alphaBox(alpha, W, full.left, markRight, full.top, mainBottom);
  if (mark.width > full.width * 0.5 || Math.abs(mark.width - mark.height) > mark.height * 0.1) {
    throw new Error(
      `DDSM-logo.png: simbol di kiri tidak lagi berbentuk persegi (${mark.width}x${mark.height}) — periksa logonya`,
    );
  }
  const markPng = await recolor(src, mark, LOGO_GOLD);

  for (const [file, size, radius] of [
    ["icon.png", 512, 112],
    ["apple-icon.png", 180, 0],
  ]) {
    const inner = Math.round(size * 0.64);
    const glyph = await sharp(markPng)
      .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    const bg = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${ICON_BG}"/></svg>`,
    );
    const out = await sharp(bg)
      .composite([{ input: glyph, gravity: "center" }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(APP, file));
    report(`DDSM-logo.png -> app/${file}`, out);
  }
}

const TASKS = { bento: renderBento, hero: renderEllipse, logo: renderLogo };

(async () => {
  const only = process.argv.slice(2);
  const unknown = only.filter((name) => !(name in TASKS));
  if (unknown.length) throw new Error(`bagian tidak dikenal: ${unknown.join(", ")} (pilihan: ${Object.keys(TASKS).join(", ")})`);
  for (const [name, run] of Object.entries(TASKS)) {
    if (!only.length || only.includes(name)) await run();
  }
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
