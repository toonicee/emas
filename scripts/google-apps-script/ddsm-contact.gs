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
