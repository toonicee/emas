import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image di-render sekali saat build, bukan tiap request.
 * Warnanya mengikuti token yang sama dengan halaman supaya preview link
 * terasa satu bahasa dengan situsnya.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#3F3936",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 22, height: 22, background: "#E9F40B" }} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "0.34em" }}>{site.name}</div>
        </div>

        <div
          style={{
            fontSize: 86,
            fontWeight: 400,
            letterSpacing: "-0.005em",
            lineHeight: 1,
            maxWidth: 940,
            textTransform: "uppercase",
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #E2DFDB",
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: "0.06em",
            color: "#6B655F",
          }}
        >
          <div>Mulai Rp 10.000 · Cetak fisik kapan pun</div>
          <div>{site.license.split("/")[0]}</div>
        </div>
      </div>
    ),
    size,
  );
}
