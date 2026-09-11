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
| Animasi | CSS transition + IntersectionObserver, **tanpa library** — kecuali lingkaran hero DDSM (Three.js, dimuat lazy) |

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
scripts/      pengambil aset, perender aset DDSM (bento + hero), sumber mockup aplikasi (tidak ikut ter-build)
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

## DDSM — merek kedua di `/ddsm`

Repo ini menampung dua merek. `/` adalah SUVARNA; `/ddsm` adalah **PT Datar
Dana Sukses Makmur**, badan hukum yang berbeda dengan palet, tipografi, dan
struktur navigasinya sendiri.

**Rute** — tiga bahasa, seluruhnya di-prerender statis (18 halaman):

```
/ddsm                     -> redirect ke /ddsm/id
/ddsm/[lang]              id | en | zh   (dynamicParams: false, selain itu 404)
  ├── (beranda)
  ├── /wealth
  ├── /digital-gold
  ├── /physical-gold
  ├── /info
  └── /company
```

Seluruh copy ketiga bahasa ada di `content/ddsm/{id,en,zh}.ts` dengan tipe yang
sama persis — kalau satu bahasa lupa mengisi sebuah field, TypeScript menolak
build-nya. Kelima sub-halaman dirender oleh satu
[`PageTemplate.tsx`](components/ddsm/PageTemplate.tsx), jadi konsistensinya
dijaga satu berkas, bukan oleh kedisiplinan menyalin markup lima kali.

Pemilih bahasa ([`LangSwitch.tsx`](components/ddsm/LangSwitch.tsx)) tinggal di
**footer**, bukan header, dan berupa dropdown di atas `<details>`/`<summary>`, bukan tombol + state React. Buka-tutup
ditangani browser, jadi dropdown tetap bisa dibuka walau JavaScript gagal dimuat,
dan isinya tetap tiga `<a>` sungguhan — bisa di-crawl dan bisa dibuka di tab
baru. JavaScript di situ cuma pemanis: menutup panel setelah memilih, saat
Escape, atau saat klik di luar. Path bahasa lain dihitung dari pathname berjalan,
jadi berpindah bahasa mempertahankan halaman yang sama. Panelnya membuka ke
**atas**: footer adalah elemen terakhir halaman, jadi panel yang membuka ke bawah
akan menjulur melewati dasar halaman.

Identitas ketiga bahasa (nama asli, kode, bendera, `htmlLang`) ada di
`LOCALE_META` pada [`content/ddsm/types.ts`](content/ddsm/types.ts) — tabel
tersendiri, **bukan** field di dalam tiap `Dict`. Ini bukan preferensi gaya:
pemilih bahasa perlu tahu nama ketiganya sekaligus, jadi kalau datanya disimpan
di masing-masing kamus, komponen klien terpaksa mengimpor seluruh kamus dan ikut
menyeret ±22 kB gz copy ke bundel browser demi tiga nama bahasa. `LangSwitch`
karena itu juga mengimpor dari `content/ddsm/types` **langsung**, bukan lewat
barrel `@/content/ddsm` yang merangkai `DICTS` di level modul.

Kelengkapannya dijaga tipe: `LOCALE_META` bertipe `Record<Locale, LocaleMeta>`,
jadi menambah bahasa di `LOCALES` tanpa mengisi metanya langsung ditolak
TypeScript. Tag `hreflang` (id-ID / en / zh-Hans / x-default) dirakit dari
`LOCALES` di [`lib/ddsm-seo.ts`](lib/ddsm-seo.ts) dan
[`app/sitemap.ts`](app/sitemap.ts), supaya bahasa baru tidak bisa diam-diam
terlewat dari SEO.

**Font judul: DM Serif Text.** Dimuat lewat `next/font/google` hanya di layout
`/ddsm`, jadi halaman SUVARNA tidak ikut menanggungnya. Font ini **bukan variable
font dan hanya punya satu bobot, 400** — karena itu `weight: "400"` wajib diisi,
seluruh heading serif DDSM memakai `font-normal`, dan pembungkus DDSM memasang
`font-synthesis-weight: none`. Tanpa dua hal terakhir, `font-semibold` membuat
browser menebalkan glif secara sintetis dan goresannya jadi belepotan — paling
kentara di serif berkontras tinggi seperti ini. Jangan tambahkan `font-bold`
ke heading serif; tidak akan berefek.

