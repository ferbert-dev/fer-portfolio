#!/usr/bin/env node
/**
 * Exports Vercel Web Analytics to CSV files for Excel.
 *
 *   VERCEL_TOKEN=... npm run analytics:export -- --since 2026-10-01 --until 2026-10-31
 *
 * Options (all optional except the token):
 *   --since YYYY-MM-DD   first day (default: 30 days ago)
 *   --until YYYY-MM-DD   last day (default: today)
 *   --project NAME|ID    Vercel project (default: fer-portfolio or VERCEL_PROJECT)
 *   --team SLUG          Vercel team slug (default: igors-projects-2863bf7b or VERCEL_TEAM)
 *   --sep ";" | ","      column separator (default ";" so German Excel opens the file directly)
 *   --out DIR            output folder (default: analytics-export/<since>_<until>)
 *   --dry-run            print the requests, call nothing
 *
 * Writes one CSV per report. Custom event reports stay empty until custom events are
 * switched on (Vercel Pro and NEXT_PUBLIC_ANALYTICS_EVENTS=1, see docs/analytics.md).
 * The token is read from the environment only and never written to disk.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
    return acc;
  }, []),
);
const day = (d) => d.toISOString().slice(0, 10);
const since = args.since ?? day(new Date(Date.now() - 30 * 864e5));
const until = args.until ?? day(new Date());
const project = args.project ?? process.env.VERCEL_PROJECT ?? 'fer-portfolio';
const team = args.team ?? process.env.VERCEL_TEAM ?? 'igors-projects-2863bf7b';
const sep = args.sep === ',' ? ',' : ';';
const out = args.out ?? path.join('analytics-export', `${since}_${until}`);
const dry = Boolean(args['dry-run']);
const token = process.env.VERCEL_TOKEN;

if (!token && !dry) {
  console.error('Set VERCEL_TOKEN (create one at https://vercel.com/account/settings/tokens).');
  process.exit(1);
}

/** Page view reports: file name -> grouping dimensions (at most two, one of them may be a time unit). */
const visitReports = {
  'pageviews-by-day': ['day'],
  'pageviews-by-page': ['requestPath'],
  'pageviews-by-day-and-page': ['day', 'requestPath'],
  'pageviews-by-referrer': ['referrerHostname'],
  'pageviews-by-country': ['country'],
  'pageviews-by-device': ['deviceType'],
  'pageviews-by-utm-source': ['utmSource'],
};

/** Custom event reports. Every event carries location and label (src/lib/analytics.ts). */
const eventReports = {
  'events-by-day': ['day', 'eventName'],
  'events-by-name-and-location': ['eventName', 'eventData/location'],
  'events-by-name-and-label': ['eventName', 'eventData/label'],
  'events-by-label': ['eventData/label'],
};

async function query(dataset, by, filter) {
  const params = new URLSearchParams({ projectId: project, slug: team, since, until, limit: '500' });
  for (const b of by) params.append('by', b);
  if (filter) params.set('filter', filter);
  const url = `https://api.vercel.com/v1/query/web-analytics/${dataset}/aggregate?${params}`;
  if (dry) {
    console.log('GET', url);
    return [];
  }
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 403) return null; // report not included in the current Vercel plan
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${dataset} by ${by.join(', ')}: ${(await res.text()).slice(0, 300)}`);
  const body = await res.json();
  return Array.isArray(body.data) ? body.data : [];
}

const cell = (v) => {
  const s = v === null || v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
  return /["\n\r;,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function writeCsv(name, rows) {
  const cols = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  // Times like 2026-10-01T00:00:00.000Z become 2026-10-01 so Excel reads them as dates.
  const lines = [cols.map(cell).join(sep), ...rows.map((r) => cols.map((c) => cell(c === 'timestamp' && typeof r[c] === 'string' ? r[c].slice(0, 10) : r[c])).join(sep))];
  const file = path.join(out, `${name}.csv`);
  // BOM so Excel detects UTF-8 (umlauts, €).
  fs.writeFileSync(file, '﻿' + lines.join('\r\n') + '\r\n');
  return file;
}

if (!dry) fs.mkdirSync(out, { recursive: true });
console.log(`Vercel Web Analytics, project ${project}, ${since} to ${until}${dry ? ' (dry run)' : ''}`);
let failed = 0;
for (const [dataset, reports] of [['visits', visitReports], ['events', eventReports]]) {
  for (const [name, by] of Object.entries(reports)) {
    try {
      const rows = await query(dataset, by);
      if (rows === null) console.log(`  ${name}: skipped, not available on the current Vercel plan`);
      else if (!dry) console.log(`  ${writeCsv(name, rows)}  (${rows.length} rows)`);
    } catch (e) {
      failed++;
      console.error(`  ${name}: ${e.message}`);
    }
  }
}
process.exit(failed ? 1 : 0);
