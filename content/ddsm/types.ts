/**
 * Bentuk kamus DDSM. Kedua bahasa memakai tipe yang sama persis, jadi kalau
 * satu bahasa lupa mengisi sebuah field, TypeScript langsung menolaknya —
 * bukan ketahuan belakangan sebagai teks kosong di halaman produksi.
 */

export const LOCALES = ["id", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const PAGE_SLUGS = ["wealth", "digital-gold", "physical-gold", "info", "company"] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

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
  htmlLang: string;
  /** Nama bahasa + bendera untuk pemilih bahasa. */
  langName: string;
  flag: string;

  nav: { label: string; slug: PageSlug }[];

  common: {
    menu: string;
    close: string;
    invest: string;
    explore: string;
    contactUs: string;
    readMore: string;
    langSwitchLabel: string;
    skipToContent: string;
  };

  home: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      eyebrow: string;
      title: string;
      lead: string;
      primary: string;
      secondary: string;
    };
    ticker: { date: string; label: string; buy: string; sell: string; buyDelta: string; sellDelta: string };
    intro: { eyebrow: string; heading: string; sideHeading: string; body: string };
    pillars: Feature[];
    market: { eyebrow: string; heading: string; lead: string; cols: [string, string, string, string]; available: string };
    contact: {
      eyebrow: string;
      heading: string;
      lead: string;
      fields: {
        name: string; namePh: string;
        email: string; emailPh: string;
        phone: string; phonePh: string;
        category: string; categoryPh: string;
        message: string; messagePh: string;
        consent: string; submit: string;
      };
      categories: string[];
    };
  };

  pages: Record<PageSlug, SubPage>;

  cta: { heading: string; body: string; primary: string; secondary: string };

  footer: {
    address: string;
    hours: string;
    email: string;
    phone: string;
    disclaimer: string;
    rights: string;
    legal: string[];
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
