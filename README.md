# Postmarked — a portfolio delivered by post

Projects issued as stamps, experience as postmarks, skills on a customs form, and a reply-paid postcard for contact. See [REPORT.md](REPORT.md) for the concept and design rationale.

## Edit your content
Everything lives in **`site/assets/content.js`**. Put your résumé PDF at `site/assets/resume.pdf`.

## Run locally
```bash
npm run dev        # serves site/ at http://localhost:5173
```
(Or open `site/index.html` directly.) Tracking is disabled on localhost.

## Deploy
- **Netlify** (recommended): import the repo. Set the `STATS_TOKEN` env var, then view analytics at `/stats.html`.
- **Vercel**: import the repo (`vercel.json` publishes `site/`). Static only: no tracking, and the contact form falls back to email.
