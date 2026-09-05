---
name: self-serve-assessment
description: Turns the RYT AI audit into a self-serve funnel. Takes a structured intake-form submission (no live call) and auto-generates the same ROI report the $1,000 assessment produces — quick wins, bottleneck map, hours reclaimed, and a tiered next-step CTA. The low-friction tripwire that qualifies buyers and sells the retainer without a human on the call.
metadata: {"openclaw":{"emoji":"🧾","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Self-Serve AI Assessment

## Who this helps
RYT's top of funnel. Instead of every prospect needing a 20-minute discovery call
before they see value, a clinic owner or coach fills a form and gets an instant,
specific ROI report. It removes the founder from the front of the funnel and lets
qualified buyers self-select.

## The problem it solves
The current assessment (`coaching-ai-assessment`) requires a live call + transcript.
That gates the funnel on the founder's calendar and can't scale. Self-serve turns the
same analysis into a form → report, so leads qualify themselves 24/7 and the paid
call is reserved for people already sold on the value.

## What "solved" looks like
A prospect submits the intake form and, within minutes, receives a report as specific
as a consultant's — their bottlenecks, their hours reclaimed, their ROI — ending in a
clear "do it yourself / we set it up / book a working session" choice. The founder
only shows up for the ones ready to buy.

## The intake form (deploy this as the lead magnet)
Collect these fields. Mark the numeric ones as required — they drive the ROI math.

**About you**
1. Business type: `Clinic (longevity / functional med / concierge) · Med spa · PT / chiro · Coaching · Other`
2. Roughly how many active clients/members/patients? *(number, required)*
3. Your (or your team's) approximate loaded hourly value? *(number; if unsure, we default by business type)*

**Where the time goes** — *hours per week, best estimate:*
4. Finding / following up with new leads: `___ hrs/wk`
5. Creating content (social, email, blog): `___ hrs/wk`
6. Producing client deliverables (plans, protocols, programs): `___ hrs/wk`
7. Check-ins / responding to client messages & data: `___ hrs/wk`
8. Turning research/notes into client-facing material: `___ hrs/wk`

**The pain**
9. Which ONE of the above do you most wish would run itself? *(pick one)*
10. What have you tried that didn't stick? *(free text, optional)*
11. Biggest worry about your business right now: `Not enough new clients · Losing clients I have · Drowning in admin · Can't create enough content · Other`

**Retention signal** *(feeds the retention-engine upsell)*
12. Roughly what % of clients are still with you after 6 months? *(number, optional)*

## Workflow

### 1. Validate the submission
If required numeric fields (Q2, Q4–Q8) are missing, do NOT invent them. Use the
business-type default and label every defaulted figure **"industry estimate — confirm
your actuals."** Defaults (hrs/wk) by type when a field is blank:
- Clinic: leads 4 · content 5 · deliverables 4 · check-ins 5 · research 2
- Med spa: leads 6 · content 4 · deliverables 1 · check-ins 3 · research 1
- PT / chiro: leads 3 · content 3 · deliverables 4 · check-ins 4 · research 2
- Coaching: leads 3 · content 6 · deliverables 3 · check-ins 4 · research 3

Hourly-value defaults when Q3 blank: Clinic $250 · Med spa $200 · PT/chiro $120 ·
Coaching $100.

### 2. Run the analysis engine
Apply the report structure in `../assessment-engine.md`, but source every input from
the form answers instead of a call transcript. Every claim must trace to a form
field; where a section has no data (e.g. Q10 blank), write "Not provided — book a
working session to go deeper" rather than fabricating.

### 3. Compute the ROI honestly
| Metric | Value | Source |
|---|---|---|
| Hours reclaimed / week | sum of automatable hours (Q4–Q8), discounted 40% (automation assists, rarely 100%) | form |
| Hours reclaimed / year | above × 48 | |
| Annual value of reclaimed time | hours/yr × Q3 (or default) | |
| Setup + tools cost | tier price + ~$50–150/mo tools | |
| Break-even | cost ÷ monthly value | |
Apply the 40% discount so the number is defensible, not hype. Show the math.

### 4. Map the fix
Point Q9 (their #1 wish) and Q11 (their biggest worry) at the right skill:
- "Losing clients I have" / low Q12 % → **retention-engine** (lead with this).
- Leads → lead-scanner · Content → content-pipeline-generator ·
  Deliverables → training-plan-builder · Check-ins → client-checkin-analyzer ·
  Research → research-breakdown-generator.

### 5. Present tiered next steps (priced for the segment)
- **A — Do it yourself:** install the free ClawHub skills + the 4-day quick-win plan.
- **B — We set it up for you:** done-for-you deploy, configured to their workflow.
  Price by segment, not the flat coach rate — clinics/med spas anchor to
  $4,000–6,000 setup + $1,500–2,500/mo (vertical automation retainer norms), coaches
  to the existing $997 tier.
- **C — Working session:** a paid call that credits toward setup — for the ones who
  want a human. This is the only step that touches the founder's calendar.

## Output format
Deliver the report as markdown (paste-ready into Gamma / Google Docs / email),
following `assessment-engine.md` sections 1–8, with the ROI table and tiered CTA
above. Open with a one-line hook: *"[Name], here's what your week looks like on
autopilot — and what the manual version is costing you."*

## Guardrails
- Every figure traces to a form field or a clearly-labeled industry default. No
  fabrication of hours, ROI, or client counts.
- Apply the 40% automation discount to reclaimed hours — under-promise.
- If the form shows a genuinely poor fit (e.g. 2 clients, no content, no admin load),
  say so and recommend Tier A only. The report's credibility is the product.
- No hype language. "You could reclaim ~6 hrs/week" not "transform your business."
- Price to the segment; never quote the $997 coach rate to a clinic buyer.

## Failure handling
- Form mostly empty: return a short report on what was given + "complete these 3
  fields for a full ROI estimate," listing the missing required fields.
- Nonsensical numbers (e.g. 80 hrs/wk on one task): cap at 40, flag "figure looks
  high — confirm on a working session."
- Business type "Other": run generic defaults ($120/hr) and note the estimate is
  rougher without a vertical match.
