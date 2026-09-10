/**
 * Seluruh copy landing page, bertipe eksplisit.
 * Komponen membaca dari sini dan tidak pernah hardcode teks di JSX — itu yang
 * bikin migrasi ke CMS nanti jadi pekerjaan satu file, bukan refactor komponen.
 */

export type NavLink = { label: string; href: string };
export type NavGroup = {
  label: string;
  sections: { head: string; items: { label: string; href: string; meta?: string }[] }[];
};

export const nav: { links: NavLink[]; groups: Record<string, NavGroup> } = {
  links: [
    { label: "Emas Digital", href: "#pasar" },
    { label: "Informasi", href: "#kabar" },
    { label: "Event", href: "#kabar" },
  ],
  groups: {
    fisik: {
      label: "Emas Fisik",
      sections: [
        {
          head: "BELI",
          items: [
            { label: "Logam Mulia", href: "#produk", meta: "Antam · UBS · Galeri 24" },
            { label: "Koin Emas", href: "#produk", meta: "Nusantara · Lunar" },
            { label: "Perhiasan", href: "#produk", meta: "17K–24K" },
          ],
        },
        {
          head: "JUAL",
          items: [{ label: "Buyback", href: "#produk", meta: "Harga hari ini" }],
        },
      ],
    },
    perusahaan: {
      label: "Perusahaan",
      sections: [
        {
          head: "PROGRAM",
          items: [
            { label: "Gold for Good", href: "#brankas" },
            { label: "Green Gold", href: "#brankas" },
            { label: "Golden Generation", href: "#brankas" },
          ],
        },
        {
          head: "TENTANG",
          items: [
            { label: "Profil Perusahaan", href: "#brankas" },
            { label: "Tata Kelola", href: "#brankas" },
          ],
        },
      ],
    },
  },
};

export const hero = {
  eyebrow: "PEDAGANG EMAS FISIK DIGITAL — IZIN BAPPEBTI 004/2024",
  title: "Emas fisik, akses digital.",
  lead: [
    "Setiap gram yang kamu miliki di aplikasi berdiri di atas batangan bersertifikat di brankas Jakarta. Bukan derivatif, bukan klaim kertas.",
    "Beli mulai Rp 10.000, cetak jadi batangan kapan pun, atau jual kembali pada harga hari itu juga.",
  ],
  primaryCta: { label: "Buka Rekening", href: "#unduh" },
  secondaryCta: { label: "Harga Hari Ini", href: "#pasar" },
  priceNote:
    "Harga diperbarui tiap 60 detik dari pasar spot dan kurs tengah BI. Spread beli–jual 2,8%.",
};

export const pasar = {
  eyebrow: "PASAR",
  title: "Grafik harga emas",
  lead: "Rata-rata harian harga beli 24 karat dalam rupiah per gram. Data pembanding: LBMA London Fix dan kurs tengah Bank Indonesia.",
};

export type Produk = {
  no: string;
  nama: string;
  desc: string;
  varian: string;
  /** Foto di public/images — lihat IMAGE-CREDITS.md. Masih placeholder. */
  image: string;
  alt: string;
};

export const produk: Produk[] = [
  {
    no: "01",
    nama: "Logam Mulia",
    desc: "Batangan bersertifikat dari 0,5 gram sampai 1 kilogram.",
    varian: "ANTAM · UBS · GALERI 24",
    image: "/images/logam-mulia.jpg",
    alt: "Dua batangan emas murni bersilangan di atas latar terang",
  },
  {
    no: "02",
    nama: "Koin Emas",
    desc: "Seri Nusantara, edisi Lunar tahunan, dan cetakan custom.",
    varian: "1 GR – 10 GR",
    image: "/images/koin-emas.jpg",
    alt: "Deretan koin emas bergambar relief, tersusun rapat",
  },
  {
    no: "03",
    nama: "Perhiasan",
    desc: "Kalung, cincin, dan gelang dengan sertifikat kadar dan berat.",
    varian: "17K · 22K · 24K",
    image: "/images/perhiasan.jpg",
    alt: "Kalung emas berumbai halus terbentang di atas permukaan polos",
  },
];

export type Fitur = { title: string; desc: string };

export const fiturIntro = {
  title: "Di dalam aplikasi",
  lead: "Lima hal yang bisa kamu lakukan atas saldo emas kamu, semuanya tanpa biaya penyimpanan.",
};

