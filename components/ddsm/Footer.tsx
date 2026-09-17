import type { Dict } from "@/content/ddsm";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";

export function Footer({ dict }: { dict: Dict }) {
  const f = dict.footer;

  return (
    <footer className="bg-[#1c1c1c] text-white">
      <div className="mx-auto w-full max-w-[880px] px-5 pb-6 pt-10 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-x-[72px]">
          <address className="not-italic">
            <Logo height={64} className="h-16 w-auto" />
            <p className="mt-5 text-[13px] font-medium leading-[1.65]">{f.address}</p>

            <ul className="mt-6 space-y-3 text-[13px] font-medium">
              <li>
                <a
                  href={`mailto:${f.email}`}
                  className="flex w-fit items-center gap-3 transition-colors hover:text-[#d4af37]"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="shrink-0 text-[#a3a3a3]"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
                  </svg>
                  {f.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="shrink-0 text-[#a3a3a3]"
                >
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
                </svg>
                {f.phone}
              </li>
            </ul>
          </address>

          <div>
            <p className="text-[13px] leading-[1.45] text-[#8c8c8c]">{f.disclaimer}</p>
            <p className="mt-4 text-[13px] leading-[1.45] text-[#8c8c8c]">{f.licence}</p>
            <LangSwitch dict={dict} className="mt-12" />
          </div>
        </div>

        <p className="mt-11 text-center text-[13px] font-medium text-[#d4af37]">{f.rights}</p>
      </div>
    </footer>
  );
}
