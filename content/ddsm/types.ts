export const LOCALES = ["id", "en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export type LocaleMeta = {
  htmlLang: string;
  name: string;
  code: string;
  flag: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  id: { htmlLang: "id-ID", name: "Bahasa Indonesia", code: "ID", flag: "🇮🇩" },
  en: { htmlLang: "en", name: "English", code: "EN", flag: "🇺🇸" },
  zh: { htmlLang: "zh-Hans", name: "简体中文", code: "中文", flag: "🇨🇳" },
};

export const SECTIONS = ["intro", "products", "market", "contact"] as const;
export type SectionId = (typeof SECTIONS)[number];

export const CONTACT_CATEGORIES = ["purchase", "storage", "account", "withdrawal", "other"] as const;
export type ContactCategory = (typeof CONTACT_CATEGORIES)[number];

export type Feature = { title: string; desc: string };

export type Dict = {
  locale: Locale;

  nav: { label: string; section: SectionId }[];

  common: {
    menu: string;
    close: string;
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
    ticker: {
      label: string;
      buy: string;
      unavailable: string;
    };
    intro: { eyebrow: string; heading: string; sideHeading: string; body: string };
    bento: {
      certified: Feature;
      rates: Feature;
      compliant: Feature;
      legacy: Feature;
      cta: Feature;
    };
    market: {
      eyebrow: string;
      heading: string;
      lead: string;
      cols: [size: string, buy: string, stock: string];
      available: string;
      soldOut: string;
      updated: string;
      unavailable: string;
    };
    contact: {
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
      categories: Record<ContactCategory, string>;
      status: {
        sending: string;
        successTitle: string;
        successBody: string;
        hint: string;
        invalid: string;
        error: string;
      };
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

  footer: {
    address: string;
    email: string;
    phone: string;
    disclaimer: string;
    licence: string;
    rights: string;
  };
};
