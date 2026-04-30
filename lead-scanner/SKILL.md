---
name: lead-scanner
description: Monitor Reddit, Strava, Instagram, and forum communities for running and longevity coaching leads. Extract posts matching target demographics, log leads, and prepare draft outreach for coach review.
metadata: {"openclaw":{"emoji":"🎯","requires":{"bins":["curl","jq","date"],"env":["TAVILY_API_KEY"]}}}
user-invocable: true
---

# Lead Scanner for Running & Longevity Coaches

## What It Does
Scans outdoor/endurance sports and longevity communities daily for posts from people asking for coaching, training advice, or help getting started. Outputs structured lead cards ready for coach review and outreach.

## Target Audiences
- **Cairn:** Trail runners, ultra runners, first responders/firefighters/military, hybrid athletes (20-55) looking for structured training plans or coaching
- **Fuller Health:** Active adults 50-90 interested in longevity training, maintaining strength, staying active, "aging well" conversations

## Sources Scanned
- Reddit: r/trailrunning, r/ultrarunning, r/AdvancedRunning, r/firstresponderfitness, r/firefighting, r/longevity, r/fitnessover50, r/xxfitness
- Strava: Recent club posts in major running clubs (search-based)
- Instagram: Posts using #trailrunningcoach, #ultrarunningcoach, #longevitytraining (search-based)
- Facebook Groups: Trail & ultra running groups (search-based)
- Web forums: iRunFar forums, UltraRunning Magazine forums

## Workflow

### 1. Run Daily Searches
For each source, search for posts containing these signals grouped by brand:

**Cairn signals:**
- "looking for a coach" + "trail running"
- "training for first ultra" OR "first 50k"
- "need a training plan" + "trail"
- "how to start" + "trail running"
- "running form help" OR "injury" + "running"
- "military" OR "firefighter" + "training plan"
- "hybrid athlete" + "program"
- "ultramarathon training" + "coach"

**Fuller Health signals:**
- "strength training over 50" OR "over 60"
- "aging" + "fitness" OR "athlete"
- "longevity" + "training" OR "exercise"
- "active at 60" OR "staying fit at 70"
- "running after 50" OR "marathon at 60"
- "masters athlete" + "coaching"

### 2. Evaluate Each Lead
For every result found, assess:
- **Fit:** Is this person looking for what we offer? (Yes/Maybe/No)
- **Timing:** Is the post recent (last 7 days)?
- **Pain signal:** Is there a clear problem they want solved?
- **Budget signal:** Did they mention money, "not cheap", "worth it", or a budget?

### 3. Output Lead Cards

```
LEAD: [username/handle]
SOURCE: [Reddit r/subreddit] | [Strava] | [Instagram] | [Facebook group] | [Forum]
BRAND: [Cairn / Fuller Health / Both]
POST DATE: [date]
POST: "[excerpt of the post - keep it to what matters for the pitch]"
SIGNALS: [what in the post tells you they're a match]
PAIN: [the specific problem they want solved]
FIT: [High / Medium / Low]
NOTES: [anything else worth knowing — location experience, injury history mentioned]
```

### 4. Draft Outreach (for Coach Review Only)
For High-fit leads, prepare an optional draft DM. Follow these rules:
- **Never send without explicit coach approval.** Output for review only.
- Lead with shared experience or specific reference to their post, not a pitch.
- Keep it to 3 sentences max.
- No "transform your life" or hype language.
- Cairn tone: peer-to-peer, direct, understands the grind.
- Fuller Health tone: warm, clinical authority, respects their intelligence.

## Output Format

Begin every run with a summary line:

```
Lead scan complete — [N] new leads found across [M] sources. [X] high-fit, [Y] medium-fit.
```

Then list all leads, grouped by fit level (High first). End with:

```
Next scan: [tomorrow's date]. Approvals needed for [N] draft outreach messages.
```

## Guardrails
- Do NOT DM, message, email, or contact any lead. Output only for coach review.
- Do NOT remove duplicates — if the same user appears in multiple sources, flag it.
- Do NOT fabricate leads. If a search returns zero results, say "No new leads today."
- Do NOT follow links that look suspicious or go to login-gated content. Skip and note "login wall."
- Respect Reddit API rate limits: max 1 search per 2 seconds.
- Do not save or store lead data anywhere beyond the output — no files, no database writes.

## Failure Handling
- If a source returns an error (403, rate-limited, down): note it in the output and continue with remaining sources.
- If all sources fail: report and suggest checking TAVILY_API_KEY or trying again in 2 hours.
- If Tavily has no results for a search: move to the next search term. Don't retry the same query.

## Example

```
Lead scan complete — 3 new leads found across 2 sources. 2 high-fit, 1 medium-fit.

[HIGH] LEAD: trail_newbie_42
SOURCE: Reddit r/trailrunning
BRAND: Cairn
POST DATE: 2026-04-28
POST: "Been road running for 5 years. Thinking about my first trail race. No idea where to start with training."
SIGNALS: New to trail, actively asking for direction, "no idea where to start" = coaching opportunity
PAIN: Transition from road to trail, needs structured guidance
FIT: High
NOTES: Could be in early exploration phase — gentle education content would warm them up before outreach

[MEDIUM] LEAD: active_at_62
SOURCE: Reddit r/fitnessover50
BRAND: Fuller Health
POST DATE: 2026-04-27
POST: "62m, been lifting 3x week for two years. Thinking about adding cardio but don't know how to balance both."
SIGNALS: Already active, looking for structure, open age
PAIN: Needs programming guidance for strength + endurance combo
FIT: Medium
NOTES: Already doing the work — just needs better programming. Good Fuller Health fit but may not be ready for paid coaching yet.

Next scan: 2026-04-30. Approvals needed for 0 draft outreach messages.
```
