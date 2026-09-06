---
name: lead-research
description: Sources real target clinics/practices for RYT outbound and generates a verifiable, specific [Observation] for each — the personalization that makes a cold email land. Feeds the outbound-playbook and lead-scanner. Builds a ready-to-send prospect sheet with name, contact, segment, the observed gap, and the matching solution template. Never fabricates a business or a claim.
metadata: {"openclaw":{"emoji":"🔎","requires":{"bins":["curl","jq"],"env":["TAVILY_API_KEY"]}}}
user-invocable: true
---

# Lead Research (Outbound Sourcing Engine)

## Who this helps
RYT's top of funnel. It turns "who do I email?" into a filled prospect sheet — real
practices, a real reason to reach out, and the right template to sell them.

## The problem it solves
The outbound playbook is useless without a list, and a list is useless without
personalization. `[Observation]` — the one specific, true thing you noticed about *their*
practice — is what separates a reply from the trash. This finds the practices and produces
that observation, at volume, without making anything up.

## Inputs
- **Segment(s)** to source (default from the demand audit: longevity/functional-med clinics,
  med spas, then PT/chiro).
- **Geography** (city/region/country) — optional but sharpens results.
- **Count** — how many prospects to return this run (default 20).

## Workflow

### 1. Source real practices
Search for named practices in the segment + geography (directories, association member
lists, "best [segment] in [city]", maps listings). Capture per practice:
`name · website · city · a public contact (booking page / contact form / listed email)`.
Only list a practice you actually found a source for. **No invented businesses.**

### 2. Find a verifiable [Observation]
For each practice, look at public signals and record ONE specific, true gap that maps to a
`solution-templates` entry. Verifiable sources only:
- **Booking/consult flow:** does their site have a form? Auto-reply? Online booking, or
  "call us"? (T1 — lead follow-up)
- **Content cadence:** last blog/social post date; thin or stale = content gap. (T2)
- **Reviews:** recurring complaints about wait times, follow-up, "never heard back". (T1/T3)
- **Hiring:** a job post for a front-desk/admin/marketing role = the pain, in their words. (any)
- **Membership/retention:** membership model with no visible nurture = churn risk. (T3)

Write the observation as something you can *point to*: "your consult form has no
auto-reply" — not "you probably lose leads." If you can't verify a gap, mark the prospect
**needs-a-look** rather than inventing one.

### 3. Match template + rank
Tag each prospect with the matching template (T1–T5) and a priority:
- **A:** clear verified gap + segment money + reachable contact.
- **B:** likely gap, one signal, contact found.
- **C:** in-segment but no verified hook yet (needs-a-look).

### 4. Output the prospect sheet
```
PRIORITY | PRACTICE | SEGMENT | CITY | CONTACT | OBSERVATION (verified) | SOURCE | TEMPLATE
```
Then, for each Priority-A row, drop the observation straight into Email 1's `[Observation]`
slot so it's send-ready.

End with:
```
Sourced [N] practices — [a] A, [b] B, [c] C. Ready to send: [a]. Sending order: A → B.
Next: verify the C rows or pull the next [geo/segment] batch.
```

## Guardrails
- **Never fabricate** a practice, a contact, a review, or an observation. Every row traces
  to a real source you can cite. Unverifiable = mark it, don't guess.
- Observations must be **specific and checkable** — a claim you'd stand behind if they replied
  "how do you know?" Vague = cut it.
- Respect anti-spam law: only publicly listed business contacts; honor opt-outs; the sending
  side (outbound-playbook) carries identity + address + unsubscribe.
- Do NOT scrape login-gated or personal data. Public business listings only.
- Right-size claims: one honest gap beats five speculative ones.

## Failure handling
- Source down / rate-limited: note it, continue with other sources.
- Thin segment/geo (few results): say so and widen geography rather than padding the list.
- No verifiable observation for a practice: keep it as a C/needs-a-look row — never upgrade
  it with a made-up hook.

## Handoff
- Priority-A rows → `outbound-playbook.md` Email 1 (observation pre-filled).
- Ongoing/automated sourcing → pair with `lead-scanner`.
- On the call → quote from the row's matched `solution-templates` entry.
