"use client";

import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { submitContact, type ContactState } from "@/app/ddsm/contact-action";
import {
  checkContact,
  CONTACT_LIMITS,
  type ContactErrorKey,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/ddsm-contact-rules";
/* Dari "content/ddsm/types" langsung, bukan barrel "@/content/ddsm": barrel
   merangkai ketiga kamus di level modul, dan komponen klien yang menyentuhnya
   ikut menyeret seluruh copy ke bundel browser. */
import { CONTACT_CATEGORIES, type Dict, type Locale } from "@/content/ddsm/types";

type Copy = Dict["home"]["contact"];

const INITIAL: ContactState = { status: "idle" };
const EMPTY: ContactInput = { name: "", email: "", phone: "", category: "", message: "", consent: false };
/* Pesan cadangan kalau server menandai kolom yang di browser dianggap valid
   (mis. pemanggil langsung, atau aturan yang kelak berubah). */
const FALLBACK: Record<ContactField, ContactErrorKey> = {
  name: "required",
  email: "email",
  phone: "phone",
  category: "category",
  message: "tooLong",
  consent: "consent",
};

const noopSubscribe = () => () => {};
/** true hanya setelah hidrasi. Tombol kirim baru boleh dinonaktifkan setelah
    JavaScript jalan: kalau sudah nonaktif sejak HTML server, pengunjung tanpa
    JavaScript tidak akan pernah bisa mengirim formulir. */
const useHydrated = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

/** Event formulir menandai target-nya sebagai HTMLFormElement; elemen yang
    sebenarnya memicu event adalah kolom di dalamnya. */
const asField = (t: EventTarget) => t as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function readForm(form: HTMLFormElement): ContactInput {
  const get = (n: string) => form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
  return {
    name: get("name")?.value ?? "",
    email: get("email")?.value ?? "",
    phone: get("phone")?.value ?? "",
    category: get("category")?.value ?? "",
    message: get("message")?.value ?? "",
    consent: (get("consent") as HTMLInputElement | null)?.checked ?? false,
  };
}

/** Tanda wajib merah. aria-hidden: atribut `required` pada input sudah
    menyampaikan status wajib ke pembaca layar, jadi bintang ini tidak perlu
    ikut diucapkan. */
function Req() {
  return (
    <span aria-hidden className="text-[#e5484d]">
      {" "}*
    </span>
  );
}

const control = (bad: boolean) =>
  `block w-full rounded-lg border bg-white px-3.5 text-[14px] text-ddsm-ink outline-none transition-colors placeholder:text-[#9ea39d] focus:ring-2 ${
    bad
      ? "border-[#e5484d] focus:border-[#e5484d] focus:ring-[#e5484d]/20"
      : "border-[#d9dcd8] focus:border-ddsm-green-2 focus:ring-ddsm-green-2/20"
  }`;
const labelCls = "block text-[14px] font-semibold text-[#1a1a1a]";

/**
 * Formulir "Send Us a Message" — tersambung ke Google Sheet lewat Server
 * Action `submitContact`.
 *
 * Tetap berfungsi tanpa JavaScript: `action` formulir adalah Server Action,
 * jadi sebelum hidrasi (atau bila JS gagal dimuat) browser mengirimnya sebagai
 * POST biasa dan halaman dirender ulang dengan hasilnya.
 */
export function ContactForm({ copy, locale }: { copy: Copy; locale: Locale }) {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);
  /* Key berganti setiap kali kiriman berhasil: FormBody dipasang ulang, jadi
     semua kolom kosong lagi dan status validasinya bersih — "clear field"
     tanpa harus mengosongkan tiap input satu per satu. */
  const key = state.status === "success" ? `ok-${state.id}` : "form";
  return (
    <FormBody key={key} copy={copy} locale={locale} state={state} formAction={formAction} pending={pending} />
  );
}

