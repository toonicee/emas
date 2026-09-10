# SUVARNA — Landing Page

Landing page pedagang emas fisik digital. Struktur dan copy berasal dari kanvas
[`design/SUVARNA Landing v2.dc.html`](design/SUVARNA%20Landing%20v2.dc.html);
bahasa visualnya diadaptasi dari [amman.co.id](https://www.amman.co.id/).

```bash
pnpm dev     # http://localhost:3000
pnpm build   # produksi (semua rute di-prerender jadi HTML statis)
pnpm start
pnpm lint
```

Paket dikunci ke pnpm lewat field `packageManager`. Build script hanya diizinkan
untuk `sharp` dan `unrs-resolver` (`pnpm.onlyBuiltDependencies`) — pnpm memblokir
sisanya secara default sebagai langkah keamanan.

## Stack

| | |
|---|---|
| Next.js 16 (App Router, Turbopack) | seluruh halaman SSG |
| React 19 + React Compiler | memoisasi otomatis, `reactCompiler: true` |
| Tailwind CSS v4 | config CSS-first di `app/globals.css` (`@theme`) |
| Animasi | CSS transition + IntersectionObserver — **tanpa library** |

## Sistem desain

Palet dan tipografi diukur langsung dari computed style amman.co.id, bukan
dikira-kira dari tangkapan layar.

| Token | Nilai | Catatan |
|---|---|---|
| `paper` | `#FFFFFF` | latar utama |
| `ink` | `#000000` | blok gelap, hitam penuh |
| `graphite` | `#3F3936` | **teks utama** — charcoal hangat, bukan hitam. Ini inti karakternya |
| `muted` | `#6B655F` | teks sekunder, 5,75:1 |
| `accent` | `#E9F40B` | kuning |

Tipografi: **Work Sans** untuk display (uppercase, weight **320**, `line-height: 1`)
dan **Inter** weight 300 untuk teks. Weight 320 itu yang bikin judul terasa lapang,
dan cuma tersedia karena `next/font` memuat varian variable — jangan tambahkan
array `weight` ke `Work_Sans()` atau angkanya akan dibulatkan.

> **Aturan warna aksen.** `#E9F40B` di atas putih hanya **1,21:1** — mustahil
> dibaca. Kuning cuma boleh jadi blok padat, indikator, atau garis; kalau jadi
> latar, teks di atasnya wajib hitam/charcoal (17,4:1 / 9,4:1). Amman sendiri
> memakainya sebatas bar indikator. Utilitas `.pill` tone `accent` sudah
> menerapkan aturan ini.

Pola yang diadopsi: tombol pill berpanah ([`PillLink.tsx`](components/ui/PillLink.tsx)),
band foto full-bleed dengan teks overlay ([`VaultPhoto.tsx`](components/sections/VaultPhoto.tsx)),
galeri panel memuai ([`ProdukPanels.tsx`](components/sections/ProdukPanels.tsx)),
kartu berita tiga kolom ([`Kabar.tsx`](components/sections/Kabar.tsx)), dan nav
tanpa garis pemisah.

## Prinsip: animasi tidak boleh merusak SEO

Empat aturan yang dipegang seluruh kode di repo ini.

**1. Elemen LCP tidak dianimasikan.** `<h1>` di [`Hero.tsx`](components/sections/Hero.tsx)
render pada `opacity: 1` sejak frame pertama. Fade-in dari `opacity: 0` membuat
browser menganggap elemen belum ter-paint dan LCP molor sebesar durasi animasi.

**2. Hanya `transform` dan `opacity`.** Tidak ada properti yang memicu layout,
jadi nol kontribusi ke CLS.

**3. Tidak ada listener `scroll`.** Semua reveal lewat `IntersectionObserver`
di [`useArmedReveal.ts`](components/motion/useArmedReveal.ts). Tidak ada callback
yang jalan tiap frame — INP tetap ringan.

**4. Konten utuh tanpa JavaScript.** Ini yang paling penting dan paling mudah
dirusak. Fase awal reveal selalu `open`, jadi HTML dari server sudah terlihat
penuh; elemen baru "di-arm" setelah hydration, dan hanya kalau posisinya memang
masih di bawah lipatan layar. Konsekuensinya: **tidak pernah ada `opacity:0` di
HTML hasil server-render**, dan itu diverifikasi (lihat di bawah).

`prefers-reduced-motion` dihormati di seluruh komponen.

## Struktur

```
app/          layout, page, sitemap.ts, robots.ts, opengraph-image.tsx
components/
  sections/   satu file per section; Server Component kecuali disebut di bawah
  motion/     Reveal, Stagger, CountUp — pembungkus animasi
  ui/         Arrow, PillLink — primitif pola Amman
content/      site.ts, market.ts, sections.ts — SELURUH copy ada di sini
lib/          seo.ts, jsonld.ts, chart.ts, format.ts
design/       kanvas Claude Design (sumber desain, tidak ikut ter-build)
scripts/      pengambil aset + sumber mockup aplikasi (tidak ikut ter-build)
public/images/ foto placeholder — lihat IMAGE-CREDITS.md
```

Client Component hanya empat: `SiteHeader`, `PriceChart`, `FiturAccordion`,
`ProdukPanels`, plus primitif di `components/motion/`. Sisanya Server Component.

Komponen tidak pernah hardcode teks — semuanya baca dari `content/`. Itu yang
bikin migrasi ke CMS nanti jadi pekerjaan satu file, bukan refactor komponen.

## Yang masih placeholder

- **Harga & grafik** — `content/market.ts`. Titik tukar ke API asli ada di
  `getMarketData()`; deret grafik di `lib/chart.ts` masih generator deterministik.
  Begitu diganti fetch sungguhan, `export const revalidate = 300` di
  `app/page.tsx` langsung mengaktifkan ISR.
- **Foto** — `public/images/` sudah terisi, tapi isinya foto stok berlisensi
  **CC0 / Public Domain** dari Wikimedia Commons, bukan fotografi brand. Sumber
  dan lisensinya tercatat di [IMAGE-CREDITS.md](IMAGE-CREDITS.md), dan bisa
  diunduh ulang dengan `node scripts/fetch-placeholder-assets.cjs`. Untuk
  menggantinya: timpa berkas dengan nama yang sama, tidak ada kode yang berubah.

  Pengecualian: `app-mockup.jpg` **bukan** foto stok — dirender dari
  [`scripts/app-mockup.html`](scripts/app-mockup.html) memakai token desain
  SUVARNA sendiri, jadi UI di dalamnya konsisten dengan situsnya.

  Satu kandidat sengaja ditolak saat penyaringan: foto batangan emas yang
  memampangkan merek perusahaan emas lain. Periksa hal yang sama kalau menambah
  aset baru.
- **Logo** — `public/logo-suvarna.png` masih mark sementara. `design/icon-suvarna.png`
  adalah lembar eksplorasi 20 kandidat; belum ada yang dipilih.
- **`NEXT_PUBLIC_SITE_URL`** — wajib di-set saat deploy. Tanpa itu canonical dan
  OG image jatuh ke `https://suvarna.co.id` (default di `content/site.ts`).

## Verifikasi

```bash
pnpm build && pnpm start

# 1. Konten ada di HTML mentah (bukti SEO paling jujur)
curl -s localhost:3000 | grep -o '<h1[^>]*>[^<]*'
curl -s localhost:3000 | grep -c '<script type="application/ld+json"'   # 3
curl -s localhost:3000 | grep -c '<details'                             # 5

# 2. Tidak ada elemen tersembunyi di HTML server
curl -s localhost:3000 | grep -c 'opacity:0'                            # 0

# 3. Gambar dirender di server, bukan disisipkan JS
curl -s localhost:3000 | grep -c '<img'                                 # 9

# 4. Rute SEO
curl -s localhost:3000/robots.txt
curl -s localhost:3000/sitemap.xml
```

> Saat mengambil screenshot full-page dengan headless Chrome, **scroll dulu
> sampai bawah**. `next/image` itu lazy-load, jadi kartu di bawah lipatan akan
> tampak kosong kalau halaman tidak pernah di-scroll — itu artefak alat, bukan
> bug. Hal yang sama berlaku untuk scroll reveal.

Selain itu: matikan JavaScript di DevTools lalu reload — seluruh section harus
tetap terbaca. Ini simulasi terdekat dengan crawler yang tidak mengeksekusi JS.
Untuk structured data, tempel HTML-nya ke
[Rich Results Test](https://search.google.com/test/rich-results).

FAQ di `components/sections/Faq.tsx` **wajib tetap tampil**. Pedoman Google:
structured data `FAQPage` hanya boleh memuat tanya-jawab yang benar-benar
terlihat pengguna di halaman yang sama.

## Catatan performa

First Load JS: **148 kB gzip** (CSS 6 kB). Dari jumlah itu, **134 kB adalah
lantai Next 16 + React 19** — diukur dari halaman 404 yang nyaris tanpa kode
klien. Sisanya kode interaktif landing page plus runtime `next/image`.

Lantai kerangka itu tidak bisa dipangkas selama memakai Next App Router. Kalau
angka ini jadi masalah, satu-satunya tuas nyata adalah pindah ke arsitektur
islands (Astro) — bukan mengurangi animasi atau membuang gambar.

Foto sumber di `public/images/` totalnya ~1,8 MB, tapi itu bukan yang dikirim ke
pengunjung: `next/image` menyajikan turunan WebP/AVIF sesuai lebar viewport.

Polyfill legacy (~38 kB) diserve dengan atribut `noModule` dan tidak pernah
diunduh browser modern.
