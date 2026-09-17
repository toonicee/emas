import type { Dict } from "./types";

export const en: Dict = {
  locale: "en",

  nav: [
    { label: "Wealth", section: "intro" },
    { label: "Digital Gold", section: "products" },
    { label: "Info", section: "market" },
    { label: "Company", section: "contact" },
  ],

  common: {
    menu: "Menu",
    close: "Close",
    langSwitchLabel: "Choose language",
    skipToContent: "Skip to main content",
  },

  home: {
    metaTitle: "DDSM — Physical gold, made simple",
    metaDescription:
      "Buy, save, sell, and redeem certified 99.99% gold through one platform. Transparent pricing, insured storage, physical withdrawal whenever you want.",
    hero: {
      title: "Built for pure gold, secured for you",
      lead: "Vaulted bullion and digital holdings seamlessly connected",
      primary: "Invest Now",
      secondary: "Explore Vault Security",
    },
    ticker: {
      label: "Gold Price Today",
      buy: "Buy",
      unavailable: "Price not available yet",
    },
    intro: {
      eyebrow: "100% Allocated Physical Gold & Instant Digital Access",
      heading: "Physical gold and digital gold, seamlessly in one place",
      sideHeading: "Build a stronger financial foundation. Start your gold savings journey today.",
      body: "PT Duta Dana Sukses Makmur is changing how Indonesians access and manage gold. As a digital retail trading platform, we pair the reliability of high-purity gold with the flexibility of modern technology. Through a single integrated platform, customers can buy, save, sell, and redeem gold conveniently, securely, and transparently.",
    },
    bento: {
      certified: {
        title: "Certified Physical Gold, Guaranteed",
        desc: "Authenticated purity and physical ownership you can trust.",
      },
      rates: {
        title: "Transparent Live Rates",
        desc: "Real-time gold prices updated live for maximum transparency.",
      },
      compliant: {
        title: "Fully Compliant & Licensed",
        desc: "Strictly regulated to guarantee maximum legal protection for your investments.",
      },
      legacy: {
        title: "Legacy Asset Protection",
        desc: "Ensure your gold is safely and directly transferable to your loved ones.",
      },
      cta: {
        title: "Your gold journey starts here",
        desc: "A simpler way to buy, sell, and invest in gold.",
      },
    },
    market: {
      eyebrow: "Live pricing",
      heading: "Market Summary",
      lead: "Prices update throughout the trading day. Lock in your preferred denomination whenever you are ready.",
      cols: ["Size", "Buy Price", "Stock"],
      available: "Available",
      soldOut: "Sold out",
      updated: "Updated {time} WIB",
      unavailable: "Price data couldn't be loaded. Please try again shortly.",
    },
    contact: {
      heading: "Send Us a Message",
      lead: "Have a question or running into an issue? Send it through this form. If you are filing a complaint, include your phone number and email so we can follow up directly.",
      fields: {
        name: "Full Name",
        namePh: "Fill your full name",
        email: "Email",
        emailPh: "Fill your email",
        phone: "Phone Number",
        phonePh: "Fill your phone number",
        category: "Question Category",
        categoryPh: "Choose purpose",
        message: "Message",
        messagePh: "Enter your message",
        consent: "I agree with the privacy policy.",
        submit: "Send",
      },
      categories: {
        purchase: "Gold purchase",
        storage: "Gold storage",
        account: "Account support",
        withdrawal: "Physical withdrawal",
        other: "Other",
      },
      status: {
        sending: "Sending…",
        successTitle: "Message sent",
        successBody: "Thank you — our team will get back to you soon.",
        hint: "Fill in all fields marked * to send.",
        invalid: "Please check the highlighted fields and try again.",
        error: "We couldn't send your message right now. Please try again in a moment, or email us directly.",
      },
      errors: {
        required: "This field is required.",
        email: "Enter a valid email — e.g. name@email.com",
        phone: "Enter a valid phone number: 8–15 digits, may start with +.",
        category: "Please choose a category.",
        consent: "Please agree to the privacy policy to continue.",
        tooLong: "This is too long.",
      },
    },
  },

  footer: {
    address: "Plaza Mutiara Lantai 6, Jalan Doktor Ide Anak Agung Gde Agung Kavling E.1.2 nomor 1 dan 2(dahulu jalan Lingkar Mega Kuningan), Desa/ Kelurahan Kuningan Timur, Kec.Setiabudi, Kota Adm.Jakarta Selatan, Provinsi DKI Jakarta",
    email: "corporate@dutadanasuksesmakmur.com",
    phone: "Voice Call 14045",
    disclaimer:
      "PT Duta Dana Sukses Makmur is a company engaged in digital gold trading and related services. The statement that the company is registered, licensed and supervised by BAPPEBTI, together with the applicable licence number and Ministry of Communication and Digital registration details, must be confirmed by Legal/Compliance before publication.",
    licence: "BAPPEBTI Licence No.: [TO BE CONFIRMED]",
    rights: "© 2026 PT Duta Dana Sukses Makmur.",
  },
};
