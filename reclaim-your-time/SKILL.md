---
name: reclaim-your-time
description: Automated institutional-quality equity research on a watchlist of tickers. Runs a full evidence-based investigation across news, earnings language, customer and employee sentiment, supply chain, competitors, alternative data, fundamentals, red flags, catalysts, and produces a Bull/Base/Bear verdict with an information-edge score. Built to run on a schedule so you never do the manual dig yourself.
metadata: {"openclaw":{"emoji":"📈","requires":{"bins":["curl","jq","date"],"env":["TAVILY_API_KEY"]}}}
user-invocable: true
---

# Reclaim Your Time — Equity Research Automation

## Who this is for
An investor who wants an information edge but does not have hours to dig through
earnings calls, Reddit threads, job boards, and supplier chatter every week. This
skill does the grunt work: it investigates a company from primary and alternative
sources and returns a structured, skeptical verdict.

## The problem it solves
Institutional-quality research takes a full day per name and has to be repeated as
new information lands. This automates the dig and reruns it on a schedule, so the
work happens while you sleep and you only read the conclusion.

## Inputs
- **Ticker(s):** one or more, e.g. `NKE`, `SBUX`, `LULU`. Maintained in the
  `WATCHLIST` below.
- **Web access:** requires live search (TAVILY_API_KEY) plus web fetch for primary
  sources (SEC filings, transcripts, company IR).

## Watchlist
Edit this list to change what gets researched. One ticker per line.

```
WATCHLIST:
# <add tickers here, e.g.>
# NKE
# SBUX
```

## Workflow

For **each ticker** on the watchlist, run the full investigation below. Do NOT
summarize the company's investor materials — look for signals that may not be
priced in. Prioritize primary sources (SEC filings, earnings transcripts) and
high-quality data. For every important claim, cite the source and give a date.

### 1. News & events
Important news from the last 30 / 90 / 180 days. Separate material from noise.
Tag each item positive / negative / ambiguous. Cover management changes, product,
pricing, strategy, regulation, litigation, partnerships, M&A, layoffs, store
openings/closures.

### 2. Earnings & management language
Most recent transcript vs. prior quarters. Changes in confidence, caution,
optimism. Statements inconsistent with prior guidance. What management emphasized,
avoided, or stopped discussing. Claims vs. measurable results.

### 3. Customer sentiment
Reddit, Google/app reviews, forums. Recurring complaints, quality changes, pricing
dissatisfaction, retention concerns, new-product enthusiasm, switching to
competitors, unusual swings in complaint volume. Estimate reliability of each
signal — do NOT treat anecdotes as representative.

### 4. Employee & frontline sentiment
Employees, ex-employees, franchisees, suppliers. Staffing, morale, operational
difficulty, supply shortages, rollouts, management problems, demand shifts.
Distinguish verified evidence from anonymous speculation.

### 5. Supply chain & operations
Supplier problems, shipping delays, commodity costs, inventory, capacity,
distribution, store count, hiring trends, job postings, manufacturing activity.
Flag leading indicators before they hit the financials.

### 6. Competitive intelligence
Compare against major competitors: share gain/loss, pricing, launches, sentiment,
hiring, expansion/contraction, moat changes.

### 7. Alternative data
Web traffic, search trends, app rankings, foot traffic, job postings, product
availability, pricing, import/export, satellite/parking data — ONLY where there is
a defensible link to financial performance.

### 8. Financial fundamentals
Revenue and organic growth, gross/operating margin, FCF, debt, cash, capex,
dilution/buybacks, ROIC, earnings quality, valuation. Compare to history and peers.

### 9. Red flags
Actively try to DISPROVE the thesis: accounting concerns, excess debt, weak cash
generation, declining demand, management credibility, over-optimistic guidance,
insider selling, competitive deterioration, regulatory and valuation risk.

### 10. Catalysts
Events in the next 30 days / 3 / 6 / 12 months that could re-rate the stock.

### 11. Information discrepancies
Where sources disagree (e.g. management says demand strong / customer sentiment
deteriorating). State which evidence deserves more weight and why.

### 12. Bull / Base / Bear
Three scenarios with reasonable probability estimates and stated assumptions.

### 13. Investment verdict
- Rating: STRONG BUY / BUY / HOLD / AVOID / STRONG AVOID
- Confidence: LOW / MEDIUM / HIGH
- Key reasons; strongest bull evidence; strongest bear evidence; biggest unknown;
  most important upcoming catalyst; what would change your mind; what to monitor.

### 14. Information-edge score (1–10)
1 = market likely understands the story. 10 = multiple credible, measurable signals
suggest something the market may not yet appreciate. Explain the score.

## Output format
Lead with the verdict and edge score. Then the sections above. End with:

**Signal table:** `SIGNAL | EVIDENCE | DIRECTION | CONFIDENCE | WHY IT MATTERS`

**Then: the 5 most important things to monitor over the next 90 days.**

## Guardrails
- Clearly label **FACT vs. INFERENCE vs. SPECULATION**.
- Give dates for important evidence. Cite important claims.
- Do NOT claim something is "not priced in" without evidence for that conclusion.
- Do NOT treat social-media sentiment as representative of the whole customer base.
- Do NOT manufacture correlations. Do NOT fabricate any data that can't be verified.
- Explicitly surface conflicting evidence. Be skeptical of your own conclusions.
- The goal is not to justify buying — it's to determine whether a genuine,
  evidence-based edge exists.
- This is research, not personalized financial advice. It does not place trades.

## Failure handling
- If a source is down or rate-limited (403 / 429): note it and continue.
- If a ticker has no recent primary sources (e.g. pre-earnings, thin coverage): say
  so plainly rather than padding with speculation.
- If the watchlist is empty: report "No tickers configured" and stop.
