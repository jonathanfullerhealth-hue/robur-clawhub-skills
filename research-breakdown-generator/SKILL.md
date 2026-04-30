---
name: research-breakdown-generator
description: Take a PubMed link or research description and generate a 7-part Research Breakdown post for social media. Outputs platform-native formats (Instagram, X thread, carousel) with evidence tiering, limitations, and brand-specific application. Works for endurance coaching and longevity coaching brands.
metadata: {"openclaw":{"emoji":"🔬","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Research Breakdown Generator — Evidence-to-Content Pipeline

## What It Does
Takes a research finding, paper, or study description and produces a structured 7-part Research Breakdown post. Designed for coaches who want to build authority through evidence-based content without spending hours reading and translating academic papers.

Converts dense research into content that:
- Builds trust through specificity (named studies, real numbers, honest limitations)
- Stops the scroll with a counterintuitive hook
- Gives the audience something actionable, not just interesting

## Workflow

### Step 1 — Input a Research Finding
The agent accepts research input in any of these forms:
1. **PubMed or journal link** — provide a URL
2. **Study description** — "A 2023 study in MSSE found that polarised training improved VO2max by 11% vs threshold training in recreational runners over 12 weeks"
3. **Claim without source** — "Zone 2 training improves mitochondrial function" (agent will flag: "Source not provided — recommended: find a citation to anchor this post")
4. **Rex brief format** — structured research brief with author, journal, finding, population, evidence strength

### Step 2 — Construct the 7-Part Breakdown

This skill uses a specific 7-part Research Breakdown format. Every breakdown must follow this structure in order:

---

#### 1. HOOK
Open with a surprising or relatable statement connecting the research to the audience's lived experience.

Format: One sentence that challenges a common belief or presents a specific, surprising number. Not a question. Not a generic "did you know."

*Good: "A single long run per week produced 80% of the aerobic adaptation of daily training."*
*Bad: "Did you know that you don't have to run every day?"*

---

#### 2. THE STUDY
Plain-language description:
- What was the intervention?
- Who were the participants? (age, population, demographics)
- How long was the study?
- Note funding source if industry-sponsored (e.g. "funded by a supplement company — interpret accordingly")

*"Researchers at the Norwegian School of Sport Sciences tracked recreational endurance athletes over 12 weeks. Two groups — one running daily, one running 3x/week with one long effort. Same total weekly volume."*

---

#### 3. BEFORE & AFTER
Contrast control vs intervention group using specific numbers or percentages. Always state effect size in plain language — not just p < 0.05.

*"The daily training group improved VO2max by 11.2%. The 3x/week group improved by 10.8%. Essentially identical — but the 3x/week group reported 40% fewer injuries."*

---

#### 4. OUTCOMES
2–3 measurable findings in plain language. Always include a brief limitations note.

Required limitation areas to check:
- Small sample (under 50 participants)? → flag it
- Short duration (under 12 weeks)? → flag it
- Narrow population (e.g. only sedentary postmenopausal women, only well-trained males)? → flag it
- Statistically significant but modest in real-world terms? → flag it

State limitations honestly — this builds trust with the audience.

---

#### 5. BRAND RELEVANCE BRIDGE
Translate the finding into a specific context:

**Endurance brand (trail/ultra/running):**
- Frame for athletes in a training block, recovery phase, or race prep
- "If you're 10 weeks out from a 100km, here's how this applies."
- Reference specific race contexts: mileage, terrain, shift work, fueling

**Longevity brand (50–90 active adults):**
- Connect findings to the 50+ demographic specifically
- Reference the age range studied
- "This research was conducted in adults aged 60–75 — here's what it means for your decade of life."
- No fear language. Capability-forward always.
- Frame in terms of capacity, independence, and quality of life — not decline prevention.

---

#### 6. REAL-LIFE TAKEAWAY
1–3 actionable steps the audience can apply this week. Honest about modest or context-dependent results.

*"Practical target: 3 hours per week at a pace where you can hold a conversation but wouldn't want to."*

If the study's effect was modest or only applies to a specific population, say so. "This finding was in well-trained males aged 20–35. For masters athletes, the effect may differ — start conservatively and monitor your own response."

---

#### 7. SOURCE CREDIT
Format: `[Author last names, Journal Name, Year]` — e.g. "Rønnestad et al., IJSPP, 2023"

Source priority:
1. Systematic reviews and meta-analyses
2. Randomized controlled trials with human subjects
3. Prospective cohort studies
4. Seminal foundational studies (older, cite if still field-defining)

Prefer papers published within the last 5 years. Flag preliminary research and industry-funded studies explicitly.

---

### Step 3 — Platform Formatting

The agent outputs TWO formats per breakdown:

**Format A — Instagram Post (primary format):**
- Hook is the first line (no preamble)
- Body: 3–5 short paragraphs, one idea each, no filler
- CTA: Per day-weight (soft for educational/research, medium or hard for promo)
- Hashtags: 3–5 niche-specific max

**Format B — X/Twitter Thread (optional, for extending reach):**
- Part 1 (intro tweet): Hook + one-line context + "🧵"
- Parts 2–6: One part per tweet (Study, Before/After, Outcomes, Bridge, Takeaway)
- Part 7: Source credit + CTA
- Each tweet under 280 characters

**Format C — Carousel Slide Plan (optional, for Instagram carousel):**
- Slide 1: Hook (big text, minimal design)
- Slides 2–3: The Study + Before/After
- Slide 4: Outcomes + Limitations
- Slide 5: Brand Relevance Bridge
- Slide 6: Takeaway
- Slide 7: Source + CTA

---

### Step 4 — Evidence Tiering

Every breakdown must include an evidence tier:

| Tier | Criteria | Label |
|------|----------|-------|
| STRONG | Meta-analysis, systematic review, or well-powered RCT | ✓ Strong |
| MODERATE | Cohort study, observational, or underpowered RCT | ~ Moderate |
| EMERGING | Limited studies, preliminary findings, industry-funded | ⚠ Emerging |

Flag EMERGING evidence explicitly in the post body. Never present preliminary findings as settled science.

---

## Brand Voice Reference

### Endurance Brand (Trail/Ultra/Running)
- **Hook style:** Counterintuitive claim about training or performance
- **Study framing:** What does this mean for your next race or training block?
- **Takeaway language:** Specific training adjustments: set paces, durations, frequencies
- **CTA:** "Follow for weekly research breakdowns." or "Save this for your next training block."
- **Tone:** Direct, earned authority. This coach has done the distance.

### Longevity Brand (Active Adults 50+)
- **Hook style:** Specific number with clinical or functional implication
- **Study framing:** What does this mean for staying capable year after year?
- **Takeaway language:** protocols, weekly targets, measurable markers
- **CTA:** "Follow for weekly evidence-based longevity content." or "Take the assessment. Link in bio."
- **Tone:** Warm clinical authority. Science → what to do. Never fear-based. Never "anti-aging."

---

## Source Priority & Citation Rules
- Prefer PubMed / peer-reviewed journals over media summaries
- Systematic reviews and meta-analyses > single RCTs > observation studies
- Published within last 5 years where possible
- Flag industry-funded studies with explicit language: "Funded by [company] — interpret results accordingly"
- Format for citation: "[Author last names], [Journal Name], [Year]"
- Do NOT fabricate citations. If the source is unclear, use: "Emerging research suggests..." without fake author names.
- Do NOT attribute findings to Jonathan Fuller. Quote external researchers and papers.

## Output Format

```
────────────────────────
RESEARCH BREAKDOWN
BRAND: [Endurance / Longevity]
PLATFORM: Instagram
DATE: [posting date]
EVIDENCE TIER: [STRONG / MODERATE / EMERGING]
────────────────────────

HOOK:
[1 line, specific and surprising]

THE STUDY:
[2–3 sentences — intervention, population, duration, funding]

BEFORE & AFTER:
[Control vs intervention — specific numbers]

OUTCOMES:
• [Finding 1]
• [Finding 2]
• [Finding 3]

LIMITATIONS:
• [Limitation 1]
• [Limitation 2]

BRAND RELEVANCE:
[1–2 sentences translating to this brand's audience]

TAKEAWAY:
• [Action 1]
• [Action 2]
• [Action 3]

SOURCE:
[Author et al., Journal, Year]

CTA: [per day-weight]

Hashtags (3–5): [#niche1 #niche2 #niche3 #niche4]
────────────────────────

X THREAD (optional):
1/ [Hook + 🧵]
2/ The study: [one line]
3/ Before & after: [one line]
4/ What this means for [audience]: [one line]
5/ Takeaway: [one line]
6/ Source: [Author et al., Journal, Year]
─
```

## Guardrails
- Do NOT fabricate citations. Use real, verifiable sources or acknowledge the limitation.
- Do NOT present EMERGING evidence as settled science. Flag explicitly.
- Do NOT use generic "studies show" language. Name the study, the population, and the outcome.
- Do NOT skip limitations. Every breakdown must have at least one honest limitation. Audiences trust the coach who says "here's what this study didn't test."
- Do NOT use hype language in hooks. Specificity beats hyperbole. "27% improvement" beats "massive improvement."
- Do NOT use Jonathan Fuller as a quoted source in the breakdown. The research IS the source. Jonathan contextualizes it.
- Do NOT produce a breakdown for research that doesn't meet at least MODERATE evidence tier. If the best available evidence is EMERGING, flag it and offer to write a different format (explainer, not breakdown).
- Generate endurance breakdown first, then longevity. Not interleaved.

## Failure Handling
- If a PubMed link fails to load or returns no usable data: ask the coach to provide a study description instead. Do not fabricate study details.
- If the research is from a predatory journal (check publisher: Frontiers, MDPI, or any pay-to-publish without rigorous peer review): flag the concern and let the coach decide.
- If the finding applies to a narrow population that excludes the brand's target audience: flag it explicitly. "This study was conducted in [population]. Applicability to [brand audience] is not directly tested."
- If the coach provides a claim without any source: produce a research breakdown template with placeholder sections and recommend: "This post will be stronger with a specific citation. Consider finding a study that supports this claim."
