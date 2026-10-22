## Accessibility Audit: iferbert.vercel.app (Ferbert site)
**Standard:** WCAG 2.1 AA | **Date:** 2026-10-22 | **Build audited:** `main` at `bb8c2ae` (the commit deployed to production)

The live URL is blocked from the audit environment, so this audits a local production build of the same commit.

**Method:**
- axe-core 4.10 with the WCAG 2.0/2.1 A and AA rules, 30 scans:
  - pages: `/`, `/contact`, `/blog`, `/legal`, `/de` and the 404 page
  - at 1440 px and 390 px, in the light and dark themes, with reduced motion so content is settled
  - extra states: the contact form with errors, and the agent demo mid-run and answered
- Scripted Playwright checks for what axe cannot test:
  - keyboard order and focus
  - the menu
  - reflow at 320 px and at 200 % zoom
  - a motion-on pass to confirm nothing stays hidden
  - non-text contrast computed from the design tokens
  - the accessibility tree
- No real screen reader was run. The "Screen Reader" section reads from Chromium's accessibility tree.

### Summary
**Issues found:** 8 | **Critical:** 0 | **Major:** 4 | **Minor:** 4

Strong already:
- **Text contrast passes.** axe flagged no text-contrast failure in either theme.
  - axe couldn't decide 71 text nodes on the home page and 8 on Contact: text over gradients and layered backgrounds, such as the hero and closing frames, the marker and the button labels.
  - I computed the main pairs by hand from the tokens (table below). All pass 4.5:1, but three sit close to the limit:
    - light `--mut` on the frame: 4.62:1
    - light rail status `--acc-tx` on the frame: 4.63:1
    - dark `--mut` on the glow centre: 4.45:1. No `--mut` text sits there today, so it doesn't fail now, but it would if muted text were placed there.
- **Landmarks and labels are in place:** one `h1` per page, labelled form fields with linked errors, `aria-pressed` on toggles and `aria-live` on the demos.
- **The skip link works:** it moves focus to `main`.
- **Every control has a visible 2 px focus ring.** It measures 5.05:1 in light and 15.8:1 in dark.
- **Reflow passes** at 320 px and at 200 % zoom on all four pages.
- **Nothing stays hidden.** With motion on, every revealed element is visible after scrolling.

### Findings

#### Perceivable
| # | Issue | WCAG Criterion | Severity | Recommendation |
|---|-------|---------------|----------|----------------|
| 1 | Form input borders are too faint. `.inp` uses `--ln2` on `--p2`: **1.55:1** in light and **1.65:1** in dark. The border is what shows where a field is. | 1.4.11 Non-text Contrast | 🟡 Major | Add a separate control-border token, e.g. `--ctl-bd`, for inputs, chips and buttons: light `#8A8880` (3.25:1 on `--p2`), dark `#6A6A6E` (3.48:1 on `--p2`). Don't simply darken `--ln2`: it also draws the hero and closing frame borders, pills, the header separator and card borders, so the whole site would look heavier. |
| 2 | Chip, filter, pause and outline-button borders are `--ln2` on `--bg`: **1.62:1** in light and **1.80:1** in dark. The document-question chips use `--ln3`: **1.37:1** and **1.40:1**. Their text labels identify them, but the boundary is barely visible. | 1.4.11 (advisory: the text label identifies the control) | 🟢 Minor | Use the same `--ctl-bd` token as #1 (light 3.18:1 and dark 3.78:1 on `--bg`). |
| 3 | The pressed state of the contact topic chips relies mainly on a pale tint (`--acc-tint` vs page ≈ 1.1:1). The square marker does change, from `--ln4` (2.30:1 light) to `--acc-tx` (5.05:1). | 1.4.11 (state indicator) | 🟢 Minor | Keep the marker as the main signal and make the unpressed marker ≥3:1, or add a check mark when pressed. |

