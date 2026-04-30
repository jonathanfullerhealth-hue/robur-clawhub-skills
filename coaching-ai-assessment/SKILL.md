---
name: coaching-ai-assessment
description: Analyze a coaching business discovery call transcript and produce a structured ROI report with quick wins, bottleneck analysis, and setup recommendations. Pure Claude prompt skill — no external dependencies beyond a transcript.
metadata: {"openclaw":{"emoji":"📋","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Coaching AI Assessment Engine

## What It Does
Takes a transcript of a 20-minute discovery call with a running/longevity coach and produces a structured 8-part assessment report. The report quantifies their workflow bottlenecks, maps quick wins, calculates ROI, and recommends next steps.

Built based on the "Return My Time" AI audit model — validated at $1,000 per assessment.

## Workflow

### Step 1 — Collect the Discovery Call
Input: A transcript of a 20-minute call with a coach. The call should cover:
- How many athletes they coach
- What tools they use (TrainingPeaks, spreadsheets, email, etc.)
- How they handle leads, onboarding, check-ins, training plans, content
- What takes the most time
- What they hate doing
- What they wish automated itself

### Step 2 — Load the Analysis Engine
Read and apply the analysis engine at `agents/assessment-engine.md`. This is the SOP for producing the report. Follow it section by section.

### Step 3 — Generate the Report

Output the report in this format:

```
────────────────────────
COACHING AI ASSESSMENT
Coach: [Name]
Date: [Date]
Prepared for: [Coach's business name]
────────────────────────

## 1. Executive Summary

[2-3 sentences]

## 2. Current Workflow Map

[Flow chart with time/pain/automation per step]

## 3. Top 3 Bottlenecks

[Bottleneck 1]
[Bottleneck 2]
[Bottleneck 3]

## 4. Quick Wins (This Week)

[3-5 low-effort, high-impact fixes]

## 5. Recommended Solutions

[Effort vs Impact matrix + skill mappings]

## 6. ROI Calculation

[Table: hours reclaimed, annual value, break-even]

## 7. 4-Day Quick Win Plan

[Day 1-4 actions]

## 8. Next Steps

[DIY vs Setup vs Assessment Only]

────────────────────────
```

### Step 4 — Deliver
Output the report to the coach as markdown. They can paste it into Gamma, Google Docs, or read it as-is.

## Interview Questions (for the Discovery Call)

If you are conducting the interview (not just analyzing a transcript), use these questions. They follow the "don't solution" principle — ask, listen, move on.

**Opening (build rapport):**
- "Tell me about your coaching business. What do you do, who do you coach?"
- "How long have you been coaching?"
- "How many athletes do you work with right now?"

**Current workflow (understand the landscape):**
- "Walk me through what happens when a new athlete reaches out to you. What's that process?"
- "How do you handle weekly check-ins? What does that look like right now?"
- "How do you create content — social posts, newsletters, blogs? Who does that?"
- "How do you write training plans? What's that process?"
- "What tools are you using today? TrainingPeaks, spreadsheets, Google Docs, something else?"

**Pain points (find the leverage):**
- "What part of your coaching week takes the most time?"
- "If you could wave a magic wand and automate one thing, what would it be?"
- "What have you tried that didn't work?"
- "What do your athletes complain about? Or what do you worry they'll complain about?"

**AI readiness (qualify):**
- "What's your experience with AI so far? Have you tried any tools?"
- "Are you using OpenClaw or any other agent?"
- "What's holding you back from automating more?"

**Close (set up next step):**
- "If we could save you [X hours] per week, what would that be worth to you?"
- "Would you like me to send you a report with what I find?"
- "What's the best way to get this to you?"

## Guardrails
- Do NOT prescribe solutions during the call. The report does all the prescribing.
- Do NOT fabricate hours saved or ROI. If you can't calculate it from the transcript, flag: "Insufficient data — estimate based on [assumption]."
- Do NOT recommend the paid bundle unless the transcript shows a genuine fit. If the coach has 3 athletes and no content pipeline, lead scanner and check-in analyzer might be overkill. Say so.
- Do NOT use hype language in the report. "You could save 5 hours per week" not "This will transform your business."
- If the coach is not a good fit for premium services, say that directly. The assessment fee covers honest analysis.

## Failure Handling
- If the transcript is too short (under 10 minutes of substantive conversation): flag "Transcript length insufficient for full analysis. Recommended: 20-minute call minimum. Providing partial assessment based on available data."
- If the coach didn't mention specific time expenditures: default to industry averages (running coaches spend 4-8 hrs/week on content, 3-5 hrs/week on check-ins) and note "Industry estimate — actuals may vary."
- If the coach is already using OpenClaw with a custom setup: note "This coach may not need the deployment tier — recommend skill-only or maintenance retainer."
