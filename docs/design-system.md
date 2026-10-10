# Design system: values in use

The concrete values in the two home designs, read from `design/canvas/B-Home.dc.html` and `design/canvas/D-Home.dc.html`. Use this when building the site so the code matches the designs. Last updated 2026-10-10.

Neither direction is approved yet. Treat this as a record of what is drawn, not as a final system.

## Shared rules

- Page container: content sits in a centred column with 24 px side padding.
- One accent colour per direction. It marks what is active, done, or selected.
- One marked word per headline at most.
- Touch targets should be at least 44 px. Several are smaller today; see [critique.md](critique.md).
- Text contrast target: 4.5:1 for body text, 3:1 for large text.
- Every animation has a reduced-motion fallback.
- Demos are labelled "Demo" and use fictional companies.

## Direction B: light

### Colour
| Role | Value |
|---|---|
| Page background | `#FAFAF8` |
| Surface (cards, panels) | `#FFFFFF` |
| Ink (text, dark buttons, dark panels) | `#18181F` |
| Body text, secondary | `#55555F` |
| Small text, muted | `#5F5F68`, `#6B6B74` |
| Hairline borders | `#E3E2DC`, `#ECEBE5` |
| Accent (iris) | `#5B4FF5` |
| Accent text on white | `#4B3FE0` |
| Accent tint (marker, active chips) | `#ECEAFF` |
| Success | `#2BB673` fill, `#1E6B45` text |

Workflow step palette, used only for workflow nodes and step lists (colour, tint):
blue `#3B82F6` / `#E3EEFF`, violet `#8B5CF6` / `#EFE9FF`, amber `#B86E00` / `#FFF1D6`, red `#E5484D` / `#FFE4E4`, green `#1E8E57` / `#D9F3E6`.

### Type
| Use | Value |
|---|---|
| Family | Onest, weights 400–800 |
| Base | 18 px, line-height 1.55 |
| Hero headline | `clamp(46px, 6.2vw, 84px)`, weight 700, line-height 1.0, letter-spacing −0.04em |
| Section headline | `clamp(36px, 4vw, 56px)`, weight 700, line-height 1.04, letter-spacing −0.04em |
| Second-level section headline | `clamp(32px, 3.4–3.6vw, 46–48px)`, letter-spacing −0.035em |
| Card title | 24–28 px, letter-spacing −0.03em |
| Small labels | 13–14 px, weight 600 |

### Shape and depth
- Container width 1200 px.
- Radius: 12 px buttons, 16 px nodes and small cards, 20–28 px panels, 32 px closing panel, 999 px pills.
- Borders: 1 px hairline; 1.5 px on interactive nodes and chips.
- Shadow only on live panels: `0 30px 80px -40px rgba(24,24,31,0.25)`.
- Workspace panels carry a dot grid: 1 px dots every 20 px.
- Section spacing: 100–120 px above each section.

### Buttons
- Primary: ink background, white text, 12 px radius, lifts 1 px at hover.
- Secondary: white background, hairline border.

### Motion
- Easing: `cubic-bezier(.16, 1, .3, 1)`.
- Invoice workflow: one step every 900 ms, nine steps per loop, pause button.
- Agent demo: one step every 850 ms.
- Chat bubbles rise 8 px while fading in over 450 ms.

## Direction D: dark

### Colour
| Role | Value |
|---|---|
| Page background | `#050505` |
| Framed panels (hero, closing) | `#0B0B0C` |
| Panel | `#0D0D0E` |
| Raised surface inside a panel | `#111112`, `#121213`, `#151516` |
| Text | `#FFFFFF` |
| Secondary text | `#A6A6A6` |
| Muted text | `#8C8C8C` |
| Hairlines | `#242426` |
| Stronger borders (frames, controls) | `#3A3A3D` |
| Accent (lime) | `#B8F47A` |
| Text on accent | `#050505` |
| Accent tint on dark (active tags, hit passages) | `#1E2A14` |
| Accent border on dark | `#5E8A32` |
| "Medium" level in the report | `#F2CB5C` |

