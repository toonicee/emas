import type { Metadata } from "next";
import {
  LOCALES,
  LOCALE_META,
  ddsmPath,
  ddsmSite,
  type Locale,
  type PageSlug,
} from "@/content/ddsm";

/** Format locale OpenGraph memakai garis bawah, beda dari hreflang. */
const OG_LOCALE: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
  zh: "zh_CN",
};

/**
 * Metadata untuk halaman DDSM, lengkap dengan hreflang.
 *
 * `languages` inilah yang memberi tahu mesin pencari bahwa /ddsm/id/...,
 * /ddsm/en/... dan /ddsm/zh/... adalah halaman yang sama dalam tiga bahasa —
 * bukan konten duplikat. Tanpa itu, salah satu versi berisiko tidak diindeks.
 */
export function ddsmMetadata({
  locale,
  slug,
  title,
  description,
}: {
  locale: Locale;
  slug?: PageSlug;
  title: string;
  description: string;
}): Metadata {
  const path = ddsmPath(locale, slug);

  return {
    title,
    description,

    /* Root layout menyetel applicationName/authors/creator/publisher milik
       SUVARNA, dan metadata Next diwariskan ke seluruh rute. Tanpa override di
       bawah, halaman DDSM akan mengaku diterbitkan PT Suvarna Logam Nusantara —
       badan hukum yang sama sekali berbeda. */
    applicationName: ddsmSite.brand,
    authors: [{ name: ddsmSite.legalName }],
    creator: ddsmSite.legalName,
    publisher: ddsmSite.legalName,

    alternates: {
      canonical: path,
      /* Dirakit dari LOCALES, bukan diketik satu per satu: menambah bahasa
         berikutnya tidak boleh diam-diam melewatkan tag hreflang-nya. */
      languages: {
        ...Object.fromEntries(
          LOCALES.map((loc) => [LOCALE_META[loc].htmlLang, ddsmPath(loc, slug)]),
        ),
        "x-default": ddsmPath("id", slug),
      },
    },
    openGraph: {
      type: "website",
      siteName: "DDSM",
      locale: OG_LOCALE[locale],
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
