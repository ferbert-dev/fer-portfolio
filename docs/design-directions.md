# Design directions

Two home page designs exist. The owner has not chosen between them. Last updated 2026-10-10.

- Canvas: https://claude.ai/artifact/Y6TFjZsTwU942rENtGrqqi
- Files: `design/canvas/`

## How to compare them

Both home pages carry a small pill at the bottom right: "Design · B · Light | D · Dark". In Play mode on the canvas it jumps between the two artboards. The pill is a review aid and must be removed before release.

## Direction B: light "Workflow"

File: `B-Home.dc.html`. Also designed in B: `B-Contact`, `B-Blog`, `B-Legal`, `B-Mobile` (the mobile artboard is out of date and lacks the newer sections).

**Look.** Warm off-white canvas (#FAFAF8), dark ink (#18181F), one iris accent (#5B4FF5), a five-colour step palette used only for workflow nodes. Onest throughout. Rounded 16–28 px surfaces, hairline borders, dot-grid panels. Owner's original reference: relay.app.

**Sections, in order**
1. Hero: "Find the work AI should do. Then let agents do it." with a marker on "agents".
2. Live invoice workflow: five nodes, run log, pause button.
3. Tools: twelve example tools as chips.
4. Process analysis: deliverables and a sample report.
5. "Watch a support agent think": agent steps on the left, chat on the right.
6. "Your team can ask the company's documents too": question picker, passages, answer.
7. "What we automate": five numbered rows with tags and links to the matching demo.
8. "Built for European data rules": four commitments.
9. "From first call to running agent": cadence band and four steps.
10. "Three ways to start": three cards with price placeholders.
11. Company.
12. FAQ: six questions.
13. Closing panel: "Which process should run itself first?"

**Status.** The owner likes it and said not to change it. See decision 4 in [decisions.md](decisions.md).

## Direction D: dark studio

File: `D-Home.dc.html`. Home only. Its links to contact, blog and legal point to the B pages.

**Look.** Near-black canvas (#050505), white text, one lime accent (#B8F47A). Geist for text, Geist Mono for small uppercase labels. Framed hero with a side rail, hairline dividers, rounded dark panels. Modelled on tbdstudio.framer.ai at the owner's request; see [reference-tbdstudio.md](reference-tbdstudio.md).

**Sections.** Same content as B, with these differences:
- Tools run as a lime marquee band.
- The cadence line "30 min / 2–3 weeks / [N] weeks." is its own centred section after the hero.
- The invoice workflow has a heading: "An invoice, handled end to end."
- Each section opens with a small mono label.
- Pricing follows the hourly model and adds a "How pricing works" block. See [pricing.md](pricing.md).
- The closing panel shows a logo tile plus a dashed "You" tile.

**Motion**
- Loader with a percent counter in the hero.
- Text scramble on headlines when they enter view and on buttons at hover.
- Lime marker wipes in behind the marked word.
- Sections fade up from blur on scroll.
- Marquee band; button fill from white to lime at hover; scroll progress line.
- All of it is switched off under reduced-motion settings.

**Fixes made after the first version**
- Agent demo: the panel reserves 800 px so the chat column does not move while steps unfold. Up to 960 px wide the chat comes first and has a fixed height; new messages sit at the bottom.
- Invoice workflow: the run log reserves its height on phones, so the page below does not jump on every loop.
- Scroll reveal is fail-safe: sections are visible by default and only script can hide them. An earlier version could leave the agent demo invisible after the canvas editor rewrote an element's classes.

## What is shared

Both directions use the same copy, the same four demos and the same demo data. A change to wording or demo content has to be made in both files.

## Not designed yet

- Contact, blog, legal and mobile pages in direction D.
- An up-to-date mobile artboard for B.
- Navigation menu for phones in either direction.
