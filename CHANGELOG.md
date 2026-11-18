# Changelog

## 0.1.5 — 2026-11-18

- Recommends the full version when it holds something that could change the decision
  (another serious risk, a made-up source, a disagreement with the research); in Claude
  Desktop and Claude Code it asks with a picker. Otherwise a neutral one-line offer.
- The update notice now says how to update in the Claude app as well as in Claude Code.

## 0.1.4 — 2026-11-18

- Short answer by default (~20 lines: verdict, 3 key points, 2 recommendations, 3 risks,
  2 questions, one-line score). The last line says what the full version adds; say "full".
- Formatting that works in the terminal and the Claude app: traffic-light verdict heading
  (🟢 🟡 🔴 ⚪), section headings, locations as inline code, red/yellow risks, score dots.

## 0.1.3 — 2026-11-18

- No longer pre-approves running its scripts, so the Claude app no longer flags the plugin
  as able to run code without asking. Claude Code asks once before converting a DOCX/PDF.
- Plugin icon and author (Fontai) in the plugin and marketplace manifests.
- Install in the Claude app via Customize → Plugins → Add marketplace (`fontai/crux`), with
  updates from the plugin page.

## 0.1.2 — 2026-11-18

- Language: when the prompt gives no clue (just `crux file.pdf`), CRUX follows the earlier
  conversation, then the document's language, and no longer defaults to Czech.
- Website at https://crux.fontai.org with a demo video (source in `video/`).

## 0.1.1 — 2026-11-18

- The skill pre-approves the tools it needs (reading its own files, web search, its
  scripts), so a run no longer stops on permission prompts or skips its rules.
- README rewritten for testers, with step-by-step install instructions an agent can follow.

## 0.1.0 — 2026-11-18

First public version for testing: interactive intake, one-screen summary with a
verdict, 1–5 scoring with fact and source checking, reconstructed brief, update check.
