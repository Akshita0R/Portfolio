# Akshita R — Portfolio

Cobalt blue, hand-drawn line art and a metro line for a menu. Product-manager case studies built from my résumé, with MedNear as the lead.

Live: https://akshita-r-portfolio.netlify.app

## Structure
- `site/index.html`: home (click-to-stamp ticket, platform, train windows), Projects, Work, About, Play (doodle pad), contact
- `site/case.html?id=…`: case study with section rail (Problem → … → Reflection)
- `site/assets/content.js`: **all text and project data. Edit this file to update the site.**
- `site/assets/art.js`: the line-art illustrations, drawn as SVG
- `site/stats.html` + `netlify/functions/`: private, cookie-free visitor tracking (needs `STATS_TOKEN` on Netlify)

## Run locally
```bash
npm run dev   # http://localhost:5173
```

Pushing to `main` deploys automatically on Netlify.
