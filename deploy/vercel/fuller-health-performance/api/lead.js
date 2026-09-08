// Vercel Serverless Function — POST /api/lead  (Fuller Health & Performance)
// Deployed live to the fuller-health-performance Vercel project. Forwards leads to a
// Google Apps Script (set GAS_URL env var) that emails you + logs to a Sheet.
export default async function handler(req, res) {
  if (req.method === "GET") return res.status(200).json({ ok: true, service: "fhp-lead-capture" });
  if (req.method !== "POST") { res.setHeader("Allow", "POST, GET"); return res.status(405).json({ ok: false, error: "method_not_allowed" }); }
  let data = req.body;
  if (typeof data === "string") { try { data = JSON.parse(data); } catch (e) { data = {}; } }
  data = data || {};
  const str = v => (v == null ? "" : String(v)).slice(0, 800);
  const lead = {
    ts: new Date().toISOString(),
    name: str(data.name), email: str(data.email),
    goal: str(data.goal), score: str(data.score), weakLink: str(data.weakLink), answers: str(data.answers),
    source: str(data.source) || "fhp-scorecard",
    ua: req.headers["user-agent"] || "", ip: req.headers["x-forwarded-for"] || ""
  };
  if (!lead.email) return res.status(422).json({ ok: false, error: "no_email" });
  const GAS_URL = process.env.GAS_URL;
  if (GAS_URL) {
    try { await fetch(GAS_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) }); } catch (e) {}
  }
  return res.status(200).json({ ok: true });
}
