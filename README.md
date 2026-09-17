# DDSM — apgold

DDSM (PT Duta Dana Sukses Makmur) 

Production: **https://apgold.co.id**

## Running in local

Prasyarat: Node.js 22 dan pnpm 10 (`corepack enable`).

```bash
pnpm install
cp .env.example .env.local     # isi nilainya — lihat Konfigurasi
pnpm dev                       # http://localhost:3000 → /id
```

```bash
pnpm build                                 # build production
pnpm lint
node scripts/render-ddsm-assets.cjs        # render ulang aset gambar
node scripts/render-ddsm-assets.cjs logo  
```

## Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Framework | Next.js — App Router, Turbopack, `output: "standalone"` | 16.3.4 |
| UI | React + React Compiler | 19.2.8 / 1.0.0 |
| Bahasa | TypeScript | 5.9 |
| Styling | Tailwind CSS (konfigurasi di `app/globals.css`) | 4.3 |
| Animasi hero | Three.js, dimuat terpisah setelah halaman tampil | 0.186 |
| Gambar | `next/image` + sharp | 0.35 |
| Font | `next/font` — DM Serif Text & Manrope, self-hosted | — |
| Data harga | API stok & harga emas (Pactindo), dibaca di server | — |
| Form | Server Action → Google Apps Script → Google Sheets | — |
| Runtime | Node.js | 22 (Alpine) |
| Package manager | pnpm, dikunci lewat `packageManager` | 10.26.1 |
| Container | Docker multi-stage | — |
| Lint | ESLint + `eslint-config-next` | 9 |



### Router 

```
/                 → 307 ke /id
/id  /en  /zh     beranda per bahasa (satu halaman)
/sitemap.xml  /robots.txt  /icon.png  /apple-icon.png
URL lain          → 404 tiga bahasa (app/global-not-found.tsx)
```

Menu header menggulir ke seksi di beranda:

| Menu (id / en / zh) | Seksi |
|---|---|
| Kekayaan / Wealth / 财富增值 | `#intro` |
| Emas Digital / Digital Gold / 数字黄金 | `#products` |
| Informasi / Info / 资讯 | `#market` |
| Perusahaan / Company / 公司 | `#contact` |





## Configuration

| Variabel | Wajib | Dibaca saat | Keterangan |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | tidak | build | URL kanonik untuk canonical, hreflang, sitemap, dan robots. Default `https://apgold.co.id`; isi hanya untuk domain lain, mis. staging. |
| `DDSM_STOCK_API_URL` | ya, di produksi | build & runtime | Endpoint API stok & harga. Default: endpoint staging. |
| `DDSM_STOCK_API_INSECURE_TLS` | tidak | build & runtime | `1` = lewati verifikasi sertifikat TLS API. **Hanya untuk lokal/staging**: sertifikat `*.pactindo.com` staging kedaluwarsa sejak 15 Agustus 2023, jadi tanpa ini harga tidak muncul di lokal. Jangan dipakai di produksi. |
| `DDSM_SHEETS_WEBHOOK_URL` | ya | runtime | URL Web App Apps Script, berakhiran `/exec`. |
| `DDSM_SHEETS_SECRET` | ya | runtime | String acak, sama persis dengan Script property di Apps Script. |
| `PORT` | tidak | runtime | Default `3000`. |

Lokal: isi di `.env.local`. Produksi: kirim lewat `--env-file` saat `docker run`
(lihat Deploy). File `.env*` tidak pernah ikut masuk image.

## Deploy



### 1. Config Google Sheet 

1. Buat Google Sheet baru, mis. "DDSM — Pesan Masuk". Pakai akun Google pribadi:
   akun Workspace yang menutup akses publik membuat server menerima HTTP 401.
2. Di Sheet: **Extensions → Apps Script**. Ganti isi `Code.gs` dengan
   [`scripts/google-apps-script/ddsm-contact.gs`](scripts/google-apps-script/ddsm-contact.gs),
   lalu simpan.
3. **Project Settings → Script properties** → tambah `DDSM_SHEETS_SECRET` berisi
   string acak (`openssl rand -hex 32`).
4. **Deploy → New deployment → Web app**, dengan *Execute as: Me* dan *Who has
   access: Anyone*. Salin URL yang berakhiran `/exec`.

Kalau kode Apps Script diubah: **Deploy → Manage deployments → Edit → Version:
New version → Deploy**. URL-nya tetap sama.

### 2. file env di server

