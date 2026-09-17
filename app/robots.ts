import type { MetadataRoute } from "next";
import { ddsmSite } from "@/content/ddsm";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${ddsmSite.url}/sitemap.xml`,
    host: ddsmSite.url,
  };
}