#### Operable
| # | Issue | WCAG Criterion | Severity | Recommendation |
|---|-------|---------------|----------|----------------|
| 4 | **Agent demo: keyboard focus is lost.** Pressing Enter on a question button (`.ag-chat .qb`) disables all question buttons while the agent runs. The focused button loses focus to `<body>`, and focus stays there after the answer. A keyboard user has to tab again from the top of the page (measured: `activeElement` = `BODY` during and after the run). | 2.4.3 Focus Order | 🟡 Major | Don't use `disabled` during a run: use `aria-disabled="true"` and ignore clicks, so focus stays on the button. Or move focus to the chat log when the answer arrives. |
| 5 | **Agent demo steps column scrolls but can't be reached by keyboard.** `.ag-steps` has `overflow-y: auto`. When a run's details are taller than the panel (on shorter desktop windows), keyboard users can't scroll it (axe: `scrollable-region-focusable`, at 1440×900 after an answer). | 2.1.1 Keyboard | 🟡 Major | Add `tabIndex={0}`, `role="region"` and `aria-label="Inside the agent"` to `.ag-steps`. It already auto-scrolls to the running step. |
| 6 | **Moving content in the hero.** The hero mini card and the rail status advance every 900 ms in a continuous loop, and the "live" dot blinks. The only pause control (Workflow section, "Pause") does pause the hero too, but it sits far below the hero. Reduced-motion users get it paused. | 2.2.2 Pause, Stop, Hide | 🟢 Minor | Stop the loop after one or two cycles on the finished state, or add a small pause control to the hero card. |
| 7 | **The mobile menu doesn't close with Escape.** After opening it (`aria-expanded="true"`), Escape leaves it open. | Best practice (supports 2.1.1) | 🟢 Minor | Close the menu on Escape and return focus to the Menu button. |

#### Understandable
No issues found:
- labels and instructions are on every field (3.3.2)
- the contact form explains each error in text next to the field, linked with `aria-describedby` (3.3.1)
- nothing changes on focus (3.2.1)

#### Robust
| # | Issue | WCAG Criterion | Severity | Recommendation |
|---|-------|---------------|----------|----------------|
| 8 | **The 404 page has no `lang`.** On an unknown URL, `<html>` has no `lang` attribute (axe: `html-has-lang`, all four scans of `/nope`). The other pages have `en` or `de` correctly. | 3.1.1 Language of Page (Level A) | 🟡 Major* | Give the not-found route a root layout with `<html lang="en">`. A `global-not-found` file, or a `not-found` inside the root that sets it. |

\* axe rates `html-has-lang` serious. It only affects the 404 page.

Also seen, no fix needed:
- **Marked headings read with a stray space.** The accessibility tree names them like "An invoice, handled end to end ." (space before the period), because the marker is `inline-block`. Harmless for screen readers. Optional fix: `aria-label` with the plain text on each marked heading.
- **Blog "Read post" isn't interactive.** It is styled like a link but is a `<span>`. That is intentional while posts are placeholders. It becomes a real link when posts exist.
- **The honeypot field is handled correctly.** It has `tabindex="-1"` inside an `aria-hidden` wrapper, so it can't be reached and axe doesn't flag it.

### Color Contrast Check
| Element | Foreground | Background | Ratio | Required | Pass? |
|---------|-----------|------------|-------|----------|-------|
| All text, light and dark (axe `color-contrast`, 30 scans) | various | various | ≥ 4.5:1 / 3:1 large | 4.5:1 | ✅ |
| Focus ring, light | `#3B7A0E` | `#FAFAF8` | 5.05:1 | 3:1 | ✅ |
| Focus ring, dark | `#B8F47A` | `#050505` | 15.78:1 | 3:1 | ✅ |
| Input border, light | `#C9C7BF` | `#F6F5F1` | 1.55:1 | 3:1 | ❌ |
| Input border, dark | `#3A3A3D` | `#121213` | 1.65:1 | 3:1 | ❌ |
| Chip/button border, light | `#C9C7BF` | `#FAFAF8` | 1.62:1 | 3:1 (advisory) | ❌ |
| Chip/button border, dark | `#3A3A3D` | `#050505` | 1.80:1 | 3:1 (advisory) | ❌ |
| Document-question border, light | `#DEDCD5` | `#FFFFFF` | 1.37:1 | 3:1 (advisory) | ❌ |
| Topic marker (unpressed), light | `#A9A7A0` | `#FAFAF8` | 2.30:1 | 3:1 | ❌ |
| Topic marker (unpressed), dark | `#5A5A5E` | `#050505` | 2.97:1 | 3:1 | ❌ (just under) |
| Report "today" bar, light | `#C9C7BF` | `#FFFFFF` | 1.69:1 | n/a: values also printed as text ("38 h") | ✅ |
| Hero/closing mono label (`--sub`) on frame, light / dark | `#55555F` / `#A6A6A6` | `#F1F0EB` / `#0B0B0C` | 6.46 / 8.08:1 | 4.5:1 | ✅ |
| … on the glow centre (worst case), light / dark | same | `#FFFFFF` / `#25272B` | 7.37 / 6.15:1 | 4.5:1 | ✅ |
| Muted text (`--mut`) on frame, light | `#6B6B74` | `#F1F0EB` | 4.62:1 | 4.5:1 | ✅ (close) |
| Muted text (`--mut`) on glow centre, dark | `#8C8C8C` | `#25272B` | 4.45:1 | 4.5:1 | ⚠️ none placed there today |
| Rail status (`--acc-tx`) on frame, light | `#3B7A0E` | `#F1F0EB` | 4.63:1 | 4.5:1 | ✅ (close) |
| Primary button label | `#FFFFFF` / `#050505` | `#111113` / `#FFFFFF` | 18.86 / 20.38:1 | 4.5:1 | ✅ |
| Marker and button after hover (`--on-acc` on lime) | `#050505` | `#B8F47A` | 15.78:1 | 4.5:1 | ✅ |
| Hero card text, light / dark | `#111113` / `#FFFFFF` | card ≈ `#FDFDFC` / `#09090A` | 18.53 / 19.90:1 | 4.5:1 | ✅ |

