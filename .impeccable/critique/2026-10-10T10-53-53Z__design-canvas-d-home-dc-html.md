---
target: Direction D home design
total_score: 23
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 4
target_identity: "file:/Users/ferbertigo/Development/VSCode/fer-portfolio/design/canvas/D-Home.dc.html"
target_fingerprint: "sha256:846099b55aa3d65776409e20ab7fb95b05e6db152b806063819c4fc55cedae97"
target_path: /Users/ferbertigo/Development/VSCode/fer-portfolio/design/canvas/D-Home.dc.html
timestamp: 2026-10-10T10-53-53Z
slug: design-canvas-d-home-dc-html
---
Method: dual-agent (A: adbe753c20ddfc813 · B: a1e8fc2dcf65aad4d). Target: `design/canvas/D-Home.dc.html` (direction D, dark studio look pinned by the owner after tbdstudio.framer.ai). Assessed bytes predate the fail-safe reveal fix made during this run.

## Design Health Score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Loader and "AI agent, online" report status of nothing real; on phones the step trace runs off screen |
| 2 | Match system / real world | 3 | "RAG", "Guardrails", "0.91" unexplained; "Live example" labels a scripted loop |
| 3 | User control and freedom | 2 | No navigation on phones; marquee cannot be paused by keyboard or touch |
| 4 | Consistency and standards | 2 | One next step has six labels; buttons leave to light direction B pages |
| 5 | Error prevention | 3 | Report table clips its "Potential" column on phones with no scroll cue |
| 6 | Recognition rather than recall | 2 | Cadence numbers unlabelled; the journey is told four times with different counts |
| 7 | Flexibility and efficiency | n/a | Single-visit persuasion page |
| 8 | Aesthetic and minimalist design | 3 | Disciplined palette; repetition, decorative tiles and idle empty panel space |
| 9 | Error recovery | 2 | No error or no-script state; hero sits behind a script-driven loader |
| 10 | Help and documentation | 3 | FAQ answers real objections; silent on who is behind the company and on price range |
| Total | | 23/36 (64%) | Acceptable |

## Design Specificity Verdict
Content is Ferbert's; composition is the reference template with Ferbert's words in it. Authored: hero copy and live mini-card, invoice workflow (Müller GmbH, 1.284,50 EUR, VAT 19 %), sample report (103 h → 23 h adds up), support-agent trace, documents demo, data-protection and FAQ copy. Template: framed hero furniture, marquee, cadence band, numbered services, trust cards, staggered steps with decorative tiles, pricing cards, centred FAQ, "logo + You" closing panel, footer. The stated differentiator (retries, idempotency, monitoring, human review) is never shown: the "Human review if unsure" node ticks green on a run that skipped review.

Detector: 0 findings with project config, 17 without (10 cramped-padding, 2 tight-leading, 2 overused-font, 1 pulsing-dot, 1 marquee, 1 repeating-stripes-gradient); all 17 suppressed. Measurement contradicts 8 of the 10 cramped-padding findings (panel text inset 15.9–44 px); the marquee band and 1.18 leading match and are owner-sanctioned look. In-page overlay: not available. Injection of `detect.js` was blocked by Chromium's private-network rule for the local preview origin; no overlay was shown to the user.

Detector missed, measurement found: no `<main>` landmark; 17 links or buttons under 44 px on desktop and 13 on phone (footer text links 14 px tall, header pill 34 px, Pause 36 px); logo link `href="#"`; runtime warns that report row values "never resolved" during first paint.

## Overall Impression
Looks like the reference and holds together. Best parts are the three working demos and European sample data. Biggest opportunity: show one real thing and one failure path, and cut the four retellings of the process.

## What's Working
- Sample data written for the buyer: Müller GmbH, DATEV, Holded, DHL, purchase-order matching; arithmetic is right.
- The agent trace proves the claim: retrieval hits with sources, a database row, a rules step, a human-handover scenario; labelled honestly as demo.
- One accent, one meaning: a single marked word per heading; lime elsewhere always means active, done or "with agents".

## Priority Issues
- [P1] No real proof and no identifiable company. Every proof object is fictional; "Company" names nobody; footer leads with a Gmail address. Fix: a "Built and running" strip from PRODUCT.md evidence other than the Telegram agent (Live Sportsbook, DeutschStudio, Hop & Barley), founder name and portrait, domain email, legal line. Command: /impeccable shape
- [P1] Call-to-action chain is inconsistent. Button says "Get a process analysis" (a paid product) while the first step is a free 30-minute call; six labels for one action; all lead to a light B form. Fix: one primary label, reassurance line under it, a D contact page, solid header button. Command: /impeccable clarify
- [P1] Phone layout breaks the main demo and has no navigation. Trace sits below a tall chat; copy says "on the left"; no menu; report table clips its last column and total. Fix: compact step strip above messages, menu or anchor row, restacked report rows. Command: /impeccable adapt
- [P1] Visible defects contradict "production engineering". Orphaned comma after the marked word in "Start with an analysis, not a guess."; "38 h" wraps; hero mini-card status breaks on phone; Play is dead under reduced motion; marquee has no pause; loader is fake; "Thu 9 Oct" 2026 is a Friday; scroll reveal could leave a section hidden after a class rewrite (fixed during this run). Command: /impeccable harden
- [P2] The journey is told four times and the differentiator zero times. Cadence, "How we work", "Three ways to start" and "How pricing works" restate one sequence. Fix: merge into one section; spend the space on failure paths in the invoice loop (low-confidence match waits for approval, timeout and retry, duplicate skipped). Command: /impeccable distill

## Persona Red Flags
Jordan: "30 min / 2–3 weeks / [N] weeks." unlabelled; "RAG", "Guardrails", "0.91"; "Three ways to start" presents sequential stages as alternatives; hero dots look like a carousel.
Riley: "Live example" and "AI agent, online" on scripted loops; "Answered in 5.1 s" hard-coded; review node ticked on a run without review; "ranked by savings and risk" but no risk column; wrong weekday; all three pricing buttons reach one form; SAP and DATEV listed without evidence.
Casey: only persistent action is a 34 px pill in the top-right corner; no menu on about 18 screens; footer links 14 px tall; clipped report column; blur-in reveals unreadable during fast scrolling.
Petra: Gmail address as the footer's largest element; no legal form, register number or VAT ID; no named person; no German switch; "Your data stays in the EU" names no provider; open-ended hourly pricing with no ceiling.

## Minor Observations
Lime marker boxes nearly touch adjacent lines at 0.97 leading. "How we work" leaves empty grid cells that read as an accident. Services heading sits beside an empty left half. Pricing card headings reserve fixed height that German will overflow. Under reduced motion the marquee is a clipped static strip. The B/D switch pill is a review aid and must not ship.

## Questions to Consider
- If the thesis is "an analysis, not a guess", why is the hero's proof object an agent checklist in 11 px mono and not the report that says 103 h → 23 h?
- Three fictional companies get a third of the page and the real one a paragraph. What if that ratio were inverted?
- Ferbert believes there is one right way to start. Why does the page ask visitors to pick among three?
