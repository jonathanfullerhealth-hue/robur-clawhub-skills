// Vercel Serverless Function — POST /api/lead  (Reclaim Your Time)
// Deployed live to the reclaim-your-time Vercel project. Forwards leads to a Google
// Apps Script (set GAS_URL env var) that emails you + logs to a Sheet.
export default async function handler(req, res) {
  if (req.method === "GET") return res.status(200).json({ ok: true, service: "ryt-lead-capture" });
  if (req.method !== "POST") { res.setHeader("Allow", "POST, GET"); return res.status(405).json({ ok: false, error: "method_not_allowed" }); }
  let data = req.body;
  if (typeof data === "string") { try { data = JSON.parse(data); } catch (e) { data = {}; } }
  data = data || {};
  const str = v => (v == null ? "" : String(v)).slice(0, 500);
  const lead = {
    ts: new Date().toISOString(),
    name: str(data.name), email: str(data.email), mobile: str(data.mobile),
    smsConsent: !!data.smsConsent, type: str(data.type), clients: str(data.clients),
    hoursYr: str(data.hoursYr), dollarsYr: str(data.dollarsYr), pain: str(data.pain),
    source: str(data.source) || "funnel",
    ua: req.headers["user-agent"] || "", ip: req.headers["x-forwarded-for"] || ""
  };
  if (!lead.email && !lead.mobile) return res.status(422).json({ ok: false, error: "no_contact" });
  const GAS_URL = process.env.GAS_URL;
  if (GAS_URL) {
    try { await fetch(GAS_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) }); } catch (e) {}
  }
  return res.status(200).json({ ok: true });
}
