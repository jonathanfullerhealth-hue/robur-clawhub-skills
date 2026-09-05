# RYT Funnel Strategy — Nick Saraev Playbook Applied
**Date:** 2026-09-05 · **Decision:** kill the paid assessment; free audit → paid implementation + retainer

---

## What Saraev recommends (researched, cited)
1. **Free audit, never paid.** LeftClick AI's front door is a *free 30-minute growth-mapping
   call* that audits the funnel and shows where AI moves the needle ([leftclick.ai, via search 2026](https://leftclick.ai/)). Charging for audits is treated as low-leverage.
2. **Productize into a few leveraged templates — not custom discovery.** He cut services to a
   small set of templates (one-and-done cold-email systems, one-click CRMs) and sold only those;
   "same deliverable every time" ([Nick Saraev — productization](https://nicksaraev.com/productization-101/); [master report 2026](https://buldrr.com/nick-saraev-ai-automation-master-report/)).
3. **Charge for implementation, high-ticket.** Projects start at **$5K**, most **$10K–$50K**, with
   an optional retainer for monitoring/optimization ([leftclick.ai / search 2026](https://leftclick.ai/)).
4. **No-brainer, low-risk offers.** Kill free trials and over-customization; minimize perceived risk
   ([nicksaraev.com](https://nicksaraev.com/)).
5. **Acquire via cold outbound + free-value Loom audits** (~$400/mo infra) ([Maker School reviews 2026](https://makerschoolnicksaraev.com/reviews)).
6. **"ROI is in better systems after the click."** He has audited clinics spending $50–150K/mo on
   ads that lost 30–40% of leads ([search 2026](https://buldrr.com/nick-saraev-ai-automation-master-report/)) — the same buyer RYT's demand audit flagged.

*FACT:* the free-call model, $5K+ project floor, and productization stance are from Saraev's own
site and reviews. *INFERENCE:* the specific RYT prices below are adapted to the clinic/med-spa
segment economics from `demand-audit-2026-09-05.md`. *SPECULATION:* actual close rates — untested.

## The decision
**Retire the $1,000 paid assessment.** It bottlenecks qualified buyers and is off-model.

## The new funnel
```
FREE automated ROI Snapshot (lead magnet)     →  Book a call        →  Paid implementation      →  Optional retainer
- prospect fills a short form                     (calendar link)       from a template library      (monitor / optimize)
- instant report: hours + $ saved                 the ONLY human step   most problems are common,     recurring revenue
- does NOT reveal the "how"                                             so delivery is fast
- ends in a booking CTA (reciprocity)
```

## Pricing (replaces the $997 / $1,000 tiers)
| Stage | Old | New |
|---|---|---|
| Audit / assessment | $1,000 paid, call-gated | **$0, automated, self-serve** (lead magnet) |
| Implementation | $997 flat | **$2,500–7,500 one-time**, scoped to the template + segment |
| Retainer | $297/mo | **$1,000–2,500/mo** (monitor, optimize, iterate) |
Anchor to the buyer's segment (clinic/med-spa norms), never the old coach rate.

## Two rules that make it work
1. **Reciprocity:** give real value free (their actual hours + dollars at stake). Do **not** explain
   the mechanism — that's what the paid build is for.
2. **Productization:** solve the *common* problem with a pre-built template (see `solution-templates`),
   not a bespoke discovery each time. The free Snapshot just identifies *which* common problem they have.

## What was built to implement this
- `self-serve-assessment/` — reframed to the **free** ROI Snapshot lead magnet (prospect-facing, no
  "how", booking CTA) + an internal sales sheet (the how + price to quote).
- `solution-templates/` — the productized template library (the common problems and their pre-built fix).
- `assessment-engine.md` / `coaching-ai-assessment/` — pricing/next-steps updated to the new model.
- An interactive ROI-Snapshot web page (Artifact) as the actual automated lead magnet.
