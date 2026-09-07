# Community Strategy — Free Group to Recurring Revenue

Prepared for Jonathan Fuller (BScKin, MScPT) — September 2026

*Supersedes the school-group version of this document. That draft assumed a literal school
and a student audience; the actual goal is a Skool community with a free tier feeding a
paid tier.*

---

## The filter that decides everything

> "Teaches them something, where often it also then allows them to make more money."

That single line rules out consumers. An athlete who buys a training plan gets fitter; they
do not get richer, so they churn the month their race ends. A **business owner** who learns
to run their operation with AI has a recurring reason to stay: the membership pays for
itself out of revenue it helped create.

So the product is not coaching. **It is coaching-the-coaches** — and you have already built
it. `robur-clawhub-skills` *is* the curriculum. `coaching-ai-assessment` is validated at
$1,000. The README already carries a $997 setup and a $297/month retainer. What is missing
is the bottom rung: a low-priced recurring tier that catches people long before they are
ready for a $997 deployment.

---

## Who pays — be honest about this

Two candidate audiences, and they are not equally rich.

**Endurance and longevity coaches** — your existing audience, your existing content, your
existing skills. But be clear-eyed: solo online coaches charge $35–$200/month per athlete,
with $100–$300 typical for 1:1. A coach with a dozen athletes is grossing a few thousand a
month. They can pay $47/month. They cannot pay $200.
([Team RunRun](https://teamrunrun.com/how-much-does-an-online-running-coach-cost/),
[Microcosm Coaching](https://www.microcosm-coaching.com/microblog/how-much-does-a-running-coach-cost/))

**Clinicians in private practice** — physios, chiros, kinesiologists, RMTs. This is where
the money actually is. PTs spend **2–6 hours a day on documentation**, 68.8% of clinics
believe AI could cut their workload, and 60% of providers using AI scribes already save
1–4 hours a day. They are buying AI tools right now.
([SPRY](https://www.sprypt.com/blog/ai-for-physical-therapy-notes-documentation),
[PT Practice Pro](https://ptpracticepro.com/ai-physical-therapy-software/))

**Recommendation: start with coaches, design so it extends to clinicians.**

Coaches are where your brand, content engine, and lead flow already point — the free group
fills itself. But the second audience is the one that matches "rich people's problems," and
you are an MScPT, which makes you a peer in that room rather than a vendor. Same machine,
roughly 3–5× the price, once the first one works.

Do not launch both. A community that is for everyone forms for no one.

---

## The architecture

Skool charges per group, so a free group and a paid group are two subscriptions.
([Kourses](https://kourses.com/skool-pricing/))

```
FREE GROUP                    PAID GROUP                   HIGH TICKET
coaches, open                 $47/mo                       $997 setup
skills + weekly content  →    implementation + access  →   $1,000 assessment
                                                           $297/mo retainer
```

**Plan choice is arithmetic, not preference.** Hobby is $9/month with a 10% transaction
fee; Pro is $99/month with 2.9% + $0.30. At $47/month per member the two cross at roughly
**30 paying members**. Start on Hobby, move to Pro when you pass thirty.

**Price at $47.** The documented sweet spot for coaching-niche Skool groups is $47–67, and
you want the floor, because your margin is not in the membership — it is in the $997 and
$1,000 offers the membership feeds.

---

## What the paid tier actually sells

You listed information, training documents, forms, curriculum. Here is the hard part:
**information is the weakest thing you can sell in 2026.** AI made it free. 27% of
community cancellations cite value not justifying cost, and that is overwhelmingly people
who paid for content they later realized they could get elsewhere.
([RetentionCheck](https://retentioncheck.com/churn-benchmarks/membership-communities))

What people actually pay monthly for, in order:

1. **Done, not described.** Not "how to configure lead-scanner" — the finished config for
   their niche. Not a content framework — this week's fourteen posts. Your skills output
   artifacts; ship the artifacts.
2. **Access to you.** One live call a week. This is the single highest-value item on your
   list and the only one nobody can copy.
3. **Accountability.** A number each member is chasing, visible to the group.
4. **The room.** Other coaches at the same stage. This is what makes it a community rather
   than a course, and it is the thing that keeps working when you are on a 200-mile race.

Curriculum matters, but as the *spine* that organizes the above — not as the product.

**Organize the whole thing around one number:** go from 8 athletes to 20 without adding
hours. Every module, call, and template serves that. A membership with a number retains;
a membership with a library does not.

---

## Churn is the business

Membership communities average **5.8% monthly churn** — about 51% a year, or a 17-month
average member lifetime. Under 5% is healthy; over 10% is a broken product. Tightly
programmed communities hit 2–3%.

The two causes are known: **low engagement (32%)** and **value not justifying cost (27%)**.
([RetentionCheck](https://retentioncheck.com/churn-benchmarks/membership-communities),
[Kourses](https://kourses.com/member-retention/))

Both are programming problems, not content problems. Which means:

- **A weekly live call is non-negotiable.** It is the engagement engine. Miss weeks and
  churn compounds silently.
- **Run in cohorts, not open enrollment.** People who start together finish together.
- **Give every member a role by month two.** In run clubs, members with a role show up at
  roughly 3× the rate — the same dynamic holds online.
- **Watch month 3.** That is where the first cliff is. Something specific and valuable
  should land in week 10.

At $47/month and 5.8% churn, each member is worth about $800 in lifetime value before any
upsell. That is the number to beat.

---

## Launch sequence

**Do not open a paid group on day one.** You do not yet know which wall people hit, and
the wall is the offer.

**Phase 1 — Free group (weeks 1–8).** Open it. The ClawHub skills are the lead magnet;
they are already free and already good, which makes this easy. Post the same evidence
content you already produce. Target 100 members. **Your only job is to find the wall** —
the specific point where someone installs a skill and stalls. Log every one.

**Phase 2 — Paid challenge (weeks 9–12).** Before building a membership, run a paid
challenge at $97–197 against the most common wall. Six weeks. This validates that people
will pay you for implementation before you commit to delivering it every month, and the
standard Skool play uses challenges as the bridge for exactly this reason.
([Communipass](https://communipass.com/blog/skool-free-vs-paid-community-2026/))

**Phase 3 — Paid group (week 13+).** Open at $47/month to challenge graduates first. They
have already paid you once and already got a result — the best possible founding cohort.

**Phase 4 — Extend.** Once retention is under 5% monthly, either raise the price for new
members or clone the machine for clinicians at $150–200.

---

## The two real risks

**"AI for coaches" is getting crowded, mostly by AI people who have never coached.** That
is also your moat, and it only works if you use it. Your content should be "here is the
check-in system triaging my actual athletes this week," not "here are five prompts for
coaches." Show the machine running on your own business. Nobody else in that space can.

**A free group is a real job.** It needs posting and answering most days for the first two
months or it dies quietly. Budget the time honestly before you open it — and note that
`content-pipeline-generator` already produces the daily volume this requires.

---

## Next actions

**This week**
1. Open the free Skool group on Hobby ($9). Name it for the outcome, not for you.
2. Point every existing channel at it — bio links, ClawHub README, every post.
3. Start a running log of stall points. This is the most valuable file you will keep this
   quarter; it becomes the challenge, then the curriculum.

**Weeks 2–8**
4. Post daily. Run one live call a week from the start, even at ten members — you are
   building the habit before you need it.
5. Ship one finished artifact per week to the free group. Prove the machine in public.

**Week 9**
6. Launch the challenge against the top stall point. $97–197, six weeks, capped seats.

**Week 13**
7. Open the paid group at $47 to graduates. Move to Pro at thirty members.

---

*Evidence current as of September 2026.*
