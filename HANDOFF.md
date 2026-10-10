# Handoff: Ferbert website

Paste the prompt below into a new Claude Code session on this repository, branch `claude/quirky-einstein-pxoffy`.

---

Continue the Ferbert agency website. Read `PRODUCT.md`, `.impeccable/surfaces/src-app-locale-page-tsx.md` (direction contract) and the latest file in `.impeccable/critique/` first.

State:
- Brand: "Ferbert", an AI automation agency (voice "we"). Main offer: process analysis (find what AI can automate), then building agents. Voice agents are out of scope for now.
- Chosen design: direction B "Workflow" (relay.app-level polish). Design files: `design/canvas/B-*.dc.html` (Home, Contact, Blog, Mobile, Legal). Live canvas: https://claude.ai/artifact/Y6TFjZsTwU942rENtGrqqi
- Home sections: hero (analysis-first) → live invoice workflow (state-driven, pause button) → tools → sample process analysis report → "Watch a support agent think" demo (chat on the right, agent steps on the left with RAG cards and an order-database row) → internal RAG demo → "Real, running now" News Agent panel → services → data protection (EU hosting, DPA, human review, ownership) → how it works → company → CTA.
- Open critique items: mobile layouts (vertical workflow, menu nav), accessibility (main landmark, live regions, EN/DE tap targets).
- Next tasks:
  1. Study https://tbdstudio.framer.ai/ (the network allowlist must include it) and propose elements to adapt into direction B, without copying the site.
  2. After design approval, build in Next.js (App Router, TypeScript) with English and German (`/` and `/de`), test with Playwright (`webapp-testing` skill), deploy to Vercel.
- Placeholders the owner still has to supply are written in [SQUARE BRACKETS] in the design files.
