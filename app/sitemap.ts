import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_META, PAGE_SLUGS, ddsmPath } from "@/content/ddsm";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const suvarna: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  /* Setiap halaman DDSM terdaftar dalam ketiga bahasa, dan tiap entri membawa
     `alternates.languages` supaya mesin pencari melihatnya sebagai satu
     halaman dalam tiga bahasa, bukan konten duplikat. */
  const ddsm: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    [undefined, ...PAGE_SLUGS].map((slug) => ({
      url: `${site.url}${ddsmPath(locale, slug)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: slug ? 0.7 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((loc) => [LOCALE_META[loc].htmlLang, `${site.url}${ddsmPath(loc, slug)}`]),
        ),
      },
    })),
  );

  return [...suvarna, ...ddsm];
}
