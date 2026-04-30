---
name: training-plan-builder
description: Generate structured weekly training plans for trail/ultra runners and tactical athletes. Takes athlete profile, goal race, weekly hours, and shift schedule — outputs a 7-day plan with specific workouts, zones, durations, and adjustment logic.
metadata: {"openclaw":{"emoji":"📊","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Training Plan Builder — Trail & Ultra Running Coach

## What It Does
Takes an athlete's profile (goal race, available training hours, shift schedule, fitness level, injuries) and generates a structured weekly training plan. Works for any endurance coach who wants to move from "here's a general plan" to "here's a plan built around your actual schedule and capacity."

Built on periodization principles used by Jonathan Fuller (BScKin, MScPT) — a clinical exercise therapist and ultra runner with finishes at Canadian Death Race, The Divide 200, Iron Legs 100km, and Lone Wolf Backyard Ultra.

## Workflow

### 1. Collect Athlete Profile
The agent will ask for or accept these fields:

| Field | Required | Example |
|-------|----------|---------|
| Name | Yes | "Alex" |
| Age | Yes | 34 |
| Goal race | Conditional | "Canadian Death Race" |
| Goal date | Conditional | "2026-08-15" |
| Weeks to race | Conditional | 16 |
| Weekly training hours available | Yes | 8 |
| Shift schedule | Yes | "Rotating 12s — 2 days, 2 nights, 4 off" |
| Current fitness level | Yes | "Intermediate — running 5 years, one 50k finish" |
| Longest recent run | Yes | 25 km |
| Zone 2 HR | Recommended | 132–148 bpm |
| Max HR | Recommended | 185 bpm |
| Current injuries / limitations | Yes | "Mild patellar tendinopathy, managed with isometric holds" |
| Primary training phase | Recommended | Base / Build / Peak / Taper / Race |
| Notes | Optional | "Prefers morning sessions. Struggles with mid-week long runs on night shifts." |

**Goal race required for:** build/peak/taper phases. If no goal race is set, the plan defaults to "maintenance / general base" mode with no peak week.

### 2. Select Week Parameters
- **Week number** in the training block (default: 1)
- **Phase:** Base / Build / Peak / Taper / Race / Maintenance
- **Previous week feedback** (optional): actual vs planned completion, athlete notes

### 3. Agent Generates 7-Day Plan

Each day includes:
```
DAY: [Day of week]
TYPE: [Rest | Easy Run | Long Run | Speed Work | Recovery Run | Strength | Cross Train | Zone 2 | Race]
DURATION: [minutes or km, adjusted for shift work and phase]
INTENSITY: [HR zone or RPE target]
NOTES: [form cues, terrain recommendation, shift-work context]
```

### 4. Plan Structure by Phase

**Base Phase** (Weeks 1–6):
- Focus: Aerobic foundation, volume accumulation, form work
- Typical week: 3–4 runs + 1–2 strength sessions
- Long run: 25–35% of weekly volume, conversational pace
- Intensity: 80% Zone 2, 20% threshold/strides

**Build Phase** (Weeks 7–12):
- Focus: Race-specific work, intensity development, sustained efforts
- Typical week: 4–5 runs + 1 strength session
- Long run: progressive — build toward 70–80% of race distance
- Intensity: 65–70% Zone 2, 15–20% threshold, 10–15% speed work

**Peak Phase** (Weeks 13–14):
- Focus: Race simulation, confidence, specificity
- Typical week: 4 runs + 1 strength (light)
- Long run: race-pace efforts within long run
- Intensity: Maintain top-end, reduce volume by 15–20%

**Taper Phase** (Weeks 15–16):
- Focus: Freshness, sharpness, arrival at start line ready
- Volume reduction: 20% (week 1 of taper), 40% (week 2)
- Keep intensity: One race-pace effort in the final week
- Long run: No longer than 90 minutes

**Maintenance / General Base** (no race date):
- Focus: Consistent volume, address weaknesses, injury prevention
- Typical week: 3–4 runs + 2 strength sessions
- No peak week. No taper. Stable volume with periodic build cycles.

## Shift Work Adjustments (Non-Negotiable)

Shift work is a training stress, not just an inconvenience. The agent MUST apply these rules:

- **Night shift nights:** No early-morning sessions scheduled for that day. Rest or PM session (gentle) only.
- **Shift change day:** Treat as recovery. The athlete is transitioning circadian rhythm.
- **Long shifts (12h+):** Max session duration 45 minutes easy or rest. Treat as a stress equivalent to a hard workout.
- **Rotating shifts:** Lower the long run expectation by 15–20% during rotation weeks. The compounding sleep debt requires recovery, not additional training load.
- **Post long-shift rest day:** Schedule recovery the day after a 12h+ shift, not a workout.

If shift schedule is regular (M–F, 9–5): standard periodization applies with weekend long runs.

## Workout Type Library

### Easy Run
- Purpose: Aerobic maintenance, recovery between hard sessions
- Intensity: Zone 1–2, RPE 3–4
- Duration: 30–60 minutes
- Terrain: Flat to rolling, soft surfaces preferred

### Long Run
- Purpose: Aerobic endurance, time on feet, race simulation
- Intensity: Zone 2, RPE 4–6 (last 20% at race effort for build/peak)
- Duration: 60–240+ minutes depending on phase
- Progression: Weekly increase 10–15% max. Every 4th week: step-back week (reduce long run by 30–40%).

### Speed Work
- Purpose: VO2max, running economy, neuromuscular
- Types: Track intervals (400–1600m), hill repeats, tempo intervals, cruise intervals
- Intensity: Zone 4–5, RPE 7–9
- Duration: 20–40 minutes of hard effort within a 60–75 minute session

### Threshold / Tempo Run
- Purpose: Lactate threshold, sustained race pace
- Intensity: Zone 3–4, "comfortably hard" — RPE 6–7
- Duration: 20–40 minutes continuous or broken into 2–3 segments

### Recovery Run
- Purpose: Active recovery blood flow, form work
- Intensity: Zone 1, RPE 2–3
- Duration: 20–35 minutes
- Notes: Must feel trivial. If it doesn't, rest instead.

### Strength Training
- Purpose: Injury prevention, running economy, power
- Focus: Single-leg work, posterior chain, core, plyometrics (phase-appropriate)
- Duration: 30–50 minutes
- Frequency: 1–2 sessions per week depending on phase

### Cross Training
- Purpose: Aerobic maintenance with reduced impact
- Options: Bike, swim, elliptical, rower
- Intensity: Zone 2
- Duration: 40–60 minutes

### Rest
- Purpose: Full recovery. No structured training.
- Can include: walking, stretching, mobility work (not counted as training)

## Adjustment Logic (Week-to-Week)

When the coach provides previous week feedback, apply these rules:

- **If fatigue ≥ 8/10 or HRV ≤ 30 ms:** Reduce volume by 20–30% for the next week. Keep intensity low.
- **If athlete completed ≤ 60% of planned sessions:** Reassess — is the plan too aggressive or were there external factors? If shift-work related, reallocate training to off-days.
- **If long run was cut short due to injury or pain flare:** Schedule a lighter week with a consultation note. Do not repeat the same session.
- **If athlete reports high motivation but low energy:** Protect the athlete from themselves — keep the plan conservative. High motivation doesn't mean recovered.

## Output Format

```
────────────────────────
TRAINING PLAN — WEEK [N]
Athlete: [Name]
Phase: [Base / Build / Peak / Taper / Maintenance]
Week of: [Date]
────────────────────────

DAY | TYPE | DURATION | INTENSITY | NOTES
----|------|----------|-----------|------
Mon | Easy Run | 45 min | Z2, RPE 4 | Flat route, form focus
Tue | Speed Work | 60 min | Z4, RPE 8 | 5x800m @ 5k pace, 3 min jog recovery
Wed | Recovery Run | 30 min | Z1, RPE 2 | Trivial effort only
Thu | Rest | — | — | Mobility work optional
Fri | Long Run | 90 min | Z2, RPE 5 | Rolling hills, practice fueling
Sat | Strength | 45 min | — | Single-leg focus, posterior chain
Sun | Easy Run | 40 min | Z2, RPE 4 | Recovery spin

────────────────────────
WEEKLY VOLUME: [total minutes/km] | HARD SESSIONS: [count] | [ADJUSTMENT NOTES IF ANY]
🔍 REQUIRES COACH REVIEW BEFORE SENDING.
────────────────────────
```

## Guardrails
- Do NOT generate plans for athletes with unmanaged injuries. If injuries are listed without a management plan, flag: "This athlete has reported [injury]. Recommend medical/physio clearance or injury management protocol before training prescription."
- Do NOT increase volume by more than 15% week over week. Use a step-back week every 4th week.
- Do NOT schedule hard sessions on consecutive days without rest. Hard-Easy is the minimum cadence.
- Do NOT schedule strength training the day before or after a long run or race.
- Do NOT exceed 3 hard sessions per week during build/peak phases.
- Do NOT prescribe race-pace efforts within 7 days of an actual race date.
- Do NOT fabricate HR zones or RPE targets. Use standard training zones (Z1 = 50–60% max HR, Z2 = 60–70%, Z3 = 70–80%, Z4 = 80–90%, Z5 = 90–100%).
- Output is draft-only. Final plan requires coach review and approval.

## Failure Handling
- If the athlete hasn't provided a goal race or weekly hours, flag these as required before generating.
- If shift schedule is unknown, default to standard M–F with weekends free.
- If fitness level is "beginner" or "new to running," cap max weekly volume at 4 hours with 1 hard session.
- If injury information is vague ("knee pain"), flag: "Specific diagnosis needed. Recommend assessment."
