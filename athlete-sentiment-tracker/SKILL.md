---
name: athlete-sentiment-tracker
description: Build a per-athlete communication baseline from historical post-activity comments and messages, then flag deviation from that baseline. Detects sentiment change, not keywords. Merges TrainingPeaks comments, WhatsApp/SMS threads, call transcripts, and voice memos into one rolling view.
metadata: {"openclaw":{"emoji":"🎙️","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Athlete Sentiment Tracker — Baseline and Deviation

## What It Does

Reads an athlete's free-text and voice feedback over time, establishes what *normal*
communication looks like for that specific athlete, and flags when it changes.

This is a deviation detector, not a keyword scanner. Two athletes can write "legs felt
rough today" and mean completely different things — one says it every week, one has never
said it before. Only the second is a signal.

It produces:

1. **A communication baseline** for the athlete — tone, length, vocabulary, hedging habits
2. **A deviation score and direction** for the current window
3. **Specific quotes** that drove the deviation, with dates
4. **Questions to ask** — the gaps the text implies but doesn't answer
5. **A draft coach message** — for review, never sent automatically

## Why baseline-first matters

Subjective post-activity feedback is the highest-signal input a remote coach has, and it
is the hardest to trend because it's language rather than numbers. The failure mode of
naive tooling is keyword alarms: flagging "hurt," "tired," "sore." Those words are noise
for an athlete who uses them constantly and meaningless for an athlete who never
complains. The signal is *change from that athlete's own normal*.

This mirrors the approach described publicly by Jason Koop (CTS), who treats post-activity
comments as his first hero metric and built baseline-deviation sentiment analysis as his
first AI tool. See `docs/koop-methodology-notes.md` §8. We are implementing the published
principle, not his system or his voice.

## Inputs

The skill accepts any mix of these. More history is better — the baseline is weak below
about 10 entries.

| Source | Format | Notes |
|--------|--------|-------|
| TrainingPeaks post-activity comments | Text export, dated | Primary source. Pair each to its workout. |
| WhatsApp / SMS / iMessage threads | Text export, dated | Strip coach messages, keep athlete's |
| Email | Text, dated | |
| Call / video transcripts | Text, dated | |
| Voice memo transcriptions | Text, dated + workout it belongs to | See "Voice memos" below |
| Check-in form free-text | Text, dated | The "notes" field, not the numeric scores |

**Required per entry:** date, athlete's own words, and — where it exists — the workout the
comment attaches to.

**Do not include** the coach's own messages in the baseline. The baseline is the athlete's
voice only.

## Workflow

### Step 1 — Establish the baseline

Using all entries **older than the current analysis window**, characterise the athlete
across these dimensions. Be concrete and quote-backed.

```
LENGTH:        typical words per entry, and range
TONE:          default emotional register (flat / upbeat / wry / stoic / anxious / analytical)
COMPLAINT RATE: how often does this athlete mention discomfort at all? (x in y entries)
HEDGING:       do they qualify ("kind of", "I think", "probably") or state flatly?
DETAIL TYPE:   do they report data (paces, HR), sensation (legs, breathing), or context (work, sleep)?
STOCK PHRASES: recurring formulations this athlete reuses
OMISSIONS:     what do they habitually not mention? (a stoic athlete's silence on pain is not absence of pain)
```

State the baseline sample size explicitly. If under 10 entries, label the baseline
**PROVISIONAL** and say so in every downstream output.

### Step 2 — Analyse the current window

Default window: last 14 days, or last 5 entries, whichever is longer. Compare against
baseline on each dimension. For each, record: unchanged / shifted, and by how much.

### Step 3 — Score the deviation

Deterministic. Count dimensions that shifted materially:

```
MATERIAL SHIFT = any of:
- Length drops or rises by >50% vs baseline average
- Tone register changes category
- Complaint rate at least doubles vs baseline rate
- Hedging appears in an athlete who normally states flatly (or disappears in one who hedges)
- Detail type changes category (e.g. stops reporting sensation, reports only data)
- A stock phrase they always use disappears
- Entries stop entirely for longer than their baseline gap

DEVIATION LEVEL:
- HIGH:     3+ material shifts, OR any shift plus an explicit new pain/injury/life-stress mention
- MODERATE: 2 material shifts
- LOW:      1 material shift
- NONE:     0 material shifts
```

**Silence counts.** An athlete who wrote three sentences after every run and now leaves the
field blank has deviated. Do not score an empty window as NONE.

### Step 4 — Direction and candidate explanations

Label direction: **improving / declining / flattening / volatile**.

Then list candidate explanations ranked by what the text actually supports. Diagnose in
hierarchy-of-needs order (volume → rest → intensity → specificity → nutrition → mental →
taper) rather than jumping to the interesting explanation. Mark each as
`SUPPORTED BY TEXT` or `HYPOTHESIS — NEEDS CONFIRMATION`.

### Step 5 — Name the gaps

The point of the analysis is to produce the right question, not a verdict. List what the
text implies but does not resolve — sleep, work stress, fueling, life events, whether pain
is new or chronic. These become the coach's actual next message.

### Step 6 — Draft the coach message

Two to four short paragraphs in the coach's voice. Lead with the observation, not the
diagnosis. Ask the gap questions. Do not tell the athlete they have been "flagged by a
system."

## Voice memos

Many athletes give markedly better subjective feedback speaking than typing. This is worth
actively encouraging with a small roster where you can handle the plumbing manually.

Workflow that works today without platform support:

1. Athlete records a voice memo immediately post-session and sends it.
2. Transcribe it.
3. **Pair it to the workout** — filename or first line as
   `YYYY-MM-DD <session name>`. This pairing is the part that breaks if left informal, and
   an unpaired transcript loses most of its value.
4. Store the transcript alongside that date's entry so it enters the baseline.

Note in the output when an entry came from voice rather than text — spoken register is
naturally longer and looser than written, and comparing a spoken entry against a
text-derived baseline will produce a false length deviation. Baseline voice and text
separately once there are enough of each.

## Output Format

```
────────────────────────
SENTIMENT ANALYSIS — [Athlete Name]
Window: [start] to [end] | Entries analysed: [N] | Baseline: [N] entries [PROVISIONAL?]
────────────────────────

DEVIATION: 🔴 HIGH / 🟠 MODERATE / 🟡 LOW / 🟢 NONE
DIRECTION: [improving / declining / flattening / volatile]

BASELINE — how this athlete normally communicates:
[3–5 lines, quote-backed]

WHAT CHANGED:
- [Dimension]: [baseline] → [current]. Evidence: "[quote]" ([date])
- [Dimension]: [baseline] → [current]. Evidence: "[quote]" ([date])

WHAT DIDN'T CHANGE:
[Briefly — this is what keeps the read honest]

CANDIDATE EXPLANATIONS (hierarchy order):
1. [Explanation] — SUPPORTED BY TEXT: "[quote]"
2. [Explanation] — HYPOTHESIS, NEEDS CONFIRMATION

GAPS — what to ask:
- [Question]
- [Question]

────────────────────────
DRAFT COACH MESSAGE:

[2–4 paragraphs]

🔍 REQUIRES COACH REVIEW BEFORE SENDING.
────────────────────────
```

## Guardrails

- Do NOT send anything to the athlete. Draft only.
- Do NOT flag on keywords alone. A pain word inside an athlete's normal complaint rate is
  not a deviation. Say so explicitly when it comes up.
- Do NOT diagnose. "Communication pattern changed and pain is mentioned for the first time
  in 40 entries" is the finding. Naming a condition is not.
- Do NOT fabricate a baseline. Under 10 entries, label PROVISIONAL and lower confidence in
  every conclusion.
- Do NOT read tone into an absent entry beyond flagging the absence. Silence is a signal to
  ask about, not evidence of a mood.
- Do NOT include the coach's own words in the baseline — it contaminates the athlete's voice.
- Do NOT let a positive-sentiment window suppress objective red flags. This skill is one
  input; it does not override `client-checkin-analyzer` triage. An upbeat athlete with an
  HRV crash is still RED.
- Do NOT quote athlete text into any public, marketing, or shared context. Athlete
  communication is confidential by default.

## Failure Handling

- **No prior history:** run the current window as a first read, state "NO BASELINE — first
  analysis, deviation scoring unavailable," and characterise the athlete's voice so the
  next run has something to compare to.
- **History exists but current window is empty:** report deviation on silence. Do not
  return NONE.
- **Entries not paired to workouts:** proceed, but flag that sentiment could not be
  attributed to specific sessions, which is the main thing that makes it actionable.
- **Mixed voice and text with fewer than 5 of either:** analyse together and warn that
  length comparisons across modes are unreliable.
- **Single source only (e.g. WhatsApp, no TrainingPeaks comments):** proceed, note the
  narrow view. Channel-specific tone is real — people write differently in WhatsApp than in
  a training log.

## Example

```
────────────────────────
SENTIMENT ANALYSIS — Alex M.
Window: 2026-04-15 to 2026-04-29 | Entries analysed: 6 | Baseline: 47 entries
────────────────────────

DEVIATION: 🟠 MODERATE
DIRECTION: flattening

BASELINE — how this athlete normally communicates:
Verbose (avg 38 words), analytical, reports data before sensation — nearly every entry
opens with a pace or HR figure. Rarely complains: discomfort mentioned in 4 of 47 entries,
always hedged ("bit of a niggle, probably nothing"). Habitually closes with a forward-
looking line ("ready for Thursday").

WHAT CHANGED:
- Length: 38 words → 9 words average. Evidence: "Done. 10k." (2026-04-24)
- Detail type: data-then-sensation → data only. No sensation reported in any of the
  6 entries in window.
- Stock phrase: the closing forward-looking line appears in 41/47 baseline entries and
  0/6 in this window.

WHAT DIDN'T CHANGE:
Complaint rate is flat — still zero pain mentions, consistent with baseline. Sessions are
being completed and logged on time. This is not an athlete reporting that something hurts.

CANDIDATE EXPLANATIONS (hierarchy order):
1. Accumulated load / insufficient recovery — HYPOTHESIS, NEEDS CONFIRMATION. Terse
   logging with maintained compliance is consistent with fatigue, but nothing in the text
   says so directly.
2. Life stress outside training — HYPOTHESIS, NEEDS CONFIRMATION. Window overlaps a
   shift rotation per the training log.
3. Disengagement from the block — HYPOTHESIS. The dropped forward-looking line is the
   only supporting evidence and it is weak on its own.

GAPS — what to ask:
- Is anything going on outside training in the last two weeks?
- How is sleep through this rotation compared to the last one?
- Is the shorter logging a time thing, or has the interest dropped off?

────────────────────────
DRAFT COACH MESSAGE:

Hey Alex — your sessions are all getting done and the numbers look fine, so this isn't a
training question. Your check-ins have just gone very short the last couple of weeks,
which isn't like you.

Nothing's wrong from where I'm sitting. I'd rather ask than assume: is that a
time-and-energy thing during this rotation, or is something else going on?

If it's just a busy fortnight, say the word and we carry on as planned.

🔍 REQUIRES COACH REVIEW BEFORE SENDING.
────────────────────────
```
