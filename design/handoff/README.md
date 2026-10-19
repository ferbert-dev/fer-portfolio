# Handoff package: Ferbert website, direction D

Everything needed to build the approved design in Next.js. The design itself lives on the canvas (https://claude.ai/artifact/Y6TFjZsTwU942rENtGrqqi), mirrored in `design/canvas/`.

| File | What it is |
|---|---|
| `DESIGN.md` | The design guide: colour roles, type, layout, breakpoints, motion, call-to-action rules, accessibility rules, open questions for the owner. Start here. |
| `COMPONENTS.md` | Every building block with its states and its desktop, tablet and phone behaviour, plus a suggested file layout. |
| `tokens.css` | Colour, type, spacing, radius and motion variables for the dark, light and auto themes. Generated from `design/canvas/D-Home.dc.html`. Copy it into the app as is. |
| `reference/` | Full-page screenshots of Home, Contact, Blog and Legal at 1440px, 834px and 390px, dark and light (24 images). |
| `../../src/content/en.ts` | All English copy, word for word from the canvas, typed. `de.ts` will follow the same shape. |
| `../tools/reference.mjs` | Regenerates `reference/` from the canvas files after a design change. |

## How to build from it

1. Create the Next.js app (App Router, TypeScript) in this repo. Copy `tokens.css` into `src/styles/` and import it in the root layout. Load Geist and Geist Mono with `next/font`.
2. Add the inline theme script (see ThemeSwitch in COMPONENTS.md) so the right theme is set before first paint.
3. Build the shared parts first (header, menu, buttons, section head, footer), then the home sections in page order, then Contact, Blog, Legal.
4. Take every word from `src/content/en.ts`. Never type copy into a component; never fill a `[BRACKET]` with an invented value.
5. Compare each page with its screenshots in `reference/` at the three widths, in both themes. The screenshots show the finished demo states and the page with reduced motion (everything revealed).
6. Once a page matches, record Playwright screenshot baselines from the built site itself. Those baselines, not the design screenshots, are what the tests compare against later; fonts and rendering differ slightly between the canvas and the real site.

## When the design changes

Change the canvas, mirror the files into `design/canvas/`, then:
- regenerate `tokens.css` if colours changed (it says where it came from),
- run `DC_RUNTIME=<dc-runtime.js> node design/tools/reference.mjs` for new screenshots,
- update `DESIGN.md`, `COMPONENTS.md` and `src/content/en.ts` where the change touches them.