The step palette of B is not used. Active and done states are lime.

### Type
| Use | Value |
|---|---|
| Text family | Geist, weights 400–600 |
| Label family | Geist Mono, weight 500 |
| Base | 16 px, line-height 1.45, letter-spacing −0.01em |
| Hero and closing headline | `clamp(42px, 6.25vw, 90px)`, weight 400, line-height 0.93, letter-spacing −0.04em |
| Section headline | `clamp(38px, 5vw, 72px)`, weight 400, line-height 0.97, letter-spacing −0.04em |
| Sub-headline, card title, statement text | `clamp(24px, 2.4vw, 34px)`, weight 400, line-height 1.18, letter-spacing −0.02em |
| Mono label | 11 px, uppercase, letter-spacing 0.06em, line-height 1.3 |

Headlines are weight 400. Emphasis comes from size and the marker, not from bold.

### Shape and depth
- Container width 1392 px. Framed panels run almost edge to edge with 12 px outside.
- Radius: 10 px buttons and tiles, 14 px inner cards and FAQ items, 20 px panels, 28 px framed panels, 999 px pills.
- No shadows and no coloured glows. Depth comes from borders and slightly lighter surfaces.
- Hero and closing panel: dot grid (1 px every 22 px), a soft radial highlight, and a grain overlay at 16 % opacity.
- Section spacing: `clamp(84px, 10vw, 150px)` above each section.
- Each section starts with a mono label, a 6 px lime square before it and a hairline under it.

### Buttons and links
- Primary button: two parts, 4 px apart. A white label block (46 px high, 10 px radius, 14 px text) and a lime square tile with an arrow drawn from small squares.
- Hover: the label block fills from white to lime over 550 ms; the tile moves 3 px right; the label text scrambles.
- Text link: mono label followed by a 26 px round tile that turns lime at hover.
- Header: mono links; "Contact us" is an outlined pill.

### Marker
The marked word has a lime background and dark text. It wipes in from the left over 800 ms when its block enters view.

### Motion
| Effect | Value |
|---|---|
| Easing | `cubic-bezier(.16, 1, .3, 1)` |
| Loader | Percent counts to 100 in about one second, inside the hero frame |
| Section reveal | From 22 px lower, blurred 10 px, transparent; 900 ms |
| Text scramble | 750 ms on entering view, 420 ms at hover |
| Marquee | One loop in 36 s; pauses at hover |
| Workflow and agent demo | Same timing as B |

Under reduced-motion settings: no loader, no reveal, no scramble, marquee static, workflow shown in its finished state.

### Breakpoints in D
| Width | Change |
|---|---|
| up to 960 px | Agent demo stacks: chat first with fixed height 600 px, steps below |
| up to 900 px | Header links, hero rail and decorative step tiles hidden; workflow nodes and steps in one column |
| up to 520 px | Chat height 680 px; workflow log reserves 210 px |

B has no explicit breakpoints; it relies on wrapping.

## Components both directions share

| Component | Notes |
|---|---|
| Workflow panel | Five nodes with icon, kind, title, detail and a check; run log below; pause button |
| Sample report | Table: process, two bars (today, with agents), potential level; total row |
| Agent demo | Left: six steps with tag, detail, and expanding result cards. Right: chat with three question buttons |
| Documents demo | Three columns: questions, passages by document with hits highlighted, answer with sources |
| Service row | Number, title, one sentence, tags, optional link to a demo |
| Trust card | Icon, title, one sentence |
| Step | Number, title, one sentence |
| Offer card | Title, timeline, one line, list, best-fit note, price, button |
| FAQ item | Native disclosure element with a plus that turns to a cross |
| Closing panel | Headline, one paragraph, primary button, "Write to us" |
