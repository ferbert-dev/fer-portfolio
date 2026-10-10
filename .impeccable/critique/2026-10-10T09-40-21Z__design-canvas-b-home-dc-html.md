---
target: Direction B home design
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:/home/user/fer-portfolio/design/canvas/B-Home.dc.html"
target_fingerprint: "sha256:cecf2f74e4fa0e89796ec09c9d3dbe38712c237452f46fd9493acb5700d4531a"
target_path: /home/user/fer-portfolio/design/canvas/B-Home.dc.html
timestamp: 2026-10-10T09-40-21Z
slug: design-canvas-b-home-dc-html
---
Method: dual-agent (A: design review · B: detector scan). Reviewed from source; the canvas runtime is not available locally, so nothing rendered faithfully.

## Design Health Score
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Voice demo never reached an "ended" state |
| 2 | Match system / real world | 3 | "Retrieval-augmented generation", "Trigger/AI step/Action" jargon |
| 3 | User control and freedom | 2 | Infinite workflow loop with no pause |
| 4 | Consistency and standards | 2 | Three labels for one action; H2 scale inconsistent |
| 5 | Error prevention | 3 | "Book a call" leads to a form with a placeholder booking link |
| 6 | Recognition rather than recall | 3 | Demos self-explain |
| 7 | Flexibility and efficiency | n/a | Persuade surface |
| 8 | Aesthetic and minimalist design | 3 | Services cards repeat demos; 12-chip strip |
| 9 | Error recovery | 2 | Dead # links; silent "voice" demo |
| 10 | Help and documentation | n/a | Persuade surface |
| Total | | 21/32 (66%) | Acceptable |

## Design Specificity Verdict
Workflow panel and RAG demo are authored for Ferbert (Müller GmbH invoice, human-review node, sourced answers). The rest of the page is the generic AI-startup template (centred hero, tool chips, bento cards, 4-step row, dark CTA slab). The one real asset, the News Agent in production, was buried as a text link.
Detector: 17 findings (16 low-contrast, mostly #85858D secondary text at 3.5–3.7:1; 1 unverified cramped-padding). Browser overlay added 3 nested-card findings (the voice card inside the lavender panel is real; the others are demo mock-ups or template artifacts). Confirmed bug: nav CTA text invisible (1.6:1, 1.0:1 on hover) from selector specificity.

## Priority Issues
- [P1] Workflow loop drifts out of sync after the first cycle and cannot be paused. Fix: one shared timeline, hold all-done, reset together, single-column log, pause control. /impeccable animate
- [P1] Real proof buried and an implied client claim ("Most clients start here"). Fix: production panel for the News Agent; remove the claim. /impeccable layout, /impeccable clarify
- [P1] One action, three labels, wrong destination. Fix: one verb everywhere; agency email. /impeccable clarify
- [P1] No mobile layout in the home markup; mobile artboard drops honesty labels and the review node. /impeccable adapt
- [P2] Contrast and semantics: faint disclaimers, light step-label colours, no main landmark, no aria-live on demos, small EN/DE targets. /impeccable audit, /impeccable harden

## Persona Red Flags
Jordan: RAG jargon first; "Book" lands on a form. Riley: log out of order, call never ends, dead links. Casey: 5-column workflow unreadable, multi-row sticky nav. Petra (German ops manager): no GDPR/data-location statement, no Impressum, Gmail contact, no price signal, no face.

## Minor Observations
Tracking -0.045em beyond floor; ragged node heights; wipe-not-typing answer reveal; no hover on CTA-slab buttons; German strings need length testing; cross-page header/footer inconsistencies.

## Questions to Consider
- Would the News Agent drawn in the node language carry more trust than three fictional demos?
- What would the first screen say if it only had to be true of Ferbert?
- Is "where does my data go" more urgent for a German ops manager than "what can AI automate"?
