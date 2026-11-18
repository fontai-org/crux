# Output

Two lengths. **Short is the default.** Give the full version only when the user asks for
it (in the first prompt or after the short one). The analysis is the same; only what you
show changes, so keep your notes and answer "show the full version" without re-running.

The headings below are Czech. If the user writes in another language, translate the
headings and write everything in their language. Leave out the blocks the user did
not choose.

## Short (default): at most ~20 lines

Markdown, rendered the same way in the terminal and in the app. Colour comes only from
the emoji below (the answer cannot set text colours). Use exactly these signals; no other
emoji.

```markdown
## 🔴 Vrátit — jedna věta proč
> Zadání: odvozené („…“) · Tvé rozhodnutí: …

**Hlavní sdělení:** jedna věta `§x`
- klíčový bod `§x`                       ← max 3

### Doporučení
- co udělat `§x`                         ← max 2, míří na rozhodnutí uživatele

### Rizika
- 🔴 mění rozhodnutí `§x`                 ← max 3 in total
- 🟡 vážné, ale nemění rozhodnutí `§x`

### Otázky na autora
1. …                                     ← max 2

**Skóre 2.2/5** · 🔴 Správnost 2 · 🔴 Podloženost 2 · 🟡 Konkrétnost 3 · 🔴 Konzistence 1 · …

*Plná verze: dalších N rizik, zdůvodnění skóre, rozdíly vs. rešerše, zdroje — napiš „celé“.*
```

- **Start with the verdict heading.** No preamble ("I've read the document…").
- **Verdict signal:** 🟢 Schválit · 🟡 Upravit · 🔴 Vrátit · ⚪ Chybí info.
- **Score dots:** 🟢 ≥ 4 · 🟡 3 · 🔴 ≤ 2. An indicative criterion (e.g. alignment without a
  brief) gets ⚪ and `(orient.)`.
- **Locations in inline code** (`§5.4`, `s. 7`), so they stand out and are easy to find.
- **Every bullet fits on one line** (~15 words). Cut words, not the location.
- **Choose by impact on the user's decision**, not by order in the document. Merge
  related findings into one bullet instead of dropping the important one.
- Include a made-up source or a refuted key claim under Rizika whenever there is one.
- The last line says **what the full version adds** (with counts), so the user knows
  whether it is worth asking. Leave it out if the full version would add nothing.
- If the brief is missing, the warning is the `>` line; do not repeat it as a paragraph.
- **The offer of the full version is the very last line. Write nothing after it** — no
  notes, no extra findings, no suggestions. Anything that matters belongs in a block
  above (replacing a weaker point) or in the full version.

## Full (on request)

Same signals and formatting as the short version, with everything:

```markdown
## 🟡 Upravit — jedna věta proč
> Zadání: dodané | odvozené („…“, jistota …) · Tvé rozhodnutí: …

### Shrnutí
**Hlavní sdělení:** 1–2 věty `§x`
- další významné body `§x`

### Doporučení
- konkrétní další krok / rozhodnutí `§x`

### Rizika a mezery
- 🔴 / 🟡 … `§x`                          ← all of them

### Otázky na autora
1. …                                     ← 2–3

### Skóre — hloubka Standard · zadání dodané
**Celkem 3.4/5 → Upravit**
- 🟢 Alignment 4 — 1 věta `§x`
- 🔴 Správnost 2 — 1 věta `§x`
- …one line per criterion
**Rozdíly vs. nezávislá rešerše**
- Dokument: … `§x` ↔ Rešerše: … [1]
**Odhad úsilí autora:** nízké — signály
**Doporučená další analýza:** …

### Odvozené zadání (when "Odhad zadání" was chosen — see brief.md)

[1] URL …
```

The full version fits in ~45 lines unless the user asks for even more.

## Rules (both lengths)

- **The verdict always comes first**, even without scoring (then it rests on the red
  flags and gaps alone). Many readers stop after that line.
- **Every point carries a location**: the author's section number or title, or the
  page for PDFs. No location → it does not go in.
- **Recommendations target the user's decision**, are specific, and say what to do.
  Never "zvažte další kroky".
- **Sources:** in the short version, cite a URL only for a refuted claim or a made-up
  source; the full version lists all of them at the end.

## Formatting for where the user is

- **Both**: Markdown headings (`##` verdict, `###` sections), bullets, bold labels, inline
  code for locations, the emoji signals above. **No tables** — they wrap in the terminal
  and on narrow windows. No ANSI colour codes or HTML: neither environment renders them.
- **Terminal (Claude Code CLI)**: keep lines short; URLs only at the end as `[1] URL`.
- **Claude app (desktop, web)**: inline links are fine.
- Never produce a file, PDF or HTML unless asked. Answer in the chat first; the user can
  ask for an export.

## Self-check before sending

1. Every quote and number matches the text exactly (re-check against the source).
2. Every URL was opened in this session; anything else is marked `(neověřeno)`.
3. Every point has a location; no location points to a section that does not exist.
4. Every score has evidence; strictness held (no score above 3 without evidence).
5. The verdict matches the gates in `scoring.md`.
6. Short version: ≤ ~20 lines, every bullet one line, the limits per block held, and
   nothing after the last line.
7. It is in the user's language.

Then one last line: in the short version, the offer of the full version (it also covers
saving); in the full version, offer to save the output (e.g. `<dokument>.crux.md`) and the
single most useful next step.
