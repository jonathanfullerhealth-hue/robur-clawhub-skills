---
name: self-serve-assessment
description: The free, automated ROI Snapshot lead magnet for RYT. Takes a short intake-form submission and instantly shows a prospect how many hours and dollars they're losing to manual work — then ends with a booking CTA. Reveals the value, NOT the how. Produces a separate internal sales sheet (the fix + price to quote). Replaces the old paid $1,000 assessment; built on Nick Saraev's free-audit → paid-implementation model.
metadata: {"openclaw":{"emoji":"🎁","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Free ROI Snapshot (Lead Magnet)

## Who this helps
RYT's top of funnel. A clinic owner, med-spa operator, or coach fills a 60-second form
and instantly sees what their manual workflows are costing them — no call, no fee, no
gatekeeper.

## The problem it solves
The old model charged $1,000 for a call-gated assessment. That bottlenecked qualified
buyers and is off-model. This is the **free** version: it delivers real value up front
(the rule of reciprocity), which earns the prospect's attention and their reply — then
routes the ready ones to a booking link. **We charge for the implementation, not the
audit.**

## What "solved" looks like
The prospect gets a specific, credible number — *"you're losing ~7 hrs/week, about
$X/year"* — feels the gap, and books a call to fix it. RYT never spends a human minute
until someone is already sold on the value.

## Two hard rules (do not break)
1. **Reveal the value, not the how.** Show hours and dollars saved. Do **NOT** name the
   tools, skills, or steps that would fix it — that is what the paid build sells. Vague-
   by-design on mechanism; specific on ROI.
2. **Always end with the booking CTA.** The only next step offered to the prospect is
   "book your free 30-minute working session: `[BOOKING_LINK]`." No pricing, no scope.

## The intake form (deploy as the lead magnet)
Keep it short — friction kills lead magnets. Required fields drive the math.
1. Business type: `Clinic (longevity / functional med / concierge) · Med spa · PT / chiro · Coaching · Other`
2. Active clients / members / patients *(number, required)*
3. Your (or your team's) loaded hourly value *(number; default by type if blank)*
4. Hours/week on **finding & following up leads** *(number)*
5. Hours/week on **content** (social, email, blog) *(number)*
6. Hours/week on **client deliverables** (plans, protocols) *(number)*
7. Hours/week on **check-ins & client messages** *(number)*
8. The ONE task you most wish ran itself *(pick one of the above)*
9. Name + email *(to send the Snapshot + booking link)*

## Workflow

### 1. Validate & default (never fabricate)
If a numeric field is blank, use the business-type default and label it *"industry
estimate — we'll confirm your real numbers on the call."* Defaults (hrs/wk):
- Clinic: leads 4 · content 5 · deliverables 4 · check-ins 5
- Med spa: leads 6 · content 4 · deliverables 1 · check-ins 3
- PT / chiro: leads 3 · content 3 · deliverables 4 · check-ins 4
- Coaching: leads 3 · content 6 · deliverables 3 · check-ins 4

Hourly-value defaults when blank: Clinic $250 · Med spa $200 · PT/chiro $120 · Coaching $100.

### 2. Compute the ROI (honest, defensible)
- Reclaimable hours/week = sum of Q4–Q7, **discounted 40%** (automation assists, rarely
  replaces 100%).
- Hours/year = ×48. Dollars/year = hours/year × hourly value.
- Show the math in one line so it's credible, not magic.

### 3. Produce OUTPUT A — the prospect-facing Snapshot
Markdown/email, warm and specific, **no mechanism**:
```
[Name], here's what your week looks like on autopilot.

Right now you're spending ~[X] hours/week on work that can run itself —
mostly [their Q8 answer].

Reclaimed, that's about [X×48×0.6 rounded] hours a year back in your calendar,
worth roughly $[dollars/year] at your rate.

That time is the difference between [clinic-relevant outcome, e.g. "seeing more
patients" / "keeping the members you have"] and staying stuck in admin.

Want it back? Book a free 30-minute working session and we'll map exactly which
of your workflows to automate first — no pitch, just the plan.
→ [BOOKING_LINK]
```
Rounded numbers. One outcome line tied to their business type. End on the CTA.

### 4. Produce OUTPUT B — the internal sales sheet (NOT sent to the prospect)
For RYT's own use before the call:
```
LEAD: [name / email] · [business type] · [# clients]
ROI shown: [hours/yr] hrs, $[/yr]
Likely problem: [Q8] → maps to [solution-templates entry]
Quote on the call: [segment-priced implementation range] + [retainer range]
Retention flag: [if check-ins high or they picked check-ins → lead with retention-engine]
```
Pull the template match and price range from `../solution-templates/SKILL.md`.

## Guardrails
- Every figure traces to a form field or a clearly-labeled default. No fabricated hours,
  dollars, or client counts.
- Apply the 40% discount — under-promise on the free asset; over-deliver on the build.
- **Never reveal the how** in Output A. **Never** put pricing in Output A.
- If the form shows a genuinely poor fit (e.g. 2 clients, no real admin load), be honest:
  a soft "you may not need us yet" beats a bad-fit lead. Protects credibility.
- No hype. "~6 hrs/week back" not "10x your business."

## Failure handling
- Form mostly empty: return a short Snapshot on what was given + "add these 2 numbers for
  your full estimate," naming the missing required fields. Still show the booking CTA.
- Nonsensical numbers (e.g. 80 hrs on one task): cap at 40, note "we'll confirm on the call."
- `[BOOKING_LINK]` not configured: output the Snapshot and flag to the operator that the
  booking link must be set before this goes live.
