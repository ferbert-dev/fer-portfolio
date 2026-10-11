# Design

One design with a light and a dark theme. Last updated 2026-10-11.

- Canvas: https://claude.ai/artifact/Y6TFjZsTwU942rENtGrqqi
- Files: `design/canvas/`
- Shared page shell (tokens, header, footer, theme switch) for the subpages: `design/tools/build-pages.py`. Run `python3 ../tools/build-pages.py .` from `design/canvas/` after changing the home's tokens or the shell.

## History

Two directions were drawn: B, light "Workflow" (Onest, iris accent, after relay.app), and D, dark studio (Geist, lime accent, after tbdstudio.framer.ai). On 2026-10-10 the owner chose one design with light and dark themes, based on D. On 2026-10-11 the owner asked to carry B's details into it and to remove the B artboards. B is recoverable from git commit `031451a`.

## Artboards

| File | Page |
|---|---|
| `D-Home.dc.html` | Home |
| `D-Contact.dc.html` | Contact: booking card, channels, form with topic chips and a sent state |
| `D-Blog.dc.html` | Blog: topic filter (All, RAG, Automation, Engineering), featured post, three cards |
| `D-Legal.dc.html` | Impressum and privacy, with a table of contents |
| `D-Mobile.dc.html` | Home's first screen at 390 px, with the phone menu |

## Themes

- The header switch offers Auto (follows the system setting), Light and Dark. Up to 900 px it is one button that cycles through the three.
- The choice is stored in `localStorage` under `ferbert-theme` and shared by all pages.
- Every colour is a CSS custom property on `.d`. `.d.t-light`, and `.d.t-auto` under `prefers-color-scheme: light`, carry the light values.
- Light mode has soft shadows on cards, panels and buttons. Dark mode stays flat.
- `.flip` shows an element in the opposite theme. Used for the recommended pricing card.

## Home sections, in order

1. Hero: "Find the work AI should do. Then let agents do it." Two buttons: "Get a process analysis" and "Watch an agent think".
2. Tools as a lime marquee band.
3. "An invoice, handled end to end": live workflow with run log and pause.
4. Process analysis: deliverables and a sample report.
5. "Watch a support agent think": agent steps and chat.
6. "Your team can ask the company's documents too".
7. "What we automate": five rows, each with number, title, sentence, tags and a link to the matching demo (layout from B).
8. "Built for European data rules": four commitments.
9. "From first call to running agent": cadence line "30 min / 2–3 weeks / [N] weeks." and four steps.
10. "Three ways to start": three offers; the first, Process analysis, is shown in the opposite theme with a "Recommended" badge. Then "How pricing works". See [pricing.md](pricing.md).
11. Company.
12. FAQ.
13. Closing panel: "Which process should run itself first?"

## Header

Logo, links (Analysis, Demos, What we automate, Pricing, FAQ; Blog on subpages), theme switch, EN / DE switch (DE is a placeholder until the German version exists), "Get a process analysis" button. Up to 900 px: logo, theme button and a Menu button that opens a full-width panel with the links, the language choice and the main button.

## Motion

- Loader with a percent counter in the hero.
- Text scramble on headlines when they enter view and on buttons at hover.
- Sections fade up from blur on scroll. Fail-safe: content is visible unless script marked it `.pre`.
- Marquee band; button fill from ink to lime at hover; scroll progress line.
- All of it is off under reduced-motion settings.

## Rules kept from earlier fixes

- Agent demo: the panel reserves its height so the chat does not move while steps unfold. Up to 960 px the chat comes first with a fixed height.
- The invoice run log reserves its height on phones.

## Not designed yet

- German version.
- Blog post page.
