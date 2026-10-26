# Components

The building blocks of the four pages, in build order. Each entry names the canvas source, the content keys in `src/content/en.ts`, the states and how it changes per screen size. Sizes refer to the breakpoints in DESIGN.md: desktop ≥1024px, tablet 561–1023px, phone ≤560px.

Suggested file layout for the Next.js App Router:

```
src/app/[locale]/layout.tsx        header, footer, theme script, fonts
src/app/[locale]/page.tsx          home
src/app/[locale]/contact/page.tsx
src/app/[locale]/blog/page.tsx
src/app/[locale]/legal/page.tsx
src/components/...                 one file per component below
src/styles/tokens.css              copy of design/handoff/tokens.css
```

Server components by default. Only the parts marked **client** need `"use client"`.

## Shared

### ThemeSwitch (client)
- Source: header in any `D-*.dc.html`. Content: `header.theme`.
- States: Auto, Light, Dark. Stored in `localStorage["ferbert-theme"]`; Auto removes the key or stores `auto`.
- Desktop: three-segment pill, the active segment is the inverted fill. ≤900px: one round button showing the current mode; each press cycles Auto → Light → Dark.
- Set `data-theme` on `<html>` in a small inline script in `<head>` before first paint, so there is no flash of the wrong theme.

### Header (client part: menu)
- Source: `D-Home.dc.html` header. Content: `header`, `nav`, `common.cta`.
- Sticky, 56px tall, blurred `--hdr` background, 1px `--p3` bottom line, 2px lime scroll-progress bar on its top edge.
- Desktop: logo, separator, tagline (≥1280px only), four links (Analysis, Demos, What we automate, Pricing), theme switch, "Book a free call" pill (44px). No language switch until German exists; Blog joins as a fifth link once it has real posts.
- ≤900px: logo, theme button, Menu button. Menu opens a full-width panel below the header: large links (26px, 52px rows) with an arrow tile (the four links plus Contact), then the primary button. Selecting a link closes the menu. The Menu button reads "Close" while it is open.

### Button
- Primary: label block (inverted fill) and a separate 46px lime arrow tile, 4px apart, both 46px tall, 10px radius. Hover sweeps the fill to lime and nudges the tile 3px right. Content: `common.cta`.
- Outline: 46px, 1px `--ln2` border, `--p1` fill ("Watch an agent think").
- Text link: mono label plus a 26px round tile in `--acc-tint`; 44px tall ("Write to us", "See a sample report").

### SectionHead
- Mono label row (6px lime square, label, hairline), then the h2 with the lime marker and the lead paragraph. On desktop they sit side by side (flex, `space-between`, aligned to the bottom); on smaller screens they wrap.
- Marked headings come from `{ before, mark, after }`; wrap `mark` + `after`'s leading punctuation in a nowrap span.

### Footer
- Source: any page. Content: `footer`, `site.email`.
- 28px-radius panel 12px from the edges: large email link, page pills (Analysis, Demos, What we automate, Contact), then GitHub, Impressum, Privacy and the copyright line. Wraps to one column on phone.

## Home

| Section | Desktop | Tablet | Phone |
|---|---|---|---|
| Hero | Framed, 700px min height, left rail (status, place), mini card bottom right | No rail, no min height, mini card right-aligned 12px below the buttons | Same as tablet; mini card full width |
| Tool list | Lime band, marquee | same | same, wraps into rows under reduced motion |
| Invoice workflow | 5 cards in a row joined by lines, log below | 3 + 2 cards, no lines | Compact rows: icon, kind, title, detail, tick |
| Analysis | Text left, report right | Stacked | Report rows restack: name and level, then the two bars; column headers replaced by one key line |
| Support agent | Steps left (min 800px), chat right | Chat first (470px), steps below | Chat 620px, steps below |
| Documents demo | 3 columns: questions, passages, answer | Questions and answer left, passages right | Questions, answer, passages |
| What we automate | Number, title, body in 3 columns | Number + title, body below | same as tablet |
| Data protection | Text left, 2×2 cards | Stacked, 2 columns | 1 column, compact cards |
| How we work | Cadence line, 4 steps with 2 decorative tiles | 2 columns, no tiles | 1 column |
| Pricing | 3 cards | Recommended card full width, 2 below | Stacked |
| Company, FAQ, Closing | as drawn | as drawn | as drawn |

### Hero (client: loader, scramble)
- Content: `home.hero`, `home.workflow.nodes[].short`, `common`.
- The mini card mirrors the invoice workflow state (`home.workflow.short`) and lights its five steps in lime as they finish.
- Loader: see DESIGN.md §4. It is `aria-hidden`; the hero content is in the DOM underneath.

### ToolMarquee (client)
- Content: `home.tools`. Two copies of the list; the second is `aria-hidden`.
- Pause / Play button (44px, mono) with `aria-label` from `pauseLabel` / `playLabel`. Also pauses on hover and on focus inside.

### InvoiceWorkflow (client)
- Content: `home.workflow`.
- State `wf` 0–8 advances every 900ms unless paused: 0 = new email arriving, 1–5 = node n active, 6–8 = done. Active node: lime border plus a 4px `--acc-tint` ring. Done node: lime tick. Log lines appear as their node finishes.
- Pause / Play button, 44px. Under reduced motion it starts paused at `wf = 6`.
- Known content issue: the "Human review if unsure" node shows done on a run whose log says no review was needed. Owner to decide whether it should show "skipped".

