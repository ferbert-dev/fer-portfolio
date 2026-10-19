# Decisions

Decisions made by the owner, Igor Ferbert. Dated 2026-10-10 unless noted. Decisions 12–15 (2026-10-19) override older ones where they differ.

## In force

### 16. German switch works now, with placeholder text
2026-10-19: the EN / DE switch is live on every page from the first build. German copy lives in `src/content/de.ts` with the same structure as English; untranslated texts show as `[DE] ` + English until the owner translates them. This replaces decision 3's "no working language switch".

### 12. Direction D is the design; B is retired
2026-10-19: one design, D, with Auto / Light / Dark themes. B is retired: its artboards were removed from the canvas and from `design/canvas/` (recoverable from commit `e413cee`). Decisions 4 and 5 below are history.

### 13. D critique fixed
2026-10-19: all P0/P1 items of the D critique were fixed, and one main action label is used on every page: "Book a free call", with "Write to us" (email) as the secondary action. See `HANDOFF.md`.

### 14. Confidentiality answer in the FAQ
2026-10-19: the home FAQ says "Will you show our project to other clients?" / "No. Your project stays confidential. We never name clients or show their automations without permission."

### 15. Responsive layouts and build handoff
2026-10-19: every page has desktop (from 1024 px), tablet (561–1023 px) and phone (up to 560 px) layouts. The build package is `design/handoff/` (design guide, components, tokens, 24 reference screenshots). It replaces `design-system.md` and `design-directions.md`, which described B and an early D.

### 1. No real projects on the site
The site shows no real projects, client names, case studies or side projects.

- Client automation work is confidential. Nobody outside the client should learn what was automated for them.
- Side projects, including the Telegram News Agent, are not client work and are not shown.
- The interactive demos are the proof. They are labelled as demos and use fictional companies.
- Client logos may be added later, one client at a time, only with that client's permission.

Effect: the "no real proof" finding in the critique of direction D is closed. Do not add a projects section. The Telegram agent panel, its mention in the company text and the link to its channel were removed from every page.

### 2. Design before code
No Next.js build until the owner approves a design. A build was started and stopped the same day. Its leftovers are in the repository (`package.json`, `tsconfig.json`, `next.config.ts`, `src/content/`); reuse or delete them when the build starts.

### 3. English first, German later
The first release is English only. German follows as a second step. Designs carry no working language switch for now.

### 4. Direction B stays as it is
The owner likes direction B and said not to change it. Named explicitly: the "Watch a support agent think" section and "Built for European data rules". The one change made after that instruction is the switch pill that links B and D.

### 5. Direction D is an alternative, not a replacement
The owner asked for a second design that looks and moves like tbdstudio.framer.ai, to compare against B. It lives in its own artboard. A choice between B and D has not been made.

### 6. Pricing is a fixed-price analysis, then an hourly estimate
The owner works at an hourly rate and has no fixed prices for build work. See [pricing.md](pricing.md).

### 7. Directions A and C are removed
Only B and D remain on the canvas and in `design/canvas/`. A and C are recoverable from git commit `783ee4c`.

### 8. Agent demo: the chat must not move
In direction D the chat column shifted down while the agent's steps unfolded. The owner asked for the panel to have its final size from the start. Done for D; see `design/handoff/COMPONENTS.md`. The same shift exists in B and was left alone because of decision 4.

### 9. Approved additions from the reference study
The owner approved six elements taken as structure from the reference site: FAQ, three ways to start, a case layout for the news agent (since removed with decision 1), numbered service rows, a cadence line, and a marker highlight on one headline word. Price placeholders were to be kept.

### 10. One design with light and dark themes
2026-10-10: instead of choosing between B and D, the owner asked for one design with an Auto / Light / Dark switch, based on D. Contact, blog, legal and a phone view were drawn in it.

### 11. B's details carried over, B removed
2026-10-11: the owner asked to bring B's strengths into the themed design: "What we automate" in B's row layout, two hero buttons, the EN / DE switch, soft shadows in light mode, and the highlighted first pricing card. A phone menu was added. The B artboards were deleted from the canvas and the repo (recoverable from commit `031451a`).

## Carried over from earlier sessions

- Brand name is "Ferbert". The site speaks as "we", as a small company, not as a one-person freelancer.
- Main offer: process analysis first, then building agents.
- Voice agents are out of scope for now.
- Stack for the build: Next.js (App Router, TypeScript), deployed on Vercel.
- Target: WCAG 2.2 AA, and all motion must respect reduced-motion settings.

## Open, waiting on the owner

1. The open questions in `design/handoff/DESIGN.md` §7: fifth header link, contact form delivery, blog at launch, German.
2. Whether the Telegram messenger entry stays on the contact page. It is a contact channel, not the news agent project.
3. The values in [open-data.md](open-data.md).
