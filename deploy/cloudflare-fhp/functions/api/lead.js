// Cloudflare Pages Function — POST /api/lead  (Fuller Health & Performance scorecard)
// Receives a scorecard lead (same-origin, no CORS), forwards it to a Google Apps Script
// Web App (emails you + logs to a Sheet), and optionally backs it up to KV bound as LEADS.
//
// Set in the Pages project (Settings → Environment variables / Bindings):
//   • GAS_URL  (secret)     — your Apps Script /exec URL (see ../../reclaim-your-time/lead-capture-spec.md). Optional.
//   • LEADS    (KV binding)  — a KV namespace for backup storage. Optional.

export async function onRequestPost(context) {
  const { request, env } = context;
  let data;
  try { data = await request.json(); }
  catch { return json({ ok: false, error: "bad_json" }, 400); }

  const lead = {
    ts: new Date().toISOString(),
    name: str(data.name), email: str(data.email),
    goal: str(data.goal), score: str(data.score), weakLink: str(data.weakLink),
    answers: str(data.answers),
    source: str(data.source) || "fhp-scorecard",
    ua: request.headers.get("user-agent") || "",
    ip: request.headers.get("cf-connecting-ip") || ""
  };
  if (!lead.email) return json({ ok: false, error: "no_email" }, 422);

  if (env.LEADS) {
    try { await env.LEADS.put(`lead:${lead.ts}:${lead.email}`, JSON.stringify(lead)); } catch (e) {}
  }
  if (env.GAS_URL) {
    try {
      await fetch(env.GAS_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) });
    } catch (e) {}
  }
  return json({ ok: true });
}

export async function onRequestGet() {
  return json({ ok: true, service: "fhp-lead-capture" });
}

const str = v => (v == null ? "" : String(v)).slice(0, 800);
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });
