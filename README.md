# Robur ClawHub Skills

6 free OpenClaw skills for running and longevity coaches. Built from workflows that run Fuller Health & Longevity and Cairn Endurance.

---

## Skills

| Skill | What It Does |
|-------|-------------|
| **lead-scanner** | Scan Reddit, Strava, and forums for coaching leads. Extract posts, evaluate fit, draft outreach. |
| **content-pipeline-generator** | Generate 14 posts/week across two brands. Platform-native hooks, evidence-backed claims, daily CTA strategy. |
| **training-plan-builder** | Structured weekly plans for trail/ultra runners. Shift-work aware, phase-appropriate, adjustment logic. |
| **client-checkin-analyzer** | Rule-based athlete triage. RED/YELLOW/GREEN from HRV, sleep, soreness, shift work. Deterministic — no LLM for triage. |
| **research-breakdown-generator** | Turn any research finding into a 7-part breakdown post. Citation-ready, limitations-honest, brand-specific. |
| **coaching-ai-assessment** | Generate a structured ROI report from a discovery call transcript. Quick wins, bottleneck analysis, setup recommendations. Validated at $1,000/assessment. |
| **reclaim-your-time** | Automated institutional-quality equity research on a watchlist of tickers. Full evidence-based dig — news, earnings language, sentiment, supply chain, fundamentals, red flags, catalysts — ending in a Bull/Base/Bear verdict and information-edge score. Built to run on a schedule. |

```
clawhub install lead-scanner
clawhub install content-pipeline-generator
clawhub install training-plan-builder
clawhub install client-checkin-analyzer
clawhub install research-breakdown-generator
clawhub install coaching-ai-assessment
clawhub install reclaim-your-time
```

## Requirements

- OpenClaw v2026.3+
- **lead-scanner:** TAVILY_API_KEY environment variable
- **reclaim-your-time:** TAVILY_API_KEY environment variable (live web search) + web fetch for primary sources

All other skills are pure prompt — no external dependencies.

---

Built and maintained by [Jonathan Fuller](https://fullerhealthandlongevity.com) — BScKin, MScPT, ultra runner.
