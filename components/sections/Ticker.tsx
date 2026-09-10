import type { TickerItem } from "@/content/market";

/**
 * Marquee harga. Animasinya CSS murni (`@keyframes tick` di globals.css) —
 * tidak ada JavaScript sama sekali, jadi tidak menambah beban hydration
 * di elemen paling atas halaman.
 *
 * Track memakai `w-max` supaya lebarnya persis dua kali lebar satu deret.
 * Dengan begitu `translateX(-50%)` menggeser tepat satu deret penuh dan
 * loop-nya menyambung mulus di lebar layar berapa pun. Item-nya `shrink-0`:
 * kalau dibiarkan menyusut, teksnya yang `whitespace-nowrap` akan saling
 * tumpuk di layar sempit.
 */
export function Ticker({ items }: { items: TickerItem[] }) {
  return (
    <div className="overflow-hidden bg-ink text-paper" aria-label="Harga pasar terkini">
      <div className="ticker-track flex w-max">
        <TickerRun items={items} />
        {/* Salinan kedua semata-mata untuk menyambung loop — disembunyikan
            dari pembaca layar supaya harganya tidak dibacakan dua kali. */}
        <TickerRun items={items} aria-hidden />
      </div>
    </div>
  );
}

function TickerRun({ items, ...rest }: { items: TickerItem[]; "aria-hidden"?: boolean }) {
  return (
    <div className="flex shrink-0" {...rest}>
      {items.map((t) => (
        <div
          key={t.k}
          className="flex shrink-0 items-center gap-3 whitespace-nowrap px-6 py-2.5 text-[11px]"
        >
          <span className="tracking-[0.18em] text-dim">{t.k}</span>
          <span className="text-[12px] text-paper">{t.v}</span>
          {/* Kuning hanya boleh di atas hitam — di atas putih rasionya 1,21:1. */}
          <span className={t.dir === "up" ? "text-accent" : "text-down-dk"}>{t.d}</span>
        </div>
      ))}
    </div>
  );
}
