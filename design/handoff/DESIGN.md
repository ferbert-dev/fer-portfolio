# Ferbert design guide (direction D)

Written from the approved pages in `design/canvas/` (2026-10-19). Where this guide and a canvas file disagree, the canvas file wins; fix this guide.

Approved by the owner: direction D, in a light and a dark theme, English first. German follows later with the same layout.

## 1. Character

A dark studio site in the spirit of a technical product page: near-black ground, white text, one lime accent, Geist for text and Geist Mono for small uppercase labels. Large tight headlines, framed panels with a faint dot grid, and working demos as the proof. The light theme is the same design on a warm off-white ground with soft shadows.

What the site must never do:
- Name clients or show real client projects. The demos use fictional companies (Nordwind Shop, Müller GmbH) and say so.
- Invent prices, dates, handles or company details. Anything unknown stays in `[SQUARE BRACKETS]` and is rendered as-is.
- Use emoji, gradient washes, coloured left-border cards or stock photography.

## 2. Tokens

All values are in `tokens.css`. Use the variables, not raw colours.

### Colour roles

| Role | Variable | Dark | Light |
|---|---|---|---|
| Page | `--bg` | #050505 | #FAFAF8 |
| Framed hero, closing panel | `--frame` | #0B0B0C | #F1F0EB |
| Panel / inner card / chip | `--p1` `--p2` `--p3` | #0D0D0E / #121213 / #1A1A1C | #FFFFFF / #F6F5F1 / #EEEDE8 |
| Text / secondary / muted | `--tx` `--sub` `--mut` | #FFFFFF / #A6A6A6 / #8C8C8C | #111113 / #55555F / #6B6B74 |
| Lines | `--ln` → `--ln4` | hairline to strong | hairline to strong |
| Lime fill | `--acc` | #B8F47A | #B8F47A |
| Lime as text or icon | `--acc-tx` | #B8F47A | #3B7A0E |
| Text on lime | `--on-acc` | #050505 | #050505 |
| Inverted fill (primary button) | `--inv` / `--on-inv` | white / black | black / white |

Rules:
- **Lime means "active, done, or with agents".** Use it for the heading marker, the button arrow tile, done states in demos, the "with agents" bars and the answer card. Do not use it as decoration elsewhere.
- **Lime text uses `--acc-tx`, never `--acc`.** On the light ground `#B8F47A` text fails contrast; `--acc-tx` is darkened for that.
- **Shadows exist only in the light theme.** In dark, `--sh1`, `--sh2` and `--sh-btn` are transparent and borders carry the edges.
- **The recommended pricing card is inverted:** dark card in the light theme, light card in the dark theme (`.invert` in `tokens.css`).

### Type

| Use | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| h1, closing headline | `clamp(42px, 6.25vw, 90px)` | .93 | -.04em | 400 |
| Section h2 | `clamp(38px, 5vw, 72px)` | .97 | -.04em | 400 |
| h3, lead statements | `clamp(24px, 2.4vw, 34px)` | 1.18 | -.02em | 400 |
| Body | 16px (lead paragraphs 17px) | 1.45 | -.01em | 400 |
| Label (Geist Mono) | 11px uppercase | 1.3 | .06em | 500 |

- Fonts: Geist 400/500/600 and Geist Mono 400/500 from Google Fonts. In Next.js load them with `next/font/google` (or the `geist` package) and map them to `--font-sans` and `--font-mono`.
- Headlines use `text-wrap: balance` and a `max-width` in `ch` (11–15ch) so they break into deliberate lines.
- Numbers in timers, totals and the loader use `font-variant-numeric: tabular-nums`.

### Heading marker

One word or short phrase per heading is highlighted with a lime block (`--acc` background, `--on-acc` text, padding `0 .09em`). Exactly one marked phrase per heading, never more.

The marked phrase and the punctuation that follows it stay on the same line. Wrap both in a `white-space: nowrap` span; the content file stores headings as `{ before, mark, after }` for this.

On scroll the marker wipes in from right to left (`--dur-marker`, delay .25s). With reduced motion it is simply shown.

### Layout

- Content width: `max-width: 1392px`, 24px side padding at every width.
- Section rhythm: `clamp(84px, 10vw, 150px)` above each section; each section starts with a mono label row (a 6px lime square, the label, a hairline below), then the h2 and a lead paragraph side by side (they wrap below each other on small screens).
- Card grids use an 8px gap. Panels have a 20px radius; framed hero, closing panel and footer 28px; inner cards 14px; buttons and inputs 10px.
- The hero, the closing panel and the footer sit 12px from the window edge, not inside the 24px content width.

## 3. Breakpoints

