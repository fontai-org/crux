# CRUX demo video

Source of the looping website demo `site/assets/demo.mp4` (+ `demo-poster.jpg`).
Built with [HyperFrames](https://hyperframes.heygen.com) (`hyperframes@0.9.65`): an HTML
composition rendered frame by frame in headless Chrome, then encoded with ffmpeg.

```bash
./build.sh             # document PDF + page images, render, encode web MP4 + poster
./build.sh --skip-doc  # only re-render the video
```

Needs Node ≥ 22, ffmpeg, pandoc, weasyprint, poppler (`pdftoppm`) and the Fontai design system
checked out at `~/www/fontai-design-system` (override with `FONTAI_DESIGN_SYSTEM=/path`).

## Files

| Path | What |
|---|---|
| `index.html` | the composition (layers, styles, GSAP proxy timeline) |
| `scenes.js` | everything that moves: each frame is a pure function of time `t` |
| `content.js` | the texts shown: intake picker, progress lines, the CRUX answer |
| `SCRIPT.md` | scene-by-scene script and timings |
| `demo-doc/northwind-4-day-week.md` | the fictional, deliberately flawed input document (+ `.pdf`) |
| `demo-doc/crux-output.txt` | the **real** CRUX answer the video shows (trimmed only for length) |
| `demo-doc/crux-run.jsonl` | the full stream-json transcript of that run (tool calls, timing) |
| `demo-doc/crux-intake.txt` | the real intake message (`claude -p`, no question picker available) |
| `assets/pages/` | page images of the PDF for the scroll scene (generated) |

## Fonts

- **DIN Pro** (`din.otf`, `din-med.otf`) is Fontai's licensed font. It is **not** in this repo:
  `build.sh` copies it at build time from
  `~/www/fontai-design-system/assets/fonts/` into `fonts/licensed/` (gitignored).
  The Fontai logo is copied the same way from `assets/logo/fontai-logo-white.svg`.
- **JetBrains Mono** (`fonts/*.woff2`) is under the SIL Open Font License 1.1
  (`fonts/OFL-JetBrainsMono.txt`), taken from the `@fontsource/jetbrains-mono` package.
  Symbols it lacks (⏺ ⎿ ✻ …) fall back to the system fonts (Menlo, Apple Symbols), so render on macOS.

## Honesty

The answer on screen is CRUX's real output on the demo document (`demo-doc/crux-output.txt`),
only shortened. The intake picker re-creates Claude Code's question UI with the options the
skill really offers (`skills/crux/SKILL.md`, step 2). The run is shown time-compressed.
