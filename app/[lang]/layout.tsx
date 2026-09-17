import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/ddsm/Footer";
import { Header } from "@/components/ddsm/Header";
import { ddsmSite, getDict, isLocale, LOCALES, LOCALE_META } from "@/content/ddsm";
import { fontVariables } from "@/lib/ddsm-fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(ddsmSite.url),
  applicationName: ddsmSite.brand,
  authors: [{ name: ddsmSite.legalName }],
  creator: ddsmSite.legalName,
  publisher: ddsmSite.legalName,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#2a3a24",
  colorScheme: "light",
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <html
      lang={LOCALE_META[lang].htmlLang}
      className={lang === "zh" ? `${fontVariables} ddsm-zh` : fontVariables}
    >
      <body>
        <a
          href="#ddsm-main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ddsm-forest focus:px-4 focus:py-2 focus:text-ddsm-cream"
        >
          {dict.common.skipToContent}
        </a>

        <Header dict={dict} />
        <main id="ddsm-main">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
