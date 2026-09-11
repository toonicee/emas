/**
 * Bentuk kamus DDSM. Ketiga bahasa memakai tipe yang sama persis, jadi kalau
 * satu bahasa lupa mengisi sebuah field, TypeScript langsung menolaknya —
 * bukan ketahuan belakangan sebagai teks kosong di halaman produksi.
 */

/* Urutan di sini adalah urutan tampil di dropdown pemilih bahasa. */
export const LOCALES = ["id", "en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export type LocaleMeta = {
  /** Nilai atribut lang & hreflang: "id-ID", "en", "zh-Hans". */
  htmlLang: string;
  /** Ditulis dalam bahasa itu sendiri — dropdown menampilkan seluruh pilihan
      dengan nama aslinya, karena pemakai yang mencari "中文" belum tentu
      mengenali label "Chinese". */
  name: string;
  /** Label ringkas di tombol dropdown. */
  code: string;
  flag: string;
};

/**
 * Identitas ketiga bahasa. Sengaja tabel tersendiri, BUKAN field di dalam tiap
 * Dict: pemilih bahasa perlu tahu nama ketiganya sekaligus, jadi kalau datanya
 * tersebar di masing-masing kamus, komponen klien terpaksa mengimpor seluruh
 * kamus — dan ikut menyeret ~1.400 baris copy ke bundel browser hanya demi
 * tiga nama bahasa.
 *
 * `Record<Locale, ...>` yang menjaga kelengkapannya: menambah bahasa di LOCALES
 * tanpa mengisi metanya di sini langsung ditolak TypeScript.
 */
export const LOCALE_META: Record<Locale, LocaleMeta> = {
  id: { htmlLang: "id-ID", name: "Bahasa Indonesia", code: "ID", flag: "🇮🇩" },
  en: { htmlLang: "en", name: "English", code: "EN", flag: "🇺🇸" },
  zh: { htmlLang: "zh-Hans", name: "简体中文", code: "中文", flag: "🇨🇳" },
};

export const PAGE_SLUGS = ["wealth", "digital-gold", "physical-gold", "info", "company"] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

/**
 * Kunci kategori formulir kontak. Label tiap bahasa ada di kamus; yang dikirim
 * formulir dan divalidasi server adalah KUNCINYA, lalu Server Action
 * memetakannya ke label Indonesia sebelum menulis ke Google Sheet — jadi
 * kolom Kategori seragam apa pun bahasa pengirimnya.
 */
export const CONTACT_CATEGORIES = ["purchase", "storage", "account", "withdrawal", "other"] as const;
export type ContactCategory = (typeof CONTACT_CATEGORIES)[number];

export type Feature = { title: string; desc: string };
export type FaqItem = { q: string; a: string };
export type PriceRow = { weight: string; buy: string; sell: string };

export type SubPage = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Dipakai untuk <title> dan meta description halaman ini. */
  metaTitle: string;
  metaDescription: string;
  intro: { heading: string; body: string[] };
  features: { heading: string; lead: string; items: Feature[] };
  steps: { heading: string; lead: string; items: Feature[] };
  faq: { heading: string; items: FaqItem[] };
};

export type Dict = {
  locale: Locale;

  nav: { label: string; slug: PageSlug }[];

  common: {
    menu: string;
    close: string;
    explore: string;
    contactUs: string;
    langSwitchLabel: string;
    skipToContent: string;
  };

  home: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      title: string;
      lead: string;
      primary: string;
      secondary: string;
    };
    ticker: { date: string; label: string; buy: string; sell: string; buyDelta: string; sellDelta: string };
    intro: { eyebrow: string; heading: string; sideHeading: string; body: string };
    /**
     * Lima kartu bento di beranda. Kartunya berupa gambar utuh dengan teks
     * Inggris di dalamnya, jadi copy di sini dipakai sebagai ALT tiap gambar —
     * satu-satunya jalan isi kartu sampai ke mesin pencari dan pembaca layar
     * dalam bahasa halaman. Objek berkunci, bukan array: tiap kunci terikat ke
     * satu berkas gambar tertentu, dan menyisipkan item ke array bakal membuat
     * alt melenceng dari gambarnya.
     */
    bento: {
      certified: Feature;
      rates: Feature;
      compliant: Feature;
      legacy: Feature;
      cta: Feature;
    };
    market: { eyebrow: string; heading: string; lead: string; cols: [string, string, string, string]; available: string };
    contact: {
      heading: string;
      lead: string;
      /** Label TANPA tanda bintang — ContactSection menambahkan "*" merah
          sendiri pada field wajib, jadi bintangnya tidak ikut dibaca pembaca
          layar dua kali (atribut `required` sudah menyampaikannya). */
      fields: {
        name: string; namePh: string;
        email: string; emailPh: string;
        phone: string; phonePh: string;
        category: string; categoryPh: string;
        message: string; messagePh: string;
        consent: string; submit: string;
      };
      categories: Record<ContactCategory, string>;
      /** Pesan setelah formulir dikirim (ContactForm). */
      status: {
        sending: string;
        successTitle: string;
        successBody: string;
        /** Petunjuk di bawah tombol kirim yang sedang nonaktif. */
        hint: string;
        invalid: string;
        error: string;
      };
      /** Pesan galat per kolom — satu per JENIS kesalahan, bukan per kolom,
          karena "wajib diisi" berlaku sama untuk semua kolom wajib. Kuncinya
          = ContactErrorKey di lib/ddsm-contact-rules.ts. */
      errors: {
        required: string;
        email: string;
        phone: string;
        category: string;
        consent: string;
        tooLong: string;
      };
    };
  };

  pages: Record<PageSlug, SubPage>;

  cta: { heading: string; body: string; primary: string; secondary: string };

  footer: {
    address: string;
    email: string;
    phone: string;
    disclaimer: string;
    /** Baris nomor izin BAPPEBTI. Sengaja terpisah dari disclaimer: begitu
        nomornya terbit, cukup field ini yang diganti di ketiga bahasa. */
    licence: string;
    rights: string;
  };
};

export const prices: PriceRow[] = [
  { weight: "0,5 gr", buy: "Rp 1.425.000", sell: "Rp 1.380.000" },
  { weight: "1 gr", buy: "Rp 2.810.000", sell: "Rp 2.623.000" },
  { weight: "2 gr", buy: "Rp 5.610.000", sell: "Rp 5.246.000" },
  { weight: "5 gr", buy: "Rp 13.900.000", sell: "Rp 13.115.000" },
  { weight: "10 gr", buy: "Rp 27.650.000", sell: "Rp 26.110.000" },
  { weight: "25 gr", buy: "Rp 68.850.000", sell: "Rp 65.340.000" },
  { weight: "50 gr", buy: "Rp 137.200.000", sell: "Rp 130.080.000" },
  { weight: "100 gr", buy: "Rp 273.500.000", sell: "Rp 259.000.000" },
];
