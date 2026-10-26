---
target: live production home page
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/ferbertigo/Development/VSCode/fer-portfolio/src/app/[locale]/page.tsx"
target_fingerprint: "sha256:75cc6c437eaa2ae2818e8673533f4193dc78bdcd4752bd20f35d1ae59ed7c118"
target_path: /Users/ferbertigo/Development/VSCode/fer-portfolio/src/app/[locale]/page.tsx
timestamp: 2026-10-26T16-11-32Z
slug: src-app-locale-page-tsx
---
Method: DEGRADED single-context (sub-agents not requested by user). Live prod https://fer-portfolio-navy.vercel.app at 1440x900, 1512x860, 1728x980, 390x844.

Score 23/32 (Good). n/a: 7, 10. Heuristic 8 = 2 (empty demo panels, placeholders).

Priority issues:
- [P1] Placeholders [N], [PRICE], [RATE] live in pricing and How we work (src/content/en.ts:340,370,377,396,427). clarify.
- [P1] Demo sections exceed viewport with their heading: at 1728x980 (923px usable) demos 1197px (+274), knowledge +100, how +232, start +102, faq +157. Cause: .ag-panel height clamp(540px, 100svh-112px, 800px) plus .sec top padding 150px and head row; panel mostly empty. Fix: fit heading+panel in one screen, cap ~680px, reduce demo section top padding. adapt.
- [P1] Artificial hero loader hides headline ~2.3s (Hero.tsx LOAD_MS 1300 + 250 + LEAVE_MS 700). Remove or cut to 300-400ms. optimize.
- [P2] Phone: agent demo 1171px with ~250px empty chat; hero mini panel "PAUSE" collides; page 16033px. adapt.
- [P2] How we work and services: large empty space and length. layout.

Code: shared ui primitives exist and are used (Section, SectionHead, Heading, buttons, ToggleChip, Pill, Field). 257 inline style objects duplicate layout (list reset 10+, card grid 4x). Sections split unevenly: 7 in Sections.tsx, 5 own files; Hero/ToolMarquee/Closing bypass Section. Detector: 0 findings.
