# Design system: values in use

The concrete values in the design, read from `design/canvas/D-Home.dc.html`. Use this when building the site so the code matches the design. Last updated 2026-10-11.

The owner approved one design with light and dark themes (see [design-directions.md](design-directions.md)). The tokens in the `<style>` block of `D-Home.dc.html` are the source of truth; the tables below summarise them.

## Shared rules

- Page container: content sits in a centred column with 24 px side padding.
- One accent colour (lime). It marks what is active, done, or selected.
- One marked word per headline at most.
- Touch targets should be at least 44 px. Several are smaller today; see [critique.md](critique.md).
- Text contrast target: 4.5:1 for body text, 3:1 for large text.
- Every animation has a reduced-motion fallback.
- Demos are labelled "Demo" and use fictional companies.

## Colour

Dark is the default; light values apply with the Light theme, or with Auto when the system is light.

### Dark
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

Active and done states use the accent.

### Light
| Role | Value |
|---|---|
| Page background | `#FAFAF8` |
| Framed panels | `#F1F0EB` |
| Panel, raised surfaces | `#FFFFFF`, `#F6F5F1`, `#EEEDE8` |
| Text | `#111113` |
| Secondary / muted text | `#55555F` / `#6B6B74` |
| Hairlines / stronger borders | `#E3E2DC` / `#C9C7BF` |
| Accent fill (marker, tiles, marquee) | `#B8F47A`, with `#050505` text |
| Accent as text or thin line | `#3B7A0E` (lime fails contrast on light) |
| Accent tint / border | `#E7F8D2` / `#93CE58` |
| "Medium" level | `#8A5200` |
| Card shadow | `0 1px 2px rgba(17,17,19,.05), 0 14px 34px -22px rgba(17,17,19,.22)` |
| Panel shadow | `0 1px 2px rgba(17,17,19,.04), 0 34px 80px -46px rgba(17,17,19,.34)` |
| Dark button shadow | `0 1px 0 rgba(255,255,255,.15) inset, 0 6px 18px -8px rgba(17,17,19,.45)` |


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
- Dark theme: no shadows; depth comes from borders and slightly lighter surfaces. Light theme: the soft shadows listed above.
- Hero and closing panel: dot grid (1 px every 22 px), a soft radial highlight, and a grain overlay at 16 % opacity.
- Section spacing: `clamp(84px, 10vw, 150px)` above each section.
- Each section starts with a mono label, a 6 px lime square before it and a hairline under it.

### Buttons and links
- Primary button: two parts, 4 px apart. A white label block (46 px high, 10 px radius, 14 px text) and a lime square tile with an arrow drawn from small squares.
- Hover: the label block fills from white to lime over 550 ms; the tile moves 3 px right; the label text scrambles.
- Text link: mono label followed by a 26 px round tile that turns lime at hover.
- Secondary button: outlined block, 46 px high, panel background.
- Header: mono links, theme switch, EN / DE, "Get a process analysis" as a filled pill.

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
| Workflow | One step every 900 ms, nine steps per loop |
| Agent demo | One step every 850 ms |

Under reduced-motion settings: no loader, no reveal, no scramble, marquee static, workflow shown in its finished state.

### Breakpoints
| Width | Change |
|---|---|
| up to 960 px | Agent demo stacks: chat first with fixed height 600 px, steps below |
| up to 900 px | Header links and EN / DE replaced by the Menu button; hero rail and decorative step tiles hidden; workflow nodes and steps in one column |
| up to 520 px | Chat height 680 px; workflow log reserves 210 px |


## Components

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
