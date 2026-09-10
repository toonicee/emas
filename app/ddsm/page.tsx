import { redirect } from "next/navigation";

/**
 * /ddsm tidak punya konten sendiri — seluruh halaman hidup di bawah segmen
 * bahasa. Indonesia dijadikan default karena ini pasar utamanya; pengunjung
 * berbahasa Inggris berpindah lewat pemilih bahasa di header, dan mesin
 * pencari diarahkan oleh hreflang "x-default" yang juga menunjuk ke /ddsm/id.
 */
export default function DdsmIndex() {
  redirect("/ddsm/id");
}
