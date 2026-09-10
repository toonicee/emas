import type { Dict } from "./types";

export const en: Dict = {
  locale: "en",
  htmlLang: "en",
  langName: "English",
  flag: "🇬🇧",

  nav: [
    { label: "Wealth", slug: "wealth" },
    { label: "Digital Gold", slug: "digital-gold" },
    { label: "Physical Gold", slug: "physical-gold" },
    { label: "Info", slug: "info" },
    { label: "Company", slug: "company" },
  ],

  common: {
    menu: "Menu",
    close: "Close",
    invest: "Start Investing",
    explore: "Vault Security",
    contactUs: "Contact Us",
    readMore: "Read more",
    langSwitchLabel: "Choose language",
    skipToContent: "Skip to main content",
  },

  home: {
    metaTitle: "DDSM — Physical gold, made simple",
    metaDescription:
      "Buy, save, sell, and redeem certified 99.99% gold through one platform. Transparent pricing, insured storage, physical withdrawal whenever you want.",
    hero: {
      eyebrow: "Gold that is real, not just visible",
      title: "Built for pure gold, secured for you",
      lead: "Trusted bullion and digital gold storage, protected end to end.",
      primary: "Start Investing",
      secondary: "Vault Security",
    },
    ticker: {
      date: "Thursday, 10 September 2026",
      label: "Gold Price Today",
      buy: "Buy",
      sell: "Sell",
      buyDelta: "0.83%",
      sellDelta: "0.30%",
    },
    intro: {
      eyebrow: "Fully allocated physical gold & instant digital access",
      heading: "Physical gold and digital gold, seamlessly in one place",
      sideHeading: "Build a stronger financial foundation. Start your gold savings journey today.",
      body: "PT Datar Dana Sukses Makmur is changing how Indonesians access and manage gold. As a digital retail trading platform, we pair the reliability of high-purity gold with the flexibility of modern technology. Through a single integrated platform, customers can buy, save, sell, and redeem gold conveniently, securely, and transparently.",
    },
    pillars: [
      {
        title: "Certified physical gold",
        desc: "Verified purity and physical ownership genuinely registered in your name.",
      },
      {
        title: "Live, open pricing",
        desc: "Gold prices move in real time, with every cost shown before you confirm.",
      },
      {
        title: "Licensed and compliant",
        desc: "Held to strict regulatory standards, with legal protection over what you own.",
      },
      {
        title: "Legacy asset protection",
        desc: "Gold stays secure and can be passed on without a tangled process.",
      },
    ],
    market: {
      eyebrow: "Live pricing",
      heading: "Market Summary",
      lead: "Prices update throughout the trading day. Lock in your preferred denomination whenever you are ready.",
      cols: ["Size", "Buy Price", "Sell Price", "Stock"],
      available: "Available",
    },
    contact: {
      eyebrow: "Get in touch",
      heading: "Send Us a Message",
      lead: "Have a question or running into an issue? Send it through this form. If you are filing a complaint, include your phone number and email so we can follow up directly.",
      fields: {
        name: "Full name*",
        namePh: "Enter your full name",
        email: "Email*",
        emailPh: "name@email.com",
        phone: "Phone number*",
        phonePh: "Enter your phone number",
        category: "Category*",
        categoryPh: "Choose a category",
        message: "Message",
        messagePh: "Write your message",
        consent: "I agree with the privacy policy.",
        submit: "Send message",
      },
      categories: ["Gold purchase", "Gold storage", "Account support", "Physical withdrawal", "Other"],
    },
  },

  pages: {
    wealth: {
      eyebrow: "Wealth",
      title: "Growing wealth, one gram at a time",
      lead: "Gold savings programmes built around habit, not around guessing the market.",
      metaTitle: "Wealth — DDSM gold savings programmes",
      metaDescription:
        "Recurring gold savings, fixed-term gold yield, and instant pawn. Build wealth in grams, not just rupiah.",
      intro: {
        heading: "Wealth is built on habit, not luck",
        body: [
          "Calling the bottom of the gold price is a game almost nobody wins consistently. What you can control is regularity: setting aside a fixed portion every month and letting your average purchase price do the work.",
          "Every programme on this page rests on the same principle — your balance is counted in grams. When prices rise, its rupiah value rises with it; when prices fall, the grams you accumulate stack up faster.",
        ],
      },
      features: {
        heading: "Three ways to grow your balance",
        lead: "They can run side by side, and none of them carry storage fees.",
        items: [
          {
            title: "Recurring savings",
            desc: "Set automatic purchases daily, weekly, or monthly from Rp 10,000. Your entry price becomes the market average instead of a guess.",
          },
          {
            title: "Gold yield",
            desc: "Commit your balance for a 3–12 month term and receive the yield in grams. What grows is the metal itself, not just a rupiah figure.",
          },
          {
            title: "Instant pawn",
            desc: "Need urgent cash without letting go of your gold? Pledge your balance, receive funds within minutes, with no penalty for early settlement.",
          },
          {
            title: "Gift gold",
            desc: "Send grams to another user by phone number. Free of charge, and recorded in both parties' statements.",
          },
        ],
      },
      steps: {
        heading: "How to start",
        lead: "From sign-up to your first gram usually takes under ten minutes.",
        items: [
          { title: "01 — Verify your identity", desc: "Have your ID and a selfie ready. Checks average around three minutes." },
          { title: "02 — Set your portion", desc: "Pick an amount and rhythm your cash flow can sustain, not the largest one on offer." },
          { title: "03 — Turn on automation", desc: "Connect a funding source, then let the system keep the consistency for you." },
          { title: "04 — Review quarterly", desc: "Track grams, not daily value. That is the right measure for a gold savings plan." },
        ],
      },
      faq: {
        heading: "Questions about the programmes",
        items: [
          {
            q: "Are there storage fees on a gold balance?",
            a: "None. Your gold balance carries no monthly or annual storage fee, regardless of how many grams you hold or how long you hold them.",
          },
          {
            q: "What is the minimum to start saving?",
            a: "Purchases start from Rp 10,000, and there is no account opening fee. You can raise or lower your portion at any time without penalty.",
          },
          {
            q: "Is the gold yield guaranteed?",
            a: "The yield follows the term agreed upfront and is paid in grams. Its rupiah value still tracks the market price at redemption, so it is the gram figure that is fixed, not the rupiah figure.",
          },
          {
            q: "Can I stop at any time?",
            a: "Yes. Recurring savings can be paused or stopped from the app at any time, and whatever you have accumulated remains entirely yours.",
          },
        ],
      },
    },

    "digital-gold": {
      eyebrow: "Digital Gold",
      title: "Digital speed, backed by real metal",
      lead: "Buy, sell, and move gold in seconds — every gram still standing on physical bullion.",
      metaTitle: "Digital Gold — Buy and sell gold 24 hours with DDSM",
      metaDescription:
        "Trade gold around the clock with live reference pricing, transparent spreads, and every gram backed by physical bullion in the vault.",
      intro: {
        heading: "Not a derivative, not a paper claim",
        body: [
          "Digital gold is often misread as a contract or a promise of value. That is not how DDSM works. Every gram recorded in your account has a physical counterpart: certified bullion held in a third-party vault.",
          "So you get the convenience of digital trading — instant, around the clock, in any fraction — without losing what made gold worth holding in the first place: the metal genuinely exists and you can take delivery of it.",
        ],
      },
      features: {
        heading: "What you can do",
        lead: "All from the same single balance.",
        items: [
          {
            title: "24-hour market orders",
            desc: "Buy and sell any time at the live reference price. The spread is shown before you press confirm.",
          },
          {
            title: "Any fraction you like",
            desc: "No need to wait until you have a full gram. Transactions go down to four decimal places.",
          },
          {
            title: "Peer transfers",
            desc: "Send grams by phone number, free of charge, recorded cleanly in both parties' statements.",
          },
          {
            title: "Redeem for physical",
            desc: "Convert your digital balance into bars or coins whenever you want, delivered fully insured.",
          },
        ],
      },
      steps: {
        heading: "How the price is formed",
        lead: "No number appears out of nowhere — this is the chain.",
        items: [
          { title: "01 — Global spot price", desc: "The reference comes from international spot markets moving throughout the day." },
          { title: "02 — Mid-market rate", desc: "Converted to rupiah using the Bank Indonesia mid rate." },
          { title: "03 — Buy–sell spread", desc: "The gap between buy and sell is shown openly before confirmation, not buried inside the price." },
          { title: "04 — Final price", desc: "The number you see at confirmation is the number that gets executed." },
        ],
      },
      faq: {
        heading: "Questions about digital gold",
        items: [
          {
            q: "How is digital gold different from ordinary gold savings?",
            a: "In ownership terms there is no difference — both are physical gold held in your name. What differs is access: digital gold can be bought, sold, and transferred through the app without physically moving the metal.",
          },
          {
            q: "What is the buy–sell spread?",
            a: "The spread sits around 2.8% and is always shown before you confirm a transaction. No hidden charges are folded into the price.",
          },
          {
            q: "Can the price change after I confirm?",
            a: "No. The price is locked at confirmation, so the figure you agreed to is the figure executed even if the market moves moments later.",
          },
          {
            q: "What happens if the app goes down?",
            a: "Your gold balance is recorded in a ledger separate from the app and stays intact. Transactions resume once service is restored, and your history is unchanged.",
          },
        ],
      },
    },

    "physical-gold": {
      eyebrow: "Physical Gold",
      title: "Gold you can hold",
      lead: "Certified bars, coins, and jewellery — minted on request, delivered fully insured.",
      metaTitle: "Physical Gold — Certified bars, coins, and jewellery",
      metaDescription:
        "Convert your digital balance into 99.99% bullion, gold coins, or certified jewellery. Delivered insured across Indonesia.",
      intro: {
        heading: "From balance to metal, whenever you want",
        body: [
          "Digital gold makes trading easy, but some people still want the metal in hand. You do not have to choose between the two — your app balance can be converted into physical form at any time without selling first.",
          "Every piece we ship arrives with a purity and weight certificate, sealed in tamper-evident packaging, and insured for the whole journey until it reaches your address.",
        ],
      },
      features: {
        heading: "Available forms",
        lead: "All certified, and all repurchasable at any time.",
        items: [
          {
            title: "Bullion bars",
            desc: "Certified bars from 0.5 gram up to 1 kilogram, available in Antam, UBS, and Galeri 24 variants.",
          },
          {
            title: "Gold coins",
            desc: "The Nusantara series, annual Lunar editions, and custom mintings from 1 to 10 grams.",
          },
          {
            title: "Jewellery",
            desc: "Necklaces, rings, and bracelets from 17K to 24K, each with a purity and weight certificate.",
          },
          {
            title: "Buyback",
            desc: "Every physical product we issue can be sold back at that day's buyback price, with no haggling.",
          },
        ],
      },
      steps: {
        heading: "The redemption process",
        lead: "From request to your hands.",
        items: [
          { title: "01 — Choose the form", desc: "Pick the type, purity, and denomination to be minted from your gold balance." },
          { title: "02 — Verification", desc: "Confirm the delivery address and recipient identity to keep the shipment secure." },
          { title: "03 — Minting", desc: "The metal is prepared and sealed together with its purity and weight certificate." },
          { title: "04 — Insured delivery", desc: "Shipped with full-value insurance and trackable until it is received." },
        ],
      },
      faq: {
        heading: "Questions about physical gold",
        items: [
          {
            q: "How long does physical redemption take?",
            a: "For denominations held in stock, preparation takes one to three business days, plus delivery time depending on the destination.",
          },
          {
            q: "Is there a minting fee?",
            a: "Yes — minting and shipping fees apply, and they vary by denomination and destination. The breakdown is shown before you confirm the request.",
          },
          {
            q: "What if the shipment is damaged or lost?",
            a: "Every shipment is insured at full value. If it is damaged or lost in transit, replacement is processed at no cost to you.",
          },
          {
            q: "Can I sell gold bought elsewhere to DDSM?",
            a: "Buyback is prioritised for certified products we issued. For other products, a purity assay is required first and the price follows the assay result.",
          },
        ],
      },
    },

    info: {
      eyebrow: "Info",
      title: "Understand first, then buy",
      lead: "Guides, plain cost explanations, and market notes — written to be read, not to alarm you.",
      metaTitle: "Info — DDSM gold guides and education",
      metaDescription:
        "Gold savings guides, spread and fee explanations, and market notes. What to learn before you buy your first gram.",
      intro: {
        heading: "Good decisions need clear numbers",
        body: [
          "Gold is often sold with a story, when the outcome is actually decided by dull details: what the spread is, what minting costs, and how disciplined your saving is.",
          "This page is where we put the dull details. No yield promises, no pressure to hurry — just explanations you can compare against any other provider.",
        ],
      },
      features: {
        heading: "What to know before you buy",
        lead: "The four things most often overlooked.",
        items: [
          {
            title: "The spread is not a hidden fee",
            desc: "The gap between buy and sell price is a real cost. Buy and immediately sell, and that gap is your loss. Make sure you see the number before confirming.",
          },
          {
            title: "Gold is ballast, not a get-rich engine",
            desc: "Its role is preserving purchasing power over the long run. Putting your entire emergency fund into gold reduces your financial flexibility.",
          },
          {
            title: "Minting fees apply on withdrawal",
            desc: "Holding digitally costs nothing, but turning it into bars or coins does. Factor that in from the start.",
          },
          {
            title: "Check the provider's licensing",
            desc: "Confirm the provider is registered and its reserves are independently audited. Licence numbers and audit reports should be accessible without you having to ask.",
          },
        ],
      },
      steps: {
        heading: "News and updates",
        lead: "The latest from our team.",
        items: [
          { title: "10 Sep 2026 — Pricing", desc: "24-karat gold firmed 0.83% to Rp 2,810,000 per gram as the dollar index softened." },
          { title: "07 Sep 2026 — Service", desc: "Physical withdrawal of 25 g and 50 g denominations is available again across all delivery regions." },
          { title: "02 Sep 2026 — Education", desc: "New guide: sizing your monthly gold savings from salary without touching your emergency fund." },
          { title: "28 Aug 2026 — Compliance", desc: "The Q2 2026 reserve audit report has been published and is available for public download." },
        ],
      },
      faq: {
        heading: "The questions we get most",
        items: [
          {
            q: "When is the best time to buy gold?",
            a: "Nobody can answer that reliably, including us. What has historically held up better is buying regularly in fixed portions, so your entry price converges on the market average.",
          },
          {
            q: "What share of my wealth should be in gold?",
            a: "We do not give investment advice. As general context, many financial planners treat gold as a balancing portion rather than a core holding. Size it against your own goals and time horizon.",
          },
          {
            q: "Is the DDSM price the same as the Antam price?",
            a: "Not always. Our digital reference price tracks the spot market and mid rate, while branded bar pricing follows each producer's own policy. We show both separately so they can be compared.",
          },
          {
            q: "Where can I see the audit report?",
            a: "Reserve audit reports are published quarterly and can be accessed from the Company page without logging in.",
          },
        ],
      },
    },

    company: {
      eyebrow: "Company",
      title: "Who stands behind DDSM",
      lead: "PT Datar Dana Sukses Makmur — licensing, governance, and how we look after your gold.",
      metaTitle: "Company — About PT Datar Dana Sukses Makmur",
      metaDescription:
        "Profile, licensing, governance, and security standards of PT Datar Dana Sukses Makmur, the operator behind DDSM digital gold trading.",
      intro: {
        heading: "Your gold can be counted, not merely promised",
        body: [
          "Trust in the gold business is not built through slogans but through things that can be checked: a licence number you can verify, reserves audited by a third party, and an insured vault.",
          "All of it is laid out on this page. If we cannot evidence something, we do not claim it.",
        ],
      },
      features: {
        heading: "Licensing and compliance",
        lead: "Independently verifiable.",
        items: [
          { title: "Digital gold trading licence", desc: "Registered and supervised under the applicable physical digital gold trading rules." },
          { title: "Exchange & clearing membership", desc: "Connected to the futures exchange and clearing house for transaction settlement." },
          { title: "Information security certification", desc: "The information security management system follows ISO/IEC 27001:2022." },
          { title: "Periodic reserve audits", desc: "Gold reserves are examined by an independent public accounting firm every quarter." },
          { title: "Vault insurance", desc: "All holdings are insured all-risk at full value." },
          { title: "Third-party custody", desc: "Metal is held in a third-party vault in Jakarta, segregated from company assets." },
        ],
      },
      steps: {
        heading: "Governance",
        lead: "How decisions are made and supervised.",
        items: [
          { title: "Asset segregation", desc: "Customer assets are recorded and stored separately from the company's operating assets." },
          { title: "Daily reconciliation", desc: "Ledger balances are matched against vault records every business day." },
          { title: "Whistleblowing channel", desc: "Suspected misconduct can be reported anonymously and is handled by an independent unit." },
          { title: "Consumer protection", desc: "Complaints unresolved through our channels can be escalated to the consumer protection authority." },
        ],
      },
      faq: {
        heading: "Questions about the company",
        items: [
          {
            q: "What happens to my gold if DDSM stops operating?",
            a: "Customer gold is recorded and held separately from company assets, so it does not form part of the company's estate. In a wind-down scenario, balances are returned to their owners based on ownership records and reconciliation results.",
          },
          {
            q: "Who audits the gold reserves?",
            a: "Examinations are carried out by an independent public accounting firm each quarter, and a summary of the results is published for the public.",
          },
          {
            q: "How do I file a complaint?",
            a: "Use the form on the home page, our official email, or our phone service. Include your phone number and email so follow-up can be handled directly.",
          },
          {
            q: "Is my personal data safe?",
            a: "Our systems follow ISO/IEC 27001:2022 for information security management, and personal data is used only in line with the applicable privacy policy.",
          },
        ],
      },
    },
  },

  cta: {
    heading: "Start your first gram today",
    body: "Identity verification takes about three minutes. No account opening fee, no storage fee.",
    primary: "Start Investing",
    secondary: "Contact Us",
  },

  footer: {
    address: "Plaza Merdeka 5th Floor, Jl. Merdeka Raya, Kuningan City, Jakarta.",
    hours: "Monday–Friday, 09:00–17:00 WIB.",
    email: "hello@ddsm.co.id",
    phone: "Voice Call 14045",
    disclaimer:
      "PT Datar Dana Sukses Makmur is a company engaged in digital gold trading and related services. The information on this page is for demonstration and does not constitute an offer, recommendation, or investment advice.",
    rights: "© 2026 PT Datar Dana Sukses Makmur.",
    legal: ["Privacy", "Terms & Conditions", "Accessibility"],
  },
};
