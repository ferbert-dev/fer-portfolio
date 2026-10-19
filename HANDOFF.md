# Handoff: Ferbert website

Paste the prompt below into a new Claude Code session on this repository, branch `claude/quirky-einstein-pxoffy`.

---

Continue the Ferbert agency website. Read `PRODUCT.md`, `.impeccable/surfaces/src-app-locale-page-tsx.md` (direction contract) and the latest file in `.impeccable/critique/` first.

State (updated 2026-10-10, end of local session):
- Brand: "Ferbert", an AI automation company (voice "we"). Main offer: process analysis (find what AI can automate), then building agents. Voice agents are out of scope for now.
- Live canvas: https://claude.ai/artifact/Y6TFjZsTwU942rENtGrqqi. Files in `design/canvas/` mirror it. Directions A and C are deleted.
- Two home designs exist; the owner has not chosen yet:
  - `B-Home.dc.html`: light "Workflow" direction. The owner likes it and said not to change it, in particular "Watch a support agent think" and "Built for European data rules". Only addition: the B/D switch pill.
  - `D-Home.dc.html`: dark alternative in the visual language of tbdstudio.framer.ai, which the owner asked for (Geist + Geist Mono, lime marker, framed hero, mono labels, loader, text scramble, marquee). Same content and demos as B.
  - Both carry a fixed "Design B · Light | D · Dark" pill that links the two artboards in Play mode. It is a review aid and must not ship.
- B has Contact, Blog, Mobile and Legal artboards. D has only Home; its links point to the B pages.
- Owner decisions:
  - Design first. No Next.js build until the owner approves a design.
  - English first, German later.
  - No real projects on the site: client work is confidential, side projects (Telegram News Agent included) are not shown. Demos are the proof. See `PRODUCT.md`.
  - Pricing model: the analysis has a fixed price; everything after it is a written estimate in hours at an hourly rate, approved before work starts. Applied in D ("How pricing works"). B still shows three `[PRICE]` placeholders; the owner has not said whether to copy the model into B.
- D: the agent demo panel reserves its height so the chat column does not move while steps unfold; on screens up to 960 px the chat comes first. Scroll reveal is fail-safe (content is visible unless script marked it `.pre`).
- Update 2026-10-19: the live canvas changed outside this repo. It now holds only D pages (D-Home with an Auto/Light/Dark theme switch, D-Contact, D-Blog, D-Legal, D-Mobile); the B artboards are gone from the canvas. `design/canvas/canvas.json` and the D files mirror the live canvas; the B files stay in the repo but are no longer on the canvas.
- Critique of D: `.impeccable/critique/2026-10-10T10-53-53Z__design-canvas-d-home-dc-html.md`, 23/36. The owner asked to fix all items; done on 2026-10-19: marked words keep their trailing punctuation (`.nw`), hour labels no longer wrap, Play works under reduced motion, the tool marquee has a Pause/Play button (and pauses on hover or focus; under reduced motion it wraps as a static list), "Fri 9 Oct", phone report table restacks into rows, hero mini-card status wraps cleanly, header/menu/theme/pause buttons are 44 px tall. One label for the main action on every D page: "Book a free call" (matches the Contact page's "Book a free 30-minute call"), with "Free · 30 minutes · An honest view of what is worth automating" under the hero buttons; only the recommended pricing card keeps a button; the secondary action is "Write to us" (email). Demo copy says "Alongside the chat" instead of "On the left". Not changed: the loader (owner-requested look) and the critique's P2 and persona items (journey told four times, review node ticked on a skipped review, "ranked by savings and risk" without a risk column).
- Owner decision 2026-10-19: D (light and dark) is the direction. B is retired.
- Responsive layouts (2026-10-19): D-Home is one fluid page with three layouts. Desktop from 1024 px (tagline hidden below 1280 px), tablet 561–1023 px (menu button instead of nav links up to 900 px, invoice workflow in 3 columns, documents demo in 2 columns with the answer under the questions, "How we work" in 2 columns, recommended pricing card full width with the other two side by side), phone up to 560 px (compact workflow rows, report table restacked, documents answer before the passages, compact data-protection cards). Canvas artboards `D-Home-Tablet.dc.html` (834 px) and `D-Home-Phone.dc.html` (390 px) import D-Home, so there is one source; edit only D-Home. `D-Mobile.dc.html` remains as the phone first screen with the menu open.
- Contact, Blog and Legal have the same treatment: tablet and phone artboards (`D-<Page>-Tablet.dc.html`, `D-<Page>-Phone.dc.html`) import the page, so edit only the page file. Contact: form fields stay in 2 columns down to 561 px; below 900 px the form comes before the "Other ways to reach us" list. Blog: on tablet the three smaller posts become rows (cover left, text right); on phone the featured cover is 16:10. Legal needed no layout changes. Canvas order: each page's desktop, tablet and phone frames sit side by side.
- FAQ on D-Home has the confidentiality answer: "Will you show our project to other clients?" / "No. Your project stays confidential. We never name clients or show their automations without permission."
- Placeholders the owner still has to supply are in [SQUARE BRACKETS]: analysis price, hourly rate, weeks to first agent (`[N]`), reply time, booking link, LinkedIn, WhatsApp, Telegram, X, legal name, address, phone, register entry, VAT ID, retention period, analytics, AI providers and regions, hosting region, blog posts. Do not invent them.
- Uncommitted-at-the-time build leftovers are now committed: `package.json`, `tsconfig.json`, `next.config.ts`, `src/content/` (English copy dictionary from a stopped build, partly out of date against the designs). Reuse or delete when the build starts.
- Local render check: `design/tools/preview.mjs` renders an artboard with the canvas runtime (`artifact-type/dc-runtime.js`, read from the artifact) and Playwright. The canvas type's own instructions say not to verify unless the owner asks; the owner did ask for visual fixes, so renders were used.
- Design detector exceptions for D and B are in `.impeccable/config.json`, each with its reason.
- Handoff package for the Next.js build (2026-10-19): `design/handoff/` holds `README.md` (start here), `DESIGN.md` (guide and open questions), `COMPONENTS.md` (building blocks, states, per-size behaviour), `tokens.css` (generated from D-Home), `reference/` (24 screenshots: 4 pages × desktop/tablet/phone × dark/light). `src/content/en.ts` was rewritten word for word from the D pages; it typechecks. `design/tools/reference.mjs` regenerates the screenshots. The old `.impeccable/surfaces/` contract is marked superseded.
- Next tasks:
  1. Owner answers the open questions in `design/handoff/DESIGN.md` §7 (fifth header link, contact form delivery, blog at launch, German, placeholders).
  2. Build in Next.js (App Router, TypeScript) from `design/handoff/`, English first, test with Playwright (`webapp-testing` skill), deploy to Vercel.
