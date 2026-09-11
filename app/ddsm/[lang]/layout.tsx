import { DM_Serif_Text, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/ddsm/Footer";
import { Header } from "@/components/ddsm/Header";
import { getDict, isLocale, LOCALES, LOCALE_META } from "@/content/ddsm";

/* DM Serif Text dimuat DI SINI, bukan di root layout, supaya halaman SUVARNA
   tidak ikut menanggung berat font yang tidak dipakainya. Variabelnya dipasang
   di pembungkus di bawah, dan `--font-serif` di globals.css mengarah ke sana.

   `weight` wajib diisi: DM Serif Text bukan variable font dan hanya tersedia
   dalam satu bobot, 400. Karena itu heading serif DDSM memakai `font-normal`,
   dan pembungkus di bawah mematikan font-synthesis — lihat komentarnya. */
const dmSerif = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

/* Manrope: font teks DDSM, mengikuti komp (subjudul, tombol, kartu harga,
   form, footer, logo). Variable font, jadi satu berkas mencakup semua bobot
   yang dipakai (400–800) tanpa perlu `weight`. Seperti DM Serif Text, hanya
   dimuat di subtree /ddsm — SUVARNA tetap Inter. Kelas `.ddsm` di pembungkus
   (globals.css) yang benar-benar mengalihkan font-family ke sini. */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
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
      /* [font-synthesis-weight:none]: DM Serif Text cuma punya bobot 400, jadi
         `font-bold`/`font-semibold` yang kelak ditambahkan ke heading serif
         akan membuat browser menebalkan glif secara sintetis — goresannya
         belepotan. Dengan ini bobot yang tidak ada dirender apa adanya. Manrope
         (variable) dan font CJK sistem punya bobot sungguhan, jadi tidak
         terpengaruh. */
      className={`${dmSerif.variable} ${manrope.variable} ddsm ${lang === "zh" ? "ddsm-zh " : ""}bg-ddsm-sand font-normal text-ddsm-ink [font-synthesis-weight:none]`}
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
