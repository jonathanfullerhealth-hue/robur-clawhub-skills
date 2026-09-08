# Deploy the RYT Funnel to Cloudflare Pages (with lead capture)

This bundle is a static site + one Pages Function that captures leads.
- `public/index.html` — the funnel (form POSTs to `/api/lead`, then opens your booking calendar).
- `functions/api/lead.js` — receives the lead, forwards it to your Google Apps Script (email + Sheet),
  and optionally backs it up to KV.

**Why you deploy it, not me:** deploying needs your Cloudflare account, and the tools in that Claude
session are read-only for Workers (no deploy capability). This takes ~2 minutes.

---

## One-time: set up the lead sink (Google, free)
Do this first so captured leads reach you. (Full version in `../../reclaim-your-time/lead-capture-spec.md`.)
1. New Google Sheet → **Extensions → Apps Script** → paste the `doPost` script from `lead-capture-spec.md`.
2. **Deploy → Web app** → Execute as **Me**, Access **Anyone** → copy the `/exec` URL. That's your `GAS_URL`.

(Skip this and leads still don't error — but nothing is emailed. At minimum add KV, below.)

---

## Option A — Dashboard, no CLI (easiest)
1. Push this repo to GitHub (already done: `jonathanfullerhealth-hue/robur-clawhub-skills`).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `deploy/cloudflare/public`
   - **Root directory (advanced):** `deploy/cloudflare`  ← so `functions/` is picked up
4. **Settings → Environment variables:** add `GAS_URL` = your `/exec` URL (Production + Preview).
5. *(Optional backup)* **Settings → Functions → KV namespace bindings:** bind variable `LEADS` to a KV
   namespace (create one first under Storage → KV).
6. **Save and Deploy.** You get `https://<project>.pages.dev`. Add a custom domain under the project if you want.

## Option B — CLI (`wrangler`)
```bash
cd deploy/cloudflare
npx wrangler pages deploy public --project-name reclaim-your-time
# set the secret so captures get emailed:
npx wrangler pages secret put GAS_URL --project-name reclaim-your-time
# (optional) create + bind KV for backup storage:
npx wrangler kv namespace create ryt-leads
#   then add the binding (LEADS) in the dashboard, or via wrangler.toml on the next deploy.
```
Running from `deploy/cloudflare` makes wrangler pick up the sibling `functions/` directory.

---

## Verify it works
1. Open the deployed URL, fill the snapshot, enter an email, click **Get my snapshot**.
2. You should get the Apps Script email + a row in the Sheet, and the booking calendar opens.
3. Health check: visit `/api/lead` in the browser → `{"ok":true,"service":"ryt-lead-capture"}`.

## Notes
- The form is same-origin with the Function, so there's no CORS setup.
- No paid email provider needed — Apps Script does the emailing. (If you'd rather use Resend/MailChannels
  later, swap the forward block in `functions/api/lead.js`.)
- Update copy/pricing by editing `public/index.html` and redeploying (or just push to the connected repo).
- This `public/index.html` is the deployable twin of `reclaim-your-time/funnel.html`; keep them in sync if
  you edit one.
- SMS: the consent checkbox is captured, but actually *sending* texts needs a provider (Twilio/AR Funnel);
  the checkbox is your consent record.
