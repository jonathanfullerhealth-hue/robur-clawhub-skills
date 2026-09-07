# Adult Group Strategy — Recommendations

Prepared for Jonathan Fuller (BScKin, MScPT) — September 2026

**Scope: adults only.** Every recommendation below is for participants 18+, and most
target 35+. No minors, no safeguarding regime, no teacher sponsor.

---

## What the adult constraint changes

Everything that made this hard disappears. No parental consent, no vulnerable-sector
gate, no district privacy review for collecting HRV or sleep data, no teacher sponsor as
a blocking dependency, and no conflict-of-interest problem with your business.

Two consequences worth naming:

**Your skills work as built.** `training-plan-builder`, `client-checkin-analyzer`, and
`research-breakdown-generator` were designed for exactly this population. No forking, no
stripping fields, no minor-safe variants. You are not building — you are pointing existing
tools at a room.

**Your business stops being a liability and becomes the point.** With minors, any
connection to Cairn or Fuller Health had to be firewalled. With adults, a group you lead
is legitimate top-of-funnel. It needs disclosure, not concealment — say plainly that you
coach professionally, don't pitch from the front of the room, and let the work recruit.

---

## 1. First responder fitness cohort — highest value, and the timing is unusually good

**Who you help:** firefighters, paramedics, and police whose shift schedules are
dismantling the fitness their job depends on.

**The problem you solve:** departments are being told to run health-related fitness
programs, and almost nobody on staff can write training that survives a rotating 24-hour
schedule.

**What it looks like solved:** a hall of 20 runs a 12-week block, passes their annual
assessment without the usual scramble, and the department renews.

### Why now

