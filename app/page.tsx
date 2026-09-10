import { getMarketData } from "@/content/market";
import { faqLd, jsonLdScript, organizationLd, webSiteLd } from "@/lib/jsonld";
import { Ticker } from "@/components/sections/Ticker";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { VaultPhoto } from "@/components/sections/VaultPhoto";
import { PriceChart } from "@/components/sections/PriceChart";
import { Produk } from "@/components/sections/Produk";
import { Fitur } from "@/components/sections/Fitur";
import { Brankas } from "@/components/sections/Brankas";
import { Kabar } from "@/components/sections/Kabar";
import { Mitra } from "@/components/sections/Mitra";
import { Faq } from "@/components/sections/Faq";
import { Unduh } from "@/components/sections/Unduh";
import { SiteFooter } from "@/components/sections/SiteFooter";

/**
 * Halaman di-prerender jadi HTML statis saat build.
 * `revalidate` belum berpengaruh selama getMarketData() masih mengembalikan
 * data statis — begitu diganti fetch harga sungguhan, ISR langsung aktif
 * dan halaman menyegar sendiri tiap 5 menit tanpa build ulang.
 */
export const revalidate = 300;

export default function Home() {
  const market = getMarketData();

  return (
    <>
      <Ticker items={market.ticker} />
      <SiteHeader />

      <main>
        <Hero market={market} />
        <VaultPhoto />
        <PriceChart market={market} />
        <Produk />
        <Fitur />
        <Brankas />
        <Kabar />
        <Mitra />
        <Faq />
        <Unduh />
      </main>

      <SiteFooter />

      {/* Structured data SUVARNA hidup di halaman ini, bukan di root layout.
          /ddsm adalah badan hukum yang berbeda dan menerbitkan JSON-LD-nya
          sendiri — kalau ditaruh di layout, kedua merek akan saling mengklaim. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(webSiteLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqLd()) }}
      />
    </>
  );
}