**Font teks: Manrope.** Seluruh teks sans di `/ddsm` (subjudul, tombol, kartu
harga, form, footer, logo) memakai Manrope, mengikuti komp desain — dipilih
lewat perbandingan berdampingan frasa-frasa komp dengan Manrope, Plus Jakarta
Sans, dan Inter. Dimuat hanya di layout `/ddsm`; SUVARNA tetap Inter. Kelas
`.ddsm` di pembungkus menyetel ulang `font-family`, karena font-family yang
sudah dihitung di `<body>` diwariskan apa adanya dan mengganti variabel saja
tidak cukup.

**Font Mandarin.** DM Serif Text dan Manrope tidak punya glif Han sama sekali.
Subtree `zh` diberi kelas `.ddsm-zh` yang menambahkan rantai fallback CJK sistem
(PingFang SC, Noto Sans/Serif CJK, Microsoft YaHei). Webfont CJK sengaja **tidak**
dimuat: berkasnya 5–10 MB karena memuat puluhan ribu glif, dan `next/font` tidak
bisa men-subset CJK seperti ia men-subset Latin. Latin tetap dirender
DM Serif Text/Manrope karena keduanya lebih awal di rantai. Heading serif di `zh`
disetel ke bobot 600: aksara Han-nya dirender font CJK sistem yang punya bobot
tebal sungguhan, sementara huruf Latin di heading yang sama tetap DM Serif Text
400 asli karena sintesis bobot dimatikan.

**Hero.** Lingkaran emas di hero berasal dari `public/images/ellipse.svg` —
26 MB, karena isinya satu foto 4096×2731 ber-base64. librsvg (`sharp`) menolak
mem-parse XML sebesar itu, jadi
[`scripts/render-ddsm-assets.cjs`](scripts/render-ddsm-assets.cjs) merakit
ulang lingkarannya langsung dari PNG tertanam, mengikuti struktur SVG-nya
(matriks `<pattern>`, lapisan `#FFC300` soft-light, potongan lingkaran, balik
vertikal), menjadi `public/images/ddsm/hero-ellipse.webp` (±179 kB). Hasilnya
sudah dibandingkan berdampingan dengan SVG asli yang dirender Chrome dan
identik. Gambar ini memakai `preload` — pengganti `priority` di Next 16 —
karena merupakan kandidat LCP. Kartu harga duduk tepat di garis batas hero,
dan seksi intro di bawahnya berlatar `#e2ded8` supaya garis itu tampak seperti
di komp.

**Animasi hero (Three.js).** [`HeroGold.tsx`](components/ddsm/HeroGold.tsx)
menghidupkan lingkaran emas lewat shader di atas tekstur yang sama: permukaan
bergelombang pelan seperti emas cair, kilau yang menyapu, dan riak yang
mengikuti kursor. Ini peningkatan progresif — gambar statis tetap dirender
server dan tetap elemen LCP (kanvas WebGL bukan kandidat LCP), dan tanpa
JS/WebGL tampilannya tidak berubah. Aturan mainnya, semuanya sudah diukur:

- Three.js (**±180 kB gz**) dimuat lewat `import()` setelah hidrasi, sebagai
  chunk terpisah. First Load JS beranda naik 143 → 148 kB — itu komponen
  pembungkusnya; Three.js sendiri tidak termasuk.
- Tidak dimuat sama sekali bila `prefers-reduced-motion: reduce` atau Save-Data
  aktif: tidak ada kanvas, dan chunk Three.js tidak terunduh.
- Tekstur memakai URL yang sudah dimuat `<img>` (`currentSrc`), jadi tidak ada
  unduhan tambahan.
- Loop render berhenti saat hero di luar layar atau tab tersembunyi: 60
  rAF/detik saat terlihat, 0 setelah digulir. Tidak ada listener scroll.
- Kalau konteks WebGL dicabut GPU, kanvas dilepas dan gambar statis kembali
  tampil.

Pusat dan jari-jari lingkaran di shader (konstanta `CIRCLE`) diturunkan dari
geometri `ellipse.svg`. Kalau SVG itu diganti dengan bentuk lain, konstanta itu
ikut disesuaikan — kalau tidak, peredaman distorsi di tepi lingkaran meleset
dan muncul pinggiran gelap.

**Animasi scroll.** Halaman DDSM memakai primitif yang sama dengan SUVARNA —
`Reveal` dan `Stagger` di `components/motion/` — jadi keempat prinsip di atas
berlaku otomatis: HTML server selalu terlihat penuh (`data-phase="open"`),
elemen baru disembunyikan setelah hidrasi dan hanya kalau masih di bawah
lipatan, lalu muncul lewat IntersectionObserver; hanya `opacity`/`transform`.
Yang dianimasikan: judul seksi, kolom pengantar, kartu bento dan kartu fitur
(berantai), tabel Ringkasan Pasar, FAQ, blok CTA, dan form kontak. Hero beserta
`<h1>`-nya sengaja tidak.