**NFPA 1580 (2025 edition)** consolidated four standards — 1581, 1582, 1583, 1584 —
into one *Standard for Emergency Responder Occupational Health and Wellness*, folding in
what used to be 1583 (health-related fitness programs) with revised cardiorespiratory and
aerobic-capacity criteria. Departments are in the transition window now, updating policies
and legal references.
([Professional Health Services](https://phsmobile.com/2026/02/10/nfpa-1582-to-nfpa-1580-explained/),
[NFPA 1580:2025](https://www.intertekinform.com/en-us/standards/nfpa-1580-2025-1385900_saig_nfpa_nfpa_3513850/))

A new standard with a fitness-program requirement and a transition deadline is a
budget-releasing event. Departments need a program and most do not have one.

**The calendar hands you two dated entry points.** Safety Stand Down runs **June 14–20,
2026**, themed *"Firefighter FITNESS: Fit to Serve, Fit for Life."* First Responder Wellness
Week runs **March 23–27, 2026**. Both are pre-existing slots where departments are
actively looking for someone to deliver fitness content.
([Fire Engineering](https://www.fireengineering.com/firefighting/firefighter-health/physical-fitness-is-the-focus-of-safety-stand-down-2026/),
[Lexipol](https://www.firstresponderwellnessweek.com/))

### Why you

This is Cairn's stated audience, and shift-aware programming is a genuinely rare
capability. `training-plan-builder` already takes "rotating 12s — 2 days, 2 nights, 4 off"
as a first-class input. Most fitness professionals pitching a fire hall hand them a generic
block and hope. You hand them a plan built around the schedule that is actually breaking
them, from a clinical exercise background, as someone who has finished a 200-miler.

Sleep deprivation and circadian disruption are named repeatedly in the first-responder
wellness literature as the core problem. That is the thing your tooling models and almost
nobody else's does.

### Structure — a 12-week block

- **Week 0:** baseline session at the hall. Movement screen, aerobic baseline, and a
  conversation about shift patterns. This is also your credibility moment.
- **Weeks 1–12:** individualized plans generated from `training-plan-builder`, keyed to
  each member's rotation. One in-person session per week at the hall, on-shift where the
  department allows it.
- **Weekly:** check-ins through `client-checkin-analyzer` — RED/YELLOW/GREEN triage, run
  as designed, no modifications needed.
- **Week 12:** re-test, and a one-page department report with aggregate outcomes.

**Measurable outcomes:** aerobic capacity change, assessment pass rate, self-reported
sleep and readiness, participation rate. That aggregate report is what gets the second
contract — and it writes itself from data the check-in analyzer already collects.

### Challenges and mitigations

| Risk | Mitigation |
|---|---|
| Getting in the door | Go through the union or the department's peer fitness lead, not the chief's office. Offer the Wellness Week or Stand Down slot free as the entry |
| Skepticism of outside fitness people | Lead with the shift schedule, not with credentials. Being the first person who plans around nights rather than ignoring them is the whole differentiation |
| Attendance across rotations | Never require a fixed weekly time — plans are asynchronous, the in-person session is a floating anchor |
| Scope: you are not their occupational physician | NFPA 1580 medical evaluation is a physician's job. You deliver the fitness program. Say this explicitly and in writing up front |

### Claude Code leverage

`training-plan-builder` and `client-checkin-analyzer` run unmodified. Build one new
thing: a **cohort roll-up** that aggregates weekly check-ins into the department report.
That report is your renewal instrument, and it is a small skill. Gamma for the pitch
one-pager; Calendar for the block; Notion for the roster.

---

## 2. A lifelong-learning course — the truest "school group" for adults, and it pays

**Who you help:** adults 50+ who want to stay strong and active for another thirty years
and are drowning in contradictory longevity content.

**The problem you solve:** they want evidence, not supplements and influencers, and
nobody qualified is teaching them in a room.

**What it looks like solved:** twenty-five people finish an 8-week course able to read a
study, and each leaves with a training plan they wrote themselves.

### Why now

Osher Lifelong Learning Institutes and university continuing-education programs run large
catalogs — Duke offers 200+ courses across three terms, Colorado State 200+ multi-week
courses — and they **actively recruit instructors from outside the faculty**: independent
scholars, working professionals, local business owners. No academic appointment required,
no grades, no tests, no credit.
([Duke Continuing Studies](https://learnmore.duke.edu/olli),
[Colorado State OLLI](https://www.osher.colostate.edu/),
[Tufts OLLI](https://universitycollege.tufts.edu/osher-lifelong-learning-institute))

This is a school group, on a campus, for adults, where the institution wants you and the
recruiting is done for you. It is the lowest-friction teaching venue that exists.

### Why you

The demographic *is* Fuller Health & Longevity — active adults 50–90. You already have the
audience definition, the content pillars, and the evidence-translation pipeline. And this
cohort specifically values credentials in a way younger groups don't: BScKin, MScPT reads
as authority in that room.

### Structure — an 8-week course, 90 minutes weekly

1. What actually predicts healthspan — and what doesn't
2. How to read a study without a science degree
3. Strength: the non-negotiable after 50
4. Aerobic base and why zone 2 got oversold
5. Recovery, sleep, and the things that quietly matter more
6. Reading your own data (wearables, without the anxiety)
7. Injury, pain, and when to see someone
8. Build your own plan — workshop, everyone leaves with one

Each session opens with a `research-breakdown-generator` study of the week. Session 2 runs
that rubric backwards as a critique tool. Session 8 is `training-plan-builder` with the
class driving.

### Challenges and mitigations

| Risk | Mitigation |
|---|---|
| Proposal cycles run a term or two ahead | Submit now for the next intake; treat the first term as scheduling, not rejection |
| Very mixed fitness levels in one room | Teach principles and self-assessment, not a single prescription. This is a class, not a training group |
| Individual medical questions in class | State the boundary in week 1: general education, not individual advice — and offer to talk after |
| Pay is modest | Correct. The return is repeatable content, a warm audience, and institutional credibility, not the honorarium |

### Claude Code leverage

`research-breakdown-generator` produces eight study-of-the-week handouts in one sitting.
`content-pipeline-generator` turns each session into a week of Fuller Health content — you
are producing the course and the marketing in the same pass. Gamma for slides. Build one
new skill: a course-session generator that outputs slides, handout, and discussion
questions from a topic.

---

## 3. An adult run club — the easiest to start, and worth doing anyway

**Who you help:** adults who want to run and don't want a race team.

Run-club participation is up **59% globally over two years**, and the growth is driven by
demand for a "third space" — people show up for the social side more than the fitness.
Structurally: past 40 regulars, name 3–5 members with actual roles; members with a role
attend at roughly 3× the rate of those without.
([Running Lookout](https://runninglookout.com/news/strava-2026-community-report-running-clubs-3-5x-growth-gen-z/),
[EventCortex](https://eventcortex.com/blog/morning-run-club-guide))

Honest assessment: anyone can start a run club, so this is your lowest-differentiation
option. But it costs almost nothing, it compounds, and it is the natural feeder into both
recommendations above — the first responders in your club become the door into their hall.
Run it as a standing weekly thing, not a project.

---

## Which to pick

**Pick #1 if you want revenue and leverage.** Departments have budgets, NFPA 1580 has
created a reason to spend them, and there is a dated slot in March and another in June.
This is the one with a closing window.

**Pick #2 if "school" is the part that matters to you.** It is a real course at a real
institution, they want outside instructors, and it maps onto your longevity brand exactly.

They are not exclusive. Different audiences, different calendars, shared content engine.

---

## Next actions

**This week**
1. List every fire hall, EMS station, and police service within an hour. Find the peer
   fitness coordinator or union health rep for each — that is the contact, not the chief.
2. Read NFPA 1580 (2025) — the former 1583 fitness-program sections specifically. You need
   to speak to it precisely in the first conversation.
3. Find the lifelong-learning or continuing-education programs at the nearest universities.
   Locate the instructor proposal form and the deadline.

**Next two weeks**
4. Write a one-page first responder offer: 12-week shift-aware block, what you deliver,
   what the department gets back, priced. Free Wellness Week or Stand Down session as entry.
5. Submit the 8-week longevity course proposal. The syllabus above is the proposal.
6. Build the cohort roll-up skill — it is the renewal instrument for #1 and the smallest
   piece of net-new work in this document.

**Timing note:** First Responder Wellness Week is March 23–27, 2026, and Safety Stand Down
is June 14–20, 2026. Departments plan those months ahead. Reaching out for the June slot is
reasonable now; for March you are already late.

---

*Evidence current as of September 2026.*
