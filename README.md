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

## Premium (Done-for-You Setup)

The skills do the work. We make sure they actually run.

You are a coach. You don't have time to configure cron schedules, wire up Telegram, test cross-skill chains, or fix things when OpenClaw updates break your config. We do that.

### What you get

- **Full bundle deployed** on your OpenClaw instance — all 5 skills installed, configured, and tested
- **Cron schedules set** — content generates weekly, leads scan daily, check-ins triage on arrival. You don't touch it.
- **Telegram delivery** — leads, content drafts, and athlete flags hit your phone. Approve or ignore in 30 seconds.
- **Cross-skill chains** — a lead from scanner auto-checks your athlete roster. Research findings auto-feed your content pipeline. Skills talk to each other.
- **Monthly updates** — skill improvements, OpenClaw compatibility fixes, new features as we build them
- **Email support** — 24-hour response. "My agent isn't scanning anymore" gets fixed same day.

### Pricing

| Option | What | Price |
|--------|------|-------|
| **Setup + Deploy** | Full bundle configured on your OpenClaw. Everything running in 48 hours. | **$497 one-time** |
| **Maintenance Retainer** | Monthly updates, fixes, priority support. You never troubleshoot. | **$197/month** |
| **Done-With-You** | Setup + retainer + a real coach reviews your first 4 weeks of content drafts. Jonathan Fuller — BScKin, MScPT, ultra runner — looks at your output before it goes live. | **$997 setup + $297/month** |

### How it works

1. Install the free skills from ClawHub to see what they do
2. Email **jonathan@fullerhealthandlongevity.com** with "Premium Setup" in the subject
3. We send you a 5-minute intake form (your OpenClaw host, Telegram handle, brand details)
4. We deploy. You receive a Telegram message confirming everything is running.
5. From there: content posts, leads appear, athletes get triaged. You coach.

---

## Requirements (for self-install)

- OpenClaw v2026.3+
- **lead-scanner:** TAVILY_API_KEY environment variable
- **content-pipeline-generator:** No external dependencies — pure prompt skill
- **training-plan-builder:** No external dependencies — pure prompt skill
- **client-checkin-analyzer:** No external dependencies — pure prompt skill
- **research-breakdown-generator:** No external dependencies — pure prompt skill

---

Built and maintained by [Jonathan Fuller](https://fullerhealthandlongevity.com) — BScKin, MScPT, ultra runner.
