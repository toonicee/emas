import { id } from "./id";
import { en } from "./en";
import { zh } from "./zh";
import { LOCALES, type Dict, type Locale } from "./types";

export * from "./types";

const DICTS: Record<Locale, Dict> = { id, en, zh };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

export const ddsmSite = {
  brand: "DDSM",
  legalName: "PT Datar Dana Sukses Makmur",
  email: "corporate@dutadanasuksesmakmur.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://apgold.co.id",
};

export function ddsmPath(locale: Locale): string {
  return `/${locale}`;
}
