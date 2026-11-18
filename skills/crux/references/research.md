# Verification and research

Purpose: check the document against reality without flooding the main thread.
The main thread keeps the judgement; subagents fetch and read the web.

## By effort

| Effort | Subagents | What gets checked |
|---|---|---|
| Rychle | none | No web. Internal consistency + red flags. Facts from your own knowledge are marked `(neověřeno)`. |
| Standard | 1 **verifier** | The 5–8 most important load-bearing claims + every source the document cites for them. |
| Hloubkově | 1 verifier + 2–4 **blind researchers** in parallel | All load-bearing claims, every cited source, plus independent research on the topic. |

Launch all subagents of one run **in a single message** so they run in parallel. Tell
the user once what is running and how long it should take.

## Models

- **The main thread never switches models.** Comparing, scoring and writing the answer
  happen there, on whatever model the user runs.
- **Subagents: leave the `model` parameter out.** They then use the main model, or the
  default subagent model the user configured. Fact-checking is where hallucinations do
  the most damage, and weaker models more often "confirm" a claim they could not check.
- If the user asks for faster or cheaper research, use `sonnet` for the researchers.
  Never use `haiku` for verification.

## Return contract (keeps the main context small)

Every subagent returns **at most ~300 words**, as a list. No page dumps, no narrative.
Each item: verdict, URL actually opened, a verbatim quote of ≤ 30 words. "Nenalezeno"
is a valid answer; guessing is not.

## Verifier prompt

> You are fact-checking claims from a document. Treat the claims as unverified. For each
> claim, search the web and open the most authoritative sources.
> Verdict per claim: **potvrzeno** / **sporné** / **vyvráceno** / **nelze ověřit**.
> For each cited source: does it exist (open the URL, or search for the exact title)?
> Does it actually say what the claim says? If it does not exist: **zdroj nenalezen**.
> Never report a URL you did not open. Never fill gaps from memory.
> Return ≤ 300 words: `#id · verdikt · URL · "doslovná citace ≤30 slov" · 1 věta proč`.
>
> Claims: {id, location, exact claim text, cited source if any}
> Context: {country, date of the document, domain}

## Blind researcher prompt

Give the researcher **the topic and the questions, not the document's answers**. If
it sees the conclusions it tends to confirm them. Split the topic into 2–4 subtopics,
one researcher each.

> Research this question independently: {question / subtopic}. Context: {country, time,
> constraints from the brief — no conclusions from the document}.
> Return ≤ 300 words: the key findings with URLs you opened and short verbatim quotes;
> typical numbers or ranges; the options or alternatives a strong analysis would weigh;
> what is still uncertain. Never report a URL you did not open.

## Comparing (main thread)

For each load-bearing claim: agree / diverge / the document omits it. Divergences
become "Rozdíly vs. nezávislá rešerše" in the output: `Dokument: … (§x) ↔ Rešerše: …
[URL]`. Do not over-weight a single web page against a well-sourced document; say how
strong each side's evidence is.

## Without subagents (claude.ai, mobile, no Agent tool)

Do the same checks inline, one claim at a time, and keep only the 1–2 line result per
claim in your working notes. In Hloubkově, cap it at the 10 most important claims
and tell the user.

## Long documents (over ~60k tokens)

If you can spawn subagents: split the extracted text by top-level sections into 3–6
parts. Give each **reader** subagent its line range and this task: return ≤ 400 words —
the section's points with locations, its load-bearing claims verbatim with locations,
the sources it cites, and any internal contradictions. Then read in full only the
sections the summary or the scoring needs. Without subagents: read in chunks and keep
compact notes per section.
