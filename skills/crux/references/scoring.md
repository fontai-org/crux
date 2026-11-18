# Scoring

Scale **1–5**, no percentages. For each criterion: **list the evidence first, then pick
the number** from the anchors below. Each score gets one sentence and at least one
location or URL. **With no cited evidence, a criterion cannot score above 3.**

## Anchors (shared)

- **5** — no problems found; everything that matters is supported.
- **4** — minor problems; none would change the decision.
- **3** — clear problems; the decision needs caution or extra checking.
- **2** — serious problems that could change the decision.
- **1** — unusable or misleading.

## Criteria

1. **Alignment se zadáním** — does it answer what was asked, in scope, in the requested
   form? If the brief was reconstructed, mark it `(orientační)` and leave it out of the
   average.
2. **Věcná správnost** — based on the verification (`research.md`). Any **refuted**
   load-bearing claim → max 2. Any **disputed** one → max 3. In Rychle it is not
   checked: show `neověřeno` and leave it out of the average.
3. **Podloženost** — share of load-bearing claims with valid support (data, a source
   that exists and says it): ≥ 90 % → 5, 75–89 → 4, 50–74 → 3, 25–49 → 2, < 25 → 1.
   **Any made-up source → max 2.**
4. **Konkrétnost** — specific facts, numbers, names and steps vs. filler and generic
   phrasing (see `red-flags.md`).
5. **Vnitřní konzistence** — contradictions between sections, numbers that do not add
   up, conclusions not following from the body. Each real contradiction costs a point.
6. **Použitelnost pro rozhodnutí** — can the user make **their** decision from it?
   Options, trade-offs, costs, risks, a clear recommendation.
7. **Hloubka** — alternatives considered, primary vs. secondary sources, quantification,
   limits acknowledged, the hard parts of the topic addressed (compare with what the
   blind research says a strong analysis would cover).

**Celkem** = average of the criteria that count, to one decimal.

## Verdict (gates win over the average)

- **Vrátit** — Věcná správnost ≤ 2, or Alignment ≤ 2 with a brief that was given, or
  a made-up source on a load-bearing claim.
- **Chybí info** — Použitelnost ≤ 2 because key data or options are missing.
- **Upravit** — any criterion = 3, or Celkem < 4.
- **Schválit** — everything ≥ 4 and no serious red flag.

In Rychle add `(bez ověření faktů)` to the verdict.

## Odhad úsilí autora (a label, not a score)

`nízké / střední / vysoké`, plus the 2–3 signals behind it. Low: generic template
structure, no own data, sources missing or made up, many filler phrases, it reads like a
one-shot prompt. High: own data, specific context, sources checked, trade-offs weighed,
signs of iteration. Always phrase it as an estimate.

## Doporučená další analýza

1–3 concrete things worth researching before the decision, taken from the divergences
and gaps — not generic "zvažte další analýzu".