| Name | Width | What changes |
|---|---|---|
| Desktop | 1024px and up | Full layouts. Header tagline "AI automation company" only from 1280px. |
| Tablet | 561–1023px | See the per-section table in COMPONENTS.md. From 900px down the header shows the theme button and Menu instead of links. |
| Phone | up to 560px | One column everywhere; report table, workflow and data-protection cards switch to compact forms. |
| Agent demo | 960px and down | Steps panel and chat stack, chat first. |

Reference: the canvas artboards `*-Tablet.dc.html` (834px) and `*-Phone.dc.html` (390px), and the screenshots in `reference/`.

## 4. Interaction and motion

All motion uses `cubic-bezier(.16, 1, .3, 1)`.

| Effect | Where | Behaviour | Reduced motion |
|---|---|---|---|
| Loader | Over the hero on first load | Counter 0–100% with a lime bar, about 1s, then fades out | Skipped |
| Scroll reveal | Blocks marked `data-rv` | Fade in, rise 22px, unblur 10px, .9s, staggered by `--dl` | Shown at once |
| Text scramble | Hero headline, cadence numbers, button labels | Characters resolve left to right, 750ms on reveal, 420ms on button hover | Off |
| Button sweep | Primary button | Fill sweeps from `--inv` to lime, arrow tile nudges 3px right | Off |
| Marquee | Tool list | Scrolls 36s per loop; pauses on hover, keyboard focus or the Pause button | Static list that wraps; no button |
| Scroll progress | Top edge of the header | 2px lime bar showing page progress | Off in the design; may stay, it does not move content |
| Workflow loop | Invoice example | Advances one step every 900ms; Pause / Play button | Starts paused on the finished state; Play runs it |
| Agent demo | Support chat | Six steps at 850ms each after a question | Runs on request (it is user-started) |

**Reveal must be fail-safe.** Content is visible by default; script adds the hidden class only to blocks it will reveal, and only after it has loaded. Without script, everything shows.

## 5. Calls to action

- **Primary, everywhere:** "Book a free call". It sits in the header, the phone menu, the hero, the analysis section, the recommended pricing card and the closing panel.
- **Under the hero buttons:** "Free · 30 minutes · An honest view of what is worth automating".
- **Secondary:** "Write to us" (email), in the FAQ footer and the closing panel.
- **Contact form submit:** "Send message".
- Do not add new labels for the same action.

Until the owner supplies the booking link, "Book a free call" goes to `/contact`. There the booking card points to `[BOOKING URL]`.

## 6. Accessibility rules

- Every tap target is at least 44px tall (buttons, menu, chips, filters). Exceptions, desktop header only: the nav links (42px) and the theme switch segments (28px).
- One `h1` per page. Landmarks: `header`, `nav` (Main; Mobile when the menu is open), `main`, `footer`. Add a "Skip to content" link.
- Use real elements: `button` for actions, `a` for navigation, `details/summary` for the FAQ, `label` with every input, `fieldset/legend` for the topic chips.
- Toggles carry `aria-pressed` (theme segments, topic chips, blog filters, document questions). The menu button carries `aria-expanded` and `aria-controls`.
- Changing regions announce politely: the chat messages and the document answer use `aria-live="polite"`.
- Focus ring: 2px `--acc-tx` outline, 3px offset.
- Decorative SVG and the duplicated marquee items are `aria-hidden`.
- Text contrast is at least 4.5:1 in both themes. The token values were chosen for this; keep them.

## 7. Open questions for the owner (not design decisions to make in the build)

1. **Fifth header link.** On the home page the desktop header shows FAQ in the fifth slot; inner pages show Blog. Pick one set for all pages. Suggestion: Analysis, Demos, What we automate, Pricing, Blog, because the FAQ is reached by scrolling.
2. **Contact form delivery.** The design shows a "Thanks. Your message is with us." state. The build needs a way to deliver the message: an email API, a form service, or opening the visitor's mail app. This needs the owner's choice and, for an API, an account.
3. **Blog at launch.** All posts are placeholders. Either hide Blog from the navigation until there are real posts, or launch with them.
4. **German.** Decided 2026-10-19: the EN / DE switch works on every page. `src/content/de.ts` has the same shape as `en.ts`; until it is translated, every German text shows as `[DE] ` plus the English text. Translate in place in `de.ts`; `npm run check:content` fails if a key is missing.
5. **Placeholders.** Analysis price, hourly rate, weeks to first agent, reply time, booking link, LinkedIn, WhatsApp, Telegram, X, legal name, address, phone, register entry, VAT ID, retention period, analytics, AI providers and regions, hosting region, blog posts.
