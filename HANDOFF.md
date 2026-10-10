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
- Critique of D: `.impeccable/critique/2026-10-10T10-53-53Z__design-canvas-d-home-dc-html.md`, 23/36. Open items: visible defects (comma orphaned after the marked word in "Start with an analysis, not a guess.", "38 h" wraps, Play is dead under reduced motion, marquee has no pause, loader is decorative, "Thu 9 Oct" 2026 is a Friday), phone layout (no menu, report table clips a column), six labels for one call to action. The "no real proof" item is closed by the owner decision above. The owner dismissed the follow-up questions; ask before fixing.
- Offered and not yet answered: a confidentiality line ("Your project stays confidential. We never name clients or show their automations without permission.") in the data-protection section or the FAQ.
- Placeholders the owner still has to supply are in [SQUARE BRACKETS]: analysis price, hourly rate, weeks to first agent (`[N]`), reply time, booking link, LinkedIn, WhatsApp, Telegram, X, legal name, address, phone, register entry, VAT ID, retention period, analytics, AI providers and regions, hosting region, blog posts. Do not invent them.
- Uncommitted-at-the-time build leftovers are now committed: `package.json`, `tsconfig.json`, `next.config.ts`, `src/content/` (English copy dictionary from a stopped build, partly out of date against the designs). Reuse or delete when the build starts.
- Local render check: `design/tools/preview.mjs` renders an artboard with the canvas runtime (`artifact-type/dc-runtime.js`, read from the artifact) and Playwright. The canvas type's own instructions say not to verify unless the owner asks; the owner did ask for visual fixes, so renders were used.
- Design detector exceptions for D and B are in `.impeccable/config.json`, each with its reason.
- Next tasks:
  1. Ask the owner which direction continues (B, D, or a mix) and whether to fix the open critique items in D.
  2. After design approval, build in Next.js (App Router, TypeScript), English first, test with Playwright (`webapp-testing` skill), deploy to Vercel.
