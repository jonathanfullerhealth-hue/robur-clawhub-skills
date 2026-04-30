---
name: content-pipeline-generator
description: Generate 14 posts per week across two coaching brands (endurance + longevity) with platform-optimized hooks, evidence-backed claims, and daily CTA strategy. One post per brand per day, 7 days a week.
metadata: {"openclaw":{"emoji":"📝","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Content Pipeline Generator — Running & Longevity Coach

## What It Does
Generates a complete weekly content schedule for an endurance coaching brand and a longevity coaching brand. Produces one post per brand per day (14 posts/week), each in platform-native format with hooks, evidence citations, and a day-appropriate call to action.

Works for any coach who serves:
- **Brand A (Endurance / Trail / Ultra):** Trail runners, ultra runners, tactical athletes, shift workers looking for structured training
- **Brand B (Longevity / Active Aging):** Active adults 50–90 optimizing for long-term health span

## Workflow

### 1. Define Your Brands
The agent will ask you for:
- **Endurance brand name** (e.g., "Cairn Endurance")
- **Longevity brand name** (e.g., "Fuller Health & Longevity")
- Your posting platforms (default: Instagram, X/Twitter, Facebook, LinkedIn)
- Any content pillars or themes you want to rotate through

### 2. Select a Week
Choose one of:
- **This week** — generate posts for the current week starting today
- **Next week** — generate posts starting next Monday
- **Date range** — specify exact start date

### 3. Pipeline Generates 14 Posts

For each brand, the agent generates 7 posts following this cadence:

| Day | Type | CTA Weight | Description |
|-----|------|-----------|-------------|
| Monday | Educational | Soft | Evidence-backed tip or how-to. Cite a study. |
| Tuesday | Motivational | Soft | Community-grounded, specific, not generic. Reference real experiences. |
| Wednesday | Funny/Relatable | Light | Shared-pain moment specific to that audience. Question or poll. |
| Thursday | Educational | Medium | Deeper dive into one topic. "Want to go deeper? Link in bio." |
| Friday | Promo / Offer | Hard | Booking link or assessment link. No exceptions. |
| Saturday | Personal story / Community | Warm | First-person or community story. "What's your story?" |
| Sunday | Research Breakdown | Authority | Study citation → plain language → real-world takeaway. |

**Generation order:** All 7 endurance posts first, then all 7 longevity posts.

### 4. Output Format for Each Post

```
────────────────────────
BRAND: [Endurance / Longevity]
DAY: Monday | TYPE: Educational
PLATFORM: Instagram (primary) | [secondary]
────────────────────────

HOOK: [1 line, max 12 words. Specific claim or counterintuitive statement.]

[BODY — 3–5 short paragraphs. Evidence-backed. One idea per paragraph. No filler.]

CTA: [Per CTA weight above. Soft = follow/save. Medium = deeper/resources. Hard = booking link.]

Hashtags (3–5 max): [#niche1 #niche2 #niche3]

────────────────────────
```

## Brand Voice Reference

### Endurance Brand Voice
- **Tone:** Direct, field-tested, peer-to-peer. The coach has done the distance.
- **Language:** Specific race distances, event names, terrain types. No hype language.
- **Audience:** Trail/ultra runners, tactical athletes (military/fire/EMS), shift workers.
- **Never:** "Transform your life," "crush it," "beast mode," "biohacking," "superfoods," "toxins."
- **Always:** Evidence before advice. Acknowledge the suffer. Respect the athlete's intelligence.

### Longevity Brand Voice
- **Tone:** Warm, clinical authority that never becomes clinical coldness. Science → what to do.
- **Language:** "Evidence-backed," "research shows," specific clinical markers (VO2max, grip strength, HRV).
- **Audience:** Adults 50–90 serious about staying capable. Not beginners, not weight-loss focused.
- **Never:** Fear-based aging language ("at your age"), "anti-aging," "turn back the clock," "senior," "elderly," trendy wellness terms, inflated claims.
- **Always:** Capability-forward framing. This audience is intelligent — respect that.

## Hook Psychology (Apply to Every Post)

Research-backed principles:
1. **Pattern interrupt beats question.** "Most runners train their aerobic system wrong" outperforms "Are you training correctly?"
2. **Specific numbers increase read-through.** "27 kg" beats "low grip strength." "35%" beats "significant improvement."
3. **Counterintuitive claim stops the scroll.** Lead with what surprises, then explain.
4. **One idea per post.** Single-topic posts outperform multi-tip lists on save rate.
5. **First 3 lines determine everything.** Write the hook last, after you know what you're saying.

Hook formula options:
- [Number] + [surprising implication]: "Grip strength under 27 kg predicts cardiovascular risk better than cholesterol."
- [Common belief] + [is wrong]: "More miles won't fix your ultra performance. Here's what will."
- [Counterintuitive truth]: "The athletes who recover fastest don't do more. They do less, better."
- [Specific scenario]: "You're 40 miles into a 100. Your quads are gone. This is why."

## Research Citation Rules
- Preferred sources (endurance): IJSPP, MSSE, JOSPT, Jason Koop, David Roche, Kilian Jornet, Courtney Dauwalter, iRunFar, UltraRunning Magazine
- Preferred sources (longevity): Inigo San Millán, Andy Galpin, Dan Lieberman, Valter Longo, NIA, Journal of Applied Physiology, Journal of Cachexia
- Format: "[Author last names], [Journal Name], [Year]" — e.g., "Rønnestad et al., IJSPP, 2023"
- Do NOT fabricate citations. If you don't have a real source, use general evidence language ("research shows," "studies suggest") without a fake citation.
- Do NOT attribute quotes to the coach. External sources only.

## CTA Reference by Day

| Day | Endurance Brand | Longevity Brand |
|-----|----------------|-----------------|
| Mon | "Follow for weekly trail training content." | "Follow for evidence-based longevity content." |
| Tue | "What's the hardest thing you've pushed through lately?" | "What's one thing you do every week for your health?" |
| Wed | "Drop your experience below." | "Which one surprised you most?" |
| Thu | "Want a plan built around your schedule? Link in bio." | "Save this for your next training block." |
| Fri | "Book a free 20-minute discovery call. Link in bio." | "Take the free Longevity Assessment — 5 minutes. Link in bio." |
| Sat | "What's your story? Drop it below." | "What keeps you active? Drop it below." |
| Sun | "Follow for weekly research breakdowns." | "Save this for reference. Follow for weekly research." |

## Character Limits
- Instagram: 2,200 characters max
- X/Twitter: 280 characters per post (thread for longer content)
- Facebook: 5,000 characters max
- LinkedIn: 3,000 characters max

## Guardrails
- Do NOT fabricate citations. Use real studies or acknowledge the limitation.
- Do NOT use hype language. "Evidence-backed" is the only authority claim allowed.
- Do NOT post anything without coach review and approval. Output is draft-only.
- Do NOT mix brand voices. Endurance and longevity have distinct tones — keep them separate.
- Do NOT reuse the same post for both brands. They are different audiences with different concerns.
- Generate all endurance posts before longevity posts. Never interleave.

## Failure Handling
- If the coach hasn't provided brand names, ask for them before generating anything.
- If content pillars aren't defined, use the default pillars (Training, Recovery, Mindset, Nutrition, Race Strategy for endurance; Strength, Zone 2, Sleep, Nutrition, Metabolic Health for longevity).
- If a platform character limit will be exceeded, suggest thread or carousel format.

## Example Output (Single Post)

```
────────────────────────
BRAND: Endurance
DAY: Monday | TYPE: Educational
PLATFORM: Instagram
────────────────────────

HOOK: Most ultra runners overtaper. Here's what the data actually says.

You've heard it: rest more before your race. Cut volume, protect the legs.

The problem? Most athletes cut too much, too fast — and show up flat.

A 2022 review in IJSPP found that a 20–25% volume reduction over 2–3 weeks maintained performance better than aggressive tapers exceeding 40% reduction. The athletes who cut hardest didn't run fastest.

What actually works:
• Reduce volume, not intensity
• Keep at least one race-pace effort in the final week
• Sleep and nutrition matter more than mileage in the last 7 days

The goal isn't to arrive rested. It's to arrive sharp.

CTA: Follow for weekly trail training content.

Hashtags: #ultrarunning #trailrunning #raceprep #ultramarathontraining
```