```bash
sudo install -d -m 700 /etc/ddsm
sudo tee /etc/ddsm/ddsm.env > /dev/null <<'EOF'
DDSM_STOCK_API_URL=https://<host-api-produksi>/ddsm/api/trading/stock-availibility
DDSM_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/<id-deployment>/exec
DDSM_SHEETS_SECRET=<secret dari langkah 1>
EOF
sudo chmod 600 /etc/ddsm/ddsm.env
```

Tulis `KEY=nilai` tanpa tanda kutip: `--env-file` Docker menganggap tanda kutip
sebagai bagian dari nilai.

### 3. Build image

```bash
git pull
docker build -t ddsm:$(git rev-parse --short HEAD) \
  --build-arg DDSM_STOCK_API_URL=https://<host-api-produksi>/ddsm/api/trading/stock-availibility \
  .
```

- `NEXT_PUBLIC_SITE_URL` ditanam saat build, dengan default `https://apgold.co.id`.
- `DDSM_STOCK_API_URL` dipakai untuk render pertama dan ikut menjadi default saat
  runtime. Kalau API tidak terjangkau dari mesin build, build tetap berhasil dan
  harga terisi pada revalidasi pertama.
- Image bisa juga dibangun di CI, di-push ke registry, lalu di-pull di server.

Isi image: tahap `deps` (pnpm install) → `builder` (`pnpm build`) → `runner`
yang hanya berisi server standalone, aset statis, dan dependensi yang dipakai
(±220 MB). Container berjalan sebagai user non-root dan punya `HEALTHCHECK` ke
`/id`.

### 4. Run container

```bash
docker run -d --name ddsm --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  --env-file /etc/ddsm/ddsm.env \
  ddsm:<tag>

docker ps --filter name=ddsm    # tunggu STATUS "(healthy)", ±30 detik
```

Port hanya dibuka ke `127.0.0.1`; akses publik lewat reverse proxy.

### 5. Pasang reverse proxy

Contoh nginx, dengan sertifikat dari Let's Encrypt
(`sudo certbot certonly --nginx -d apgold.co.id -d www.apgold.co.id`):

```nginx
server {
  listen 80;
  server_name apgold.co.id www.apgold.co.id;
  return 301 https://apgold.co.id$request_uri;
}

server {
  listen 443 ssl;
  server_name www.apgold.co.id;
  ssl_certificate     /etc/letsencrypt/live/apgold.co.id/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/apgold.co.id/privkey.pem;
  return 301 https://apgold.co.id$request_uri;
}

server {
  listen 443 ssl;
  server_name apgold.co.id;
  ssl_certificate     /etc/letsencrypt/live/apgold.co.id/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/apgold.co.id/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

**Header `Host` wajib diteruskan apa adanya.** Server Action menolak permintaan
yang `Origin`-nya tidak cocok dengan `Host`/`X-Forwarded-Host`, sehingga formulir
kontak gagal terkirim. Kalau proxy atau CDN memang mengganti host, daftarkan
domainnya di `experimental.serverActions.allowedOrigins` pada `next.config.ts`.

### 6. Cek setelah deploy

```bash
curl -sI https://apgold.co.id/ | grep -i location              # → /id
curl -s https://apgold.co.id/sitemap.xml | grep -c '<loc>'      # → 3
curl -s https://apgold.co.id/id | grep -o 'Rp [0-9.]*' | head -1  # harga tampil
docker logs ddsm 2>&1 | grep ddsm-stock                         # kosong = API lancar
```

Terakhir, kirim satu pesan uji lewat formulir kontak dan pastikan barisnya muncul
di Sheet.

### Update & rollback

```bash
git pull
docker build -t ddsm:<tag-baru> --build-arg DDSM_STOCK_API_URL=<url-api> .
docker rm -f ddsm
docker run -d --name ddsm --restart unless-stopped \
  -p 127.0.0.1:3000:3000 --env-file /etc/ddsm/ddsm.env ddsm:<tag-baru>
```

Rollback: jalankan ulang `docker run` dengan tag sebelumnya. Situs tidak bisa
diakses beberapa detik selama container diganti.



### Tanpa Docker

```bash
pnpm install --frozen-lockfile
DDSM_STOCK_API_URL=<url-api> pnpm build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
cd .next/standalone && PORT=3000 HOSTNAME=127.0.0.1 node server.js
```

Jalankan dengan env produksi yang sama (lihat Konfigurasi) dan pantau prosesnya
dengan systemd atau pm2.
