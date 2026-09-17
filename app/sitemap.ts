import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_META, ddsmPath, ddsmSite } from "@/content/ddsm";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.map((locale) => ({
    url: `${ddsmSite.url}${ddsmPath(locale)}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((loc) => [LOCALE_META[loc].htmlLang, `${ddsmSite.url}${ddsmPath(loc)}`]),
      ),
    },
  }));
}
