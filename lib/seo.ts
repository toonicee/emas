import type { Metadata } from "next";
import { site } from "@/content/site";

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  /** Path relatif, contoh "/" atau "/artikel/harga-emas". */
  path?: string;
};

/**
 * Helper tunggal untuk metadata. Semua halaman lewat sini supaya canonical,
 * OpenGraph, dan Twitter card tidak pernah lupa diisi.
 */
export function buildMetadata({
  title,
  description = site.description,
  path = "/",
}: BuildMetadataArgs = {}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
