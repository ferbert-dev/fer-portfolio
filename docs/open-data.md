# Open data

Values only the owner can supply. In the designs they appear in `[SQUARE BRACKETS]`. Nothing here may be invented. Last checked against the design files on 2026-10-10.

For each item the owner can give the value, or say "hide" to remove the element.

## Home

| # | Needed | Placeholder | Where |
|---|---|---|---|
| 1 | Fixed price of the process analysis | `[PRICE]` | B and D, pricing card 1 |
| 2 | Hourly rate | `[RATE]` | D, pricing card 3 |
| 3 | Weeks from analysis to first live agent | `[N]` | B and D: cadence line, pricing card 2, FAQ answer 2 |
| 4 | Prices for agent build and for run and improve | `[PRICE]` | B only, cards 2 and 3. Not needed if B takes the hourly model |
| 5 | Pricing terms sentence | `[PRICING TERMS…]` | B only. Not needed if B takes the hourly model |

## Contact

| # | Needed | Placeholder |
|---|---|---|
| 6 | Reply time promise | `[2 WORKING DAYS]` |
| 7 | Booking link for the free call | `[BOOKING URL]` |
| 8 | LinkedIn page | `[LINKEDIN PAGE]` |
| 9 | WhatsApp number | `[NUMBER]` |
| 10 | Telegram handle | `[HANDLE]` |
| 11 | X handle | `[HANDLE]` |

Already filled: email (ferbertigo@gmail.com) and GitHub (ferbert-dev).

## Impressum and privacy

| # | Needed | Placeholder |
|---|---|---|
| 12 | Legal company name and form | `[LEGAL NAME, e.g. Ferbert S.L.]` |
| 13 | Street and postcode in Valencia | `[STREET, POSTCODE]` |
| 14 | Phone | `[PHONE]` |
| 15 | Commercial register entry | `[REGISTRO MERCANTIL, ENTRY]` |
| 16 | VAT ID | `[ES NIF / VAT NUMBER]` |
| 17 | How long enquiries are kept | `[RETENTION PERIOD]` |
| 18 | Analytics used, or none | `[ANALYTICS…]` |
| 19 | AI providers and regions used for client work | `[PROVIDERS AND REGIONS]` |
| 20 | Hosting provider and region | `[HOSTING PROVIDER, REGION]` |
| 21 | Date of last update | `[DATE]` |

Already filled: represented by Igor Ferbert; contact and privacy email ferbertigo@gmail.com.

The legal texts are a structure for a lawyer to complete. They are not legal advice.

## Blog

| # | Needed | Placeholder |
|---|---|---|
| 22 | Post titles, dates, summaries, cover images | `[POST TITLE…]`, `[DATE]`, `[TWO-SENTENCE SUMMARY…]`, `[COVER IMAGE]` |

No posts exist yet. One option is to hide the blog from the navigation until the first post is written.

The blog design still names "Voice agents" as a filter and in one example title. Voice agents are out of scope, so both should go when the blog is next edited.

## Not a placeholder, but worth improving

- A domain email address in place of the Gmail address.
- A portrait of the founder, if the owner wants a face on the site. The closing panel of D has a slot that could take it.

## German

- All German copy: translate the `[DE] ` texts in `src/content/de.ts` (run `npm run check:content` to see how many remain).
