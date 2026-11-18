# Output

The headings below are Czech. If the user writes in another language, translate the
headings and write everything in their language. Leave out the blocks the user did
not choose.

```
VERDIKT: Schválit | Upravit | Vrátit | Chybí info — jedna věta proč
Zadání: dodané | odvozené („…“, jistota …) · Tvé rozhodnutí: …

SHRNUTÍ
Hlavní sdělení: 1–2 věty
Další významné body:
• … (§x)
• … (s. y)

DOPORUČENÍ — k tvému rozhodnutí
• konkrétní další krok / rozhodnutí

RIZIKA A MEZERY
• ⚠ … (§x)

OTÁZKY NA AUTORA
1. …   (2–3 otázky, které stojí za to položit před rozhodnutím)

SCORING (hloubka: Standard · zadání: dodané)
Celkem 3.4/5 → Upravit
Alignment 4 · Správnost 2 · Podloženost 3 · Konkrétnost 4
Konzistence 3 · Použitelnost 3 · Hloubka 3
Nejslabší místa: kritérium — 1 věta + místo, u 2–3 nejnižších skóre
Rozdíly vs. nezávislá rešerše:
• Dokument: … (§x) ↔ Rešerše: … [URL]
Odhad úsilí autora: nízké — signály
Doporučená další analýza: …

ODVOZENÉ ZADÁNÍ (when "Odhad zadání" was chosen — see brief.md)
```

## Rules

- **The verdict always comes first**, even without scoring (then it rests on the red
  flags and gaps alone). Many readers stop after that line.
- **Every point carries a location**: the author's section number or title, or the
  page for PDFs. No location → it does not go in.
- **Recommendations target the user's decision**, are specific, and say what to do.
  Never "zvažte další kroky".
- **One screen**: the summary block fits in ~25 lines, the whole answer in ~45. Cut
  points before you cut the verdict, the risks or the questions. If the user asked for
  more, go longer.

## Formatting for where the user is

- **Terminal (Claude Code CLI)**: short lines, bold labels or `##` headings, bullets.
  No tables (they wrap badly), no long URLs inline — put them at the end as `[1] URL`.
- **Claude app (desktop, web, mobile)**: markdown headings and bullets; inline links are
  fine. No wide tables — they break on a phone.
- Never produce a file, PDF or HTML unless asked. Answer in the chat first; the user can
  ask for an export.

## Self-check before sending

1. Every quote and number matches the text exactly (re-check against the source).
2. Every URL was opened in this session; anything else is marked `(neověřeno)`.
3. Every point has a location; no location points to a section that does not exist.
4. Every score has evidence; strictness held (no score above 3 without evidence).
5. The verdict matches the gates in `scoring.md`.
6. It fits on one screen and is in the user's language.

Last line: offer to save the output (e.g. `<dokument>.crux.md`) and the single most
useful next step (deeper research on a divergence, or drafting the questions for the
author).
