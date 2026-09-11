"use server";

import { isLocale, type ContactCategory } from "@/content/ddsm";
import { id as idDict } from "@/content/ddsm/id";
import { checkContact, type ContactField } from "@/lib/ddsm-contact-rules";

/**
 * Server Action formulir kontak DDSM → Google Sheet.
 *
 * Alurnya: formulir → action ini (server) → Web App Google Apps Script
 * (scripts/google-apps-script/ddsm-contact.gs) → satu baris baru di Sheet.
 *
 * Action ini adalah endpoint POST publik — siapa pun bisa memanggilnya tanpa
 * lewat UI (lihat panduan Server Actions Next). Karena itu:
 *  - semua isian divalidasi ulang di sini dengan aturan yang SAMA dengan
 *    browser (lib/ddsm-contact-rules.ts) — validasi di browser hanya
 *    kenyamanan, bukan pengaman;
 *  - URL dan secret Apps Script hanya dibaca dari env server (tanpa awalan
 *    NEXT_PUBLIC_), jadi tidak pernah sampai ke browser;
 *  - nilai kembaliannya dibatasi pada yang dirender UI: status, nama field yang
 *    salah, dan isian pengunjung sendiri (dipakai mengisi ulang formulir, karena
 *    React 19 mengosongkan formulir setiap kali action selesai).
 */

export type ContactValues = Partial<Record<"name" | "email" | "phone" | "category" | "message" | "consent", string>>;
export type ContactState =
  | { status: "idle" }
  | { status: "success"; id: number }
  | { status: "invalid" | "error"; fields: ContactField[]; values: ContactValues };

/* Hanya path halaman DDSM yang dicatat; selebihnya dikosongkan supaya kolom
   Halaman tidak bisa diisi teks sembarang oleh pemanggil langsung. */
const PAGE_RE = /^\/ddsm(\/[a-z-]+){0,2}$/;

const str = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  /* Honeypot: kolom tersembunyi yang tidak pernah terlihat oleh manusia, tapi
     diisi bot yang mengisi semua input. Pura-pura berhasil, supaya bot tidak
     belajar bahwa kirimannya dibuang. */
  if (str(formData, "website")) return { status: "success", id: Date.now() };

  const values = {
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    category: str(formData, "category"),
    message: str(formData, "message"),
    consent: formData.get("consent") === "on" ? "on" : "",
  };

  const fields = Object.keys(checkContact({ ...values, consent: values.consent === "on" })) as ContactField[];
  if (fields.length) return { status: "invalid", fields, values };

  const url = process.env.DDSM_SHEETS_WEBHOOK_URL;
  const secret = process.env.DDSM_SHEETS_SECRET;
  if (!url || !secret) {
    console.error(
      "[ddsm-contact] DDSM_SHEETS_WEBHOOK_URL / DDSM_SHEETS_SECRET belum di-set — pesan TIDAK tersimpan.",
    );
    return { status: "error", fields: [], values };
  }

  const locale = str(formData, "locale");
  const page = str(formData, "page");

  try {
    /* Web App Apps Script menjawab POST dengan 302 ke URL googleusercontent;
       hasil JSON baru keluar di permintaan lanjutan itu, jadi redirect wajib
       diikuti. Batas waktu 10 detik: Apps Script bisa lambat saat "dingin",
       tapi pengunjung tidak boleh menunggu tanpa kepastian. */
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name: values.name,
        email: values.email,
        phone: values.phone,
        // Label Indonesia, supaya kolom Kategori seragam apa pun bahasa pengirimnya.
        category: idDict.home.contact.categories[values.category as ContactCategory],
        message: values.message,
        locale: isLocale(locale) ? locale : "",
        page: PAGE_RE.test(page) ? page : "",
      }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      console.error(`[ddsm-contact] Apps Script menolak: HTTP ${res.status} ${data?.error ?? "(bukan JSON)"}`);
      return { status: "error", fields: [], values };
    }
  } catch (err) {
    console.error("[ddsm-contact] Apps Script tidak terjangkau:", err instanceof Error ? err.message : err);
    return { status: "error", fields: [], values };
  }

  return { status: "success", id: Date.now() };
}
