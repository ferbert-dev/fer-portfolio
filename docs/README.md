# Ferbert website: project record

Everything decided and collected for the Ferbert website so far, in one place. Last updated 2026-10-19.

The design (direction D, light and dark, desktop, tablet and phone) is final. The build package is [`design/handoff/`](../design/handoff/README.md). No production code is written yet.

| File | What it holds |
|---|---|
| [decisions.md](decisions.md) | Every decision the owner has made, with the date and what it changes |
| [company-data.md](company-data.md) | Facts about Ferbert that the site may state, and facts it must not state |
| [../design/handoff/](../design/handoff/README.md) | The design guide, components, tokens and reference screenshots for the build |
| [pricing.md](pricing.md) | The pricing model and how each design presents it |
| [open-data.md](open-data.md) | Every value the owner still has to supply, page by page |
| [reference-tbdstudio.md](reference-tbdstudio.md) | What was taken from the reference site and what was left out |
| [critique.md](critique.md) | Scores and open findings from the two design critiques |

## Where the designs live

- Live canvas: https://claude.ai/artifact/Y6TFjZsTwU942rENtGrqqi (private to the owner).
- Source files: `design/canvas/*.dc.html`. The canvas and these files hold the same content; `design/canvas/canvas.json` is the canvas layout.
- Local render check: `design/tools/preview.mjs`.

## Related files outside this folder

- `PRODUCT.md`: product context read by the design tooling. Users, purpose, positioning, principles.
- `HANDOFF.md`: short state summary for starting a new working session.
- `.impeccable/surfaces/src-app-locale-page-tsx.md`: the original brief for direction B. It predates direction D and several decisions listed here; where they differ, [decisions.md](decisions.md) is current.
- `.impeccable/critique/`: full text of both critiques.
- `.impeccable/config.json`: design detector exceptions, each with its reason.
