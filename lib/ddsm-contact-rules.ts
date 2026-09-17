import { CONTACT_CATEGORIES } from "@/content/ddsm/types";

export type ContactField = "name" | "email" | "phone" | "category" | "message" | "consent";
export type ContactErrorKey = "required" | "email" | "phone" | "category" | "consent" | "tooLong";
export type ContactErrors = Partial<Record<ContactField, ContactErrorKey>>;
export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  consent: boolean;
};

export const CONTACT_LIMITS = { name: 120, email: 254, phone: 32, message: 5000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]+$/;
const PHONE_DIGITS = { min: 8, max: 15 } as const;

export function checkContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const phone = v.phone.trim();

  if (!name) e.name = "required";
  else if (name.length > CONTACT_LIMITS.name) e.name = "tooLong";

  if (!email) e.email = "required";
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_RE.test(email)) e.email = "email";

  const digits = phone.replace(/\D/g, "").length;
  if (!phone) e.phone = "required";
  else if (
    phone.length > CONTACT_LIMITS.phone ||
    !PHONE_RE.test(phone) ||
    digits < PHONE_DIGITS.min ||
    digits > PHONE_DIGITS.max
  ) {
    e.phone = "phone";
  }

  if (!(CONTACT_CATEGORIES as readonly string[]).includes(v.category)) e.category = "category";
  if (v.message.length > CONTACT_LIMITS.message) e.message = "tooLong";
  if (!v.consent) e.consent = "consent";
  return e;
}
