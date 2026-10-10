# Design critiques

Two critiques have been run. Full texts are in `.impeccable/critique/`. This file gives the scores and what is still open. Last updated 2026-10-10.

## Scores

| Design | Score | Band | Full text |
|---|---|---|---|
| Direction B home, early version | 21/32 (66 %) | Acceptable | `2026-10-10T09-40-21Z__design-canvas-b-home-dc-html.md` |
| Direction D home | 23/36 (64 %) | Acceptable | `2026-10-10T10-53-53Z__design-canvas-d-home-dc-html.md` |

The two scores use different sets of heuristics and are not directly comparable. B was scored before the FAQ, pricing section and service rows were added, and has not been scored since.

## Direction D: findings

What works: sample data written for a European buyer, an agent demo that shows its steps and sources, and one accent colour with one meaning.

| # | Priority | Finding | Status |
|---|---|---|---|
| 1 | P1 | No real proof and no identifiable company | Closed by owner decision: no real projects on the site |
| 2 | P1 | One next step has six different labels; the main button names a paid product while the first step is a free call | Open |
| 3 | P1 | On phones the agent demo is hard to follow and there is no menu; the report table clips its last column | Partly done: the chat no longer moves. Menu and table open |
| 4 | P1 | Visible defects | Open, listed below |
| 5 | P2 | The engagement process is told four times; reliability features are never shown | Open |

**Defects in finding 4**
- In "Start with an analysis, not a guess." the comma breaks onto its own line after the marked word.
- "38 h" in the sample report wraps onto two lines.
- The status line in the hero's small card breaks badly on phones.
- The Play button of the invoice workflow does nothing under reduced-motion settings.
- The marquee cannot be paused by keyboard or touch.
- The loader counts to 100 % while nothing loads.
- The support demo says "Thu 9 Oct"; 9 October 2026 is a Friday.
- A section could stay invisible after its classes were rewritten. Fixed.

**Measured facts**
- No `<main>` landmark.
- 17 links or buttons smaller than 44 px on desktop, 13 on phones. Smallest: footer text links at 14 px high.
- The logo link points to `#`.
- No horizontal overflow at 1440 px or 390 px.

The owner dismissed the follow-up questions after this critique. Nothing from the open list has been fixed, and nothing should be fixed without asking.

## Direction B: findings from the early critique

| Finding | Status |
|---|---|
| Workflow loop drifted and could not be paused | Fixed before this record began |
| Real proof buried; implied client claim | Claim removed. Proof section later removed by owner decision |
| One action, three labels | Open |
| No mobile layout in the home markup; mobile artboard out of date | Open |
| Contrast, missing `main` landmark, live regions, small language-switch targets | Contrast fixed (grey and green text darkened). Rest open |
| Contact, blog and legal headers differ from home | Open |

B also has the chat shift that was fixed in D. It was left alone because the owner asked for B not to be changed.

## Design detector

The automatic detector reports no findings on D with the project's exceptions, and three old ones on B (two "cramped padding", one "nested cards"). Exceptions and their reasons are in `.impeccable/config.json`. Those for D cover what the owner asked for (the two fonts, the marquee) and what follows from the reference look.
