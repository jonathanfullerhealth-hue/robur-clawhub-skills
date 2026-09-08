# FHP Traffic Plan → the Scorecard

**Goal of this doc:** get real people to the live FHP scorecard
(https://fuller-health-performance.vercel.app), score themselves, and book a free consult.

**This is a BUILD SPEC.** Claude wrote the plan (strategy + structure below). The
*build* — writing every post, caption, DM, and email to final copy — is the handoff
job (Hermes/DeepSeek). Claude reviews Hermes' output against the brand rules at the
bottom before anything ships.

---

## Who we help / what we solve / what "solved" looks like
- **Who:** three people, one funnel. (1) Someone carrying weight who's tired of crash
  resets. (2) An active adult 50–90 who wants to stay capable. (3) A runner chasing a
  5K → ultra.
- **Problem:** they don't know their *weak link* — the one thing capping their goal —
  so effort scatters and nothing holds.
- **Solved:** 60 seconds in the scorecard names the weak link; a free consult turns it
  into a plan that fits their life; a pro coaches the long game.

Every piece of content must make one of those three lines obvious. If a post doesn't,
it's off-plan.

---

## The one asset everything points to
The **scorecard** is the lead magnet (free, no email wall to *see* the score, email
only to book). Every channel below drives a click to it. No other landing page.

**One tracked link per channel** (append `?source=` so leads carry their origin —
`api/lead.js` already stores `source`):
- Instagram bio → `...vercel.app/?source=ig-bio`
- TikTok bio → `?source=tiktok-bio`
- YouTube → `?source=yt`
- Email signature → `?source=sig`
- Referral card → `?source=referral`
Hermes: produce the final link list; Claude confirms the param names match the funnel.

---

## Channels, in priority order

### 1. Founder-story short video (IG Reels / TikTok / YT Shorts) — PRIMARY
Jonathan has run **200-mile races**. That is the credibility engine. Lead with it.
- **Cadence:** 4–5 shorts/week, 20–45s. Reuse the same clip across all three platforms.
- **8 repeatable formats** Hermes writes 3 scripts each for (24 scripts, batch 1):
  1. "The weak link" — pick one domain (strength/engine/nutrition/recovery/movement),
     explain why it silently caps a goal, end: *"Score yours — link in bio."*
  2. "200-mile lesson" — one thing ultra-running taught about the average person's
     training. Authority → humility → CTA.
  3. Myth-bust — one crash-diet / "too old to start" / "runners don't lift" myth.
  4. Client-shaped transformation *principle* (NO fake before/afters, NO numbers) —
     the *approach* that worked, not a promised result.
  5. "Pick your goal" — 3-way split (lose weight / age well / run further), same weak
     link matters to all three → score.
  6. 50–90 longevity angle — strength & aerobic engine are trainable at any age.
  7. First-5K-to-ultra runner angle.
  8. "What the free consult actually is" — de-risk the booking (no obligation, you
     leave with your weak link + first move).
- **Every video ends the same:** "Score your body in 60 seconds — free, link in bio."

### 2. Instagram/TikTok profile + carousels
- Rewrite bio to the who/problem/solved formula + scorecard link. Hermes drafts 3 bio
  options; Claude picks.
- **2 carousels/week** (saveable = reach): e.g. "The 5 domains every fitness goal
  depends on," "How to know your weak link." Last slide = scorecard CTA.

### 3. Warm outbound (DMs + personal network) — fastest first bookings
- **DM script**, 3 variants: past clients, engaged followers, people who commented.
  Value-first, not salesy: offer to walk them through their score. Hermes writes;
  Claude reviews for pushiness.
- **Personal-network email/text** (one honest note): "Rebranded to Fuller Health &
  Performance, built a free 60-second scorecard, would love your read on it." Link.

### 4. Email
- **Nurture, 5 emails** for scorecard leads who didn't book: (1) your score means
  this, (2) the weak-link idea, (3) 200-mile founder story, (4) what coaching is/isn't,
  (5) soft booking ask. Hermes drafts all 5; Claude reviews.
- **Signature** with scorecard link on Jonathan's day-to-day email.

### 5. Local / community (Miami)
- Run clubs, gyms, physio/chiro clinics (referral partners, not competitors): a
  one-card handout — "Free 60-sec scorecard" + QR to the funnel. Hermes writes the
  card copy; Claude reviews claims.

### 6. Paid — LAST, only after organic proves the hook
- Do **not** start paid until ≥1 organic short clears ~10k views OR the scorecard has
  ≥50 completions. Then boost the *winning* organic short, $5–10/day, to a lookalike.
  Hermes drafts 3 ad variants of the proven hook when we get there.

---

## 30-day sequence (what Hermes builds, in order)
1. **Week 0 (build batch 1):** bio rewrite (3 options), 24 short scripts (8 formats ×3),
   2 carousels, DM scripts (3), personal-network note, 5-email nurture, tracked-link
   list. → Claude reviews the whole batch against brand rules → revise → ship.
2. **Week 1–4:** publish 4–5 shorts/wk + 2 carousels/wk; send personal-network note;
   turn on nurture; DM warm list.
3. **End of week 4:** pull `source` data from leads, find the top format, decide paid.

---

## Metrics (check weekly)
Scorecard completions · consult bookings · which `?source=` converts · top-performing
short. One number that matters most: **consults booked.**

---

## BRAND / HONESTY RULES — Claude enforces these on every Hermes draft
Non-negotiable. Any draft violating these gets sent back.
- **No medical guarantees, no cure claims, no promised weight-loss numbers** ("lose
  20 lbs in 6 weeks" = banned). Health marketing.
- **No fake proof** — no invented testimonials, before/afters, client counts, or
  screenshots. Real or nothing.
- **Credentials accurate:** coach = *clinical exercise therapist, MSc Physical Therapy*.
  **Never** the word "physiotherapist," never imply a licensed/registered PT.
- **Founder claim that IS true and should be used:** has run 200-mile races.
- **Tone:** direct, plain, warm. Who we help / what we solve / what solved looks like —
  obvious in every piece.
- Booking always → the free consult (no obligation). The score is free to see.