- Daftar semantik (`<ol>` langkah, daftar FAQ) dibungkus `Reveal` utuh, bukan
  `Stagger`: Stagger membungkus tiap anak dengan `<div>`, dan `<div>` di dalam
  `<ol>` tidak valid.
- Pembungkus reveal yang menjadi item grid diberi `min-w-0`. Tanpa itu,
  `min-width` 520px tabel harga mendorong kolomnya dan halaman melebar di ponsel.

Lingkaran hero juga bergerak saat halaman digulir: turun perlahan dan sedikit
membesar (parallax), lewat CSS scroll-driven animation
(`animation-timeline: scroll()`, kelas `.ddsm-hero-parallax` di globals.css).
Dijalankan compositor tanpa listener scroll, dan diam saja di browser yang
belum mendukungnya atau bila pengguna meminta gerak dikurangi.

**Bento beranda.** Seksi di bawah intro berisi lima kartu bento: dua sama lebar
di baris atas, tiga di baris bawah dengan lebar 1 / 1 / 1,35. Rasio itu sengaja
sama dengan rasio lebar asetnya (345 / 345 / 466), jadi ketiga kartu otomatis
sama tinggi tanpa perlu dipotong.

### Aset bento

Setiap kartu adalah **gambar utuh** dari komp desain — `public/images/asset1.svg`
… `asset5.svg` — lengkap dengan teks Inggris yang sudah di-outline menjadi path
vektor. Konsekuensinya, dan ini keputusan yang disengaja:

- **Teks kartu berbahasa Inggris di ketiga versi bahasa.** Sebagai gantinya,
  alt tiap gambar diisi judul + deskripsi kartu dari `home.bento` di kamus
  masing-masing, jadi mesin pencari dan pembaca layar tetap mendapat isinya
  dalam bahasa halaman. Karena itu `home.bento` tetap wajib diisi di ketiga
  kamus walau teksnya tidak tampil.
- **Kartu kedua (`asset2.svg`) memuat mockup ponsel ber-branding SUVARNA** —
  merek dan badan hukum lain — di halaman DDSM.
- **Angka harga di kartu 2 dan 3** (Rp 2.960.000 / 2.910.000) berbeda dengan
  kartu harga di atas halaman (Rp 2.810.000 / 2.623.000). Angkanya menyatu di
  gambar, jadi tidak bisa mengikuti data halaman.
- **Di layar ponsel, teks kartu baris atas mengecil** (kartunya lebar-pendek,
  591×285): deskripsinya sekitar 8px.

SVG-nya tidak disajikan langsung. Kelima berkas itu pembungkus PNG base64
dengan total ±7,8 MB, dan `next/image` tidak mengoptimalkan SVG — setiap
pengunjung beranda akan mengunduhnya mentah.
[`scripts/render-ddsm-assets.cjs`](scripts/render-ddsm-assets.cjs) merendernya
ke WebP 2× di `public/images/ddsm/bento-{1..5}.webp` (±233 kB total), lalu
`next/image` mengecilkannya lagi per lebar layar: ±117 kB tersaji untuk kelima
kartu di lebar 1080px. SVG tetap menjadi sumbernya — **jalankan ulang skrip itu
setiap kali salah satu SVG diganti**, kalau tidak halaman tetap menampilkan
versi lama:

```bash
node scripts/render-ddsm-assets.cjs
```

Kualitas penyajian memakai default Next (75). Teks di dalam kartu sudah dicek
tetap tajam pada kualitas itu, jadi `images.qualities` tidak perlu ditambah.

### Dua jebakan lintas-merek yang sudah ditutup

Metadata dan JSON-LD di App Router **diwariskan ke seluruh rute**. Karena repo
ini punya dua badan hukum, itu berbahaya:

1. **JSON-LD** `Organization`/`WebSite` SUVARNA dulu ada di root layout, jadi
   `/ddsm` ikut mengaku sebagai SUVARNA. Sekarang dipindah ke
   [`app/page.tsx`](app/page.tsx) — tiap merek menerbitkan miliknya sendiri.
2. **`applicationName` / `authors` / `creator` / `publisher`** di root layout
   masih bocor lewat meta tag. `ddsmMetadata()` menimpanya di keempat field itu.

Kalau nanti menambah merek ketiga, periksa ulang keduanya.

> **Aturan warna DDSM.** `ddsm-gold` (#F5C91D) di atas latar terang hanya
> **1,36:1**. Aman hanya di atas `ddsm-forest` (8,39:1) atau sebagai blok padat
> dengan teks gelap. Utilitas `Btn` tone `gold` sudah menerapkannya.

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
