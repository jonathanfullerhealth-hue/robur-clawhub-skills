# Revenue model

The strategy documents in this repo recommend a $47/month Skool group for endurance
coaches. That recommendation was correct for what we had when it was written, and it is
wrong for what we have now. This document says why, and what to sell instead.

Read `community-strategy.md` and `niche-analysis.md` first for the reasoning being revised.

---

## 1. What a million dollars actually requires

The plan is not the strategy. The customer count is the strategy.

| Sell | Price | Customers for $1M ARR | Reachable universe | Penetration |
|---|---|---|---|---|
| Skool membership | $47/mo | **1,838** | every online coach | — |
| Practitioner certification | $997 once | **1,003/year, forever** | every online coach | — |
| Clinic licence | $500/mo | **167** | ~9,500 US med spas | **1.8%** |
| Clinic licence | $1,000/mo | **84** | ~9,500 US med spas | **0.9%** |
| Per patient | $25/patient/mo | **84 clinics** (40 patients each) | ~9,500 US med spas | **0.9%** |

The membership figure is net of Skool Pro fees (2.9% + $0.30). At the documented 5.8%
monthly churn, holding 1,838 members means recruiting about 107 new ones every month
forever — roughly 1,280 a year, in perpetuity, just to stand still.

**That is a media business.** It requires an audience, a content machine, and a permanent
top-of-funnel. It is a real business and people run it well. It is not the business the
assets on this branch describe.

Selling to 84 clinics is a sales problem. Selling to 1,838 coaches is a distribution
problem. We can execute one of those from a standing start.

---

## 2. Who has the money and the problem

**The buyer is a medical weight-loss clinic or med spa that prescribes GLP-1s.**

Their economics, from published industry figures:

- Patients pay the clinic **$300–600/month**; premium tiers run $499–799
- Clinic gross margin is roughly **$244 per patient per month** after drug cost, supplies
  and NP/PA oversight
- A clinic with 40 active GLP-1 patients runs **$14,000–24,000 in monthly recurring
  revenue**
- Practices offering GLP-1 programs saw 9% revenue growth against a 2% decline at
  practices without them

And here is the hole in the floor:

> **Up to 65% of patients without type 2 diabetes discontinue GLP-1 therapy within one
> year.** Two-thirds of lost weight is typically regained within a year of stopping.

For a 40-patient clinic, 65% annual discontinuation is **26 patients lost per year** —
about 2.2 every month, each taking $244/month of margin with them. By the end of the year
that is $76,000 of annualised gross margin that has walked out and has to be replaced with
paid acquisition. Compounded, 65% annual discontinuation is 8.4% monthly churn and an
**average patient lifetime of twelve months**, worth about $2,900 in gross margin.

**That is the problem we solve.** Not "muscle loss" in the abstract. Churn.

The clinic owner is exactly the customer described in the founding filter: someone with
capital, a P&L, and a problem where the solution makes them money.

---

## 3. What we sell

**A conditioning and monitoring program the clinic runs under its own name, that keeps
patients on program longer and gives the prescriber something defensible to point at.**

Everything needed already exists on this branch:

| Asset | What the clinic gets |
|---|---|
| `protocols/post-glp1-conditioning.md` | The clinical programme, cited to primary sources |
| `glp1-triage/SKILL.md` | Deterministic triage of every check-in, no clinician time |
| `dashboard/glp1-board.html` | One screen: who to escalate this week, who to leave alone |
| `protocols/references.md` | The answer when a physician asks where a threshold came from |
| Quarterly report tab | Outcomes evidence for the clinic's own marketing |

The clinic is not buying information. It is buying **a retention mechanism with a clinical
justification attached** — and a quarterly report that proves the programme works, which it
can then use to sell the programme.

---

## 4. Pricing

Take the per-patient model. It is the only one whose incentives point the same way as the
clinic's.

**$25 per active patient per month, $500/month minimum.**

That is 10% of the clinic's margin on each patient. Which sets the bar the programme has to
clear, and the bar is a duration, not a headcount:

> Our fee is worth paying the moment we extend the average patient's time on programme by
> **11.4% — about six weeks.** Twelve months becomes thirteen and a half.

Do the arithmetic the clinic will do. Without us they keep $244/month for an average of
twelve months: $2,913. With us they keep $219/month, so they need 13.3 months to be level.
Everything past six extra weeks is theirs.

If the programme moves annual discontinuation from 65% to 55% — a ten-point improvement,
which is the number the pilot has to establish — average lifetime goes to 15.5 months and
the clinic nets about **$490 more gross margin per patient**, against $388 of fees. A 1.3×
return on the fee, plus a quarterly outcomes report they can market with.

That is not a spectacular multiple and it should not be sold as one. It is a defensible
one, and it survives a clinic owner with a spreadsheet — which the alternative framings do
not. Do not price on our cost or our effort. Price on their margin, and be honest that the
whole case rests on a retention number nobody has measured yet.

---

## 5. Why we win against what already exists

The space is not empty. It is occupied by three shapes of competitor, none of which is the
shape we are.

**Hardware vendors** (InBody) publish muscle-preservation content to sell body-composition
scanners. Their programme is the scan.

**White-label medication providers** (Karpa Health) sell the clinic a GLP-1 programme at
$500/month with body composition tracking as a feature. Their programme is the drug.

