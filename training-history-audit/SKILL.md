---
name: training-history-audit
description: Audit an athlete's training history export (TrainingPeaks, Strava, Garmin) for fundamental errors, bad data, and individual response patterns. Produces a findings report for onboarding consults or periodic review. Scrubs anomalous GPS/HR data before analysing.
metadata: {"openclaw":{"emoji":"🔎","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Training History Audit — Find the Gains Before Prescribing

## What It Does

Takes an athlete's historical training data and answers two questions:

1. **Where are the fundamental errors?** — the structural mistakes costing this athlete
   performance right now, before any clever intervention is considered.
2. **How does *this* athlete respond to training?** — the individual response patterns that
   make future prescription specific rather than generic.

Two use cases:

- **Onboarding / consult.** Audit an incoming athlete's last 6–12 months before writing a
  single session. This is the highest-credibility thing you can put in front of a prospect,
  because it's specific to them and demonstrably not a template.
- **Periodic review.** Run quarterly on current athletes to build the longitudinal record
  that makes individualization possible later.

The premise, stated publicly by coaches working at the top of the sport: a large share of
athletes — including experienced and well-coached ones — carry enough fundamental errors in
their training practice to be measurably held back. Scrutiny of the training schedule alone
routinely finds meaningful improvement before anything exotic is added. See
`docs/koop-methodology-notes.md`.

## Inputs

| Input | Required | Notes |
|-------|----------|-------|
| Training history export | Yes | TrainingPeaks CSV, Strava export, or Garmin. 6 months minimum, 12+ preferred |
| Athlete profile | Yes | Age, years running, goal race and terrain, injury history |
| Race results | Recommended | Dates, distances, finish times, and how each race *felt* |
| Post-activity comments | Recommended | Feeds the response-pattern analysis |
| Current plan or coach | Optional | Context for what they were trying to do |

Per-activity fields to use where present: date, duration, distance, **elevation gain/loss**,
average and max HR, NGP or GAP, rTSS, and the athlete's comment.

## Workflow

### Step 1 — Scrub the data first

**Run this before any analysis.** Platform displays apply smoothing; raw exports do not, and
the volume of anomalous data is consistently larger than coaches expect. An unscrubbed
analysis draws confident conclusions from garbage.

Flag and quarantine, do not silently delete:

```
GPS / DISTANCE ANOMALIES:
- Pace faster than 2:30/km sustained >2 min in a non-track run  → likely GPS spike or vehicle
- Elevation gain >2000 m in a run under 2 h                      → barometric/GPS drift
- Distance recorded with zero elevation on known trail terrain   → device or export defect
- Activity duration >18 h                                        → forgot to stop the watch

HR ANOMALIES:
- HR >220 or <30 bpm                                             → strap dropout / cadence lock
- HR flatlined (zero variance) for >5 min                        → sensor failure
- Average HR in Z4+ for an activity >4 h                         → almost certainly wrong

CONSISTENCY:
- Duplicate activities (same start time, two devices)            → deduplicate
- Manual entries with no device data                             → keep, mark lower confidence
```

Report the scrub result explicitly: how many activities were quarantined, on what grounds,
and what percentage of the dataset that represents. If more than 15% is quarantined, say so
loudly and lower confidence on everything downstream.

### Step 2 — Reconstruct the volume picture

Track **all three volume metrics**, monthly. Vert is not optional for trail and ultra
athletes and is the one most commonly missing from an athlete's own understanding of their
training.

- Time (hours/week and /month)
- Distance (km/week and /month)
- **Vertical gain (m/week and /month)**

Chart the trend. Identify: highest month, lowest month, largest week-over-week jumps, and
any gaps longer than 10 days (injury, illness, life, or lost motivation — find out which).

### Step 3 — Audit against fundamentals

Check each. Report as PASS / CONCERN / ERROR with evidence.

```
CONSISTENCY
- What fraction of weeks in the window hit a recognisable training structure?
- Are there repeated stop-start cycles? (the single most common performance leak)
- Ratio of biggest month to smallest month — is this training, or bursts?

INTENSITY DISTRIBUTION
- Approximate share of sessions and of total hours spent at high intensity.
- Reference point: roughly 20% of sessions and ~10% of annual hours at high intensity,
  with the remainder low. Flag both failure modes:
    · too much moderate-intensity grey-zone work (most common)
    · high-intensity work absent entirely from a plan that needs it
- Are hard sessions accumulating enough time at intensity to matter? A session with
  4 min total at intensity is a warm-up, not a workout.

PROGRESSION
- Week-over-week volume jumps >15%
- Absence of step-back weeks (expect roughly every 4th week)
- Ramp rate into the goal race — too steep, too flat, or peaked too early

SPECIFICITY
- Does training terrain match race terrain? Compare vert/km in training vs the goal course.
- Is downhill trained deliberately, or only accumulated incidentally on the way back down?
  Downhill is limited by eccentric damage tolerance, not aerobic cost — it does not train
  itself and it does not count as recovery.
- Is hiking/power-hiking trained at all, if the goal course demands it?
- Heat and altitude exposure, if the race demands them.

RECOVERY
- Rest days per month. Zero rest days is an error, not dedication.
- Back-to-back hard days that were not deliberate block training.
- Evidence of training through illness or injury.

FUELING (if data available)
- Long-run fueling rate vs the 50–75 g carb/hr race working range.
- Any evidence of gut training — sessions deliberately fueled above race target (~90 g/hr).
- Under-fueling is the default finding. Most athletes self-report 80–120 cal/hr against a
  240–260 cal/hr requirement.
```

### Step 4 — Individual response patterns

This is the part that compounds. Look for how *this* athlete specifically responds.

- Which blocks preceded their best performances? Reconstruct the 8–12 weeks before each
  good race and each bad one.
- What load level precedes their injuries or illnesses? Is there a recurring ramp rate or
  volume threshold?
- Which session types do they consistently complete, and which do they consistently skip or
  cut short? Chronic non-compliance with one session type is information about the plan, not
  a character flaw.
- Time-of-day, terrain, or weather patterns in their strong and weak sessions.
- If post-activity comments are available, where did subjective feedback diverge from the
  objective data? Those divergences are the most instructive entries in the whole dataset.

State plainly which of these are **established patterns** (3+ instances) and which are
**single observations**. One bad race is an anecdote.

### Step 5 — Rank the findings

Order by expected performance impact, not by how interesting the finding is. Diagnose in
hierarchy order — volume, rest, intensity, specificity, nutrition, mental skills, taper —
so that a consistency problem gets addressed before an interval-structure problem.

For each finding: what it is, the evidence, the expected impact, and the specific change.

## Output Format

```
────────────────────────
TRAINING HISTORY AUDIT — [Athlete Name]
Window: [start] to [end] | Activities: [N] | Quarantined: [N] ([%])
Goal: [race, date, terrain]
────────────────────────

DATA QUALITY: [GOOD / ACCEPTABLE / POOR]
[Scrub summary — what was quarantined and why. Confidence caveat if >15%.]

VOLUME PICTURE:
- Time:     [avg h/week] | peak month [x] | lowest month [y]
- Distance: [avg km/week] | peak month [x]
- Vert:     [avg m/week] | peak month [x] | vert per km: [ratio]
- Gaps >10 days: [dates, and cause if known]

FUNDAMENTALS AUDIT:
Consistency      [PASS / CONCERN / ERROR] — [evidence]
Intensity dist.  [PASS / CONCERN / ERROR] — [evidence]
Progression      [PASS / CONCERN / ERROR] — [evidence]
Specificity      [PASS / CONCERN / ERROR] — [evidence]
Recovery         [PASS / CONCERN / ERROR] — [evidence]
Fueling          [PASS / CONCERN / ERROR / NO DATA] — [evidence]

INDIVIDUAL RESPONSE PATTERNS:
ESTABLISHED (3+ instances):
- [Pattern] — [evidence across N instances]
SINGLE OBSERVATIONS (do not generalise yet):
- [Observation] — [evidence]

RANKED FINDINGS:
1. [Finding] — Impact: HIGH — Evidence: [...] — Change: [specific action]
2. [Finding] — Impact: MEDIUM — Evidence: [...] — Change: [specific action]
3. [Finding] — Impact: LOW — Evidence: [...] — Change: [specific action]

WHAT'S ALREADY WORKING:
[Do not skip this. Naming what to protect is as important as naming what to fix,
and an audit that is all criticism reads as a sales pitch.]

OPEN QUESTIONS:
- [What the data cannot answer and the athlete must]

🔍 REQUIRES COACH REVIEW BEFORE SENDING.
────────────────────────
```

## Guardrails

- Do NOT analyse before scrubbing. Report the scrub result in every output.
- Do NOT present single observations as patterns. Three instances minimum before calling
  something a response pattern.
- Do NOT infer causation from a training block preceding a good or bad race. Races are
  confounded by weather, course, competition, sleep, and life. Say "preceded," not "caused."
- Do NOT diagnose injuries or medical conditions. Load-management findings only.
- Do NOT generate a training plan here. This audit produces findings; prescription is
  `training-plan-builder`'s job with these findings as input.
- Do NOT manufacture findings to justify the audit. "Training is fundamentally sound, the
  gains here are small and specific" is a legitimate and valuable result. An audit that
  always finds a crisis is a sales instrument, not an analysis.
- Do NOT criticise a previous coach by name or imply malpractice. Report what the data
  shows.
- Do NOT rely on NGP or GAP to judge **downhill** intensity — the grade-adjustment formulas
  are sound uphill and break down on descent, because oxygen cost is not the downhill
  limiter. Use duration, vert loss, and subjective load for downhill instead.

## Failure Handling

- **Under 3 months of data:** run it, but label the output PRELIMINARY and restrict to
  obvious structural findings. Do not attempt response-pattern analysis.
- **No elevation data on a trail athlete:** flag as a data gap, note that specificity
  cannot be assessed, and ask whether the device records barometric altitude.
- **No HR and no NGP/pace:** volume and consistency findings only. State that intensity
  distribution cannot be assessed rather than guessing from perceived effort.
- **Export contains multiple sports:** separate running from cross-training. Report
  cross-training volume separately — do not fold cycling hours into running volume.
- **More than 15% of activities quarantined:** complete the audit, lead with the data
  quality problem, and recommend fixing the recording setup before the next review.
- **Athlete has no goal race:** skip specificity and taper analysis, note it, run the rest.
