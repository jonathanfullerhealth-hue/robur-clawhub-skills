# School Group Strategy — Assessment & Recommendation

Prepared for Jonathan Fuller (BScKin, MScPT) — September 2026

---

## Part 1 — Readiness Assessment

### What I looked at

The `robur-clawhub-skills` repo (6 shipped skills + the assessment engine), the Cairn brand
skill suite loaded in this environment, and the connected tool surface (Notion, Google
Calendar/Drive/Gmail, Supabase, Cloudflare, Gamma, Blotato, GitHub).

### What is strong

**Domain credibility is the real asset, and it is rare.** BScKin + MScPT + a finisher's
résumé at Canadian Death Race, The Divide 200, Iron Legs 100 km, and Lone Wolf Backyard.
Almost no school has access to someone who is simultaneously a clinical exercise
professional and a credible endurance athlete. This is the scarce input. Everything else
in this document is downstream of it.

**The skills are properly engineered, not prompt soup.** `client-checkin-analyzer` runs
deterministic rules *before* any LLM call — that is the correct architecture for anything
touching health signals, and it is the single most transferable design decision in the
repo. `training-plan-builder` already models constraint-aware planning (shift schedules,
injury limitations, phase logic). Swapping "rotating 12s" for "exam week and basketball
season" is a small edit, not a rewrite.

**`research-breakdown-generator` is, unintentionally, a teaching artifact.** Its 7-part
structure — hook, the study, before/after, limitations, application — is a science
communication rubric. It is the closest thing in the repo to curriculum.

**Operational surface is more than sufficient.** Calendar for sessions, Notion for a
roster and session log, Gamma for a one-page parent/recruiting sheet, Drive for forms.
No new tooling is required to run a club.

### What is missing

**There is no pedagogy in this repo.** Every asset is built for an adult client or for
your own business. Nothing is scaffolded for a learner, age-graded, or designed to
assess *learning* rather than business ROI. This is the largest genuine gap, and it is
a content gap, not a capability gap — it is a few weekends of work, not a skills problem.

**Everything is monetization-shaped, and that is a liability in a school.** The
`assessment-engine.md` is explicitly a funnel ending in a $997/$1,000 upsell.
`lead-scanner` scans Reddit, Strava, and Instagram for individuals and drafts outreach.
Both are legitimate for your business. Both are disqualifying if a school administrator
ever associates them with a youth program. **These must be firewalled from anything you
do at a school — not softened, firewalled.** No shared branding, no shared mailing list,
no lead capture from students or parents.

**No safeguarding, consent, or data-privacy layer exists.** `client-checkin-analyzer`
ingests HRV, resting HR, sleep, mood, and motivation. Collected from a minor, that is
health information about a child, and in Alberta it engages FOIP/PIPA and district
policy. Right now you have a tool that would collect it and nothing that governs it.

