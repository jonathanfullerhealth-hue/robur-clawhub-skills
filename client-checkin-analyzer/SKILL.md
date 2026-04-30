---
name: client-checkin-analyzer
description: Analyze athlete check-in data (wellness metrics, HRV, sleep, soreness, shift work) and produce a triage status (RED/YELLOW/GREEN) with actionable coaching draft. Rule-based risk assessment before LLM — no false positives.
metadata: {"openclaw":{"emoji":"🏥","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Client Check-In Analyzer — Rule-Based Athlete Triage

## What It Does
Takes an athlete's check-in data (subjective wellness scores, HRV, sleep, shift work history) and produces:
1. **Triage status** — RED (needs coach attention today), YELLOW (watch), GREEN (all clear)
2. **Flagged concerns** — specific metrics that triggered each level
3. **Draft coaching message** — ready for coach review and approval before sending

Built on the triage engine from Cairn Coach — a production check-in system used by Jonathan Fuller (BScKin, MScPT) for endurance and longevity athletes.

## Workflow

### Step 1 — Collect Check-In Data
The agent will accept check-in data from any source (form submission, manual entry, wearable export). Required fields:

**Required:**
- Athlete name
- Check-in date

**Wellness metrics (1–10 scale):**
- Fatigue (1–10)
- Soreness (1–10)
- Mood (1–10)
- Motivation (1–10)

**Recovery metrics:**
- HRV (ms)
- Resting HR (bpm)
- Sleep hours
- Sleep quality (1–10)

**Session data:**
- RPE of last session (1–10)
- Session completed (description or "rest day")

**Context:**
- Shift worked? (yes/no)
- Shift hours
- Athlete notes
- Current training phase and weeks to race

### Step 2 — Rule-Based Triage Engine

Apply these rules in order. No LLM for triage — this is deterministic.

```
RED FLAG CONDITIONS (count):
- Fatigue ≥ 8 → +1 red flag
- Soreness ≥ 8 → +1 red flag
- Sleep hours < 5 → +1 red flag
- Shift hours ≥ 16 → +1 red flag
- HRV < 30 ms → +1 red flag

YELLOW FLAG CONDITIONS (count):
- Fatigue 6–7 → +1 yellow flag
- Soreness 6–7 → +1 yellow flag
- Sleep hours 5–6.4 → +1 yellow flag
- Sleep quality ≤ 3 → +1 yellow flag
- Shift hours 12–15 → +1 yellow flag
- HRV 30–44 ms → +1 yellow flag

FINAL TRIAGE:
- RED: 2+ red flags, OR 1 red flag + 2+ yellow flags
- YELLOW: 1 red flag, OR 2+ yellow flags
- GREEN: Everything else
```

**Important:** Triage is data-driven, not narrative. Red flags are not judgments — they're signals that need coach context.

### Step 3 — Generate Flag Summary

For each flagged metric, explain what it means:

```
RED FLAGS:
- Fatigue: 8/10 — athlete is reporting significant fatigue. Context: 3 consecutive night shifts completed before check-in.
- Sleep: 4.2 hours — below minimum threshold. Likely shift-work related.

YELLOW FLAGS:
- HRV: 38 ms — trend is declining. Was 45 ms last check-in.
- Soreness: 6/10 — localized to calves. Unusual for this athlete.
```

### Step 4 — Draft Coaching Response

Draft a coaching message in the coach's voice:

- **RED athletes:** Direct, no softening. Name the data. "Your HRV is at 38 ms and you slept 4 hours — we're going to adjust this week." Include a specific plan modification recommendation.
- **YELLOW athletes:** Acknowledge the data, offer choice. "I see fatigue is trending up. We can keep this week as planned or pull back one session. Your call."
- **GREEN athletes:** Brief acknowledgment. "Recovery looks solid. On track for the build block. Keep doing what you're doing."

Draft format:
```
[Draft coaching message — 2–4 paragraphs, coach's voice]

Next session recommendation: [Proceed as planned / Modify / Rest]

🔍 REQUIRES COACH REVIEW BEFORE SENDING.
```

### Step 5 — Trend Tracking (If Prior Data Available)

If the coach provides previous check-in data, identify trends:

- **HRV trend:** Rising, stable, or declining over last 3 check-ins
- **Fatigue trend:** Increasing (accumulated load risk), stable, or decreasing (recovering)
- **Sleep debt:** Consecutive nights below 7 hours
- **Shift work compounding:** Multiple long shifts in a row

## Output Format

```
────────────────────────
CHECK-IN ANALYSIS — [Athlete Name]
Date: [date] | Phase: [phase] | [N] weeks to race
────────────────────────

TRIAGE: 🔴 RED / 🟡 YELLOW / 🟢 GREEN

SUMMARY:
[Athlete name] is [triage status] with [N] red flags and [N] yellow flags.

DETAILED FLAGS:
[Red flag 1 — metric, value, context]
[Red flag 2 — metric, value, context]
[Yellow flag 1 — metric, value, context]

TRENDS (if prior data available):
- HRV: [rising / stable / declining] — last 3 values: [a, b, c]
- Fatigue: [increasing / stable / decreasing]
- Sleep debt: [N] nights below 7 hours
- Shift compounding: [yes / no]

────────────────────────
DRAFT COACHING MESSAGE:

[Message text here — 2–4 paragraphs]

Recovery recommendation: [Proceed as planned / Modify / Rest]
🔍 REQUIRES COACH REVIEW BEFORE SENDING.
────────────────────────
```

## Guardrails
- Do NOT send any message to the athlete. Output is draft-only for coach review and approval.
- Do NOT override the rule-based triage with narrative reasoning. Triage is deterministic. If the rules say RED, output RED — then explain why.
- Do NOT fabricate trend data. If no prior data available, state "No prior data — first check-in."
- Do NOT suggest medical diagnoses. Flag concerns as training load management issues, not medical conditions. "Recommend consulting a physiotherapist" is OK. "This looks like patellar tendinopathy" is not.
- Do NOT downplay RED status. If metrics are poor, say so directly. Softening the message defeats the purpose of triage.
- Do NOT generate workout prescriptions. The coach may modify sessions — flag recommendations, don't generate new plans.

## Failure Handling
- If no subjective metrics provided (fatigue, soreness, etc.) but objective data exists (HRV, sleep): triage on objective data only with a note: "Subjective data missing — triage based on recovery metrics alone."
- If only subjective data provided: triage normally, flag "Objective metrics missing — consider HRV or sleep tracking."
- If check-in is completely empty: report "No data provided — cannot triage." Do not attempt to generate anything.
- If shift schedule is irregular or unknown: note it and flag shift work as a potential compounding factor, but don't guess.

## Example

```
────────────────────────
CHECK-IN ANALYSIS — Alex M.
Date: 2026-04-28 | Phase: Build | 8 weeks to race
────────────────────────

TRIAGE: 🔴 RED

SUMMARY:
Alex is RED with 2 red flags and 1 yellow flag.

DETAILED FLAGS:
🔴 Fatigue: 9/10 — athlete reports "wiped out after back-to-back night shifts"
🔴 HRV: 28 ms — lowest reading in 3 months, down from baseline of 48
🟡 Sleep: 5.1 hours — 3rd consecutive night under 6 hours (night shift pattern)

TRENDS:
- HRV: Declining — last 3 values: 45, 38, 28
- Fatigue: Increasing — last 3 values: 6, 7, 9
- Sleep debt: 3 nights below 7 hours
- Shift compounding: Yes — 3 long shifts in 5 days

────────────────────────
DRAFT COACHING MESSAGE:

Hey Alex,

Your check-in data is telling a clear story this week: HRV dropped to 28 ms, fatigue hit 9/10, and you're in the middle of a heavy shift rotation with only 5 hours of sleep per night.

We're going to modify this week. The Thursday speed session gets swapped for a 30-minute zone 1 shuffle or rest — your call depending on how you feel after the next shift. Saturday's long run stays but gets cut to 60 minutes at conversational pace, not the planned 90.

One rule: if HRV stays below 35 ms after tomorrow's rest day, take Friday off entirely. No guilt. This is the adjustment we planned for.

🔍 REQUIRES JONATHAN REVIEW BEFORE SENDING.
────────────────────────
```