### Keyboard Navigation
| Element | Tab Order | Enter/Space | Escape | Arrow Keys |
|---------|-----------|-------------|--------|------------|
| Skip link | 1st | Moves focus to `main#main` ✅ | n/a | n/a |
| Header links, theme switch, EN/DE, CTA | 2–13, logical left to right ✅ | Work ✅ | n/a | n/a |
| Hero buttons, workflow Pause/Play | 14–17 ✅ | Work ✅ | n/a | n/a |
| Agent demo questions | 18–20 ✅ | Start the run, **then focus drops to body** ❌ | n/a | n/a |
| Documents demo questions | 21–23 ✅ | Select, `aria-pressed` ✅ | n/a | n/a |
| FAQ `summary` | 30–36 ✅ | Opens and closes ✅ | n/a | n/a |
| Mobile Menu button | after the logo ✅ | Opens, `aria-expanded` updates ✅ | **Doesn't close** ❌ | n/a |
| Agent steps scroll area | **not focusable** ❌ | n/a | n/a | Can't scroll ❌ |

Scope: Home, Contact and Blog were tabbed through at 1440 px. Legal and the 404 page were only scanned by axe.
- There were no keyboard traps: tabbing continued past the footer back to the start.
- On Contact:
  - the order is logical: booking card, channels, form fields, topic chips, privacy link, submit
  - topic chips toggle with Space
  - inputs show focus by a lime border (`--acc-tx`, 5.05:1) plus a tint ring, not an outline, which is still a visible indicator
- On Blog, the filters work with Enter.

### Screen Reader (from the accessibility tree, no real screen reader run)
| Element | Exposed As | Issue |
|---------|-------------|-------|
| Hero `h1` | heading level 1 "Find the work AI should do. Then let agents do it." | None: the word masks don't split it |
| Section headings | e.g. heading level 2 "An invoice, handled end to end ." | Stray space before the punctuation (cosmetic) |
| Cadence line | heading level 3 "30 minutes, 2 to 3 weeks, N weeks" | None |
| `<html lang>` | `en` on English pages, `de` on `/de` | Missing on the 404 page |

### Touch targets (project rule from DESIGN.md: ≥44 px; WCAG 2.1 AA has no target-size criterion, and 2.2 AA (2.5.8) asks for 24 px)
At 390 px these fall below the project's 44 px rule:
- footer text links GitHub, Impressum and Privacy: **14 px tall**. They still meet WCAG 2.2 (2.5.8) through its spacing exception: a 24 px circle on each one touches no other target.
- footer page pills: 34 px
- footer email link: 35 px
- language links in the mobile menu: 38 px
- logo link: 25 px tall

On desktop the nav links (42 px) and theme segments (28 px) are documented exceptions.

### Priority Fixes
1. **Agent demo focus (#4) and scroll area (#5).** Keyboard users lose their place in the main demo, and on shorter screens they can't read all the steps.
2. **Input and control borders (#1, #2): one new token.** Low-vision users can't see where the form fields are. A control-only border token at ≥3:1 fixes inputs, chips, filters and buttons, and leaves the frames and cards as designed.
3. **`lang` on the 404 page (#8).** A one-file fix, so screen readers pronounce the page correctly.
4. **Escape closes the menu (#7), hero loop stops or gets a pause (#6), stronger topic marker (#3).** Smaller polish.
5. **Footer link targets (touch).** Pad the GitHub, Impressum and Privacy links towards the project's 44 px rule. They already pass WCAG 2.2's spacing exception.
