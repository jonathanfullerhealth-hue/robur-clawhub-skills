# Research Notes — Jason Koop / CTS Ultrarunning Methodology

**Status:** Internal research notes. Source material for our own training logic.
**Last updated:** 2026-09-06

## Why this file exists

These are notes on publicly published positions from Jason Koop (Head Coach, CTS
Ultrarunning; author of *Training Essentials for Ultrarunning*; KoopCast) and CTS.
They exist so our skills encode *defensible, sourced* trail/ultra logic instead of
generic road-marathon periodization.

**Attribution rules — non-negotiable:**

- These are summaries of publicly available articles and interviews, with links. We do
  not reproduce book content, and we do not ship a "Koop knowledge base."
- Nothing we produce may be presented as Koop's work, in his voice, or as endorsed by
  him or CTS. His product (KoopAI) is explicitly built as his own voice and methodology;
  imitating that is both a legal problem and a credibility problem.
- Where our logic follows a published principle, cite the principle, not the person's
  persona. "Intervals of 2–4 min to accumulate 12–24 min at intensity" is a training
  principle we can use and attribute. "Here's what Koop would say" is not.

---

## 1. Hierarchy of training needs

Adapted by Koop from Stephen Seiler's hierarchy of training priorities (itself a nod to
Maslow). The ordering is the useful part: when an athlete underperforms, diagnose in
hierarchy order rather than jumping to the fashionable intervention.

Rough order, most to least important:

1. **Volume** — you cannot be a good ultrarunner without running a lot.
2. **Rest / recovery** — sits immediately above volume, because volume is unattainable
   without recovery. Notably higher than most athletes place it.
3. **Intensity** — accumulate time at and below threshold before adding exotic work.
4. **Specificity** — terrain, vert, heat, altitude, course demands.
5. **Nutrition** — heavier weighting in ultra than in marathon, because exposure time is
   so long that an error compounds over half a race rather than a few miles.
6. **Mental skills** — ultra selects for well-developed mental skills.
7. **Taper** — least important. Real, but small.

Koop's own framing of where gains actually come from: the fixations (strength protocols,
polarized-vs-pyramidal debates, nutrition paradigms) are worth a few percent each.
Volume, consistency and rest are the big rocks.