**Gym partnerships** (Thrive with Crunch's 550+ locations, KORB with In-Shape) put GLP-1
access next to gym access. Their programme is the room.

Nobody is selling **the clinical governance layer** — the thing that reads a check-in and
says *this patient's grip is down 11%, phone the prescriber this week.*

Two differentiators are technical, not marketing:

1. **We refuse to triage on BIA lean mass.** Every scanner-led programme in this market
   triages on bioimpedance, which over-reads fat-free mass loss in dehydrated patients —
   and this population is chronically dehydrated. Our skill bars it explicitly and triages
   on grip strength and function instead. That is defensible in front of a physician in a
   way an InBody trend line is not.

2. **The triage is deterministic and tested.** Thirty-three tests over the escalation
   rules, and a status that says INCOMPLETE rather than quietly clearing a patient nobody
   measured. This is the difference between a decision aid a medical director will sign off
   on and one they will not.

---

## 6. The first 90 days

The bottleneck is not product. It is that we have **zero patients, zero outcome data, and
no reference customer.** Nothing else matters until that changes.

**Days 1–30 — build the intake and get one clinic.**
Close the write path from the client app into `glp1_conditioning_checkins`; the pipeline is
otherwise finished and idle. Then land a single pilot clinic. Free for 90 days, in exchange
for the data and a named reference. One clinic, not five.

**Days 31–60 — run the protocol on real patients.**
Every check-in through the triage engine. Every escalation logged. This is the first time
any of it touches a real person, and it will surface things the sample cohort cannot.

**Days 61–90 — produce the quarterly report and convert.**
The report tab is the sales asset. Retention against the clinic's own prior cohort is the
number that sells the second clinic, and the second clinic sells the tenth.

Then: ten clinics at $500–1,000/month is $60,000–120,000 ARR and a repeatable pitch. That
is the point at which this is a business rather than a bet.

**Where the Skool group comes back.** Clinics that buy the programme need somebody to
deliver it. That is the second side of the market, and it is what the community strategy
is actually for: certify coaches into the protocol at $997, place them into clinics that
have licensed it. The group stops being the revenue engine and becomes the supply of
practitioners — which is a far easier thing to sell to a coach than another membership,
because it ends in paid work.

---

## 7. What kills this

**The window closes in 2029.** LEAN-PREP (NCT06885736) reports in August 2029. When it
does, this stops being a proprietary protocol and becomes a guideline anyone can implement.
Three years to build the customer base, the outcome data and the brand. After that we
compete on execution, not on knowing something.

**Clinical liability is a different business to selling courses.** Decision support sold
into medical practices carries obligations that a Skool group does not. The scope boundary
in the protocol is the mitigation, and it must never soften: we program exercise, the
prescriber owns medication, the prescriber or dietitian owns nutrition. Get this reviewed
before the first paid clinic, not after.

**No proof yet.** Every number in section 4 is a projection built on the clinic's published
economics, not on our results. The pilot exists to replace the projection with evidence. If
the protocol does not improve retention, the business does not work, and we should find
that out in 90 days on one clinic rather than in two years on forty.

---

## Sources

Clinic economics and competitor positioning are from published industry reporting;
discontinuation and regain figures from the clinical literature. Market-size estimates vary
widely by source and are used only to size the buyer universe, never to forecast revenue.

- Discontinuation and regain — [Trajectory of weight regain after cessation of GLP-1 receptor agonists (eClinicalMedicine)](https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(26)00043-X/fulltext) · [Weight maintenance after discontinuation of GLP-1 therapies (eClinicalMedicine)](https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(26)00240-3/fulltext) · [The Gap Between GLP-1 Prescriptions and Persistence (Amgen)](https://www.amgen.com/obesity/prescription-gap) · [Cleveland Clinic real-world analysis](https://newsroom.clevelandclinic.org/2026/03/12/what-happens-when-patients-stop-taking-glp-1-drugs-new-cleveland-clinic-study-reveals-real-world-insights)
- Clinic pricing and margin — [How Weight Loss Clinics Make Money (Pabau)](https://pabau.com/blog/how-weight-loss-clinics-make-money/) · [Med Spa Profit Margins 2026 (Spakinect)](https://www.spakinect.com/blog/med-spa-profit-margins-for-2026) · [How to Add GLP-1 Weight Loss to Your Med Spa (Karpa Health)](https://karpahealth.com/resources/med-spa-weight-loss-program/)
- Buyer universe — [Med Spa Industry Statistics 2026 (Medical Spa Locator)](https://www.medicalspalocator.com/resources/med-spa-statistics-2026) · [47 Med Spa Industry Statistics (ScaleHaven)](https://scalehaven.io/blog/med-spa-industry-statistics/) · [U.S. Medical Weight Loss Clinics Market (Grand View Research)](https://www.grandviewresearch.com/industry-analysis/us-medical-weight-loss-clinics-market-report)
- Competitors — [InBody: The Missing Piece in GLP-1 Weight Loss](https://inbodyusa.com/blogs/inbodyblog/the-missing-piece-in-glp-1-weight-loss-how-thrive-inbody-protect-muscle/) · [GLP-1 Health Club Intelligence Report (Inspire360)](https://www.inspire360.com/glp-1-report-2026) · [GLP-1 and Muscle Loss 2026: Body Composition Protocols for Med Spas](https://medspastandards.com/blog/glp1-muscle-loss-body-composition-med-spa-2026)
- Trial window — [NCT06885736 (LEAN-PREP)](https://clinicaltrials.gov/study/NCT06885736), primary completion August 2029
