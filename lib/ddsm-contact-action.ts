"use server";

import { LOCALES, isLocale, type ContactCategory } from "@/content/ddsm";
import { id as idDict } from "@/content/ddsm/id";
import { checkContact, type ContactField } from "@/lib/ddsm-contact-rules";

export type ContactValues = Partial<Record<"name" | "email" | "phone" | "category" | "message" | "consent", string>>;
export type ContactState =
  | { status: "idle" }
  | { status: "success"; id: number }
  | { status: "invalid" | "error"; fields: ContactField[]; values: ContactValues };

const PAGE_RE = new RegExp(`^/(?:${LOCALES.join("|")})$`);

const str = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
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
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name: values.name,
        email: values.email,
        phone: values.phone,
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