export const fitur: Fitur[] = [
  {
    title: "Beli & jual",
    desc: "Order pasar 24 jam pada harga acuan berjalan. Eksekusi instan, spread tampil sebelum konfirmasi.",
  },
  {
    title: "Transfer gram",
    desc: "Kirim emas ke sesama pengguna lewat nomor ponsel. Tanpa biaya, tercatat di mutasi kedua pihak.",
  },
  {
    title: "Cetak fisik",
    desc: "Tukar saldo digital jadi batangan, koin, atau perhiasan. Diantar berasuransi ke seluruh Indonesia.",
  },
  {
    title: "Panen emas",
    desc: "Titipkan saldo dalam tenor 3–12 bulan dan terima imbal hasil dalam gram, bukan rupiah.",
  },
  {
    title: "Gadai kilat",
    desc: "Jaminkan saldo emas untuk kebutuhan dana mendesak. Cair dalam hitungan menit, tanpa penalti pelunasan awal.",
  },
];

/**
 * Band foto full-bleed dengan teks overlay — pola "WHO WE ARE" di amman.co.id.
 * Klaimnya sengaja tidak baru: semuanya sudah ada di tabel kepatuhan di bawah.
 */
export const tentang = {
  eyebrow: "TENTANG KAMI",
  title: "Emas yang bisa kamu pegang",
  body: "SUVARNA menyimpan setiap gram milik pengguna sebagai batangan bersertifikat di brankas pihak ketiga di Jakarta — diasuransikan penuh dan diaudit tiap kuartal. Yang tampil di aplikasi adalah cerminan logam yang benar-benar ada, bukan angka di atas kertas.",
  cta: { label: "Selengkapnya", href: "#brankas" },
};

export const brankas = {
  eyebrow: "BRANKAS & KEPATUHAN",
  title: "Emas kamu bisa dihitung, bukan dijanjikan",
  lead: "Cadangan diaudit tiap kuartal oleh kantor akuntan independen. Laporannya terbuka untuk semua pengguna.",
  cta: { label: "Unduh laporan Q2 2026", href: "#brankas" },
  rows: [
    { label: "Izin pedagang emas digital", val: "BAPPEBTI 004/P-ED/2024" },
    { label: "Keanggotaan bursa & kliring", val: "ICDX · ICH" },
    { label: "Sertifikasi keamanan informasi", val: "ISO/IEC 27001:2022 · ISMS 25213" },
    { label: "Auditor cadangan emas", val: "KAP independen, tiap kuartal" },
    { label: "Asuransi brankas", val: "All-risk, nilai penuh" },
    { label: "Penyimpanan", val: "Brankas pihak ketiga, Jakarta" },
  ],
};

export type Kabar = {
  date: string;
  datetime: string;
  cat: string;
  title: string;
  /** Kutipan isi — kartu berita bergaya Amman menampilkan paragraf pembuka. */
  excerpt: string;
  meta: string;
  /** Foto di public/images — lihat IMAGE-CREDITS.md. Masih placeholder. */
  image: string;
  alt: string;
};

