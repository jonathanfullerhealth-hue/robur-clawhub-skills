# Robur ClawHub Skills

A bundle of 5 OpenClaw skills for running and longevity coaches. Built from the same workflows that run Fuller Health & Longevity and Cairn Endurance — production-tested, not theoretical.

**Skills are free on ClawHub.** The value is what you do with them.

---

## The Skills (Free)

Install any skill. Your agent reads the instructions and executes. Works immediately.

| Skill | What It Does |
|-------|-------------|
| **lead-scanner** | Scan Reddit, Strava, and forums for coaching leads. Extract posts, evaluate fit, draft outreach. |
| **content-pipeline-generator** | Generate 14 posts/week across two brands. Platform-native hooks, evidence-backed claims, daily CTA strategy. |
| **training-plan-builder** | Structured weekly plans for trail/ultra runners. Shift-work aware, phase-appropriate, adjustment logic. |
| **client-checkin-analyzer** | Rule-based athlete triage. RED/YELLOW/GREEN from HRV, sleep, soreness, shift work. Deterministic — no LLM for triage. |
| **research-breakdown-generator** | Turn any research finding into a 7-part breakdown post. Citation-ready, limitations-honest, brand-specific. |

```
clawhub install lead-scanner
clawhub install content-pipeline-generator
clawhub install training-plan-builder
clawhub install client-checkin-analyzer
clawhub install research-breakdown-generator
```

---

## The Coaching AI Assessment ($1,000)

**Before we set anything up, we figure out if you even need it.**

Book a 20-minute call. We talk about how you coach — intake, check-ins, content, training plans, leads. Where you're spending time, where you're losing athletes, what you wish automated itself.

We record the call. Feed it into an AI agent that analyzes your workflow against the 5 skills we've built. Two days later you get a report showing:

- Exactly which parts of your coaching workflow are costing you hours
- Which skills solve which bottlenecks
- Quick wins you can implement this week (free tools, small changes)
- Projected hours saved per week if you deploy the bundle
- Your ROI: hours reclaimed × your hourly rate vs. tool costs

**$1,000. Applied to setup if you move forward. Good for 30 days.**

The assessment exists because we don't set up software and walk away. We talk to you first, figure out if this fits your business, and if it does, we build it around how you actually coach.

---

## Premium (Done-for-You Setup)

The skills do the work. We make sure they actually run.

After the assessment, if there's a fit, you pick a tier:

### Pricing

| Option | What | Price |
|--------|------|-------|
| **Assessment Only** | 20-min discovery call → AI workflow analysis → 2-day report with quick wins + ROI | **$1,000 one-time** |
| **Setup + Deploy** | Full bundle configured on your OpenClaw. Cron schedules. Telegram delivery. Everything running in 48 hours. | **$997 one-time** |
| **Maintenance Retainer** | Monthly updates, OpenClaw compatibility fixes, same-day email support. You never troubleshoot. | **$297/month** |
| **Done-With-You** | Setup + retainer + Jonathan Fuller (BScKin, MScPT, ultra runner) reviews your first 4 weeks of content drafts before they post. Actual coaching on your output quality. | **$1,497 setup + $397/month** |

**How it works:**

1. Book a 20-minute discovery call → **link goes here**
2. We talk. Record. I ask questions. I don't pitch — I figure out what you actually need.
3. Within 48 hours you get a personalized AI assessment report with your ROI, quick wins, and a recommendation.
4. If there's a fit, we deploy. You get a Telegram message: "Pipeline is live."
5. From there: content posts, leads appear, athletes get triaged. You coach.

**If there's not a fit, we tell you honestly.** The assessment fee covers the analysis either way.

---

## What Makes This Different

Every other OpenClaw setup service charges you to deploy software. We charge to understand your business first. The assessment proves the value before you spend a dollar on setup.

We're also running coaches ourselves. We know the athletes, the shift work, the content grind, the check-in fatigue. The skills were built for our own coaching business. They're not generic — they're what we use every day.

---

## Requirements (for self-install)

- OpenClaw v2026.3+
- **lead-scanner:** TAVILY_API_KEY environment variable
- **content-pipeline-generator:** No external dependencies — pure prompt skill
- **training-plan-builder:** No external dependencies — pure prompt skill
- **client-checkin-analyzer:** No external dependencies — pure prompt skill
- **research-breakdown-generator:** No external dependencies — pure prompt skill

---

Built and maintained by Jonathan Fuller — BScKin, MScPT, ultra runner.
Fuller Health & Longevity · Cairn Endurance
