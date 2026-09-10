/**
 * Satu sumber kebenaran untuk identitas situs.
 * Dipakai bareng oleh lib/seo.ts, lib/jsonld.ts, app/sitemap.ts, dan footer.
 */

export const site = {
  name: "SUVARNA",
  legalName: "PT Suvarna Logam Nusantara",
  /* metadataBase butuh URL absolut. Tanpa env var, OG image dan canonical
     jatuh ke localhost dan link preview di WhatsApp/X ikut rusak. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://suvarna.co.id",
  locale: "id_ID",
  lang: "id",
  tagline: "Emas fisik, akses digital.",
  description:
    "Beli emas fisik bersertifikat mulai Rp 10.000. Setiap gram di aplikasi berdiri di atas batangan di brankas Jakarta — bisa dicetak, dikirim, atau dijual kembali pada harga hari itu.",
  address: {
    street: "Trembesi Tower Lt. 13, CBD BSD",
    city: "Tangerang Selatan",
    region: "Banten",
    postalCode: "15311",
    country: "ID",
  },
  phone: "+62 21 2789 9700",
  license: "BAPPEBTI 004/BAPPEBTI/P-ED/2024",
  isoCert: "ISO/IEC 27001:2022",
  social: [
    { label: "Instagram", href: "https://instagram.com/suvarna" },
    { label: "TikTok", href: "https://tiktok.com/@suvarna" },
    { label: "YouTube", href: "https://youtube.com/@suvarna" },
    { label: "X", href: "https://x.com/suvarna" },
    { label: "LinkedIn", href: "https://linkedin.com/company/suvarna" },
  ],
} as const;
