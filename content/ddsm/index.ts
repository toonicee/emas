import { id } from "./id";
import { en } from "./en";
import { zh } from "./zh";
import { LOCALES, type Dict, type Locale, type PageSlug } from "./types";

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
  email: "hello@ddsm.co.id",
} as const;

/** "/ddsm/id/wealth" — satu tempat merangkai URL supaya tidak salah ketik. */
export function ddsmPath(locale: Locale, slug?: PageSlug): string {
  return slug ? `/ddsm/${locale}/${slug}` : `/ddsm/${locale}`;
}
