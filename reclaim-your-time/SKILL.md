---
name: reclaim-your-time
description: Weekly demand & positioning audit for the "Reclaim Your Time" (RYT) done-for-you AI automation service. Investigates where the money and the pain are highest, who to advertise to, and how to reshape the offer to charge premium prices. Evidence-based, cites sources, ranks target segments by willingness-to-pay × pain × founder-credibility fit. Built to run on a schedule so market-sensing happens without manual effort.
metadata: {"openclaw":{"emoji":"🧭","requires":{"bins":["curl","jq","date"],"env":["TAVILY_API_KEY"]}}}
user-invocable: true
---

# Reclaim Your Time — Demand & Positioning Audit

## Who this helps
The owner of RYT — a done-for-you AI automation service (currently: assessment
$1,000 / setup $997 / retainer $297/mo) that reclaims a business owner's time by
deploying the Robur skill bundle (lead-scanner, content-pipeline-generator,
training-plan-builder, client-checkin-analyzer, research-breakdown-generator).

## The problem it solves
Right now RYT is aimed at running & longevity **coaches** — a low-budget, hard-to-
reach buyer. This audit answers the Hormozi question every week: *whose expensive
problem does this exact automation stack solve, and where do we find them?*
"Solve rich people's problems. They pay better." The service can be reshaped toward
demand; this skill senses where that demand is.

## What "solved" looks like
A ranked shortlist of buyer segments — each with a real willingness-to-pay signal,
the specific pain RYT removes, where to reach them, the offer/price to lead with,
and the single riskiest assumption to test. Delivered weekly, cited, no fluff.

## Inputs
- **Founder credibility anchor** (fixed): health / longevity / physiotherapy /
  endurance domain authority (BScKin, MScPT). Segments that sit inside this
  authority convert cheaper and defend premium pricing — weight them up.
- **Live web access:** TAVILY_API_KEY for search + web fetch for primary sources.
- **Optional:** last week's audit file, to diff week-over-week.

## The RYT capability map (what the stack actually automates)
Translate every candidate segment through THIS lens — RYT only wins where these map
to a painful, expensive job:
| RYT skill | Generic job it removes |
|-----------|------------------------|
| lead-scanner | Manual prospecting / lead sourcing |
| content-pipeline-generator | Ongoing marketing content production |
| training-plan-builder | Producing structured, personalized client deliverables |
| client-checkin-analyzer | Triage / follow-up on recurring client data |
| research-breakdown-generator | Turning source material into authority content |

## Workflow (run for the whole market, weekly)

Prioritize primary sources and dated evidence. Label **FACT / INFERENCE /
SPECULATION**. Cite important claims. Do not fabricate numbers.

### 1. Segment scan
Generate/refresh a candidate list of buyer segments whose work matches the
capability map AND has budget. Start from (and pressure-test) these: med spas,
longevity/concierge/functional-medicine clinics, private physiotherapy/chiro
practices, executive-health programs, high-ticket online fitness & gym owners,
dietitian/nutrition practices, financial advisors, real-estate teams. Add any new
segment the week's evidence surfaces.

### 2. Willingness-to-pay evidence
For each segment, find a dated, sourced signal of what they already pay for
marketing/ops/automation (retainers, agency prices, tool spend, revenue per
location). No signal = mark UNVERIFIED, do not rank it high.

### 3. Pain evidence
Find where the segment publicly complains about the exact jobs in the capability map
(lead follow-up speed, content treadmill, admin/check-in load, no-shows, intake).
Reddit, forums, industry blogs, review sites. Estimate reliability — anecdotes are
not the whole segment.

### 4. Credibility fit
Score how well the founder's health/longevity/PT authority carries into the segment
(HIGH inside health-adjacent, LOW in unrelated verticals). This lowers CAC and
defends price — it is a real ranking input, not a tiebreaker.

### 5. Competition & pricing headroom
Who already sells automation into this segment, at what price, and how specialized?
Vertical specialists charge 2–3× horizontal generalists — note the headroom.

### 6. Reachability
Where does this segment actually congregate (associations, conferences, subreddits,
Facebook groups, podcasts, directories)? A rich segment you can't reach is worthless.

### 7. Score & rank
For each segment output a 0–5 score on: **Money · Pain · Credibility Fit ·
Reachability · Pricing Headroom**. Rank. Show the math.

### 8. Offer reshape
For the top 2–3 segments, rewrite the RYT offer to their language and their
expensive problem, and propose the price to lead with (anchor to their existing
retainer norms, not the current $997 coach price).

## Output format
Lead with the verdict. Then:
- **Top 3 segments to pursue now** — with the one riskiest assumption to test each.
- **Segment scorecard table:** `SEGMENT | MONEY | PAIN | FIT | REACH | HEADROOM | TOTAL | TOP SOURCE`
- **Where to advertise** — concrete channels per top segment.
- **Offer/price reshape** — for the top segment, headline + price + proof needed.
- **Signal table:** `SIGNAL | EVIDENCE (dated, cited) | DIRECTION | CONFIDENCE | WHY IT MATTERS`
- **The 5 things to monitor over the next 90 days.**
- **Week-over-week diff** (if a prior audit exists): what moved and why.

## Guardrails
- Label **FACT vs. INFERENCE vs. SPECULATION**. Date and cite important evidence.
- Do NOT treat one Reddit thread as the whole segment. Estimate reliability.
- Do NOT rank a segment high on an UNVERIFIED willingness-to-pay guess.
- Do NOT recommend a pivot away from the founder's credibility zone without saying
  plainly that CAC and trust will be harder there.
- Do NOT fabricate retainers, revenue, or headcounts. Missing data = say so.
- This is market strategy, not a guarantee. The goal is to find where demand is —
  not to justify the current target market.

## Failure handling
- Source down / rate-limited (403/429): note it, continue.
- No willingness-to-pay evidence for a segment this week: keep it UNVERIFIED and
  flag "needs primary source" rather than padding with speculation.
- Thin week (little new evidence): say so and re-affirm last week's ranking rather
  than inventing movement.
