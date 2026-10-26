# Postmarked: Portfolio Concept & Build Report

## 1. Goal

Build a portfolio that someone remembers after looking at fifty others. It should feel handmade, read like a résumé underneath, and be easy to host on Netlify or Vercel. Visitor tracking is secondary, but it should be designed in from the start.

## 2. What the reference portfolios have in common

References given: Xiaoyang Hu, Shruthi Aragonda, Himanshu Shakit (via Wall of Portfolios), Elaine Yu.

> Note: the build environment's network policy blocked these four domains, so I could not open them for this report. The patterns below are the shared traits of standout designer portfolios in this style, not a page-by-page teardown. Compare them against the live sites and tell me anything you specifically love so I can fold it in.

| Pattern | Why it works | How Postmarked uses it |
|---|---|---|
| **One strong metaphor** carried through the whole site | Makes it memorable; turns browsing into exploring | The whole site is a piece of mail: envelope → letter → stamp album → postal route → customs form → postcard |
| **Personality before credentials** | Recruiters remember people, not bullet points | The first thing on screen is an envelope addressed to the visitor, then a short personal letter |
| **Tactile, physical UI** (paper, texture, objects) | Stands out from flat template sites | Perforated stamps, airmail borders, wax seal, ink postmarks, lined letter paper |
| **Small playful interactions** | Rewards curiosity; people share these | Envelope flips and opens; clicking the paper stamps it with ink; postcard gets franked when sent |
| **Projects as curated objects**, not a card grid | Each project feels like a deliberate piece of work | Each project is issued as a postage stamp with its own engraved artwork, face value and catalogue entry |
| **Editorial typography** | Signals taste instantly | Fraunces (display serif) + IBM Plex Mono (postal metadata) + Caveat (handwriting) |
| **Fast, simple stack** | Loads instantly, nothing to maintain | Plain HTML/CSS/JS, no build step, no framework |

## 3. The concept: "Postmarked"

Your résumé, delivered by post. Every résumé section maps onto a real postal object:

| Résumé section | Postal object | Detail |
|---|---|---|
| Name / headline | **Envelope** (hero) | Airmail border, return address, a "1st class" portrait stamp with your initials, cancelled with a **postmark dated today**, the day the visitor arrived |
| About / summary | **Letter** | Slides out of the envelope; handwritten salutation and signature on lined paper |
| Projects | **Stamp collection** | Each project is a perforated stamp in an album, with hand-drawn SVG artwork (6 motifs × 6 inks). Click one to open its catalogue entry: role, stack, outcome, links |
| Experience & education | **The Route** | Each job or school is a circular postmark along an airmail-striped route |
| Skills | **Customs declaration (CN 22)** | Skills "declared" as contents, with quantity dots for proficiency; "Commercial sample" is ticked (hire me) |
| Contact | **Reply-paid postcard** | A real form, already addressed and stamped; it gets franked "SENT" when posted |
| Résumé PDF | **Registered mail** | Download button |

Signature interaction: **click anywhere on the paper to stamp it with ink** ("Approved", "Air mail", "Hire me?", "Received <date>"). It can be turned off with the Ink toggle.

## 4. What was built

```
portfolio/
├── site/                     ← the website (published folder)
│   ├── index.html
│   ├── case.html             ← case-study page (case.html?id=mednear, …)
│   ├── stats.html            ← private analytics ledger
│   └── assets/
│       ├── content.js        ← ★ ALL your content lives here
│       ├── app.js            ← rendering + interactions
│       ├── stamps.js         ← stamp / postmark / motif drawing (shared)
│       ├── resume.pdf        ← your résumé
│       ├── styles.css
│       └── track.js          ← cookie-free analytics client
├── netlify/functions/
│   ├── track.mjs             ← POST /api/track (stores events)
│   └── stats.mjs             ← GET /api/stats (token-protected)
├── netlify.toml / vercel.json
└── package.json
```

- **Responsive:** checked at 1440px and 390px; projects show two stamps per row on phones.
- **Accessible:** real buttons and a native `<dialog>`, keyboard focus styles, honours reduced-motion, light and dark themes.
- **No build step:** edit, commit, deploy.

