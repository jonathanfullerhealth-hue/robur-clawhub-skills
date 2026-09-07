// Cloudflare Pages Function — POST /api/lead
// Receives a lead from the funnel form (same-origin, so no CORS needed),
// forwards it to a Google Apps Script Web App (which emails you + logs to a Sheet),
// and optionally stores a backup copy in a KV namespace bound as LEADS.
//
// Set these in the Pages project (Settings → Environment variables / Bindings):
//   • GAS_URL   (secret)   — your Apps Script /exec URL (see lead-capture-spec.md). Optional.
//   • LEADS     (KV binding) — a KV namespace for backup storage. Optional.
// If neither is set, the function still returns ok (the CTA proceeds to booking regardless).

export async function onRequestPost(context) {
  const { request, env } = context;
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  // Minimal validation / normalization — never trust the client blindly.
  const lead = {
    ts: new Date().toISOString(),
    name: str(data.name), email: str(data.email), mobile: str(data.mobile),
    smsConsent: !!data.smsConsent,
    type: str(data.type), clients: str(data.clients),
    hoursYr: str(data.hoursYr), dollarsYr: str(data.dollarsYr), pain: str(data.pain),
    source: str(data.source) || "funnel",
    ua: request.headers.get("user-agent") || "",
    ip: request.headers.get("cf-connecting-ip") || ""
  };
  if (!lead.email && !lead.mobile) {
    return json({ ok: false, error: "no_contact" }, 422);
  }

  // 1) Backup to KV (if bound). Never let a storage error break the response.
  if (env.LEADS) {
    try { await env.LEADS.put(`lead:${lead.ts}:${lead.email || lead.mobile}`, JSON.stringify(lead)); }
    catch (e) { /* swallow — capture is best-effort */ }
  }

  // 2) Forward to Google Apps Script (emails you + appends to Sheet), if configured.
  if (env.GAS_URL) {
    try {
      await fetch(env.GAS_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead)
      });
    } catch (e) { /* swallow — don't block the visitor */ }
  }

  return json({ ok: true });
}

// Health check for GET /api/lead
export async function onRequestGet() {
  return json({ ok: true, service: "ryt-lead-capture" });
}

const str = v => (v == null ? "" : String(v)).slice(0, 500);
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });
