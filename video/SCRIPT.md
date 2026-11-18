# CRUX demo — script

53.5 s · 1920×1080 · 30 fps · no audio · loops (starts and ends on black).
Timings live in `scenes.js` (`S`), texts in `content.js`.

| # | Time | Scene | On screen | Caption |
|---|---|---|---|---|
| 1 | 0.0–3.6 | Title | Fades in from black: Fontai logo + **CRUX**, tagline "Get to the crux of long documents." | — |
| 2 | 3.6–10.2 | Install | Terminal. Types `claude plugin marketplace add fontai/crux` → `✔ Successfully added marketplace: fontai`, then `claude plugin install crux@fontai` → `✔ Successfully installed plugin: crux@fontai (scope: user)`. | **1** Install |
| 3 | 10.2–16.4 | The huge document | The 40 real PDF pages of the demo document race past in two columns; left: `northwind-4-day-week.md`, counter "page 1 … 40", "40 pages · ~14,000 words · about an hour to read". | **2** Hand it any long document |
| 4 | 16.4–30.0 | Intake | Claude Code session: `> crux northwind-4-day-week.md`, `Skill(crux)` loads, CRUX says what it read, then the question picker (tabs Task · Depth · Brief · Decision · Submit): Summary + Quality scoring ✔ → Standard · ~5–10 min → "Don't have it — guess it" → types "Approve a 3-month pilot" → Submit. Transcript shows the answers and the "without the brief I can only guess it" note. | **3** Answer four questions |
| 5 | 30.0–34.0 | Working (time-compressed) | Real tool calls of the run: extract.py (40 pages · 15 sections), fact-check agent (6 web searches · 13 pages opened), fetch of the cited Henley URL → *domain doesn't exist* (red), recompute of figures (EUR 412k ≠ EUR 1.2 million). Spinner timer runs to 4m 34s. Right: "real run: 4 min 34 s → shown in 4 s". | It reads, checks the claims and the sources |
| 6 | 34.0–49.0 | The answer | The real CRUX output streams in: cyan **VERDICT: Return.** with a cyan bar; Summary with § refs; Recommendation ("Approve only the pilot"); Risks & gaps with red ⚠ (the made-up Henley study row gets a red tint); Questions for the author; Scoring block (2.2/5 → Return) outlined in cyan. Slow scroll from verdict to scoring. | **4** Decide in one screen |
| 7 | 49.0–53.5 | End card | Fontai logo + CRUX, **crux.fontai.org**, "Claude Code · Claude app"; fades to black → loop. | — |

## Source of the content

- Document: `demo-doc/northwind-4-day-week.md` — fictional, with planted defects: a made-up
  "Henley Institute" study (fake URL) carrying the 27 % productivity claim, EUR 1.2 M vs EUR 412k
  net savings, 46 vs 64 warehouse staff, an empty Risks section, unsourced "studies show" claims.
- Answer: `demo-doc/crux-output.txt`, produced by the installed crux 0.1.1 with
  `claude -p --allowedTools "Skill" "Agent" -- "crux northwind-4-day-week.md — summary + scoring,
  depth Standard. I don't have the author's brief. I need to decide whether to approve a 3-month pilot."`
  (run with `--output-format stream-json --verbose`; transcript in `crux-run.jsonl`). The video
  shortens it (drops some risks, the "confirmed against the web" block and most footnotes) but adds
  no findings.
- Intake: `demo-doc/crux-intake.txt` (`claude -p "crux northwind-4-day-week.md"`). In `-p` mode there
  is no picker, so CRUX asked the four questions as one numbered message (in Czech, as no language
  cue was given). The video shows the same questions and options in English in Claude Code's picker.

## Update 2026-11-18 (crux 0.1.5)

Scene 5 and 6 now use a fresh Standard run of crux 0.1.5 (`demo-doc/crux-output-v015.txt`,
4 min 14 s real time): the short default answer with the traffic-light verdict, locations
as inline code, risk and score dots, and the recommendation of the full version.
