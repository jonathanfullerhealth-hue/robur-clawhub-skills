---
name: glp1-triage
description: Triage a GLP-1 patient's conditioning check-in against the post-GLP-1 protocol. Produces RED/YELLOW/GREEN status, flagged measures with EWGSOP2 context, a prescriber escalation note, and a patient-facing draft. Rule-based triage before LLM — deterministic, no false negatives on functional decline.
metadata: {"openclaw":{"emoji":"💉","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# GLP-1 Conditioning Triage — Rule-Based Clinical Monitoring

## What It Does
Takes a check-in from a patient on GLP-1 receptor agonist therapy who is enrolled in a
conditioning program, and produces:

1. **Triage status** — RED (escalate to prescriber this week), YELLOW (hold load, address driver), GREEN (progress per phase)
2. **Flagged measures** — which thresholds fired, with EWGSOP2 context and change from baseline
3. **Prescriber escalation note** — ready for clinician review, for RED status
4. **Patient-facing draft** — plain-language, for professional review before sending

Implements section 7 of `protocols/post-glp1-conditioning.md`. Read that protocol first —
this skill is its monitoring layer, not a standalone clinical tool.

## Who This Is For
A qualified exercise professional — physiotherapist, clinical exercise physiologist,
kinesiologist — working alongside a prescribing clinician. Not a consumer tool.

## Workflow

### Step 1 — Collect the Check-In

**Patient context (required once, carried forward):**
- Patient ID or initials
- Sex at birth (determines EWGSOP2 cut-points)
- Age
- Height (m)
- Risk tier: high / moderate / standard
- Agent and class (mono-agonist / dual-agonist)
- Therapy start date and current phase (0–5)
- Concurrent insulin or sulfonylurea (yes/no)
- Known low BMD or prior fragility fracture (yes/no)

**Baseline measures (required once):**
- Grip strength (kg), 5× sit-to-stand (s), gait speed (m/s), body mass (kg)

**This check-in:**
- Date
- Grip strength (kg) — best of 3, dominant hand
- 5× sit-to-stand (s), and whether they can rise without using arms
- Gait speed (m/s)
- Body mass (kg)
- Protein intake (g/kg/day)
- Training adherence (% of prescribed sessions completed)
- Falls since last check-in (count)
- GI symptoms limiting intake or training (yes/no)
- Notes

### Step 2 — Rule-Based Triage Engine

Apply in order. Deterministic. No LLM judgement in this step.

```
RED CONDITIONS (any one triggers RED):
- Grip strength decline > 10% from baseline
- New inability to rise from chair without using arms
- 5× sit-to-stand > 15 s where previously ≤ 15 s
- Gait speed ≤ 0.8 m/s
- Protein < 0.8 g/kg for 2 consecutive check-ins
- Sustained loss > 1% body weight/week beyond the first 4 weeks
- Training adherence < 60% (program disengagement — treat as a clinical event)
- Any fall since last check-in

YELLOW CONDITIONS (any one triggers YELLOW, absent any RED):
- Grip strength decline 5–10% from baseline
- Protein 0.8–1.2 g/kg
- Training adherence 60–79%
- GI symptoms limiting intake or training
- 5× sit-to-stand increased > 2 s from baseline but still ≤ 15 s

GREEN:
- Grip maintained or improving, protein ≥ 1.2 g/kg,
  adherence ≥ 80%, no functional decline, no falls
```

**Report separately, do not fold into triage** — these are absolute EWGSOP2 criteria that
may be met at baseline and are not themselves evidence of decline:

```
SARCOPENIA STRENGTH CRITERION MET:
- Grip < 27 kg (male) or < 16 kg (female)
- OR 5× sit-to-stand > 15 s

LOW MUSCLE MASS CRITERION MET (if DEXA available):
- ALMI < 7.0 kg/m² (male) or < 5.5 kg/m² (female)
```

A patient can be GREEN on trajectory and still meet a sarcopenia criterion. Both facts go in
the report. Do not let one suppress the other.

### Step 3 — Compute Derived Values

- **Grip change:** `(current − baseline) / baseline × 100`, one decimal, signed
- **Weekly loss rate:** `(prior weight − current weight) / prior weight / weeks elapsed × 100`
- **Sit-to-stand change:** current − baseline, in seconds, signed
- **Protein streak:** consecutive check-ins below 0.8 g/kg
- **Weeks on therapy:** from therapy start date

If a prior check-in is unavailable, state "First check-in — no trend available." Do not
estimate a rate of loss from a single point.

### Step 4 — Output the Report

```
────────────────────────
GLP-1 CONDITIONING TRIAGE — [Patient ID]
Date: [date] | Week [N] on therapy | Phase [N] | Tier: [HIGH/MODERATE/STANDARD]
Agent: [agent] ([mono/dual]-agonist)
────────────────────────

TRIAGE: 🔴 RED / 🟡 YELLOW / 🟢 GREEN

MEASURES:
  Grip strength      [X] kg    ([+/-X.X]% from baseline [Y] kg)   [flag]
  5× sit-to-stand    [X] s     ([+/-X.X] s from baseline)          [flag]
  Gait speed         [X] m/s                                       [flag]
  Body mass          [X] kg    ([-X.X]%/week)                      [flag]
  Protein            [X] g/kg                                      [flag]
  Adherence          [X]%                                          [flag]

TRIGGERED:
  🔴 [condition] — [value vs threshold, plain language]
  🟡 [condition] — [value vs threshold, plain language]

EWGSOP2 STATUS:
  Strength criterion: [met / not met] — [grip value] vs [cut-point] ([sex])
  Muscle mass:        [met / not met / no DEXA on file]

TREND (last 3 check-ins):
  Grip:    [a, b, c] kg — [improving / stable / declining]
  Protein: [a, b, c] g/kg
  Weight:  [a, b, c] kg

ACTION: [Escalate to prescriber within one week / Hold load, reassess in 2 weeks / Progress per Phase N]
────────────────────────
```

### Step 5 — Draft the Prescriber Note (RED only)

Factual, short, no exercise jargon. The prescriber is busy and does not need programming
detail.

```
Re: [Patient ID] — conditioning program, week [N]

Flagging functional decline for your review.

[Measure] has moved from [baseline] to [current] ([X]% change) since [date].
[Second measure if applicable.]

Protein intake is currently [X] g/kg against a target of 1.2–1.6.
Training adherence is [X]%.

I have held load progression pending your input. No changes made to
anything outside exercise programming.

Happy to discuss.
[Name, credentials]
```

### Step 6 — Draft the Patient Message

- **RED:** Direct, non-alarming, no diagnosis. Name the measure, state the action, name the
  next step. "Your grip strength is down 12% since February. I've flagged it with Dr. [X] and
  we're holding your weights where they are until we hear back. Nothing to worry about
  today — this is exactly what the check-ins are for."
- **YELLOW:** Name the driver and the one thing to change. Usually protein distribution.
- **GREEN:** Short. Lead with strength, not the scale. "Grip is up 4% and you're down 6 kg.
  That's the outcome we want — you're keeping the muscle."

Always close: `🔍 REQUIRES CLINICIAN REVIEW BEFORE SENDING.`

## Guardrails
- Do NOT send anything to a patient or prescriber. All output is draft-only.
- Do NOT override the rule-based triage with narrative reasoning. If the rules fire RED, the output is RED.
- Do NOT recommend medication changes, dose holds, or discontinuation. That is the prescriber's decision, always.
- Do NOT prescribe a diet or set protein targets. Targets come from the prescriber or dietitian; this skill reports intake against a target already set.
- Do NOT diagnose. "Grip strength has declined 12% and meets the EWGSOP2 low-strength cut-point" is correct. "The patient has sarcopenia" is not.
- Do NOT interpret DEXA or laboratory results for clinical decision-making. Report the value against the published cut-point and stop.
- Do NOT use BIA-derived lean mass as the basis for a triage decision. Bioimpedance over-reads fat-free mass loss in dehydrated patients, and this population is frequently dehydrated. Trend only, and say so in the report.
- Do NOT soften a RED. Functional decline is the entire signal this program exists to catch.

## Failure Handling
- **Missing baseline:** cannot compute change from baseline. Triage on absolute criteria only (EWGSOP2 cut-points, gait speed, protein, adherence, falls) and state: "No baseline on file — trend-based criteria not evaluated."
- **First check-in:** absolute criteria only. State "First check-in — no trend available."
- **Missing grip:** flag as an incomplete assessment. Grip is the primary measure; a check-in without it is not a check-in. Do not substitute another measure for it.
- **Missing protein or adherence:** evaluate remaining criteria, note the gap explicitly.
- **Empty check-in:** report "No data provided — cannot triage." Generate nothing further.

## Evidence Base for These Thresholds

Every threshold in the triage engine traces to a numbered entry in
`protocols/references.md`. When a clinician asks where a cut-point comes from — and they
will — cite the entry, not the skill.

| Threshold | Source |
|---|---|
| Grip <27 kg (M) / <16 kg (F); 5×STS >15 s; gait ≤0.8 m/s; ALMI <7.0/<5.5 kg/m² | Cruz-Jentoft et al., *Age and Ageing* 2019;48(1):16–31 (EWGSOP2) — A1 |
| Grip as primary measure over chair stand | RESORT, *Age and Ageing* 2022;51(11) — A3 |
| 30–40% of weight lost is fat-free mass | *Metabolites* 2026;16(6):364 — B1 |
| Proportional lean mass improves on semaglutide (the counterpoint to cite alongside) | Wilding et al., STEP 1 DEXA substudy — B2 |
| Strength as the primary KPI in energy deficit | Meta-analysis, PubMed 34623696 — C1 |
| Protein 1.2–1.6 g/kg; 20–30 g per feeding | PMC12693348 — D2 |
| Protein shortfall is common and predicts muscle loss | PMC12419545 — D1; ENDO 2026 — F3 |
| BIA unreliable in dehydrated patients | Protocol §4, extended battery |

## Related
- `protocols/post-glp1-conditioning.md` — the full protocol this implements
- `protocols/references.md` — annotated bibliography with evidence grading
- `client-checkin-analyzer` — the endurance-athlete equivalent, same rules-first architecture
