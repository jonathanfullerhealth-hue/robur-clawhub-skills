# Running Side — What to Take From Koop, and In What Order

**Internal note.** 2026-09-06.
Context: TrainingPeaks is the platform. One running client. Source material is the Born on
the Trail interview with Jason Koop plus his published CTS work — see
`docs/koop-methodology-notes.md`.

---

## The main thing

Koop is doing **two separate things** and the interview blurs them together. Only one of
them is relevant to us right now.

**Thing one — KoopAI.** A product that replaces the bottom of the coaching funnel: static
PDF plans, spreadsheet templates, and low-tier coaches managing hundreds of athletes on
copy-paste. Three years of build, a co-founder with a PhD doing the technical side, a
mathematical model fused with an LLM. This is a venture, not a workflow.

**Thing two — his own coaching assistant.** A separate agent, built on the same knowledge
base but "skinned differently," that he uses on his own athletes every day. Sentiment
analysis across channels. Longitudinal data mining. Admin compression.

**Thing two is the one to copy.** Thing one is not available to a one-client operation and
would be the wrong bet even if it were — you'd be building a product for a funnel you don't
have yet.

## What we already had right

The check-in triage being **rule-based and deterministic** rather than LLM-judged is
correct, and Koop's own caution supports it: he warns that the positive-reinforcement loop
in these tools convinces unskilled operators they're geniuses. Deterministic rules can't
flatter you. Keep that.

Draft-only output with mandatory coach review — also correct, same reason.

## What we were getting wrong

**The periodization shape was a road-marathon model.** `training-plan-builder` ran
base → build intensity → peak → taper. For a mountain ultra that's close to inverted. The
end state you're training toward is long, slow, vert-heavy and fueled, so that belongs
*nearest* the race; speed work is the least ultra-specific thing there is, so it goes
early. Fixed.

**Vert wasn't a tracked variable at all.** Three volume metrics matter for trail — time,
distance, and vertical gain — and we had two. A plan specified in duration and heart rate
alone trains one of the four disciplines an ultra actually contains.

**Downhill was treated as recovery.** It isn't. It's limited by eccentric damage tolerance,
not aerobic cost, which means it needs deliberate progression and 48h+ to clear. It was
invisible in our plan logic and it's a leading cause of the thing that ends mountain races.

**Fueling said "practice fueling" instead of a number.** Race working range is 50–75 g
carb/hr; gut training happens above it at ~90 g/hr. Most athletes are badly under-fueled and
don't know it. Now prescribed as an actual figure.

**No language layer anywhere.** Covered below — this is the big one.

## The single highest-leverage addition: sentiment

Koop's first hero metric is post-activity comments — free text, ahead of the objective data.
His first AI build was not a plan generator, it was a sentiment analysis tool, and it's the
thing he uses daily. He picked it because it was simultaneously high-value and a task LLMs
are genuinely good at, which he describes as a rare combination.

The method that matters is **baseline-then-deviation, not keyword spotting.** He's explicit
that catching the word "hurt" is the weak version and other tools do it better. The signal
is change from how *this* athlete normally writes — length, tone, vocabulary, the stock
phrase they always use and suddenly didn't.

This directly patches our biggest triage blind spot. Numeric wellness scores fail on athletes
who under-report, and stoic athletes are exactly the population we serve. Their numbers look
fine until they don't.

Shipped as `athlete-sentiment-tracker`. It feeds `client-checkin-analyzer` as a modifier that
can escalate attention but can never downgrade a triage level.

## Why one client is an advantage here, not a limitation

The instinct is that one client is too few to justify tooling. It's backwards for this
specific work.

A sentiment baseline needs 10–20 entries before it's worth anything. Longitudinal response
patterns — the thing Koop calls the key to individualization — need years. **Both clocks
start at the first entry you capture properly, and neither can be back-filled later.** The
cost of starting now with one athlete is nearly zero. The cost of starting in two years with
twelve is two years.

So the sequencing is: build the capture discipline now while it's cheap, and let the dataset
accrue.

Practical version, in order:

1. **Every session gets a post-activity comment.** Encourage long ones. Koop's point is worth
   repeating — when an athlete writes three paragraphs, the answer is a better synthesis
   tool, not asking them to write less.
2. **Turn on voice memos.** Koop publicly asked TrainingPeaks for a voice recorder on the
   post-activity comment field and called them years behind on it. We don't have to wait —
   with one athlete you just have them record after the session and you transcribe it.
   Many people give substantially better subjective feedback speaking than typing.
   The part that breaks is **pairing the memo durably to the specific workout** — that's the
   one piece of discipline that makes it worth anything. Filename as `YYYY-MM-DD session`.
3. **Run the sentiment baseline monthly.** It's useless for the first two months. Run it
   anyway so the habit exists.
4. **Quarterly `training-history-audit`.** Builds the individual response record.
5. **Audit yourself.** Koop's loop: compare what the tool produced against what you'd have
   done, then fix the system where it diverged. Without this the tooling drifts and you
   won't notice, because it will keep agreeing with you.

## Our actual differentiator

Worth being direct about this. Koop's system is explicitly guardrailed to exclude: injured
or recently-injured athletes, anyone under ~12 months of training, all sub-ultra, road
marathon, track. It is strongest on 100-mile mountain ultras and gets weaker the further out
you go — he names backyard ultras and 200+ milers himself.

**Shift work is nowhere in that scope.** Rotating nights, 12s, sleep debt as a training
stress rather than an inconvenience — no elite-ultra system handles it, because elite
ultrarunners don't work rotating nights. Our plan builder already treats shift work as a
non-negotiable load variable. That's not a gap in our offering, it's the offering.

The move is to go narrower there, not broader toward competing with him. Tactical and
shift-work endurance athletes is a real, underserved, defensible position. Ultra generalist
is not.

## What not to do

**Don't clone his voice.** KoopAI's entire premise is that it speaks and reasons as him,
built from his own books, articles and podcast. Building something that imitates that is a
legal problem and, more practically, a credibility problem — we'd be selling a worse copy of
something the market can buy directly. We use published principles, cited. That's it.

**Don't build a plan-generation product.** Three years, two people, a PhD on the technical
side, and he still calls v1 regrettable. We have one client. Wrong shape of bet.

**Don't skip the fundamentals for the tooling.** Koop's own framing: AI doesn't cover up bad
coaching, it amplifies whatever's there — and unlike the power-meter era, a bad operator
with these tools gets actively led astray rather than merely under-served. The audit habit in
step 5 is what keeps that honest.

**Don't trust the data before scrubbing it.** He warns that once you pull raw files and strip
the platform's native smoothing, the volume of bad GPS and HR data is genuinely surprising —
and bad points will fool an analysis if you don't have an explicit policy. That policy now
lives in `training-history-audit` step 1 and runs before anything else.

## Open items

- **Anti-doping** came up hard in the interview and is worth tracking, but it's a
  sport-governance issue, not an operational one for us. No action.
- **Lactate gels** — he calls them a repeat of the ketone playbook: broad early claims that
  narrow to almost nothing. If a client asks, that's the answer.
- The **coach-in-the-middle model** — AI proposes the block, coach approves — is where he
  says he's heading but hasn't gone. Worth revisiting once we have enough athletes that
  per-athlete programming time is an actual constraint. It isn't yet.
