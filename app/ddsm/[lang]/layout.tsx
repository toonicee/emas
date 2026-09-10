import { Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/ddsm/Footer";
import { Header } from "@/components/ddsm/Header";
import { getDict, isLocale, LOCALES, LOCALE_META } from "@/content/ddsm";

/* Fraunces dimuat DI SINI, bukan di root layout, supaya halaman SUVARNA tidak
   ikut menanggung berat font yang tidak dipakainya. Variabelnya dipasang di
   pembungkus di bawah, dan `--font-serif` di globals.css mengarah ke sana. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/* Hanya "id", "en", dan "zh" yang sah — selain itu 404, bukan halaman kosong. */
export const dynamicParams = false;

export default async function DdsmLayout({
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
    /* lang di pembungkus, bukan di <html>: root layout dipakai bersama halaman
       SUVARNA yang berbahasa Indonesia. Menyetel lang pada subtree adalah cara
       standar menandai bagian situs yang berbahasa lain. */
    <div
      lang={LOCALE_META[lang].htmlLang}
      /* .ddsm-zh menambah rantai fallback CJK (lihat globals.css). Dipasang
         hanya untuk zh supaya halaman ID/EN sama sekali tidak berubah. */
      className={`${fraunces.variable} ${lang === "zh" ? "ddsm-zh " : ""}bg-ddsm-sand font-normal text-ddsm-ink`}
    >
      <a
        href="#ddsm-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ddsm-forest focus:px-4 focus:py-2 focus:text-ddsm-cream"
      >
        {dict.common.skipToContent}
      </a>

      <Header dict={dict} />
      <main id="ddsm-main">{children}</main>
      <Footer dict={dict} />
    </div>
  );
}
