---
name: solution-templates
description: The productized template library for RYT. Most businesses in a segment have the same few problems and the same workflows, so RYT sells pre-built solution templates instead of bespoke discovery. Maps each common problem to its ready-to-deploy fix (which skills, what it does, setup time) and the segment-priced implementation + retainer to quote. Built on Nick Saraev's productization model — same deliverable every time.
metadata: {"openclaw":{"emoji":"🧩","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Solution Templates (Productized Delivery)

## Who this helps
RYT's delivery + sales. It's the answer to "most businesses have the same problem, so we
shouldn't be doing a custom assessment every time." Instead of bespoke discovery, RYT
picks the matching template and deploys it.

## The problem it solves
Custom builds don't scale and don't need to: within a segment, the painful workflows are
the same handful. Productization — the same deliverable every time — is the highest-ROI
move in the agency model. This library is that productization: a fixed menu of common
problems and their pre-built fixes, so delivery is fast and priced with confidence.

## What "solved" looks like
The free ROI Snapshot identifies *which* common problem a lead has; this library says
*exactly* what RYT deploys, in what time, at what price — no reinventing per client.

## How it's used
- **`self-serve-assessment`** maps a lead's #1 pain to a template here (for the internal
  sales sheet).
- **On the call**, quote the template's implementation + retainer range.
- **Delivery** runs the named skills configured to the template — not a custom project.

## The template library

### T1 — "Leads leak out the back" (lead capture + speed-to-response)
- **Who:** med spas, clinics, PT/chiro running ads or inbound.
- **Common pain:** slow follow-up; leads go cold. (5-min response ≈ 3–5× conversion.)
- **Fix:** `lead-scanner` + fast structured follow-up drafts for approval.
- **Setup:** 2–3 hrs. **Quote:** $2,500–4,000 setup + $1,000–1,500/mo.

### T2 — "The content treadmill" (authority + nurture content)
- **Who:** longevity/functional-med clinics, coaches — anyone who must publish to be trusted.
- **Common pain:** no time to produce consistent content; authority stalls.
- **Fix:** `content-pipeline-generator` + `research-breakdown-generator`.
- **Setup:** 3–4 hrs. **Quote:** $3,000–5,000 setup + $1,000–2,000/mo.

### T3 — "Losing the clients we already have" (retention) — *lead with this*
- **Who:** clinics/med-spas with membership or recurring care; any high-CAC business.
- **Common pain:** silent churn; retention beats acquisition on economics.
- **Fix:** `retention-engine` + `client-checkin-analyzer`.
- **Setup:** 3–4 hrs. **Quote:** $3,500–6,000 setup + $1,500–2,500/mo.

### T4 — "Deliverables eat my week" (plans/protocols/programs)
- **Who:** PT/chiro, coaches, programs producing structured client documents.
- **Common pain:** hours per client writing plans by hand.
- **Fix:** `training-plan-builder` (or a protocol variant).
- **Setup:** 3–4 hrs. **Quote:** $2,500–4,500 setup + $1,000–1,500/mo.

### T5 — "The full front-of-house" (bundle: T1 + T3)
- **Who:** clinics/med-spas that want lead capture *and* retention in one engagement.
- **Fix:** T1 + T3 deployed together.
- **Setup:** 1–2 weeks. **Quote:** $6,000–7,500 setup + $2,000–2,500/mo.

## Pricing rules
- Anchor to the buyer's **segment**, never the retired $997 coach rate.
- One-time implementation is the core charge; the retainer (monitor/optimize) is optional
  but offered every time.
- Keep the menu small. New template only when ≥ 3 real leads show the same unmet problem —
  don't proliferate into custom work.

## Guardrails
- Do NOT invent a bespoke solution when a template fits — productization is the point.
- Do NOT quote below segment norms to win a deal; a bad-fit cheap client erodes the model.
- If a genuinely new problem appears repeatedly, log it as a candidate template with the
  evidence (which leads, what they asked) — add only when the pattern is real.
- Prices here are ranges to anchor from, not fixed SKUs; scope the exact number to the lead.

## Failure handling
- No template matches a lead: flag "no productized fit yet — book a scoping call and log
  the problem as a candidate template." Do not improvise a custom quote on the spot.
- Lead spans multiple templates: recommend the bundle (T5) or lead with T3 (retention) —
  the highest-ROI wedge.