export const kabar: Kabar[] = [
  {
    date: "9 SEP 2026",
    datetime: "2026-09-09",
    cat: "Kabar Emas",
    title: "Harga emas menguat tipis ditopang pelemahan dolar menjelang rilis inflasi AS",
    excerpt:
      "Emas 24 karat ditutup naik 0,82% ke Rp 2.148.500 per gram seiring pelemahan indeks dolar. Pelaku pasar menahan posisi menjelang rilis data inflasi Amerika Serikat pekan ini.",
    meta: "4 menit baca",
    image: "/images/kabar-1.jpg",
    alt: "Tumpukan batangan emas dilihat dari dekat",
  },
  {
    date: "7 SEP 2026",
    datetime: "2026-09-07",
    cat: "Promo",
    title: "Diskon 30% untuk pembelian pertama sepanjang September",
    excerpt:
      "Pengguna baru mendapat potongan spread 30% untuk transaksi pembelian pertama. Berlaku otomatis di aplikasi tanpa kode, sampai 30 September 2026.",
    meta: "Sampai 30 Sep",
    image: "/images/kabar-2.jpg",
    alt: "Dua keping koin emas di atas latar gelap",
  },
  {
    date: "5 SEP 2026",
    datetime: "2026-09-05",
    cat: "Event",
    title: "SUVARNA di Art Jakarta — koin edisi terbatas hasil kolaborasi perupa",
    excerpt:
      "Seri koin emas 5 gram hasil kolaborasi dengan tiga perupa Indonesia dipamerkan di JIExpo. Setiap keping dicetak terbatas dan dilengkapi sertifikat keaslian bernomor.",
    meta: "3–7 Sep, JIExpo",
    image: "/images/kabar-3.jpg",
    alt: "Sepasang koin emas kuno dengan relief pahatan detail",
  },
  {
    date: "2 SEP 2026",
    datetime: "2026-09-02",
    cat: "Program",
    title: "Gold for Good menyalurkan 12 kg emas untuk beasiswa vokasi",
    excerpt:
      "Program Gold for Good menyalurkan 12 kilogram emas sebagai dana abadi beasiswa pendidikan vokasi. Laporan penyaluran terbuka untuk diakses seluruh pengguna.",
    meta: "Laporan program",
    image: "/images/kabar-1.jpg",
    alt: "Tumpukan batangan emas dilihat dari dekat",
  },
  {
    date: "28 AGU 2026",
    datetime: "2026-08-28",
    cat: "Tips",
    title: "Menabung emas dengan gaji bulanan: metode porsi tetap",
    excerpt:
      "Menyisihkan porsi tetap tiap gajian meratakan harga beli sepanjang tahun dan menghindari jebakan menebak titik terendah. Berikut cara menghitung porsinya.",
    meta: "6 menit baca",
    image: "/images/kabar-2.jpg",
    alt: "Dua keping koin emas di atas latar gelap",
  },
];

export const mitra = ["DANA", "SHOPEE", "BAREKSA", "BUKALAPAK", "FLIP", "CERMATI", "NANOVEST"];

export const unduh = {
  title: "Gram pertama kamu, sore ini.",
  note: "Verifikasi identitas ±3 menit. Tanpa biaya buka rekening.",
  stores: [
    { label: "App Store", href: "#unduh" },
    { label: "Google Play", href: "#unduh" },
  ],
};

export const footerCols = [
  { head: "PRODUK", items: ["Emas Digital", "Logam Mulia", "Koin Emas", "Perhiasan", "Buyback"] },
  {
    head: "DUKUNGAN",
    items: ["Pusat Bantuan", "Informasi", "Syarat & Ketentuan", "Kebijakan Privasi", "Karier"],
  },
  { head: "PROGRAM", items: ["Gold for Good", "Green Gold", "Golden Generation"] },
  { head: "PERUSAHAAN", items: ["Profil", "Tata Kelola", "Keamanan Informasi", "Whistleblowing"] },
];

/** Dipakai untuk JSON-LD FAQPage — structured data butuh tanya-jawab eksplisit. */
export const faq = [
  {
    q: "Apakah emas di aplikasi SUVARNA benar-benar ada fisiknya?",
    a: "Ya. Setiap gram yang tercatat di aplikasi berdiri di atas batangan bersertifikat yang disimpan di brankas pihak ketiga di Jakarta. Cadangan diaudit tiap kuartal oleh kantor akuntan publik independen dan laporannya terbuka untuk semua pengguna.",
  },
  {
    q: "Berapa minimum pembelian emas di SUVARNA?",
    a: "Pembelian dimulai dari Rp 10.000. Tidak ada biaya buka rekening dan tidak ada biaya penyimpanan atas saldo emas kamu.",
  },
  {
    q: "Bisakah saldo emas digital dicetak jadi emas fisik?",
    a: "Bisa. Saldo digital dapat ditukar menjadi batangan logam mulia, koin emas, atau perhiasan, lalu diantar berasuransi ke seluruh Indonesia. Tersedia pilihan Antam, UBS, dan Galeri 24 dari 0,5 gram sampai 1 kilogram.",
  },
  {
    q: "Berapa spread beli dan jual di SUVARNA?",
    a: "Spread beli–jual berada di kisaran 2,8%. Harga acuan diperbarui tiap 60 detik dari pasar spot dan kurs tengah Bank Indonesia, dan spread selalu ditampilkan sebelum kamu mengonfirmasi transaksi.",
  },
  {
    q: "Apakah SUVARNA punya izin resmi?",
    a: "SUVARNA berizin sebagai pedagang emas fisik digital dengan nomor BAPPEBTI 004/BAPPEBTI/P-ED/2024, terdaftar sebagai anggota bursa ICDX dan lembaga kliring ICH, serta tersertifikasi ISO/IEC 27001:2022 untuk keamanan informasi.",
  },
];
