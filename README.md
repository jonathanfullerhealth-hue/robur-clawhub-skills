# Robur ClawHub Skills

6 free OpenClaw skills for running and longevity coaches. Built from workflows that run Fuller Health & Longevity and Cairn Endurance.

---

## Skills

| Skill | What It Does |
|-------|-------------|
| **lead-scanner** | Scan Reddit, Strava, and forums for coaching leads. Extract posts, evaluate fit, draft outreach. |
| **lead-research** | Source real target clinics/practices for outbound and generate a verifiable [Observation] for each. Outputs a send-ready prospect sheet with contact, the observed gap, and matching template. Never fabricates a business or claim. |
| **content-pipeline-generator** | Generate 14 posts/week across two brands. Platform-native hooks, evidence-backed claims, daily CTA strategy. |
| **training-plan-builder** | Structured weekly plans for trail/ultra runners. Shift-work aware, phase-appropriate, adjustment logic. |
| **client-checkin-analyzer** | Rule-based athlete triage. RED/YELLOW/GREEN from HRV, sleep, soreness, shift work. Deterministic — no LLM for triage. |
| **research-breakdown-generator** | Turn any research finding into a 7-part breakdown post. Citation-ready, limitations-honest, brand-specific. |
| **coaching-ai-assessment** | Call-based ROI report from a discovery transcript — quick wins, bottleneck analysis, setup recommendations. The audit is now free (lead magnet); RYT charges for implementation. |
| **solution-templates** | The productized template library. Maps each common segment problem to its pre-built fix (which skills, setup time) and the segment-priced implementation + retainer to quote. Same deliverable every time — no bespoke discovery. |
| **reclaim-your-time** | Weekly demand & positioning audit for the RYT done-for-you automation service. Investigates where the money and pain are highest, who to advertise to, and how to reshape the offer for premium pricing. Ranks buyer segments by willingness-to-pay × pain × credibility fit. Built to run on a schedule. |
| **retention-engine** | Weekly client-retention automation. Scores each active client's churn risk from engagement signals, explains why, and drafts a personalized retention action for approval. Sells RYT as "keep the clients you have" — the bigger wallet than lead-gen. Deterministic triage, no auto-send. |
| **self-serve-assessment** | The free, automated ROI Snapshot lead magnet. Intake form → instant report showing hours + dollars saved, ending in a booking CTA. Reveals the value, not the how. Replaces the old paid assessment. |

```
clawhub install lead-scanner
clawhub install lead-research
clawhub install content-pipeline-generator
clawhub install training-plan-builder
clawhub install client-checkin-analyzer
clawhub install research-breakdown-generator
clawhub install coaching-ai-assessment
clawhub install reclaim-your-time
clawhub install retention-engine
clawhub install self-serve-assessment
clawhub install solution-templates
```

## Requirements

- OpenClaw v2026.3+
- **lead-scanner:** TAVILY_API_KEY environment variable
- **reclaim-your-time:** TAVILY_API_KEY environment variable (live web search) + web fetch for primary sources
- **lead-research:** TAVILY_API_KEY environment variable (live web search) + web fetch to verify observations

All other skills are pure prompt — no external dependencies.

---

Built and maintained by [Jonathan Fuller](https://fullerhealthandlongevity.com) — BScKin, MScPT, ultra runner.
