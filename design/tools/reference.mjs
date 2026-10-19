// Saves full-page reference screenshots of every page, at desktop, tablet and
// phone width, in the dark and light theme, into design/handoff/reference/.
//
// usage: DC_RUNTIME=<path to dc-runtime.js> node design/tools/reference.mjs
//
// dc-runtime.js is not in this repo. Read it from the design canvas artifact
// (published file "artifact-type/dc-runtime.js") and point DC_RUNTIME at the saved copy.
// Pages render with reduced motion, so every section is visible and the demos
// show their finished state.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const runtime = process.env.DC_RUNTIME;
if (!runtime) {
  console.error('usage: DC_RUNTIME=<dc-runtime.js> node design/tools/reference.mjs');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canvas = path.join(root, 'canvas');
const out = path.join(root, 'handoff', 'reference');
fs.mkdirSync(out, { recursive: true });

const pages = { home: 'D-Home', contact: 'D-Contact', blog: 'D-Blog', legal: 'D-Legal' };
const widths = { desktop: 1440, tablet: 834, phone: 390 };
const themes = ['dark', 'light'];

const browser = await chromium.launch();
for (const [pageName, file] of Object.entries(pages)) {
  for (const [device, width] of Object.entries(widths)) {
    for (const theme of themes) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.route('http://dc.local/**', (route) => {
        const name = decodeURIComponent(new URL(route.request().url()).pathname.slice(1));
        if (name === 'support.js') return route.fulfill({ contentType: 'text/javascript', body: fs.readFileSync(runtime) });
        const local = path.join(canvas, name);
        if (!fs.existsSync(local)) return route.fulfill({ status: 404, body: '' });
        return route.fulfill({ contentType: 'text/html; charset=utf-8', body: fs.readFileSync(local) });
      });
      await page.goto(`http://dc.local/${file}.dc.html`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500);
      const name = `${pageName}-${device}-${theme}.jpg`;
      await page.screenshot({ path: path.join(out, name), fullPage: true, type: 'jpeg', quality: 72 });
      console.log(name);
      await ctx.close();
    }
  }
}
await browser.close();
