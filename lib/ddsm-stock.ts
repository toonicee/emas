import http from "node:http";
import https from "node:https";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

export type StockItem = { grams: number; buyIdr: number; inStock: boolean };
export type StockSnapshot = { items: StockItem[]; syncedAt: Date };

const DEFAULT_URL = "https://product-staging.pactindo.com:8447/ddsm/api/trading/stock-availibility";
const TIMEOUT_MS = 8000;
const MAX_BYTES = 256 * 1024;

let warnedInsecure = false;

function getJson(url: URL, insecure: boolean): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const onResponse = (res: http.IncomingMessage) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks: Buffer[] = [];
      let size = 0;
      res.on("data", (chunk: Buffer) => {
        size += chunk.length;
        if (size > MAX_BYTES) {
          req.destroy(new Error("respons terlalu besar"));
          return;
        }
        chunks.push(chunk);
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
        } catch {
          reject(new Error("respons bukan JSON"));
        }
      });
      res.on("error", reject);
    };

    const options = { timeout: TIMEOUT_MS, headers: { accept: "application/json" } };
    const req =
      url.protocol === "http:"
        ? http.get(url, options, onResponse)
        : https.get(url, { ...options, rejectUnauthorized: !insecure }, onResponse);
    req.on("timeout", () => req.destroy(new Error(`tidak menjawab dalam ${TIMEOUT_MS / 1000} detik`)));
    req.on("error", reject);
  });
}

function parse(body: unknown): StockSnapshot {
  const root = body as { status?: unknown; data?: { items?: unknown; syncedAt?: unknown } } | null;
  const rawItems = root?.data?.items;
  if (root?.status !== "SUCCESS" || !Array.isArray(rawItems)) {
    throw new Error("format respons tidak dikenali");
  }

  const items = rawItems
    .flatMap((raw): StockItem[] => {
      const it = (raw ?? {}) as Record<string, unknown>;
      const grams = Number(it.denominationGrams);
      const buyIdr = Number(it.buyPriceIdr);
      if (!(grams > 0) || !(buyIdr > 0)) return [];
      return [{ grams, buyIdr, inStock: it.status === "TERSEDIA" && Number(it.available) > 0 }];
    })
    .sort((a, b) => a.grams - b.grams);
  if (!items.length) throw new Error("tidak ada denominasi yang valid");

  const syncedAt = new Date(String(root.data?.syncedAt));
  return { items, syncedAt: Number.isNaN(syncedAt.getTime()) ? new Date() : syncedAt };
}

export async function getStock(): Promise<StockSnapshot | null> {
  const insecure = process.env.DDSM_STOCK_API_INSECURE_TLS === "1";
  if (insecure && !warnedInsecure) {
    warnedInsecure = true;
    console.warn("[ddsm-stock] DDSM_STOCK_API_INSECURE_TLS=1 — verifikasi sertifikat TLS API DIMATIKAN. Jangan dipakai di produksi.");
  }

  try {
    const url = new URL(process.env.DDSM_STOCK_API_URL || DEFAULT_URL);
    return parse(await getJson(url, insecure));
  } catch (err) {
    const code = (err as { code?: string }).code;
    const hint =
      code === "CERT_HAS_EXPIRED"
        ? " — sertifikat TLS server API kedaluwarsa; perbarui sertifikatnya, atau khusus staging set DDSM_STOCK_API_INSECURE_TLS=1"
        : "";
    console.error(`[ddsm-stock] gagal memuat stok & harga: ${err instanceof Error ? err.message : err}${hint}`);

    if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
      throw err;
    }
    return null;
  }
}
