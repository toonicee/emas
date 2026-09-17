import type { Metadata } from "next";
import { LOCALES, LOCALE_META, ddsmPath, type Locale } from "@/content/ddsm";

const OG_LOCALE: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
  zh: "zh_CN",
};

export function ddsmMetadata({
  locale,
  title,
  description,
}: {
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  const path = ddsmPath(locale);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((loc) => [LOCALE_META[loc].htmlLang, ddsmPath(loc)])),
        "x-default": ddsmPath("id"),
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
