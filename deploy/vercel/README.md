# Vercel deployments (LIVE)

Both funnels are deployed to Vercel production under the team
`jonathanfullerhealth-3079's projects` (hobby plan).

| Funnel | Live URL | Project |
|---|---|---|
| Reclaim Your Time | https://reclaim-your-time-five.vercel.app | reclaim-your-time |
| Fuller Health & Performance | https://fuller-health-performance.vercel.app | fuller-health-performance |

Each project is a static `index.html` + a Vercel serverless function `api/lead.js`
(Node runtime) that captures the lead. The page's form POSTs to `/api/lead`, then
opens the Google Calendar booking link.

## The `index.html` source of truth
- RYT: `../cloudflare/public/index.html` (same markup; deploy twin).
- FHP: `../cloudflare-fhp/public/index.html` (same markup; deploy twin).
The Vercel `api/lead.js` functions are stored beside this README.

## ONE remaining step to capture leads (email)
Right now capture returns OK but does NOT email until `GAS_URL` is set, because
the function forwards leads to a Google Apps Script that emails you + logs a Sheet.
1. Create the Apps Script sink — script is in `../../reclaim-your-time/lead-capture-spec.md`.
2. In Vercel → each Project → Settings → Environment Variables, add:
   `GAS_URL = https://script.google.com/macros/s/XXXX/exec` (Production).
3. Redeploy (or it applies on next deploy). Leads then land in your inbox + Sheet.
Use a separate Sheet/Apps Script per project if you want RYT and FHP leads apart.

## Redeploying after edits
Edit the `index.html` twin, then redeploy that project (Vercel dashboard → Deployments →
Redeploy, or connect the GitHub repo to each project for auto-deploy on push).

## Custom domains
Vercel → Project → Settings → Domains → add e.g. `snapshot.yourdomain.com` (RYT)
and `scorecard.yourdomain.com` (FHP). Use those as your `[SNAPSHOT_LINK]` in outreach.
