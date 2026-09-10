import type { Metadata, Viewport } from "next";
import { Inter, Work_Sans } from "next/font/google";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

/* Self-hosted lewat next/font: nol request ke fonts.gstatic.com, dan
   metrik fallback-nya dihitung otomatis sehingga font swap tidak menggeser
   layout (CLS). */
/* `weight` sengaja tidak diisi: next/font lalu memuat varian VARIABLE-nya,
   sehingga weight 320 — angka khas display type di amman.co.id — benar-benar
   tersedia, bukan dibulatkan ke 300 atau 400. */
const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  /* metadataBase membuat seluruh URL OpenGraph jadi absolut. Tanpa ini,
     preview link di WhatsApp, X, dan LinkedIn tidak akan memuat gambar. */
  metadataBase: new URL(site.url),
  ...buildMetadata(),
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${workSans.variable} ${inter.variable}`}>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Lompat ke konten utama
        </a>

        {children}
      </body>
    </html>
  );
}