function FormBody({
  copy,
  locale,
  state,
  formAction,
  pending,
}: {
  copy: Copy;
  locale: Locale;
  state: ContactState;
  formAction: (payload: FormData) => void;
  pending: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const hydrated = useHydrated();
  const pathname = usePathname();
  const f = copy.fields;
  const s = copy.status;
  const failed = state.status === "invalid" || state.status === "error";
  const v = failed ? state.values : {};
  const serverBad = state.status === "invalid" ? state.fields : [];

  /* Status awal dihitung dari isian yang dikembalikan server (kosong untuk
     formulir baru). Tanpa JavaScript, hanya nilai awal inilah yang pernah
     dipakai — kalau dihitung dari formulir kosong, telepon "12-34-56-7" yang
     ditolak server akan diberi pesan "wajib diisi", bukan "format salah". */
  const [errors, setErrors] = useState<ContactErrors>(() =>
    checkContact({ ...EMPTY, ...v, consent: v.consent === "on" }),
  );
  const [touched, setTouched] = useState<Partial<Record<ContactField, true>>>({});
  const [dirty, setDirty] = useState(false);

  const revalidate = () => {
    if (formRef.current) setErrors(checkContact(readForm(formRef.current)));
  };
  const touch = (name: string) => {
    const k = name as ContactField;
    if (k in FALLBACK) setTouched((t) => (t[k] ? t : { ...t, [k]: true }));
  };

  /* Nilai bisa sudah terisi sebelum hidrasi (autofill, tombol Back browser),
     tanpa event input yang sempat ditangkap. Cek sekali setelah frame
     pertama; setState-nya di callback rAF, bukan langsung di badan effect. */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (formRef.current) setErrors(checkContact(readForm(formRef.current)));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const valid = Object.keys(errors).length === 0;
  const disabled = pending || (hydrated && !valid);
  const showHint = hydrated && !valid && !pending;

  const errorOf = (k: ContactField): ContactErrorKey | null => {
    if (serverBad.includes(k)) return errors[k] ?? FALLBACK[k];
    return touched[k] ? (errors[k] ?? null) : null;
  };
  const describe = (k: ContactField) => (errorOf(k) ? { "aria-describedby": `ddsm-${k}-err` } : {});
  /* Fungsi biasa, bukan komponen: komponen yang didefinisikan di dalam render
     dibuat ulang tiap render dan membuat React memasang ulang elemennya. */
  const errorText = (k: ContactField) => {
    const e = errorOf(k);
    return e ? (
      <p id={`ddsm-${k}-err`} className="mt-1.5 text-[13px] leading-snug text-[#c62828]">
        {copy.errors[e]}
      </p>
    ) : null;
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      aria-busy={pending}
      onInput={() => {
        setDirty(true);
        revalidate();
      }}
      onChange={(e) => {
        // Select dan checkbox dianggap "selesai diisi" begitu diubah.
        const t = asField(e.target);
        if (t.tagName === "SELECT" || (t as HTMLInputElement).type === "checkbox") touch(t.name);
        setDirty(true);
        revalidate();
      }}
      onBlur={(e) => {
        touch(asField(e.target).name);
        revalidate();
      }}
      /* Jaring pengaman untuk autofill yang tidak memicu event input: begitu
         pointer atau fokus masuk ke formulir, status tombol dihitung ulang. */
      onFocus={revalidate}
      onPointerEnter={revalidate}
      className="relative rounded-2xl bg-white p-6 text-ddsm-ink shadow-[0_18px_38px_rgba(0,0,0,0.18)] sm:p-7"
    >
      {state.status === "success" && !dirty && <SuccessBanner title={s.successTitle} body={s.successBody} />}

      {failed && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-[#f3c1c1] bg-[#fdf2f2] px-3.5 py-3 text-[14px] leading-snug text-[#a12626]"
        >
          {state.status === "invalid" ? s.invalid : s.error}
        </p>
      )}

      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="page" value={pathname ?? ""} />

      {/* Honeypot: tak terlihat, tak bisa difokus, tak dibacakan. Manusia tidak
          pernah mengisinya; bot yang mengisi semua kolom akan terjebak di sini
          (lihat submitContact). */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelCls} htmlFor="ddsm-name">
            {f.name}
            <Req />
          </label>
          <input
            id="ddsm-name"
            name="name"
            required
            maxLength={CONTACT_LIMITS.name}
            autoComplete="name"
            placeholder={f.namePh}
            defaultValue={v.name}
            aria-invalid={!!errorOf("name") || undefined}
            {...describe("name")}
            className={`mt-2 h-11 ${control(!!errorOf("name"))}`}
          />
          {errorText("name")}
        </div>

        <div>
          <label className={labelCls} htmlFor="ddsm-email">
            {f.email}
            <Req />
          </label>
          <input
            id="ddsm-email"
            name="email"
            type="email"
            required
            maxLength={CONTACT_LIMITS.email}
            autoComplete="email"
            inputMode="email"
            placeholder={f.emailPh}
            defaultValue={v.email}
            aria-invalid={!!errorOf("email") || undefined}
            {...describe("email")}
            className={`mt-2 h-11 ${control(!!errorOf("email"))}`}
          />
          {errorText("email")}
        </div>

        <div>
          <label className={labelCls} htmlFor="ddsm-phone">
            {f.phone}
            <Req />
          </label>
          {/* pattern hanya untuk pengunjung tanpa JavaScript (validasi bawaan
              browser); dengan JavaScript, aturan lengkap 8–15 digit dari
              ddsm-contact-rules yang berlaku. */}
          <input
            id="ddsm-phone"
            name="phone"
            type="tel"
            required
            maxLength={CONTACT_LIMITS.phone}
            pattern="\+?[\d\s().\-]{8,32}"
            autoComplete="tel"
            inputMode="tel"
            placeholder={f.phonePh}
            defaultValue={v.phone}
            aria-invalid={!!errorOf("phone") || undefined}
            {...describe("phone")}
            className={`mt-2 h-11 ${control(!!errorOf("phone"))}`}
          />
          {errorText("phone")}
        </div>

        <div>
          <label className={labelCls} htmlFor="ddsm-cat">
            {f.category}
            <Req />
          </label>
          {/* Panah bawaan <select> berbeda di tiap browser; appearance-none
              + ikon sendiri membuatnya sama dengan komp. `invalid:` membuat
              teks "belum dipilih" tampil abu-abu seperti placeholder input
              lain — select wajib dengan nilai "" dianggap :invalid. Nilai tiap
              opsi adalah KUNCI kategori, bukan labelnya (lihat submitContact). */}
          <div className="relative mt-2">
            {/* key: React tidak memperbarui opsi terpilih-bawaan <select> saat
                defaultValue berubah, padahal reset formulir otomatis React 19
                mengembalikan select ke opsi bawaan itu — tanpa ini pilihan
                kategori hilang setelah kiriman gagal, sementara isian lain
                bertahan. Mengganti key memasang ulang select dengan
                defaultValue terbaru. */}
            <select
              key={v.category ?? ""}
              id="ddsm-cat"
              name="category"
              required
              defaultValue={v.category ?? ""}
              aria-invalid={!!errorOf("category") || undefined}
              {...describe("category")}
              className={`h-11 appearance-none pr-10 invalid:text-[#9ea39d] ${control(!!errorOf("category"))}`}
            >
              <option value="" disabled>
                {f.categoryPh}
              </option>
              {CONTACT_CATEGORIES.map((key) => (
                <option key={key} value={key} className="text-ddsm-ink">
                  {copy.categories[key]}
                </option>
              ))}
            </select>
            <svg
              aria-hidden
              viewBox="0 0 14 8"
              className="pointer-events-none absolute right-3.5 top-1/2 h-2 w-3.5 -translate-y-1/2 text-[#8f948e]"
            >
              <path d="M1 1l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          {errorText("category")}
        </div>

        <div>
          <label className={labelCls} htmlFor="ddsm-msg">
            {f.message}
          </label>
          <textarea
            id="ddsm-msg"
            name="message"
            rows={4}
            maxLength={CONTACT_LIMITS.message}
            placeholder={f.messagePh}
            defaultValue={v.message}
            aria-invalid={!!errorOf("message") || undefined}
            {...describe("message")}
            className={`mt-2 min-h-24 resize-y py-3 ${control(!!errorOf("message"))}`}
          />
          {errorText("message")}
        </div>
      </div>

      <div className="mt-6">
        <label className="flex items-center gap-3 text-[14px] text-[#1a1a1a]">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={v.consent === "on"}
            aria-invalid={!!errorOf("consent") || undefined}
            {...describe("consent")}
            className="size-[18px] shrink-0 accent-ddsm-green"
          />
          {f.consent}
        </label>
        {errorText("consent")}
      </div>

      <button
        type="submit"
        disabled={disabled}
        aria-describedby={showHint ? "ddsm-submit-hint" : undefined}
        className="mt-6 flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#22381e] text-[15px] font-semibold text-white transition-colors hover:bg-[#2c4827] disabled:cursor-not-allowed disabled:bg-[#9aa598] disabled:hover:bg-[#9aa598]"
      >
        {pending ? s.sending : f.submit}
      </button>
      {/* Tombol nonaktif tidak bisa menjelaskan alasannya sendiri — petunjuk
          ini yang memberi tahu, dan dibacakan lewat aria-describedby. */}
      {showHint && (
        <p id="ddsm-submit-hint" className="mt-2.5 text-center text-[13px] text-ddsm-muted">
          {s.hint}
        </p>
      )}
    </form>
  );
}

/** Pesan berhasil di atas formulir yang sudah dikosongkan. Fokus dipindah ke
    sini supaya pembaca layar langsung membacakannya dan halaman bergulir ke
    pesan ini — tombol kirim ada di bawah formulir, jauh dari atasnya. */
function SuccessBanner({ title, body }: { title: string; body: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div
      ref={ref}
      role="status"
      tabIndex={-1}
      className="mb-5 flex gap-3 rounded-lg border border-[#b9dcbf] bg-[#eef8f0] px-3.5 py-3 outline-none"
    >
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2a7f3a] text-white">
        <svg aria-hidden viewBox="0 0 20 16" className="h-2.5 w-3">
          <path d="M1.5 8.5l5.5 5.5L18.5 2" fill="none" stroke="currentColor" strokeWidth="2.6" />
        </svg>
      </span>
      <div>
        <p className="text-[15px] font-semibold text-[#1d5a2b]">{title}</p>
        <p className="mt-0.5 text-[14px] leading-snug text-[#2f5d38]">{body}</p>
      </div>
    </div>
  );
}