### SampleReport
- Content: `home.analysis.report`. A real `<table>` with a `thead`, a `tbody` row per process and a `tfoot` total.
- Bars: "today" in `--bar`, "with agents" in `--acc-tx`, widths relative to the largest value (38 h = 100%), at least 3%. Bars grow in on reveal.
- Potential pill: High = lime border and text, Medium = `--warn-*`, Low = neutral.
- Phone: each row becomes a 2-column grid (name | pill, then bars across); the `thead` hides and `phoneKey` shows instead.

### SupportAgentDemo (client)
- Content: `home.agent`.
- States: waiting → question picked (`step` 0–5, 850ms each, timer shows seconds) → answered ("Answered in 5.1 s", answer bubble plus source pills). Question buttons are disabled while it runs.
- Step tiles: idle (`--p2`), active (lime fill and pulsing ring), done (`--acc-tint`, lime icon). The help-centre step expands the retrieved passages with scores; the order step expands a small table.
- The chat column reserves its height (see table above) so new messages do not push the page. Messages stick to the bottom; older ones scroll out of view at the top.
- Chat messages: `aria-live="polite"`. Thinking dots: `aria-label="Agent is thinking"`.

### DocumentsDemo (client)
- Content: `home.knowledge`. Three question buttons (`aria-pressed`); the selected one has a lime border and tint.
- Passages that answer the question are highlighted (`--acc-tint` with a lime outline); others are muted.
- The answer card is lime with source pills, `aria-live="polite"`.

### ServiceRows, TrustCards, HowWeWork, Company
- Static. Content: `home.services`, `home.trust`, `home.how`, `home.company`.
- Service rows with a demo link scroll to that demo; "Integrations and software" has no link.
- Cadence line: each value stays on one line and the slash stays with the value before it.

### Pricing
- Content: `home.pricing`. Three cards; the first is `recommended`, carries the "Recommended" pill, the inverted theme and the only button. Card heading reserves 3.6em so prices line up; German may need more.
- "How pricing works" panel below: three numbered steps.

### FAQ
- Content: `home.faq`. `details/summary` items; the plus tile turns 45° and fills lime when open. Footer row: "Your question is not here?" and "Write to us".

### Closing
- Content: `home.closing`. Framed panel, centred: label, xl headline, a thin vertical line, lead, the logo tile "+" a dashed "You" tile (decorative, `aria-hidden`), primary button and "Write to us".

## Contact (client: form)

- Content: `contact`.
- Desktop: header row (h1 left, lead right), then two columns (5fr / 7fr). Left: booking card (dot-grid background, whole card is a link) and "Other ways to reach us". Right: the form.
- ≤900px: one column in the order booking card, form, channels. Form fields stay in two columns down to 561px; one column on phone. Channel label column 96px, 72px on phone.
- Form: Name and Work email required; Team size defaults to 11–50; topic chips are toggle buttons in a `fieldset`. Validation copy is in `contact.form.errors` (not drawn; show it under the field, linked with `aria-describedby`).
- Submit opens the visitor's email app; nothing is sent from the site. Build a `mailto:` link and set `window.location.href` to it:
  - To: `site.email`
  - Subject: `Process enquiry from {name}, {company}` (without ", {company}" when it is empty)
  - Body: the message, a blank line, then one line each for Name, Work email, Company, Team size, Topics (empty values read "not given"). Labels are in `contact.form.mail`.
  - Keep the whole link under about 1,800 characters (some mail apps cut longer ones): shorten the message part if needed.
- After submit the form is replaced by a status panel (`role="status"`): lime envelope icon, "Your email app should be open now.", the reply note, a fallback line with "Open the email again" (the same `mailto:` link) and the plain address, and "Back to the form", which restores the form with the values still filled in.
- Channels with a `[BRACKET]` handle have no link yet: render them as text.

## Blog (client: filters)

**Not linked at launch** (owner decision): no header, menu or footer link points here until there are real posts. Build it later, or build it now and leave it unlinked.


- Content: `blog`.
- Filters: All, RAG, Automation, Engineering (44px pills, `aria-pressed`). The featured post shows for All and Automation.
- Featured post: desktop cover and text side by side (7fr / 5fr, cover at least 380px tall); tablet keeps that with the cover at 280px; phone stacks with a 16:10 cover.
- Post cards: desktop 3 columns with a 1.5 aspect cover; tablet rows (cover left, text right); phone stacked.
- Empty state: "No posts on this topic yet."
- Cover images are placeholders (`[COVER IMAGE]` on a ring pattern) until there are real posts.

## Legal

- Content: `legal`. Header: h1, last-updated line, the binding-language note and a dashed amber "draft" note (remove the draft note once a lawyer has completed the text).
- Desktop: "On this page" list on the left, article on the right. Smaller screens stack the list above the article.
- Impressum is a `dl` (label column then value; label above value on phone). The agents-and-data list uses lime tick icons.

## Not drawn

- 404 page: content in `notFound`; use the Legal page header layout.
- Blog post page: not designed yet; needed once real posts exist.
