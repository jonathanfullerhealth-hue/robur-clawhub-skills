# Robur ClawHub Skills

A bundle of 5 OpenClaw skills for running and longevity coaches. Built from the same workflows that run Fuller Health & Longevity and Cairn Endurance — production-tested, not theoretical.

## The Bundle

| Skill | What It Does | Ready |
|-------|-------------|-------|
| **lead-scanner** | Scan Reddit, Strava, and forums for coaching leads. Extract posts, evaluate fit, draft outreach. | ✅ |
| **content-pipeline-generator** | Generate 14 posts/week across two brands. Platform-native hooks, evidence-backed claims, daily CTA strategy. | ✅ |
| **training-plan-builder** | Structured weekly plans for trail/ultra runners. Shift-work aware, phase-appropriate, adjustment logic. | ✅ |
| **client-checkin-analyzer** | Rule-based athlete triage. RED/YELLOW/GREEN from HRV, sleep, soreness, shift work. Deterministic — no LLM for triage. | ✅ |
| **research-breakdown-generator** | Turn any research finding into a 7-part breakdown post. Citation-ready, limitations-honest, brand-specific. | ✅ |

## Pricing

Pricing is set by the skill publisher on ClawHub. These skills are maintained by [Jonathan Fuller](https://fullerhealthandlongevity.com) — BScKin, MScPT — clinical exercise therapist and ultra runner.

## Installation

```bash
clawhub install lead-scanner
clawhub install content-pipeline-generator
clawhub install training-plan-builder
clawhub install client-checkin-analyzer
clawhub install research-breakdown-generator
```

## Requirements

- OpenClaw v2026.3+
- **lead-scanner:** TAVILY_API_KEY environment variable
- **content-pipeline-generator:** No external dependencies — pure prompt skill
- **training-plan-builder:** No external dependencies — pure prompt skill
- **client-checkin-analyzer:** No external dependencies — pure prompt skill
- **research-breakdown-generator:** No external dependencies — pure prompt skill

## Support

Open an issue in this repo or reach out on the OpenClaw Discord.
