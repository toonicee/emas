/**
 * Penerima formulir kontak DDSM → Google Sheet.
 *
 * Tidak ikut ter-build. Berkas ini ditempel ke Apps Script milik Sheet tujuan.
 *
 * Cara pasang (sekali saja):
 *  1. Buat Google Sheet baru, misalnya "DDSM — Pesan Masuk".
 *  2. Di Sheet itu: Extensions → Apps Script. Hapus isi Code.gs, tempel
 *     seluruh berkas ini, lalu Simpan.
 *  3. Project Settings (ikon roda) → Script properties → Add script property:
 *       DDSM_SHEETS_SECRET = <string acak panjang, SAMA dengan env di Next.js>
 *  4. Deploy → New deployment → pilih tipe "Web app":
 *       Execute as:      Me
 *       Who has access:  Anyone
 *     Setujui izin yang diminta, lalu salin "Web app URL" (berakhiran /exec).
 *  5. Di server Next.js, isi env (lihat .env.example):
 *       DDSM_SHEETS_WEBHOOK_URL = URL /exec tadi
 *       DDSM_SHEETS_SECRET      = string yang sama dengan langkah 3
 *
 * "Who has access: Anyone" diperlukan karena yang memanggil adalah server
 * Next.js, bukan akun Google. Yang menjaganya adalah DDSM_SHEETS_SECRET: tanpa
 * secret yang cocok, tidak ada baris yang ditulis. Secret itu hanya ada di
 * server Next.js dan di Script properties — tidak pernah terkirim ke browser.
 *
 * Kalau berkas ini diubah: Deploy → Manage deployments → Edit (ikon pensil) →
 * Version: "New version" → Deploy. URL-nya tetap sama.
 */

const SHEET_NAME = "Pesan Masuk";
const HEADERS = ["Waktu", "Nama", "Email", "Telepon", "Kategori", "Pesan", "Bahasa", "Halaman"];
const MAX_LEN = 5000;

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad_request" });
  }

  const secret = PropertiesService.getScriptProperties().getProperty("DDSM_SHEETS_SECRET");
  if (!secret || body.secret !== secret) return json_({ ok: false, error: "unauthorized" });

  // Kunci skrip: dua kiriman bersamaan tidak saling menimpa baris yang sama.
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    sheet_().appendRow([
      new Date(),
      text_(body.name),
      text_(body.email),
      text_(body.phone),
      text_(body.category),
      text_(body.message),
      text_(body.locale),
      text_(body.page),
    ]);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "server" });
  } finally {
    lock.releaseLock();
  }
}

/* Setiap nilai dari pengunjung ditulis sebagai TEKS: tanda kutip tunggal di
   depan membuat Sheets tidak menafsirkannya. Tanpa ini, isian seperti
   "=IMPORTXML(…)" dieksekusi sebagai rumus (formula injection), dan nomor
   "0812…" kehilangan nol di depannya karena dianggap angka. Kutipnya sendiri
   tidak tampil di sel. */
function text_(v) {
  return "'" + String(v == null ? "" : v).slice(0, MAX_LEN);
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