## 5. Tracking (secondary; built in, privacy-first)

| Event | When it fires |
|---|---|
| `pageview` | Each visit, labelled with its source (`?ref=`, `utm_source`, or the referrer's domain) |
| `envelope` | The visitor opened the envelope |
| `section` | First time each section is reached |
| `project` | A stamp's catalogue entry was opened (which project) |
| `link` | Outbound links (Live/Code/GitHub/LinkedIn/email) |
| `resume` | Résumé downloaded |
| `postcard` | Message sent (or the mail-app fallback was used) |
| `ink` | The visitor discovered the ink-stamp easter egg |

- **No cookies, no personal data.** Unique visitors are counted with a salted, daily-rotating hash of IP + browser, so it can't identify anyone. Do Not Track and Global Privacy Control are respected.
- **Storage:** Netlify Blobs (free, nothing to set up). Each event is one blob key, so writes are append-only and race-free.
- **Dashboard:** `/stats.html` (the "Postmaster's Ledger") shows views, visitors, sources, the most-viewed projects, sections reached, countries and devices. It's protected by a `STATS_TOKEN` you set.
- **Tip:** share links with `?ref=` (for example `yoursite.netlify.app/?ref=linkedin`, `?ref=company-name`) to see which application or post brought each visitor.

Verified locally against a mock Netlify Blobs server: events are stored, bots and unknown events are rejected, repeat events from the same visitor are counted once, and the stats endpoint returns 401 without the token.

## 6. Hosting

**Netlify (recommended; needed for tracking and the contact form)**
1. Push this folder to a GitHub repo.
2. In Netlify, choose Add new site → Import from Git → pick the repo. `netlify.toml` already sets everything.
3. Site settings → Environment variables: add `STATS_TOKEN` (any long secret) and optionally `STATS_SALT`.
4. Forms: Netlify detects the `postcard` form automatically. Turn on email notifications under Forms.

**Vercel (static only)**
Import the repo; `vercel.json` publishes `site/`. The page works fully, but `/api/track` and form handling are Netlify features. On Vercel the tracker stays silent and the postcard falls back to opening the visitor's mail app. To get analytics there, enable Vercel Web Analytics.

## 7. Version 2: real content and case studies

- All content now comes from Akshita's résumé; no placeholders remain.
- **Featured "special issue":** MedNear is shown large, with headline numbers.
- **Case-study pages** for every project, laid out as Problem → Discovery → Build → Design decision → AI evaluation → Go/no-go call → What it shows.
- **Postage meter:** a key-numbers strip (15+ KPIs, ~40%, 20%, 129, ₹50K).
- **Honours** shown as rubber stamps; skills grouped on the customs form.
- **Airmail tape** marquee between the hero and the content.

## 8. Next steps

1. Read every sentence in `site/assets/content.js`. The letter and "What it shows" sections are written in your voice, so adjust anything that doesn't sound like you.
2. Add real screenshots of MedNear to its case study (the biggest remaining upgrade).
3. Pick a motif and ink for each project (or ask me for custom motifs, such as a stamp drawn for a specific project).
4. Optional upgrades: a real photo engraved into the hero stamp (halftone filter), a "stamp sheet" view per project with screenshots, an OG share image of the envelope, and a custom domain.


## 9. Version 3: "metro" redesign

The layout follows the reference portfolio Akshita chose (elaineyu.design, studied from a screen recording), rebuilt from scratch with original illustrations and a Bengaluru-metro theme:
- Fixed left sidebar: name, quote, Now / Prev / Next, résumé button
- A metro line across the top as the menu (home · work · about · play), filling as you scroll
- Home as comic panels: a **click-to-stamp metro ticket**, a platform pointing "WORK →", and a train whose windows link to each project
- "Selected Work." cards with line-art scenes, label boxes and hover info (role, team, timeline)
- Case studies with a vertical section rail, a facts box, tags and "what moved" numbers
- About with a roles ledger, toolkit, station illustration and polaroid (add a photo via `photo` in content.js)
- Play: "you got off at the last stop" doodle pad
