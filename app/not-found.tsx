import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";

export const metadata: Metadata = {
  title: `Halaman tidak ditemukan · ${site.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="shell flex min-h-screen flex-col justify-center py-20">
      <p className="label text-muted">Galat 404</p>
      <h1 className="display mt-8 max-w-[16ch] text-[40px] text-graphite lg:text-[72px]">
        Halaman ini tidak ada.
      </h1>
      <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.5] text-graphite">
        Tautannya mungkin sudah berubah atau salah ketik. Kembali ke halaman utama untuk melihat
        harga emas hari ini.
      </p>
      <Link
        href="/"
        className="pill mt-10 w-fit border-graphite text-graphite transition-colors hover:border-ink hover:bg-ink hover:text-paper"
      >
        <span>Ke halaman utama</span>
        <Arrow />
      </Link>
    </main>
  );
}
