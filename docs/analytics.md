# Analytics

The site uses [Vercel Web Analytics](https://vercel.com/docs/analytics). It sets no cookies and identifies no one: visitors are counted with a hash of the request that Vercel discards after 24 hours. See the privacy notice in `src/content/en.ts` (`legal.privacy`).

## What is collected

| Plan | What is recorded |
|---|---|
| Hobby (current) | Page views only: page, referring site, country, browser, device type. 50,000 events a month, kept for one month. |
| Pro | Also the custom events below, with 2 properties each (`location`, `label`). Kept for 12 months. |
| Pro + Web Analytics Plus | Same events, up to 8 properties, kept for 24 months, UTM reports. |

Source: Vercel's [pricing page for Web Analytics](https://vercel.com/docs/analytics/limits-and-pricing), checked 2026-10-26.

## Switching it on

1. In the Vercel dashboard open the project **fer-portfolio** → **Analytics** → **Enable**. Page views start after the next deploy.
2. Custom events (Pro only): upgrade the team to Pro, then add the environment variable `NEXT_PUBLIC_ANALYTICS_EVENTS=1` for Production and redeploy. Without it the code sends no custom events.
3. When custom events go live, extend the privacy notice: it currently only mentions page views.

## Custom events

All events are defined in `src/lib/analytics.ts`. Elements are tagged with `data-track` attributes (helper `tag()`), sections with `data-section`; one listener in `src/components/layout/Tracker.tsx` sends them. Every event has the same two properties, so exports line up in one table. No event ever contains a name, email address or message text.

| Event | `location` | `label` | When |
|---|---|---|---|
| `section_view` | page path, e.g. `/` | section id: `hero`, `tools`, `workflow`, `analysis`, `demos`, `knowledge`, `services`, `trust`, `how`, `start`, `company`, `faq`, `closing` | A section reaches the upper half of the window, once per page view |
| `cta_click` | `header`, `menu`, `hero`, `analysis`, `pricing`, `closing`, `contact` | `book-call`, `watch-agent`, `booking` | A main call to action is clicked |
| `nav_click` | `header`, `menu`, `footer`, `services`, `trust` | link target, e.g. `/#demos`, `privacy`, `github` | A navigation link is clicked |
| `email_click` | `closing`, `faq`, `footer` | – | The email link is clicked |
| `demo_question` | `support`, `documents` | the question text | A question is asked in a demo |
| `faq_open` | `faq` | the question text | A FAQ item is opened |
| `contact_submit` | `contact` | chosen topics, comma separated | The contact form is sent (opens the email app) |
| `contact_channel` | `contact` | channel key, e.g. `linkedin` | A contact channel is clicked |
| `theme_change` | `header` | `auto`, `light`, `dark` | The theme is switched |
| `blog_filter` | `blog` | the topic | A blog filter is chosen |

To add an event: add its name to `EventName` in `src/lib/analytics.ts`, tag the element with `{...tag('name', 'location', 'label')}`, and add a row to this table.

## Export to Excel

```bash
VERCEL_TOKEN=... npm run analytics:export -- --since 2026-10-01 --until 2026-10-31
```

- Create the token at https://vercel.com/account/settings/tokens. Keep it out of the repo; the script reads it from the environment only.
- Files land in `analytics-export/<since>_<until>/` (ignored by git), one CSV per report: page views by day, page, day and page, referrer, country, device, UTM source; custom events by day, name and location, name and label, label.
- The separator is `;` and files start with a UTF-8 marker, so German Excel opens them with a double click. Use `--sep ,` for English Excel or Google Sheets.
- Reports the current plan does not include (for example UTM on Hobby) are skipped with a note. Event reports stay empty until custom events are on.
- `--dry-run` prints the API requests without calling anything.
- Data older than the plan's reporting window (one month on Hobby) is no longer available, so export monthly if you want a longer history.
