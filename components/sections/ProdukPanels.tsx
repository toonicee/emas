"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { produk } from "@/content/sections";

/**
 * Galeri panel memuai — pola "WHAT WE DO" di amman.co.id: satu panel terbuka
 * lebar, sisanya menyempit jadi bilah vertikal, dan bertukar saat dipilih.
 *
 * Catatan CLS: yang dianimasikan di sini adalah `flex-grow`, yang memang
 * memicu layout. Itu dapat dispensasi — pergeseran layout dalam 500 ms setelah
 * interaksi pengguna dikecualikan dari perhitungan Cumulative Layout Shift.
 * Di luar interaksi, panel tidak pernah bergerak sendiri.
 *
 * Deskripsi tiap panel SELALU ada di DOM, termasuk saat menyempit — sama
 * seperti accordion. Yang berubah hanya keterlihatannya, bukan keberadaannya,
 * jadi crawler tetap membaca seluruh teks produk.
 */
export function ProdukPanels() {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <div className="mt-10 flex flex-col gap-3 lg:h-130 lg:flex-row">
      {produk.map((p, i) => {
        const isActive = i === active;
        const panelId = `${baseId}-${i}`;

        return (
          <button
            key={p.no}
            type="button"
            aria-expanded={isActive}
            aria-controls={panelId}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            style={{ flexGrow: isActive ? 3 : 1 }}
            className="group relative isolate min-h-65 shrink basis-0 cursor-pointer overflow-hidden rounded-lg bg-ink text-left transition-[flex-grow] duration-500 ease-out lg:min-h-0"
          >
            {/* Foto dekoratif — namanya sudah disebut judul panel, jadi alt kosong. */}
            <Image
              src={p.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={72}
              className={`object-cover transition-transform duration-700 ease-out ${
                isActive ? "scale-100" : "scale-105"
              }`}
            />

            {/* Peredam gelap: menjaga kontras teks putih, dan menegaskan panel
                mana yang sedang terbuka. */}
            <span
              aria-hidden
              className={`absolute inset-0 transition-colors duration-500 ${
                isActive ? "bg-ink/55" : "bg-ink/72"
              }`}
            />

            {/* `relative` penting: elemen tanpa posisi akan tercetak DI BAWAH
                lapisan peredam yang absolute, jadi teksnya ikut tenggelam. */}
            <span className="relative flex h-full flex-col justify-between p-6">
              <span className="label text-accent">{p.no}</span>

              <span id={panelId} className="block">
                <span className="display block text-[24px] text-paper lg:text-[30px]">
                  {p.nama}
                </span>

                {/* Di mobile panel bertumpuk dan semuanya tampil penuh; efek
                    menyempit hanya masuk akal di layar lebar. */}
                <span
                  className={`mt-3 block max-w-[42ch] transition-all duration-500 ${
                    isActive ? "translate-y-0 opacity-100" : "lg:translate-y-1 lg:opacity-0"
                  }`}
                >
                  <span className="block text-[14px] leading-[1.55] text-dim-2">{p.desc}</span>
                  <span className="label mt-3 block text-dim">{p.varian}</span>
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
