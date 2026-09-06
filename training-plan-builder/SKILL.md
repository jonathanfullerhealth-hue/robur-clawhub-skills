---
name: training-plan-builder
description: Generate structured weekly training plans for trail/ultra runners and tactical athletes. Takes athlete profile, goal race, weekly hours, and shift schedule — outputs a 7-day plan with specific workouts, intensity targets, vertical gain, durations, and adjustment logic. Uses ultra-specific periodization, NGP for trail intensity, and vert as a first-class volume metric.
metadata: {"openclaw":{"emoji":"📊","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Training Plan Builder — Trail & Ultra Running Coach

## What It Does
Takes an athlete's profile (goal race, available training hours, shift schedule, fitness level, injuries) and generates a structured weekly training plan. Works for any endurance coach who wants to move from "here's a general plan" to "here's a plan built around your actual schedule and capacity."

Built on periodization principles used by Jonathan Fuller (BScKin, MScPT) — a clinical exercise therapist and ultra runner with finishes at Canadian Death Race, The Divide 200, Iron Legs 100km, and Lone Wolf Backyard Ultra.

Trail and ultra specifics — periodization shape, interval dosing, vert as a volume metric, NGP limitations, and fueling targets — are sourced in `docs/koop-methodology-notes.md`.

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
| Current weekly vertical gain | Yes (trail/ultra) | 600 m |
| Goal course vert per km | Recommended | "5000 m over 125 km = 40 m/km" |
| Terrain access | Yes (trail/ultra) | "Sustained 400 m climbs 20 min from home; nothing longer" |
| Current injuries / limitations | Yes | "Mild patellar tendinopathy, managed with isometric holds" |
| Primary training phase | Recommended | Prep / Intensity / Specific / Peak / Taper / Race |
| Notes | Optional | "Prefers morning sessions. Struggles with mid-week long runs on night shifts." |

**Goal race required for:** intensity/specific/peak/taper phases. If no goal race is set, the plan defaults to "maintenance / general base" mode with no peak week.

**Vert is a required volume metric for any trail or ultra goal.** Track time, distance, *and* vertical gain. A plan specified only in duration and heart rate is under-specified for mountain racing.

### 2. Select Week Parameters
- **Week number** in the training block (default: 1)
- **Phase:** Prep / Intensity / Specific / Peak / Taper / Race / Maintenance
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

**Read this before using the phase table.** For an ultramarathon goal the season runs
**high-intensity / lower-volume early → low-intensity / high-volume and highly specific
late**, moving from least event-specific to most event-specific as the race approaches.

This is close to the inverse of the standard road-marathon shape (base → build intensity →
peak → taper). The reason is simple: the end state you are training toward in a mountain
ultra is *long, sustained, vert-heavy, fueled, on race terrain*. That belongs nearest the
race. Speed work is the least specific thing an ultrarunner does, so it goes earliest,
where it can raise the ceiling without competing with specificity.

For a **sub-ultra road goal**, invert back to the conventional shape. Say which one you are
applying and why in the plan notes.

**Prep Phase** (early, furthest from race):
- Focus: Consistency, injury resilience, running economy, strength foundation
- Typical week: 3–4 runs + 2 strength sessions
- Long run: 25–30% of weekly volume, conversational
- Intensity: mostly low, strides and short hills to keep the legs honest

**Intensity Phase** (least specific work, done early):
- Focus: VO2max and threshold development while volume is still moderate
- Typical week: 4–5 runs (2 hard) + 1–2 strength
- Long run: steady, 30% of weekly volume
- Intensity: 2 quality sessions/week — see interval protocols below
- Volume: moderate. Do not chase peak volume and peak intensity simultaneously.

**Specific Phase** (the longest phase for ultra):
- Focus: Race specificity — terrain, vert, duration, fueling, night running, heat
- Typical week: 4–6 runs (1 hard, occasionally 0) + 1 strength
- Long run: the centrepiece. Progressive toward race demands. Back-to-back long weekends
  where the athlete's recovery and schedule allow.
- Intensity: high-intensity work drops to maintenance — one session per 1–2 weeks
- Vert: ramps toward goal-course vert/km ratio
- **Every long run in this phase is a fueling rehearsal.** See gut training below.

**Peak Phase** (2–3 weeks):
- Focus: Largest specific sessions, race simulation, full kit and nutrition rehearsal
- Typical week: 4–5 runs + 1 light strength
- Long run: longest of the block, on terrain closest to the course
- Note: peak long run for a 100-miler is a time-on-feet and fueling rehearsal, not a
  distance rehearsal. Do not chase race distance in training.

**Taper Phase** (2–3 weeks for ultra):
- Focus: Arriving recovered and confident
- Volume reduction: ~20% (first taper week), ~40%, then ~60% in race week
- **Keep intensity, cut volume.** Short quality efforts preserve sharpness; long efforts do
  not — they only add fatigue this close in.
- Vert: reduce sharply. Descent volume in particular — eccentric damage takes longest to
  clear.
- Taper is the lowest-leverage phase in the hierarchy. Do not let a good taper be undone by
  panic training, and do not let taper anxiety drive plan changes.

**Maintenance / General Base** (no race date):
- Focus: Consistent volume, address weaknesses, injury prevention
- Typical week: 3–4 runs + 2 strength sessions
- No peak week. No taper. Stable volume with periodic build cycles.

### Intensity distribution targets

Across a season, aim for roughly **20% of sessions and only ~10% of total hours** at high
intensity, with the large remainder genuinely easy. The two failure modes to check for and
call out:

- **Grey zone drift** (most common): "easy" runs creeping to moderate. This buys fatigue
  without buying adaptation, and it is the single most common structural error in
  self-coached ultrarunners.
- **Intensity avoidance**: an all-slow plan on the theory that ultra is a slow sport. The
  ceiling stops rising.

### Time at intensity — the variable that matters

For quality sessions, **total accumulated time at intensity** is the number to prescribe
against, not the number of reps or the pace hit on any single one.

- Individual intervals: **2–4 minutes**, recovery approximately equal to work (1:1)
- Accumulate **12–24 minutes total at intensity** per session
  - Beginner: 4 × 3 min (12 min)
  - Advanced: 6 × 3 min (18 min)
  - Elite: 5 × 4 min (20 min)
- Target >90% VO2max effort on the work intervals

A session totalling 5 minutes at intensity is a warm-up. Say so rather than shipping it.

**Block training** (experienced athletes only): work the same energy system on consecutive
days — 6 × 3 min then 5 × 4 min the following day, or 4 × 8 min then 3 × 10 min for
threshold. Concentrates the stimulus. Do not prescribe to novices, to anyone in a heavy
shift rotation, or to an athlete with a YELLOW or RED check-in.

### Ultra is four sports

Walking, uphill running, downhill running, and flat running have distinct demands. A plan
that prescribes only duration and heart rate trains one of the four.

- **Power hiking** must be trained if the goal course demands it. Steep sustained grades
  where hiking is faster than running are a skill and an energy system, not a fallback.
- **Downhill running is limited by eccentric muscle damage tolerance, not aerobic cost.**
  It does not train itself on the way back down, and it is not recovery. Prescribe
  deliberate descent volume, progress it conservatively, and expect 48h+ soreness after
  meaningful descent work.
- **Uphill running** at sustained effort is its own quality session and often a better
  intensity vehicle than flat intervals for a mountain athlete.

### Gut training

Fueling carries a heavier penalty in ultra than any shorter event, purely because exposure
time is so long that an error compounds across half a race.

- **Race working target: 50–75 g carbohydrate/hour** for most athletes in most situations.
- **Train the gut above that.** Selected long runs in the Specific and Peak phases should be
  fueled at **~90 g/hr** using multiple transportable carbohydrates (glucose + fructose —
  they use separate intestinal transporters, which is what raises the ceiling). The gut
  adapts to load like everything else.
- Assume the athlete is **under-fueling** until proven otherwise. Self-reports commonly land
  at 80–120 cal/hr against a 240–260 cal/hr requirement.
- Prescribe the fueling rate in the session notes as an actual number. "Practice fueling" is
  not a prescription.

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
- Purpose: Aerobic endurance, time on feet, race simulation, fueling rehearsal
- Intensity: Zone 2, RPE 4–6 (last 20% at race effort in Specific/Peak)
- Duration: 60–240+ minutes depending on phase
- Progression: Weekly increase 10–15% max. Every 4th week: step-back week (reduce long run by 30–40%).
- **Prescribe vert and fueling rate explicitly**, not just duration.
- Measure long runs in **time on feet, not distance**, for ultra. Distance on mountain
  terrain is a poor proxy for load and encourages athletes to pick the wrong route.

### Back-to-Back Long Runs
- Purpose: Concentrate training load into a short window — worth more than the same monthly
  hours spread evenly, and rehearses running on pre-fatigued legs
- Structure: Long run on consecutive days. Day 2 typically 60–75% of day 1.
- Intensity: **65–70% of the combined work stays conversational.** Running back-to-backs
  hard raises stress hormones without buying the metabolic adaptation that makes the format
  work — at which point you have taken the cost and left the benefit.
- Phase: Specific and Peak only
- **Do not prescribe to:** novices, athletes in a shift rotation that week, or anyone whose
  last check-in was YELLOW or RED

### Speed Work / VO2max Intervals
- Purpose: VO2max, running economy, neuromuscular — raises the ceiling
- Structure: intervals of **2–4 min**, recovery ≈ equal to work, accumulating **12–24 min
  total time at intensity** (4 × 3 beginner, 6 × 3 advanced, 5 × 4 elite)
- Intensity: >90% VO2max, Zone 4–5, RPE 8–9
- Session total: 60–75 minutes including warm-up and cool-down
- Phase: heaviest in the Intensity phase, maintenance dose thereafter
- On trail, uphill intervals are often the better vehicle — grade enforces the effort and
  reduces impact load

### Uphill Sustained Effort
- Purpose: Climbing-specific strength and threshold, race-specific for mountain courses
- Structure: 8–20 min sustained climbing efforts, 2–4 reps, easy descent between
- Intensity: Zone 3–4, RPE 6–8
- Notes: Prescribe by grade and duration. If the athlete lacks a long enough climb, use
  repeats on what they have rather than pretending the terrain exists.

### Downhill / Eccentric Loading
- Purpose: Eccentric damage tolerance for descent-heavy courses. **This is its own
  discipline and it is not recovery.**
- Structure: Controlled sustained descents, 15–40 min of cumulative descent, progressed
  conservatively over weeks
- Intensity: Effort is deliberately not the target — control and turnover are. **Do not use
  NGP or GAP to judge downhill intensity**; the grade-adjustment formulas are sound uphill
  and break down on descent, because oxygen cost is not the limiter.
- Progression: Start low. Expect 48h+ soreness after meaningful descent work and schedule
  accordingly.
- Frequency: Once per week maximum, never the day before a quality session
- Phase: Introduce in Specific phase, reduce sharply in taper

### Power Hiking
- Purpose: Sustained steep-grade travel — a trained skill and energy system, not a fallback
- Structure: Sustained steep hiking, poles if the race allows them, 20–60 min blocks
- Intensity: Zone 2–3, RPE 5–7
- Notes: Train with the actual race kit — poles, pack, vest weight. Prescribe if the goal
  course has grades where hiking beats running.

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
Phase: [Prep / Intensity / Specific / Peak / Taper / Maintenance]
Periodization model: [Ultra — intensity early, specificity late / Conventional road]
Week of: [Date]
────────────────────────

DAY | TYPE | DURATION | VERT | INTENSITY | NOTES
----|------|----------|------|-----------|------
Mon | Easy Run | 45 min | 100 m | Z2, RPE 4 | Flat route, form focus
Tue | Uphill Intervals | 70 min | 500 m | Z4-5, RPE 8 | 6x3 min hard uphill, 3 min easy down. 18 min at intensity.
Wed | Recovery Run | 30 min | 50 m | Z1, RPE 2 | Trivial effort only
Thu | Rest | — | — | — | Mobility work optional
Fri | Long Run | 150 min | 900 m | Z2, RPE 5 | Race terrain. Fuel at 90 g carb/hr — gut training.
Sat | Long Run (B2B) | 100 min | 600 m | Z2, RPE 4-5 | Day 2. Conversational throughout, no exceptions.
Sun | Strength | 45 min | — | — | Single-leg focus, posterior chain

────────────────────────
WEEKLY VOLUME: [total time] | [total km] | [total vert m]
HARD SESSIONS: [count] | TIME AT INTENSITY: [total min]
FUELING PRESCRIBED: [g carb/hr on which sessions]
[ADJUSTMENT NOTES IF ANY]
🔍 REQUIRES COACH REVIEW BEFORE SENDING.
────────────────────────
```

## Guardrails
- Do NOT generate plans for athletes with unmanaged injuries. If injuries are listed without a management plan, flag: "This athlete has reported [injury]. Recommend medical/physio clearance or injury management protocol before training prescription."
- Do NOT increase volume by more than 15% week over week. Use a step-back week every 4th week.
- Do NOT schedule hard sessions on consecutive days without rest. Hard-Easy is the minimum cadence.
- Do NOT schedule strength training the day before or after a long run or race.
- Do NOT exceed 3 hard sessions per week during the Intensity phase, or 1–2 during Specific/Peak.
- Do NOT prescribe race-pace efforts within 7 days of an actual race date.
- Do NOT fabricate HR zones or RPE targets. Use standard training zones (Z1 = 50–60% max HR, Z2 = 60–70%, Z3 = 70–80%, Z4 = 80–90%, Z5 = 90–100%).
- Do NOT ship a quality session with under 12 minutes of accumulated time at intensity. If the athlete's capacity doesn't support 12 minutes, prescribe a threshold session instead and say why.
- Do NOT use NGP or GAP to prescribe or evaluate **downhill** intensity. The grade-adjustment formulas are sound uphill and break down on descent, because oxygen cost is not the downhill limiter. Use duration, vert loss, and RPE.
- Do NOT prescribe downhill-specific work on consecutive days, or the day before a quality session. Eccentric damage takes 48h+ to clear.
- Do NOT ramp weekly vertical gain faster than volume. Vert is a load in its own right — a 15% time increase paired with a 60% vert increase is a 60% increase.
- Do NOT write "practice fueling" without a number. Prescribe grams of carbohydrate per hour.
- Do NOT prescribe back-to-back long runs to novices, to athletes in a shift rotation that week, or to anyone whose last check-in was YELLOW or RED.
- Do NOT chase race distance in training for a 100 km or 100 mile goal. The peak long run is a time-on-feet and fueling rehearsal.
- Do NOT apply the ultra periodization model to a sub-ultra road goal. State which model is in use and why.
- Output is draft-only. Final plan requires coach review and approval.

## Failure Handling
- If the athlete hasn't provided a goal race or weekly hours, flag these as required before generating.
- If shift schedule is unknown, default to standard M–F with weekends free.
- If fitness level is "beginner" or "new to running," cap max weekly volume at 4 hours with 1 hard session.
- If injury information is vague ("knee pain"), flag: "Specific diagnosis needed. Recommend assessment."
- If the goal is trail/ultra but no current vert or terrain access is given, flag both as required. Do not invent a vert prescription for terrain the athlete may not have — an unreachable plan is worse than a conservative one.
- If terrain access cannot support the goal course's demands (e.g. a 40 m/km course and no climb longer than 150 m), say so directly and prescribe the best available substitute — repeats, treadmill grade, stair work, weighted hiking — rather than writing sessions the athlete cannot do.
