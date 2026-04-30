# Robur ClawHub Skills

**Free skills + paid assessment + done-for-you setup.** Built from the same workflows that run Fuller Health & Longevity and Cairn Endurance — production-tested, not theoretical.

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

## The Process

### Step 1 — Coaching AI Assessment ($1,000)

**Before we set anything up, we figure out if you even need it.**

Book a 20-minute call. We talk about how you coach — intake, check-ins, content, training plans, leads. Where you're spending time, where you're losing athletes, what you wish automated itself.

We record the call. Feed it into an AI agent that analyzes your workflow. Two days later you get a report:

- **Bottleneck analysis** — exactly which parts of your workflow are costing you hours
- **Skill mapping** — which of the 5 skills solves which bottleneck
- **Quick wins** — 3-5 things you can implement this week with free tools
- **4-day quick win plan** — day-by-day actions to see results immediately
- **ROI calculation** — hours reclaimed × your rate vs. tool costs
- **Recommendation** — are you a fit for premium or better off DIY?

**$1,000. Applied to setup if you move forward. Good for 30 days.**

### Step 2 — Done-for-You Setup (if there's a fit)

| Option | What | Price |
|--------|------|-------|
| **Setup + Deploy** | Full bundle deployed on your OpenClaw. Cron schedules. Telegram delivery. 48-hour turnaround. | **$997 one-time** |
| **Maintenance Retainer** | Monthly updates, OpenClaw compatibility fixes, same-day support. You never troubleshoot. | **$297/month** |
| **Done-With-You** | Setup + retainer + Jonathan reviews your first 4 weeks of content drafts. Actual coaching on your output. | **$1,497 setup + $397/month** |

**How it works:**
1. Book a 20-min call → we talk → you get the assessment within 48 hours
2. If there's a fit, we deploy. You get a Telegram message: "Pipeline is live."
3. Content posts, leads appear, athletes get triaged. You coach.

**If there's not a fit, we tell you honestly.** The assessment fee covers the analysis either way.

---

## What Makes This Different

Every other OpenClaw setup service charges you to deploy software. We charge to understand your business first.

We're also running coaches. The skills were built for our own coaching business — not generic, not theoretical.

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
