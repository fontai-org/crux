# crux

**Get to the crux of long documents.** You get a long analysis (often AI-generated) and
need to decide without reading all of it. crux gives you:

- **Shrnutí na jednu obrazovku**: a verdict on the first line (Schválit / Upravit /
  Vrátit / Chybí info), the main message, recommendations aimed at *your* decision,
  risks and gaps, and questions for the author. Every point links to its section or page.
- **Scoring kvality**: seven criteria on a 1–5 scale with evidence, a fact-check of the
  claims the conclusions rest on, a check that cited sources really exist, and
  independent research to compare against.
- **Odhad zadání**: what the author was probably asked to do, and why.

It is interactive. It asks what you want, how deep to go (with the expected time),
what the author's brief was, and what decision you need to make. It replies in your
language. Input: Markdown, DOCX, PDF or pasted text.

## Install

### Claude Code (recommended)

```
/plugin marketplace add fontai/crux
/plugin install crux@fontai
```

Updates: `claude plugin update crux@fontai`, or turn on auto-update for the `fontai`
marketplace in `/plugin`. crux also checks once a day and tells you when a new version
is out.

### Claude app (web, desktop, mobile)

1. Download `crux.zip` from the [latest release](https://github.com/fontai/crux/releases/latest).
2. Claude → Settings → Capabilities → Skills → upload `crux.zip`. Code execution must
   be on. For research, web search must be on too.
3. The skill then works in the web, desktop and mobile apps on the same account.

To update, upload the newer zip.

## Use

Say "crux" together with the document, e.g. *"crux tohle: report.pdf"*, or just
*"analyzuj tenhle dokument"* (crux then offers itself). You can say up front what you
want: *"crux report.pdf, jen shrnutí, rychle"*. crux still confirms before it starts.

| Hloubka | What it does | Time |
|---|---|---|
| Rychle | only the document, no web | ~1–3 min |
| Standard | + web check of the key claims and cited sources | ~5–10 min |
| Hloubkově | + independent research by parallel researchers | ~15–30 min |

## Principles

- No made-up sources: only URLs opened during the run, otherwise marked *neověřeno*.
- Strict scoring; praise needs evidence, the same as criticism.
- Research runs in subagents (Claude Code), so your main session stays small.
  They use your current model unless you ask otherwise.
- Output stays in the chat. Ask if you want it saved or exported.

## Development

`skills/crux/` is the skill; `.claude-plugin/` makes the repo a Claude Code plugin
marketplace. To release: bump the version in `skills/crux/VERSION` and
`.claude-plugin/plugin.json`, update `CHANGELOG.md`, then tag `vX.Y.Z` and push. CI
checks that the versions match and attaches `crux.zip` to the release.
