import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "DDS M — Physical gold, made simple",
  description:
    "A trusted digital-gold experience with transparent pricing, physical delivery, and secure storage.",
};

const prices = [
  ["0.5 gr", "Rp 1.425.000", "Rp 1.380.000"],
  ["1 gr", "Rp 2.810.000", "Rp 2.623.000"],
  ["2 gr", "Rp 5.610.000", "Rp 5.246.000"],
  ["5 gr", "Rp 13.900.000", "Rp 13.115.000"],
  ["10 gr", "Rp 27.650.000", "Rp 26.110.000"],
  ["25 gr", "Rp 68.850.000", "Rp 65.340.000"],
  ["50 gr", "Rp 137.200.000", "Rp 130.080.000"],
  ["100 gr", "Rp 273.500.000", "Rp 259.000.000"],
];

const navigation = ["Wealth", "Digital Gold", "Physical Gold", "Info", "Company"];

function Arrow() {
  return <span aria-hidden className="text-base leading-none">→</span>;
}

export default function DdsmPage() {
  return (
    <main className="min-h-screen bg-[#f1ede9] font-sans text-[#172317]">
      <header className="bg-[#1d351e] text-[#f7f1e8]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="font-bold tracking-[0.08em] text-[#f5c91d]">
            DDS<span className="text-[#f7f1e8]">M</span>
          </a>
          <nav aria-label="Navigasi utama" className="hidden items-center gap-7 text-[11px] font-medium md:flex">
            {navigation.map((item) => (
              <a key={item} href="#ringkasan" className="transition-colors hover:text-[#f5c91d]">
                {item}
              </a>
            ))}
          </nav>
          <a href="#hubungi" className="rounded-md bg-[#f5c91d] px-3 py-2 text-[10px] font-bold text-[#1d351e] md:hidden">
            MENU
          </a>
        </div>
      </header>

      <section id="top" className="overflow-hidden bg-[#f1ede9] px-5 pb-14 pt-8 sm:px-8 lg:px-12 lg:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="relative isolate flex min-h-[380px] items-center justify-center overflow-hidden rounded-b-[46%] bg-[#ef9300] px-5 text-center sm:min-h-[420px] sm:rounded-b-[44%]">
            <div aria-hidden className="absolute inset-0 opacity-60 [background-image:linear-gradient(90deg,rgba(91,43,0,.24)_1px,transparent_1px),linear-gradient(rgba(255,221,119,.45)_1px,transparent_1px)] [background-size:42px_48px]" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,234,154,.75),transparent_36%),linear-gradient(145deg,transparent_35%,rgba(131,57,0,.3))]" />
            <div className="relative max-w-xl pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#593200]">Gold that is real, not just visible</p>
              <h1 className="mt-4 font-serif text-[42px] font-bold leading-[0.94] tracking-[-0.045em] text-[#1d1709] sm:text-[62px]">
                Built for pure gold,
                <br />
                secured for you
              </h1>
              <p className="mx-auto mt-4 max-w-sm text-[12px] leading-relaxed text-[#4a2900]">
                Your trusted bullion and digital gold storage, secured end to end.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="#ringkasan" className="rounded-md bg-[#f7f1e8] px-4 py-2.5 text-[11px] font-semibold text-[#1d351e] shadow-sm transition-transform hover:-translate-y-0.5">
                  Explore Vault Security
                </a>
                <a href="#hubungi" className="rounded-md bg-[#1d351e] px-4 py-2.5 text-[11px] font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5">
                  Invest Now
                </a>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-8 grid max-w-2xl gap-4 rounded-md bg-white px-5 py-4 shadow-[0_14px_28px_rgba(42,32,17,0.12)] sm:grid-cols-[1.4fr_1fr_1fr] sm:items-center">
            <div className="border-b border-[#ded8cf] pb-3 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
              <p className="text-[9px] text-[#6a6a60]">Wednesday, September 10, 2026</p>
              <p className="font-serif text-[19px] font-bold leading-none text-[#1d231b]">Gold Price Today</p>
            </div>
            <div>
              <p className="text-[9px] font-medium text-[#4d5049]">Buy</p>
              <p className="text-[15px] font-bold text-[#182417]">Rp 2.810.000<span className="text-[10px] font-medium"> / gr</span></p>
              <p className="text-[9px] text-[#37934b]">↑ 0.83%</p>
            </div>
            <div>
              <p className="text-[9px] font-medium text-[#4d5049]">Sell</p>
              <p className="text-[15px] font-bold text-[#182417]">Rp 2.623.000<span className="text-[10px] font-medium"> / gr</span></p>
              <p className="text-[9px] text-[#c94844]">↓ 0.30%</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ringkasan" className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#62645e]">100% allocated physical gold & instant digital access</p>
            <h2 className="mt-2 font-serif text-[26px] font-bold leading-none tracking-[-0.035em] text-[#182417] sm:text-[34px]">
              Physical gold and digital gold seamlessly
            </h2>
          </div>

          <div className="mt-11 grid gap-8 md:grid-cols-2 md:gap-14">
            <h3 className="max-w-sm font-serif text-[27px] font-bold leading-[1.02] tracking-[-0.035em] text-[#1d231b] sm:text-[33px]">
              Build a stronger
              <br />
              financial foundation.
              <br />
              Start your gold savings
              <br />
              journey today!
            </h3>
            <p className="max-w-md text-[13px] leading-[1.9] text-[#40473f]">
              PT DDSM is transforming the way Indonesians access and manage gold. As a digital retail commerce platform, we combine the reliability of high-quality gold with the flexibility of modern digital technology. Through one integrated platform, customers can buy, save, sell and redeem gold conveniently, securely and transparently.
            </p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-12">
            <article className="relative min-h-[204px] overflow-hidden rounded-md bg-[#1d3a22] p-6 text-white md:col-span-6">
              <Image src="/images/koin-emas.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-35 mix-blend-screen" />
              <div className="relative flex h-full max-w-[210px] flex-col justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.06em]">Certified Physical Gold, Guaranteed</p>
                  <p className="mt-2 text-[9px] leading-relaxed text-[#dde6da]">Authenticated purity and physical ownership you can trust.</p>
                </div>
                <span className="inline-flex w-fit rounded bg-[#f7f1e8] px-2 py-1 text-[9px] font-bold text-[#1d3a22]">99.99% PURITY</span>
              </div>
            </article>

            <article className="relative min-h-[204px] overflow-hidden rounded-md bg-[#f7f4ef] p-6 md:col-span-6">
              <Image src="/images/app-mockup.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-right opacity-90" />
              <div className="relative max-w-[180px] rounded bg-[#f7f4ef]/90 p-2">
                <p className="text-[10px] font-semibold">Transparent Live Rates</p>
                <p className="mt-2 text-[9px] leading-relaxed text-[#4a514a]">Real-time gold pricing with complete transaction transparency.</p>
              </div>
            </article>

            <article className="rounded-md bg-[#f5c91d] p-5 text-[#213620] md:col-span-3">
              <p className="text-[13px] font-bold leading-tight">Fully Compliant<br />& Licensed</p>
              <p className="mt-3 text-[9px] leading-relaxed">Strict regulatory standards, maintaining legal protection for your investments.</p>
            </article>
            <article className="rounded-md bg-[#d99939] p-5 text-white md:col-span-3">
              <p className="text-[13px] font-bold leading-tight">Legacy Asset<br />Protection</p>
              <p className="mt-3 text-[9px] leading-relaxed">Ensure the safety and direct ownership of your gold.</p>
            </article>
            <article className="relative min-h-[170px] overflow-hidden rounded-md bg-[#1d3a22] p-5 text-white md:col-span-6">
              <Image src="/images/logam-mulia.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-55" />
              <div className="relative max-w-[160px]">
                <p className="text-[13px] font-bold leading-tight">Your gold journey<br />starts here</p>
                <p className="mt-3 text-[9px] leading-relaxed text-[#dde6da]">A simpler way to buy, sell, and invest in gold.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f5f1] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#647065]">Live pricing</p>
            <h2 className="mt-3 font-serif text-[38px] font-bold leading-[0.9] tracking-[-0.045em] text-[#1d231b] sm:text-[52px]">
              Market<br />Summary
            </h2>
            <p className="mt-5 max-w-xs text-[12px] leading-relaxed text-[#566056]">Prices update throughout the trading day. Lock in your preferred denomination when you are ready.</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#d5ded3] bg-white shadow-[0_12px_25px_rgba(44,60,43,0.07)]">
            <table className="w-full border-collapse text-left text-[10px]">
              <caption className="sr-only">Harga emas fisik hari ini</caption>
              <thead className="bg-[#46754d] text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Size</th>
                  <th scope="col" className="px-4 py-3 font-medium">Buy Price</th>
                  <th scope="col" className="px-4 py-3 font-medium">Sell Price</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {prices.map(([weight, buy, sell]) => (
                  <tr key={weight} className="border-b border-[#e4e9e3] last:border-0">
                    <td className="px-4 py-3 font-medium text-[#243526]">{weight}</td>
                    <td className="px-4 py-3 text-[#485248]">{buy}</td>
                    <td className="px-4 py-3 text-[#485248]">{sell}</td>
                    <td className="px-4 py-3 text-right"><span className="rounded bg-[#e6f4e6] px-2 py-1 text-[8px] font-bold text-[#3f8a4c]">Available ✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="hubungi" className="bg-[#1d3a22] px-5 py-16 text-[#f8f5ef] sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f5c91d]">Get in touch</p>
            <h2 className="mt-3 font-serif text-[38px] font-bold leading-[0.9] tracking-[-0.045em] sm:text-[50px]">Send Us a<br />Message</h2>
            <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-[#e1e9dd]">Have a question or running into an issue? Drop us a line using the form! If you&apos;re sharing a complaint, make sure to add your phone number and email so we can follow up directly.</p>
            <div className="mt-8 flex gap-3">
              <a href="#top" className="inline-flex items-center gap-2 rounded border border-[#d9e4d5]/50 px-3 py-2 text-[10px] font-semibold hover:border-[#f5c91d] hover:text-[#f5c91d]">WhatsApp <Arrow /></a>
              <a href="mailto:hello@ddsm.co.id" className="inline-flex items-center gap-2 rounded border border-[#d9e4d5]/50 px-3 py-2 text-[10px] font-semibold hover:border-[#f5c91d] hover:text-[#f5c91d]">Email <Arrow /></a>
            </div>
          </div>

          <form className="rounded-lg bg-white p-5 text-[#1d2e1e] shadow-[0_18px_38px_rgba(0,0,0,0.18)] sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-[10px] font-semibold">Full name*
                <input required name="name" autoComplete="name" placeholder="Enter your full name" className="mt-1.5 block w-full rounded border border-[#d7ddd6] px-3 py-2 text-[11px] font-normal outline-none placeholder:text-[#a8afa7] focus:border-[#46754d]" />
              </label>
              <label className="text-[10px] font-semibold">Email*
                <input required name="email" type="email" autoComplete="email" placeholder="name@email.com" className="mt-1.5 block w-full rounded border border-[#d7ddd6] px-3 py-2 text-[11px] font-normal outline-none placeholder:text-[#a8afa7] focus:border-[#46754d]" />
              </label>
            </div>
            <label className="mt-4 block text-[10px] font-semibold">Phone number*
              <input required name="phone" type="tel" autoComplete="tel" placeholder="Add your phone number" className="mt-1.5 block w-full rounded border border-[#d7ddd6] px-3 py-2 text-[11px] font-normal outline-none placeholder:text-[#a8afa7] focus:border-[#46754d]" />
            </label>
            <label className="mt-4 block text-[10px] font-semibold">Category*
              <select required name="category" defaultValue="" className="mt-1.5 block w-full rounded border border-[#d7ddd6] bg-white px-3 py-2 text-[11px] font-normal outline-none focus:border-[#46754d]">
                <option value="" disabled>Choose a category</option>
                <option>Gold purchase</option>
                <option>Gold storage</option>
                <option>Account support</option>
              </select>
            </label>
            <label className="mt-4 block text-[10px] font-semibold">Message
              <textarea name="message" rows={4} placeholder="Enter your message" className="mt-1.5 block w-full resize-y rounded border border-[#d7ddd6] px-3 py-2 text-[11px] font-normal outline-none placeholder:text-[#a8afa7] focus:border-[#46754d]" />
            </label>
            <label className="mt-4 flex items-center gap-2 text-[9px] text-[#59645a]">
              <input type="checkbox" required className="accent-[#46754d]" /> I agree with the privacy policy.
            </label>
            <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-[#1d3a22] px-4 py-3 text-[11px] font-semibold text-white transition-colors hover:bg-[#2c5633]">
              Send message <Arrow />
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#161817] px-5 py-10 text-[#c7ccc4] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.1fr_1.4fr]">
          <div>
            <div className="font-bold tracking-[0.08em] text-[#f5c91d]">DDS<span className="text-[#f7f1e8]">M</span></div>
            <p className="mt-4 max-w-xs text-[10px] leading-relaxed">Plaza Merdeka Lt. 5, Jl. Merdeka Raya Kuningan City, Jakarta. Senin–Jumat, 09.00–17.00 WIB.</p>
            <div className="mt-4 flex flex-wrap gap-3 text-[10px]"><a href="mailto:hello@ddsm.co.id" className="hover:text-[#f5c91d]">hello@ddsm.co.id</a><span>•</span><a href="#top" className="hover:text-[#f5c91d]">Voice Call 14045</a></div>
          </div>
          <p className="max-w-xl text-[10px] leading-relaxed text-[#8d968c]">PT Datar Dana Sukses Makmur is a company engaged in digital gold trading and related services. The information in this concept is for demonstration and does not constitute an offer, recommendation, or investment advice.</p>
        </div>
        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-between gap-4 border-t border-[#333936] pt-5 text-[9px] text-[#798178]">
          <span>© 2026 PT Datar Dana Sukses Makmur.</span>
          <span>Privacy · Terms · Accessibility</span>
        </div>
      </footer>
    </main>
  );
}