Sources:
- [The Hierarchy of Ultramarathon Training Needs — CTS](https://trainright.com/hierarchy-ultramarathon-training-needs-jason-koop/)
- [Ultrarunning: Training, Mental Skills and Hierarchy of Needs — TrainingPeaks](https://www.trainingpeaks.com/coach-blog/ultrarunning-training-hierarchy-needs-jason-koop/)
- [Jason Koop's Top 3 Most Effective Ultramarathon Training Tips — CTS](https://trainright.com/jason-koops-top-3-most-effective-ultramarathon-training-tips/)

## 2. Intensity distribution and interval protocols

- High intensity is roughly **20% of sessions but only ~10% of annual training hours**.
  The distribution is heavily low-intensity; high intensity is used strategically, not
  continuously.
- **Interval prescription:** individual intervals of **2–4 minutes**, recovery roughly
  equal to work (1:1), accumulating **12–24 minutes total time at intensity**.
  - Beginner: 4 × 3 min (12 min at intensity)
  - Advanced: 6 × 3 min (18 min)
  - Elite: 5 × 4 min (20 min)
- Target intensity is >90% VO2max. **Total time at intensity is the variable that
  matters** — too little accumulated time won't drive the adaptation regardless of how
  hard each rep felt.
- **Block training:** for experienced athletes, work the same energy system on
  consecutive days (e.g. 6 × 3 min one day, 5 × 4 min the next; or 4 × 8 min then
  3 × 10 min for threshold). Concentrates stimulus. Not for novices.

Sources:
- [Decoding Interval Workouts for Ultramarathon Training — CTS](https://trainright.com/decoding-interval-workouts-for-ultramarathon-training/)
- [Stop Wasting Miles: Key Workouts Every Ultrarunner Should Do — CTS](https://trainright.com/key-workouts-every-ultrarunner-should-do/)
- [How Block Training Can Help or Hurt Ultramarathon Training — CTS](https://trainright.com/block-training-ultrarunning-ultramarathon/)

## 3. Periodization shape — the correction that matters most for us

For ultramarathon, the annual/seasonal shape runs **high-intensity, low-volume early →
low-intensity, high-volume later**, moving from least event-specific to most
event-specific as the race approaches.

This is close to the inverse of the standard road model (aerobic base → build intensity →
peak → taper) that most plan templates ship with, including our own before this revision.
For a 100 km / 100 mile mountain goal, the specific end-state is *long, slow, vert-heavy,
fueled* — so that belongs nearest the race, with the fast work loaded earlier.

Source: [The Hierarchy of Ultramarathon Training Needs — CTS](https://trainright.com/hierarchy-ultramarathon-training-needs-jason-koop/)

## 4. Ultra is four sports, not one

Walking, uphill running, downhill running, and flat running are distinct disciplines with
distinct demands. Notably, **downhill is not limited by VO2/aerobic cost** — it is limited
by eccentric muscular damage tolerance — so it must be trained deliberately rather than
treated as free recovery on the way down.

Practical consequence: a plan that only prescribes duration and heart rate is
under-specified for mountain ultra. Vert, direction of travel, and hiking are training
variables in their own right.

## 5. Monitoring metrics

- **Three volume metrics, all tracked:** time, distance, and **vertical gain/loss**.
  Koop calls vert a no-brainer to track; most plans omit it.
- **NGP (Normalized Graded Pace)** — grade-adjusts trail running to flat-equivalent pace,
  making trail intensity comparable across terrain. TrainingPeaks native; Strava's
  equivalent is GAP.
  - **Known limitation:** NGP/GAP formulas work well uphill but break down downhill,
    because oxygen cost is not the downhill limiter. Do not prescribe or judge downhill
    intensity off NGP.
- **rTSS → ATL / CTL / TSB** (TrainingPeaks Performance Management Chart):
  - CTL = ~42-day exponentially weighted average of daily TSS → "fitness"
  - ATL = ~7-day exponentially weighted average → "fatigue"
  - TSB = CTL − ATL → "form"/readiness
  - These transfer usefully from cycling/road to trail *provided* TSS is computed off NGP.

Sources:
- [Ultramarathon Runners' Toolkit for Monitoring Training — CTS](https://trainright.com/ultramarathon-runner-toolkit-monitoring-training/)
- [Tracking Training for Trail and Ultramarathon Runners — CTS](https://trainright.com/tracking-training-trail-runners/)
- [What is Normalized Graded Pace? — TrainingPeaks](https://www.trainingpeaks.com/learn/articles/what-is-normalized-graded-pace/)
- [Advanced Analysis Metrics — TrainingPeaks Help](https://help.trainingpeaks.com/hc/en-us/articles/204072154-Advanced-Analysis-Metrics)

## 6. Fueling

- **Race target for most ultrarunners in most situations: 50–75 g carbohydrate/hour.**
  Lab maxima exceed 90 g/hr but that's not the working target for the bell curve.
- **Gut training:** deliberately fuel selected training sessions *above* race target —
  around 90 g/hr — so the gut adapts the same way the rest of the body adapts to load.
  Multiple transportable carbohydrates (glucose + fructose) use separate intestinal
  transporters, which is what lifts the ceiling to 90 and beyond.
- Most athletes are **under-fueled** and are surprised when audited: self-reports commonly
  land at 80–120 cal/hr against a 240–260 cal/hr requirement.
- Nutrition carries a heavier penalty in ultra than in shorter events purely because of
  exposure duration.

Sources:
- [Key Takeaways from ISSN Position Stand on Ultrarunning Nutrition — CTS](https://trainright.com/ultrarunning-international-society-sports-nutrition-position-stand/)
- [What Ultramarathon Runners Can Learn from IAAF Statement on Nutrition — CTS](https://trainright.com/iaaf-statement-nutrition-analysis-ultramarathon-runners/)

## 7. Back-to-back long runs

Value is in **concentrating training load into a short window** — this beats the same
monthly hours spread evenly. Guidance is that roughly **65–70% of back-to-back work stays
conversational**; running them hard raises stress hormones without buying the metabolic
adaptation that makes the format work in the first place.

Source: [Back-to-Back Long Runs and Workouts — Outside Run](https://run.outsideonline.com/training/workouts/back-back-long-runs-workouts-next-level-training-done-right/)

---

## 8. From the podcast transcript (Born on the Trail, Aug 2025) — AI workflow

Not training methodology; operating methodology. These are the claims worth acting on.

- **Post-activity comments are his first "hero metric."** Subjective free-text feedback is
  the first thing he looks at — ahead of the objective data.
- **His first AI build was a sentiment analysis tool**, not a plan generator. He picked it
  because it was simultaneously (a) high value and (b) a task LLMs are genuinely good at.
  He describes it as the thing he uses every day.
- **The method is baseline-then-deviation, not keyword spotting.** Establish how an athlete
  normally communicates — tone, length, vocabulary — then flag *change* from that baseline.
  He's explicit that catching the word "hurt" is the weaker signal; other systems do that
  better. Sentiment *change* is where the leverage is.
- **Second high-leverage build: longitudinal individualization.** Mining 4–10 years of an
  athlete's history for how *this* athlete has responded to training. He notes this matters
  most at the elite end, where generic base work is long since done.
- **Synthesis across channels.** Post-activity comments + WhatsApp + call transcripts +
  email are fragmented; the win is a rolling merged view, not per-channel reading.
- **Voice input.** Many athletes give higher-quality subjective feedback speaking than
  typing. He publicly asked TrainingPeaks/Garmin for a voice recorder on the post-activity
  comment field. The hard part he had to solve himself was *durably pairing a voice memo to
  the specific workout*.
- **Bad data is more common than you think.** Once you pull raw files and strip the
  platform's native smoothing, the volume of anomalous GPS/HR data is surprising. You need
  an explicit policy for handling it or analyses get fooled.
- **Explicit guardrails / declared scope.** KoopAI screens people *out*: existing or
  recent injury, under ~12 months of training, anything sub-ultra, road marathon, 5K.
  Strongest in the 100-mile mountain ultra domain (UTMB/Western States/Aravaipa), weaker
  at backyard ultras and 200+ mile outliers. He says the guardrails deliberately don't
  creep into domains he hasn't approved.
- **Audit-and-heal loop.** He audits tool output against what he would have done, then
  course-corrects the system and adds automatic behaviors so gaps close over time.
- **Skill before tooling.** "AI doesn't cover up bad coaching skill, it enhances it." He
  flags the specific failure mode: the positive-reinforcement loop convinces an unskilled
  operator they're a genius. Unlike the power-meter era, a bad operator with these tools
  is actively led astray rather than merely under-served.

Source: Born on the Trail — *Going Longer* podcast interview with Jason Koop (transcript
supplied by JF, Aug 2025).
