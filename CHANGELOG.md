# Changelog

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
