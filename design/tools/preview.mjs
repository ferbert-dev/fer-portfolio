// Renders one design artboard (*.dc.html) with the canvas runtime and saves viewport screenshots.
//
// usage: DC_RUNTIME=<path to dc-runtime.js> node design/tools/preview.mjs <artboard.dc.html> <outPrefix> [width=1440]
//
// dc-runtime.js is not in this repo. Read it from the design canvas artifact
// (published file "artifact-type/dc-runtime.js") and point DC_RUNTIME at the saved copy.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const [file, out, width = '1440'] = process.argv.slice(2);
const runtime = process.env.DC_RUNTIME;
if (!file || !out || !runtime) {
  console.error('usage: DC_RUNTIME=<dc-runtime.js> node design/tools/preview.mjs <artboard.dc.html> <outPrefix> [width]');
  process.exit(1);
}
const dir = path.dirname(path.resolve(file));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
await page.route('http://dc.local/**', (route) => {
  const name = decodeURIComponent(new URL(route.request().url()).pathname.slice(1));
  if (name === 'support.js') return route.fulfill({ contentType: 'text/javascript', body: fs.readFileSync(runtime) });
  const local = path.join(dir, name);
  if (!fs.existsSync(local)) return route.fulfill({ status: 404, body: '' });
  return route.fulfill({ contentType: 'text/html; charset=utf-8', body: fs.readFileSync(local) });
});
await page.goto('http://dc.local/' + path.basename(file), { waitUntil: 'load' });
await page.waitForTimeout(3500);
const height = await page.evaluate(() => document.documentElement.scrollHeight);
let shot = 0;
for (let y = 0; y < height; y += 880) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: `${out}-${String(shot).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 62 });
  shot += 1;
}
console.log(`height ${height}px, ${shot} screenshots`);
await browser.close();