**The role boundary is undefined and it matters legally.** You are an MScPT. In a school
volunteer capacity you are *not* the students' physiotherapist, and you must not be. The
moment you assess or treat an injury on school property you have converted a volunteer
role into an unsupervised clinical one, outside your professional liability coverage.
Alberta's Freedom to Care Act protections depend on acting within a **documented scope of
duties** — so that document has to exist before day one.
([Alberta.ca](https://www.alberta.ca/freedom-to-care-managing-your-volunteers))

**The actual bottleneck is not content — it is a school relationship.** No school,
no teacher sponsor, and no age group is named anywhere in your setup. Content you can
generate in an afternoon. A sponsor teacher takes weeks.

### Readiness verdict

**Ready to lead a movement-based group at a school within ~2 weeks. Not ready to run a
data-collection program on minors, and roughly a term away from being ready.**

Your technical setup is over-built for what a school club actually needs in month one.
The gap is entirely institutional: sponsor, charter, scope-of-duties, consent. Do not
solve a content problem you do not have.

---

## Part 2 — Demand Evidence

Four signals, ranked by how directly they bear on the decision.

**1. Group running is the fastest-growing social behaviour among the exact age cohort.**
Strava's 2026 community report puts running-club growth at **3.5× in 2025**, club-organized
events **+50%**, and club participation **+59% over two years**. Gen Z runners grew from
186M (2022) to 259M (2025). **72% say they join run clubs primarily to meet people** — the
draw is social, not athletic.
([Running Lookout](https://runninglookout.com/news/strava-2026-community-report-running-clubs-3-5x-growth-gen-z/),
[CEP Running](https://ceprunning.com/blogs/news/run-club-culture-why-group-running-is-booming))

**2. Teens are the one group moving the wrong way.** SFIA's 2026 Topline report has overall
US inactivity falling below 20% for the first time in seven years — while **inactivity among
13–17-year-olds rose 4.4% year over year** and core teen participation fell 3%. Roughly 80%
of youth athletes quit organized sport after age 15.
([SFIA](https://sfia.org/resources/participation-hits-new-high-but-majority-of-americans-not-yet-meeting-recommended-guidelines-of-150-minutes-of-weekly-activity-sfias-2026-topline-report-finds/),
[Join Strive On](https://joinstriveon.com/blog/youth-sports-participation-statistics))

That divergence is the opportunity. Running is the activity teens say they most intend to
take up, and it is the one they are least served in — because school running means
*competitive cross-country*, which selects for the kids who were already fast.

**3. AI literacy demand is enormous but the supply gap is closing fast.** ~86% of students
and 85% of teachers use AI; fewer than half have had any formal guidance; **more than 80% of
students say no teacher has ever shown them how to use AI for schoolwork**; 76% of education
leaders call AI literacy essential while 45% of educators have had zero training.
([eCampus News](https://www.ecampusnews.com/ai-in-education/2026/05/27/the-ai-literacy-paradox-why-students-feel-unprepared-for-the-ai-driven-workforce/),
[AI Literacy Day](https://ailiteracyday.org/blog/5-ai-literacy-trends-shaping-education))

Note the counter-signal though: there is now a well-developed how-to-start-an-AI-club
cottage industry and every school is being pitched one. Demand is high; **differentiation
is low, and yours would be lowest here.**

**4. There is a documented teacher-coach shortage.** Administrators broadly report
difficulty retaining teacher-coaches post-pandemic. Schools have unmet supervision
capacity, which is exactly what an outside qualified volunteer supplies.
([Global News](https://globalnews.ca/news/8627956/school-coaches-volunteers-dedication-shortage-saskatoon))

---

## Part 3 — Recommendations

### #1 — PRIMARY: A no-drop student run club, with a data-literacy module added in term two

**Who you help:** the students who will never make the cross-country team — beginners,
returners, kids who quit sport at 14, kids who want the social thing.
**The problem you solve:** school running is organized around competition, so the students
who most need movement are the ones it excludes.
**What it looks like when solved:** thirty students who did not consider themselves runners
finish a 5K together, and a meaningful share keep running after the term ends.

**Why now.** This is the only recommendation where two independent signals point at the same
target: run-club participation is up 3.5× among this cohort while teen inactivity is the one
category getting worse. Students already want this format; no school is offering the
non-competitive version of it.

**Why you.** Your entire professional stack is aimed at the exact failure mode that kills
beginner run programs — doing too much too soon and getting hurt. A BScKin/MScPT running a
progression is not a nice-to-have here; it is the difference between an 8-week club and an
8-week club with three shin splints and a quiet collapse in week five. Your ultra résumé
buys you credibility with teenagers that no teacher-coach gets for free.

**Structure — an 8-week term.**

- Two sessions a week, 45 minutes, right after last bell.
- **One rule, stated every session: no-drop, conversation pace.** If you can't talk, slow
  down. This single rule is the retention mechanism — the 72% who join for the social
  reason leave the moment the club becomes a race.
- Three lanes running the same session: walk/run intervals, continuous easy, developing.
  Nobody is "the slow group"; everyone starts and finishes together.
- **10 minutes of "60-second science" per session** — one study, plainly explained
  (this is `research-breakdown-generator` output, near-zero marginal cost to you).
- Week 8: a club 5K where the whole group crosses together, then everyone gets a
  one-page personal progress sheet.

**Measurable outcomes:** week-1→week-8 attendance retention (target >60%); share
completing the 5K; total club kilometres; a 3-question pre/post confidence survey.
These are the numbers that get you invited back for term two.

**Challenges and mitigations.**

| Risk | Mitigation |
|---|---|
| Alberta winter kills outdoor attendance | Run 8-week terms in Sept–Oct and Apr–May; hold a gym/hallway contingency session format in reserve |
| Injury, and your PT role blurring | Written scope of duties naming what you do *not* do: no assessment, no treatment, no advice on existing injuries — refer to the school's process and the student's own provider. Have the sponsor teacher countersign it |
| Attrition after week 3 | The no-drop rule, running pairs assigned in week 1, and the week-8 finish event as a commitment device |
| Looking like business development | Zero Cairn/Fuller branding. No sign-up capture, no offers to students or parents, ever. Put this in the charter in writing — it is also your best argument to a skeptical principal |
| No sponsor teacher | See the next-action plan; this is the real gate |

**How Claude Code multiplies you.**

- Fork `training-plan-builder` → `cohort-plan-builder`: one 8-week progression, three lanes,
  school-calendar-aware (exam weeks, competing sports seasons) instead of shift-aware.
  This is a constraint swap on logic you already wrote.
- Fork `client-checkin-analyzer` → a **minor-safe** 3-question version. Strip HRV, resting
  HR, mood, motivation. Keep: soreness 1–10, sleep hours band, "is anything hurting?".
  Deterministic GREEN/YELLOW/RED, for your eyes only, not stored. Your existing
  rules-before-LLM design is already the right shape — you are removing fields, not adding
  machinery.
- `research-breakdown-generator` → the weekly 60-second science handout. Already built.
- Google Calendar MCP for the session series; Notion for roster, attendance, and session
  log; Gamma for the one-page parent info sheet and recruiting poster.

---

### #2 — SECOND: An applied performance science group (best if there is credit or a science teacher attached)

**Who you help:** students who want a real research project for university applications and
have no one qualified to supervise one.
**The problem you solve:** schools cannot staff genuine physiology or sports-science
mentorship, so ambitious students end up with book reports.
**What it looks like when solved:** six students each finish a defensible research poster on
a question they chose, and can talk about methods and limitations.

**Why now.** Wearable data collection in adolescent athletes is an active, publishable area,
and sports analytics clubs are an established and growing format. Demand from students is
driven by admissions portfolios, which is durable.
([JMIR Formative Research](https://formative.jmir.org/2025/1/e54630),
[Sports Analytics Club Program](https://sacpinc.org/),
[Polygence](https://www.polygence.org/blog/sports-science-project-ideas-for-high-school-students))

**Why you.** This is where you are close to unique — a clinical exercise background *plus*
the ability to ship working AI tooling. The supervision, not the software, is the scarce part.

**Structure — a 10-week sprint.** Weeks 1–2: how to read a study (run
`research-breakdown-generator`'s rubric backwards as a critique tool). Weeks 3–4: pick a
question, **using public datasets only**. Weeks 5–8: analysis. Weeks 9–10: poster and
presentation night.

**Challenges and mitigations.** Consent and privacy are the entire game — start on public
data and do not touch student-collected data until a district-approved consent process
exists, if ever. Scope creep is the second killer; cap every project at one question and one
dataset. Needs a science teacher sponsor more than the run club does.

**How Claude Code multiplies you.** `research-breakdown-generator` becomes both the teaching
rubric and the output template. Build one new skill — a study-critique walkthrough (sample
size, controls, effect size vs p-value, funding source) — which is a genuinely reusable asset
for your business too. Supabase only if a properly consented dataset ever materializes.

---

### #3 — THIRD, and I rank it third deliberately: a general AI build club

The raw demand is the highest of the three (>80% of students have never been shown how to
use AI for schoolwork). I still rank it last **for you**, because your differentiation is
lowest here: every school is being pitched an AI club, the how-to material is commoditized,
and you would be competing with CS teachers on their turf rather than standing on the
credential nobody else in the building has.

If a school specifically asks for this, take it — but take it with your wedge, not the
generic version: **"AI for your body and your sport."** Students build small tools that
analyze training data, nutrition, or sleep. That is an AI club only you can run.

---

## Part 4 — The structural insight

Do not treat these as three options. **Run #1, then recruit #2 out of it.**

The run club is a wide, low-barrier, high-social-signal entry point that costs a student
nothing to try. A term of it produces the handful of students genuinely curious about *why*
the training worked. Those students are the science group. The funnel is natural, and it
means you never have to cold-recruit for the harder, smaller program.

---

## Part 5 — Next actions (14 days)

**Days 1–3 — Secure the gate.**
1. Pick one school and identify a specific teacher sponsor — PE, biology, or an existing
   staff coach. This is the only true blocker.
2. Write the **one-page club charter**: purpose, format, safety rules, the explicit
   no-commercial-activity clause, and your documented scope of duties (including what you
   will *not* do as a PT). Countersigned by the sponsor.
3. Confirm the district's volunteer requirements — police/vulnerable-sector check,
   orientation, supervision ratios. Start the check immediately; it has the longest lead time.

**Days 4–7 — Build the term.**
4. Fork `training-plan-builder` → `cohort-plan-builder` (three lanes, 8 weeks, school
   calendar).
5. Fork `client-checkin-analyzer` → the 3-question minor-safe version. Delete every field
   you do not need.
6. Generate eight `research-breakdown-generator` handouts — the whole term of 60-second
   science, done in one sitting.

**Days 8–11 — Make it real.**
7. One recruiting poster and one parent info sheet via Gamma. Club branding only — nothing
   from Cairn or Fuller Health.
8. Set the session series in Google Calendar; stand up the Notion roster and session log.
9. Write the 3-question pre/post confidence survey. Baseline it in week 1 or the outcome
   numbers are worthless.

**Days 12–14 — Launch.**
10. An interest meeting, not a first run. Target 20+ sign-ups on the promise of the no-drop
    rule.
11. First session. Assign running pairs. State the one rule out loud.

**Kill criteria, set now:** if fewer than 8 students are still attending at week 4, the
format is wrong — do not push through on effort. Debrief with the sponsor and reshape it.

---

## Part 6 — What would change this recommendation

Five things I assumed, in the order they would move the answer:

1. **Age group.** I assumed high school (roughly 14–18). Middle school pushes harder toward
   the run club and rules out most of #2. University flips the ranking — #2 becomes primary,
   and consent/liability constraints mostly dissolve.
2. **Your role.** I assumed outside volunteer. If you are staff or a parent, the sponsor
   problem shrinks dramatically and the timeline compresses.
3. **Time budget.** I assumed ~3 hours/week. Under 2, drop to one session weekly and
   lengthen the term.
4. **Whether this is philanthropic or a business play.** I have deliberately assumed
   philanthropic. If you intend it as brand-building for Cairn, say so, because the entire
   firewall recommendation changes shape — and would need to be disclosed to the school
   rather than hidden.
5. **Geography.** I assumed Alberta, from your race history. This drives the seasonal term
   timing and the specific Freedom to Care Act framing.

---

*Evidence current as of September 2026.*
