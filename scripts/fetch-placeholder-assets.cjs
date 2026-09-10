/**
 * Mengunduh dan memproses foto placeholder dari Wikimedia Commons.
 *
 *   node scripts/fetch-placeholder-assets.cjs
 *
 * Kenapa Wikimedia Commons: satu-satunya sumber besar yang bisa dicari tanpa
 * API key DAN memberi metadata lisensi yang bisa diaudit. Seluruh berkas di
 * daftar ASSETS sengaja dipilih yang berlisensi CC0 atau Public Domain, jadi
 * tidak ada kewajiban atribusi — aman dipakai di situs komersial.
 *
 * Ini tetap PLACEHOLDER. Ganti dengan fotografi brand SUVARNA sendiri sebelum
 * rilis; cukup timpa berkas di public/images/ dengan nama yang sama.
 *
 * Hasil unduhan dicatat ke IMAGE-CREDITS.md di root repo.
 */
const sharp = require("sharp");
const { writeFileSync } = require("node:fs");
const path = require("node:path");

const API = "https://commons.wikimedia.org/w/api.php";
const UA = { "User-Agent": "suvarna-landing/1.0 (+https://suvarna.co.id)" };
const OUT = path.join(__dirname, "..", "public", "images");
const ROOT = path.join(__dirname, "..");

const ASSETS = [
  // Band full-bleed "Tentang kami"
  { file: "Gold bullion bars.jpg", out: "brankas.jpg", w: 2560, h: 1200 },

  // Panel produk (tinggi, dipotong tengah)
  { file: "Gold Ingots on white background.jpg", out: "logam-mulia.jpg", w: 1200, h: 1200 },
  { file: "Branch Mint Sovereigns.jpg", out: "koin-emas.jpg", w: 1200, h: 1200 },
  { file: "Gold necklace MET DP336810.jpg", out: "perhiasan.jpg", w: 1200, h: 1200 },

  // Kartu kabar (16:10).
  // kabar-1 memakai sumber yang sama dengan band brankas tapi dengan crop makro
  // yang jauh berbeda, jadi tidak terbaca sebagai foto yang diulang. Kandidat
  // "Chip gold bullion bar.jpg" sengaja DITOLAK: di fotonya terpampang merek
  // perusahaan emas lain, dan itu tidak pantas muncul di situs SUVARNA.
  { file: "Gold bullion bars.jpg", out: "kabar-1.jpg", w: 1280, h: 800, crop: [0.04, 0.34, 0.46, 0.5] },
  { file: "Two 20kr gold coins.png", out: "kabar-2.jpg", w: 1280, h: 800 },
  { file: "Italian States-Piacenza 1626 2 Doppie.jpg", out: "kabar-3.jpg", w: 1280, h: 800 },

  // Footer
  { file: "City activity Jakarta (Unsplash).jpg", out: "footer.jpg", w: 2560, h: 900 },
];

async function meta(title) {
  const url =
    `${API}?action=query&format=json&prop=imageinfo` +
    `&iiprop=url|extmetadata&iiurlwidth=3000&titles=${encodeURIComponent("File:" + title)}`;
  const res = await fetch(url, { headers: UA });
  const json = await res.json();
  const page = Object.values(json.query.pages)[0];
  const ii = page.imageinfo && page.imageinfo[0];
  if (!ii) throw new Error("tidak ditemukan di Commons");
  const clean = (v) => ((v && v.value) || "").replace(/<[^>]*>/g, "").trim();
  return {
    url: ii.thumburl || ii.url,
    license: clean(ii.extmetadata && ii.extmetadata.LicenseShortName),
    artist: clean(ii.extmetadata && ii.extmetadata.Artist),
    descUrl: ii.descriptionurl,
  };
}

(async () => {
  const credits = [];

  for (const a of ASSETS) {
    try {
      const m = await meta(a.file);
      const buf = Buffer.from(await (await fetch(m.url, { headers: UA })).arrayBuffer());

      let pipeline = sharp(buf);

      /* `crop` berisi [x, y, lebar, tinggi] sebagai pecahan 0–1 dari gambar
         sumber — dipakai untuk mengambil detail makro alih-alih seluruh bidang. */
      if (a.crop) {
        const src = await sharp(buf).metadata();
        const [fx, fy, fw, fh] = a.crop;
        pipeline = pipeline.extract({
          left: Math.round(src.width * fx),
          top: Math.round(src.height * fy),
          width: Math.round(src.width * fw),
          height: Math.round(src.height * fh),
        });
      }

      const info = await pipeline
        .resize(a.w, a.h, { fit: "cover", position: "centre" })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(path.join(OUT, a.out));

      console.log(
        `OK    ${a.out.padEnd(16)} ${info.width}x${info.height}  ` +
          `${Math.round(info.size / 1024)} kB  [${m.license}]`,
      );
      credits.push({ ...a, ...m });
    } catch (e) {
      console.log(`GAGAL ${a.out}: ${e.message}`);
    }
  }

  const md = [
    "# Kredit gambar",
    "",
    "Foto di `public/images/` adalah **placeholder** yang diambil dari Wikimedia",
    "Commons lewat `scripts/fetch-placeholder-assets.cjs`.",
    "",
    "Semuanya berlisensi CC0 atau Public Domain, jadi tidak ada kewajiban",
    "atribusi. Daftar ini disimpan supaya asal-usulnya tetap bisa diaudit.",
    "",
    "Ganti dengan fotografi brand SUVARNA sebelum rilis — timpa saja berkasnya",
    "dengan nama yang sama, tidak ada kode yang perlu diubah.",
    "",
    "| Berkas | Sumber | Lisensi | Pembuat |",
    "| --- | --- | --- | --- |",
    ...credits.map(
      (c) => `| \`${c.out}\` | [${c.file}](${c.descUrl}) | ${c.license} | ${c.artist || "—"} |`,
    ),
    "",
  ].join("\n");

  writeFileSync(path.join(ROOT, "IMAGE-CREDITS.md"), md);
  console.log(`\n${credits.length}/${ASSETS.length} berhasil. IMAGE-CREDITS.md diperbarui.`);
})();
