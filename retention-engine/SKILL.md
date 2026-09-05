---
name: retention-engine
description: Weekly client-retention automation for clinics and coaches. Scores each active client's churn risk from engagement and outcome signals, explains why, and drafts a specific, personalized retention action for human approval. Sells the RYT service as "keep the clients you already have" — the bigger wallet than lead-gen. Deterministic triage, no auto-send.
metadata: {"openclaw":{"emoji":"🔁","requires":{"bins":["date"],"env":[]}}}
user-invocable: true
---

# Retention Engine

## Who this helps
A clinic, practice, or coaching business (RYT's up-market buyer: longevity /
functional-medicine / concierge clinics, med spas, PT/chiro, high-ticket coaches)
that spends heavily to *acquire* clients and quietly loses them out the back door.

## The problem it solves
A 10-point retention improvement is worth more in cumulative revenue over five years
than almost any acquisition campaign on the same panel. Yet retention is invisible
until the client is already gone — nobody watches the slow drift of a member who
stopped booking, stopped replying, or stopped hitting their program. This engine
watches it every week and puts the at-risk client in front of a human *before* they
cancel.

## What "solved" looks like
Every Monday the owner opens a **retention board**: who is drifting, why, what to do
about it, and a ready-to-approve message — plus who is up for renewal and who just
had a win worth celebrating. No client churns silently.

## Position (how RYT sells this)
Do NOT lead with "get more leads." Lead with: *"You're paying to fill a bucket with a
hole in it. We patch the hole first."* Retention is the flagship; lead-gen is the
upsell.

## Input
A current roster export (CSV, table, or pasted list). Per active client, any of:
- `last_visit` / `last_session` date
- `last_contact` date (last two-way message)
- `program_adherence` (%, or a note)
- `last_checkin_sentiment` (from client-checkin-analyzer, or free text)
- `renewal_date` / membership end date
- `nps` or last satisfaction signal
- `lifetime_value` or plan tier
- `notes` (injury, life event, complaint, praise)

More fields = sharper scoring. Missing fields are allowed — never invented.

## Workflow

### 1. Deterministic churn-risk triage
Score each client RED / YELLOW / GREEN with fixed rules (no LLM guessing on the
triage itself — reproducibility matters). Apply the strongest matching rule.

**RED (act this week):**
- No visit/session in ≥ 2× their normal cadence (or ≥ 45 days if cadence unknown), OR
- No two-way contact in ≥ 30 days, OR
- Adherence dropped below 40% or fell ≥ 30 points vs. their baseline, OR
- Negative last-check-in sentiment or an unresolved complaint, OR
- Renewal date within 30 days AND any yellow signal present.

**YELLOW (watch / nurture):**
- Cadence slipping (1–2× normal gap), OR
- Adherence 40–70% or trending down, OR
- Neutral/flat sentiment with no recent win, OR
- Renewal within 60 days and otherwise healthy.

**GREEN (celebrate / reinforce):**
- On-cadence, adherent, positive or engaged. Not at risk — but a win here (a PR, a
  milestone) is a retention *asset*: surface it for a shout-out.

If the data can't place a client, mark **UNKNOWN — needs a data point** and say which
field would resolve it. Do not fabricate a status.

### 2. Explain the "why"
For each RED/YELLOW, one line of evidence: the specific signal(s) that triggered it
(cite the field + value). No vague "seems disengaged."

### 3. Recommend the action
Map the reason to a specific play:
- Silent/no-contact → personal re-check-in ("haven't seen you — everything ok?").
- Adherence drop → offer a plan adjustment (hand to `training-plan-builder`).
- Complaint/negative → owner calls personally; do NOT automate this one.
- Renewal window → renewal conversation + a reason-to-stay (a result, a next goal).
- GREEN win → a celebration message + a referral ask (retention → acquisition, free).

### 4. Draft the outreach (for approval only)
For each recommended action, draft a short, personal message in the owner's voice.
Rules: reference something specific to that client, 3 sentences max, no hype, no
"we miss you 😢" spam. **Never send. Output for human approval only.**

## Output format
Start with a summary line:
```
Retention board — [W] clients scanned. [R] RED, [Y] YELLOW, [G] GREEN, [U] unknown. [N] renewals in 30 days.
```
Then, RED first, one card each:
```
[RED] CLIENT: [name]  |  Tier: [plan]  |  Renewal: [date]
WHY: [signal + value, e.g. "last_visit 52 days ago; normal cadence ~14 days"]
ACTION: [specific play]
DRAFT (approve to send): "[personal message]"
```
Then YELLOW, then GREEN wins, then UNKNOWN (with the missing field). End with:
```
Biggest retention risk this week: [one client + the money at stake].
Next scan: [next Monday].
```

## Guardrails
- Triage is **rule-based and deterministic** — same roster in, same statuses out.
- **Never auto-contact anyone.** Every draft is for human approval.
- Never fabricate a date, adherence number, or sentiment. Missing = UNKNOWN.
- Complaints and negative sentiment go to a **human call**, never an automated text.
- Don't over-message: one action per client per week, max.
- Right-size it — a 15-client coach is not a 2,000-member clinic; scale the board.

## Failure handling
- Empty/short roster: "Roster too small or missing key fields — provide at least
  last_visit and last_contact per client for a useful scan."
- No dates at all: score only on adherence/sentiment and flag "date signals missing —
  churn timing can't be assessed."
- Whole roster GREEN: say so plainly and surface the top referral opportunities
  instead of inventing risk.
