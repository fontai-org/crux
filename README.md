# Fontai CRUX

**Get to the crux of long documents.** You receive a long analysis (often AI-generated)
and need to decide without reading all of it. Give it to CRUX and get, on one screen:

- **Verdict first**: Schválit / Upravit / Vrátit / Chybí info, with one sentence why.
- **Summary**: the main message, the key points, recommendations for *your* decision,
  risks and gaps, and questions worth asking the author. Every point links to its
  section or page, so you can check it in seconds.
- **Quality score** (optional): seven criteria on a 1–5 scale, each with evidence. CRUX
  fact-checks the claims the conclusions rest on, checks that the cited sources exist,
  and compares the document with its own research.
- **The brief behind it** (optional): what the author was most likely asked to do, and why.

Works with Markdown, Word (.docx), PDF or pasted text. It replies in your language.

---

## Install

### Easiest: let Claude do it

In **Claude Code**, paste:

```
Read https://github.com/fontai/crux/blob/main/README.md and install the crux skill.
```

### Claude Code: by hand

```bash
claude plugin install crux --marketplace fontai/crux
```

Older Claude Code versions use two commands instead:
`claude plugin marketplace add fontai/crux` and then `claude plugin install crux@fontai`.
Start a new Claude Code session afterwards.

In **VS Code** you can open
`vscode://anthropic.claude-code/install-plugin?plugin=crux&marketplace=fontai/crux`.

### Claude app (web, desktop)

1. Download **[crux.zip](https://github.com/fontai/crux/releases/latest/download/crux.zip)**. Don't unzip it.
2. In Claude, open **Settings → Customize** and switch to the **Skills** tab.
3. Click **+ Add** → **Upload skill** and choose `crux.zip`. Make sure CRUX is switched on
   under **Yours**.
4. Check that **Settings → Capabilities → Create and edit files** is on ("Skills need this
   on"); it needs **Artifacts** on too. On Team or Enterprise, an owner turns it on in
   **Organization settings → Plugins & skills**.
5. Open a new chat, attach a document and write `crux`. For fact-checking, the chat needs
   web search; without it CRUX offers the Quick depth.

If the names in Claude have changed, [Anthropic's guide to skills](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
has the current steps.

---

## Use

Mention **crux** together with the document:

```
crux report.pdf
crux this document: ~/Downloads/analysis.docx
```

You can also paste the text or attach the file. If you just say *"analyze this
document"*, CRUX offers itself first.

CRUX then asks four quick questions (or confirms what you already said):

1. **What to do**: summary, quality score, guess the author's brief
2. **How deep**: the time is always shown, so you know what to expect

   | Depth | What it does | Time |
   |---|---|---|
   | Rychle (quick) | only the document, no web | ~1–3 min |
   | Standard | + web check of the key claims and the cited sources | ~5–10 min |
   | Hloubkově (deep) | + independent research by parallel researchers | ~15–30 min |

3. **The author's brief**: paste it if you have it. Without it CRUX can only guess what
   the document was for, and tells you so.
4. **Your decision**: what you need to decide. The recommendations aim at that.

You can say it all up front: `crux report.pdf, summary only, quick, I need to decide whether to approve it`.

The answer stays in the chat. Ask if you want it saved or exported (Markdown, PDF, …).

## What CRUX promises

- **No made-up sources.** It only cites pages it actually opened during the run;
  anything else is marked *unverified*. Quotes and numbers are checked against the text.
- **Strict scoring.** AI models tend to go easy on AI-written text. CRUX needs the same
  evidence for praise as for criticism.
- **Your session stays light.** In Claude Code the research runs in subagents, which
  return only short findings. They use your current model.
- **Privacy.** Web searches use generic terms about the topic, never names, numbers or
  other details from your document.

## Update

CRUX checks once a day and tells you when a new version is out, with the command to run.

- Claude Code: `claude plugin update crux@fontai`, then a new session. You can also turn
  on auto-update for the `fontai` marketplace in `/plugin`.
- Claude app: download the new `crux.zip` and upload it again.

## Feedback

Found a wrong verdict, a missed problem or a confusing answer?
[Open an issue](https://github.com/fontai/crux/issues), and attach the document if you can share it.

---

## For AI agents: how to install CRUX for the user

Follow these steps exactly and report the result to the user.

1. **Check the environment.** Run `claude --version`.
   - It works (Claude Code): continue with step 2.
   - No shell or no `claude` CLI (for example the Claude app): you cannot install it
     yourself. Give the user the steps under *Claude app* above with the
     download link, and stop.
2. **Install:**
   ```bash
   claude plugin install crux --marketplace fontai/crux
   ```
   If that flag is unknown (older Claude Code), run
   `claude plugin marketplace add fontai/crux` and then `claude plugin install crux@fontai`.
   If CRUX is already installed, run `claude plugin update crux@fontai` instead.
3. **Verify:** `claude plugin list` must show `crux@fontai` as enabled.
4. **If the plugin commands fail** (old Claude Code, plugins disabled by policy), install
   it as a personal skill:
   ```bash
   git clone https://github.com/fontai/crux.git ~/.claude/crux
   mkdir -p ~/.claude/skills && ln -s ~/.claude/crux/skills/crux ~/.claude/skills/crux
   ```
   Updates then come from `git -C ~/.claude/crux pull`.
5. **Tell the user:** CRUX is installed and they need to **start a new Claude Code
   session**. Then they can say `crux <path to a document>`. Mention that the first run may
   ask to allow the skill; they can choose "always allow".

Do not change any other settings and do not run CRUX on a document unless the user
asks you to.

---

## Development

`skills/crux/` is the skill (`SKILL.md` + `references/` loaded on demand + `scripts/`).
`.claude-plugin/` makes this repo a Claude Code plugin marketplace.

To release, bump the version in `skills/crux/VERSION` and `.claude-plugin/plugin.json`,
update `CHANGELOG.md`, commit, then tag `vX.Y.Z` and push the tag. CI checks that the
versions match and attaches `crux.zip` to the GitHub release.

MIT License.
