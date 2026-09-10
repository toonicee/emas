import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ddsm/ContactSection";
import { PageTemplate } from "@/components/ddsm/PageTemplate";
import { getDict, isLocale } from "@/content/ddsm";
import { ddsmMetadata } from "@/lib/ddsm-seo";

const SLUG = "physical-gold" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDict(lang).pages[SLUG];
  return ddsmMetadata({
    locale: lang,
    slug: SLUG,
    title: page.metaTitle,
    description: page.metaDescription,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <>
      <PageTemplate dict={dict} page={dict.pages[SLUG]} />
      <ContactSection dict={dict} />
    </>
  );
}
