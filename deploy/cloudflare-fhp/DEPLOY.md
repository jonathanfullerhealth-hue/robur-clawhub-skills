# Deploy the Fuller Health & Performance Scorecard to Cloudflare Pages (with lead capture)

Same pattern as the RYT funnel (`../cloudflare/DEPLOY.md`), separate project.
- `public/index.html` — the FHP scorecard; the form POSTs to `/api/lead`, then opens your booking calendar.
- `functions/api/lead.js` — captures the lead (name, email, goal, score, weak link), forwards to your
  Google Apps Script (email + Sheet), optionally backs up to KV.

**You deploy it** (needs your Cloudflare account; the session's Cloudflare tools are read-only). ~2 minutes.

## One-time: lead sink (Google, free)
Reuse the same Google Apps Script from `../../reclaim-your-time/lead-capture-spec.md` (it accepts any JSON
fields, so score/weakLink land in the email/Sheet too). Use a **separate Sheet** if you want FHP leads
apart from RYT leads — deploy a second Apps Script and use its `/exec` as this project's `GAS_URL`.

## Option A — Dashboard (easiest)
1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → this repo.
2. Build settings: Framework **None**, build command **empty**,
   **output directory** `deploy/cloudflare-fhp/public`, **root directory** `deploy/cloudflare-fhp`.
3. Environment variables: `GAS_URL` = your Apps Script `/exec` URL.
4. *(optional)* KV binding `LEADS` for backup.
5. Save and Deploy → `https://<project>.pages.dev`. Add a custom domain if you want.

## Option B — CLI
```bash
cd deploy/cloudflare-fhp
npx wrangler pages deploy public --project-name fuller-health-performance
npx wrangler pages secret put GAS_URL --project-name fuller-health-performance
```

## Verify
1. Open the URL, answer the scorecard, enter an email, click **Book my free consult**.
2. You get the Apps Script email + a Sheet row (with goal/score/weak link), and the calendar opens.
3. `/api/lead` in the browser → `{"ok":true,"service":"fhp-lead-capture"}`.

## Notes
- Booking defaults to Jonathan's Google Calendar — swap `BOOKING_LINK` in `public/index.html` if FHP books elsewhere.
- Credentials on the page are the conservative wording (Clinical Exercise Therapist · BScKin · MSc Physical
  Therapy) — no "physiotherapist". Keep it that way.
- This `public/index.html` is the deployable twin of `../../fuller-health-performance/fhp-funnel.html`; keep them in sync.
- No medical guarantees / weight-loss number promises in the copy — health-marketing safe.
