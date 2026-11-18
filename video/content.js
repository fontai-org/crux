/* Texts shown in the demo. The CRUX answer and the progress lines come from a real run:
   demo-doc/crux-output-v015.txt and demo-doc/crux-run-v015.jsonl (trimmed only for length). */
const W = '<span class="warn"></span>';
const B = (s) => `<span class="b">${s}</span>`;
window.CRUX = {
  file: "northwind-4-day-week.pdf",
  docMeta: "40 pages · ~14,000 words<br>about an hour to read",
  cwd: "~/board",
  hint: "real run: 4 min 14 s → shown in 4 s",

  /* real intake (crux-intake.txt), in English */
  preIntake: [
    '<span class="b">⏺</span> I\'ve read the document: a proposal for the Northwind',
    "  board on a four-day week (15 sections, ~15k words).",
    "  Four quick questions first:",
  ],
  /* the four questions of SKILL.md step 2, as Claude Code's question picker */
  questions: [
    {
      tab: "Task", q: "What should CRUX do?", short: "What to do?", multi: true,
      opts: [
        { l: "Summary (1 screen) (Recommended)", a: "Summary", d: "Verdict, key points, risks, questions" },
        { l: "Quality scoring", a: "Quality scoring", d: "7 criteria, 1–5, each with evidence" },
        { l: "Guess the author's brief", d: "What the author was most likely asked" },
      ],
      script: [[0.6, "toggle"], [0.45, "down"], [0.35, "toggle"], [0.45, "down"], [0.4, "down"], [0.4, "enter"]],
    },
    {
      tab: "Depth", q: "How deep?", short: "How deep?",
      opts: [
        { l: "Quick · ~1–3 min", d: "Only the document, no web" },
        { l: "Standard · ~5–10 min (Recommended)", a: "Standard · ~5–10 min", d: "+ web check of the key claims and cited sources" },
        { l: "Deep · ~15–30 min", d: "+ independent research by parallel researchers" },
      ],
      script: [[0.8, "down"], [0.9, "enter"]],
    },
    {
      tab: "Brief", q: "Do you have the author's brief?", short: "Author's brief?",
      opts: [
        { l: "I'll paste it" },
        { l: "Don't have it — guess it" },
      ],
      script: [[0.6, "down"], [0.6, "enter"]],
    },
    {
      tab: "Decision", q: "What are you deciding?", short: "Your decision?",
      opts: [
        { l: "Approve the whole proposal", d: "Four-day week for all: pilot and rollout" },
        { l: "Approve only the pilot", d: "Roll out later, based on its results" },
        { l: "Just understand it" },
      ],
      typeText: "Approve a 3-month pilot",
      script: [[0.5, "down"], [0.3, "down"], [0.3, "down"], [0.25, "type"], [1.35, "enter"]],
    },
  ],
  submitScript: [[0.9, "enter"]],
  postIntake: [
    '<span class="b">⏺</span> Without the brief I can only guess it, so alignment',
    "  will be approximate and recommendations more general.",
  ],

  /* progress lines, from the tool calls in demo-doc/crux-run-v015.jsonl */
  runSeconds: 254,
  work: [
    ["Bash(extract.py northwind-4-day-week.pdf)", "40 pages · text with page markers"],
    ["Agent(Fact-check 4-day-week claims)", "7 web searches · 17 pages opened"],
    ["Fetch(henley-iwf.org/reports/four-day-dividend-2023)", '<span class="red">domain doesn\'t exist</span>'],
    ["Bash(Re-check key quotes and numbers)", "EUR 412k (§8.5) ≠ EUR 1.2 million (p. 3)"],
  ],

  /* the answer — demo-doc/crux-output-v015.txt (crux 0.1.5, Standard), wrapped to the terminal */
  output: [
    {"k": "verdict", "h": "⏺ <span class=\"b\">🔴 Return: the 27% productivity gain the whole case</span>"},
    {"k": "verdict", "h": "  <span class=\"b\">rests on comes from a source that doesn't exist</span>"},
    {"h": "  <span class=\"q\">Brief: inferred (\"assess a 4-day week for the Board and</span>"},
    {"h": "  <span class=\"q\">recommend\") · Your decision: approve a 3-month pilot</span>"},
    {"h": ""},
    {"h": "  <span class=\"b\">Main message:</span> Move to 100-80-100 with staggered teams"},
    {"h": "  (four days, full pay) company-wide, after a 6-month pilot"},
    {"h": "  from Feb 2027 <span class=\"loc\">§15.2</span>"},
    {"k": "fake", "h": "  • The case that output holds up rests on \"Henley Institute…"},
    {"k": "fake", "h": "    27%\". That report and its URL don't exist <span class=\"loc\">§5.4</span> <span class=\"loc\">p. 39</span>"},
    {"h": "  • §8.5 calculates a net benefit of €412k a year, but the"},
    {"h": "    summary and conclusion claim \"EUR 1.2 million\" <span class=\"loc\">p. 3</span> <span class=\"loc\">§15.1</span>"},
    {"h": "  • The pilot design itself is decent: 56 people, a comparison"},
    {"h": "    group and measurable success criteria <span class=\"loc\">§10.3–10.4</span>"},
    {"h": ""},
    {"h": "  <span class=\"b\">Recommendations</span>"},
    {"h": "  • Approve only the pilot (item 2), not items 1, 3 and 4:"},
    {"h": "    blanket approval, rollout, €240k budget, 6 hires <span class=\"loc\">§15.2</span>"},
    {"h": "  • Make approval conditional on the bar being output ≥100%"},
    {"h": "    (not 95%) and on a budget for the pilot alone <span class=\"loc\">§10.4</span> <span class=\"loc\">§8.2</span>"},
    {"h": ""},
    {"h": "  <span class=\"b\">Risks</span>"},
    {"h": "  • 🔴 Czech law (Labour Code §78) counts overtime above the"},
    {"h": "    set week, so from hour 32. Overtime may rise, not fall 50% <span class=\"loc\">§8.4</span>"},
    {"h": "  • 🔴 The \"Risks\" section lists no risks, and the sensitivity"},
    {"h": "    test never varies the productivity assumption <span class=\"loc\">§13</span> <span class=\"loc\">§8.7</span>"},
    {"h": "  • 🟡 A 3-month pilot (Feb–Apr) misses peak season and is too"},
    {"h": "    short to show changes in turnover or absence <span class=\"loc\">§7.10</span> <span class=\"loc\">§10.2</span>"},
    {"h": ""},
    {"h": "  <span class=\"b\">Questions for the author</span>"},
    {"h": "  1. With the 27% removed, what replaces it, and what happens"},
    {"h": "     to output and cost at +10%?"},
    {"h": "  2. What does the pilot alone cost, separate from the €240k"},
    {"h": "     rollout budget?"},
    {"h": ""},
    {"k": "fake", "h": "  Made-up source: <span class=\"loc\">henley-iwf.org</span> does not resolve, and"},
    {"k": "fake", "h": "  searches for the title and the organisation found nothing."},
    {"h": ""},
    {"k": "score0", "h": "  <span class=\"b\">Score 2.2/5</span> · ⚪ Alignment 3 (orient.) · 🔴 Accuracy 2"},
    {"k": "score1", "h": "  🔴 Support 2 · 🟡 Specificity 3 · 🔴 Consistency 1"},
    {"k": "score1", "h": "  🟡 Usability 3 · 🔴 Depth 2"},
    {"h": ""},
    {"h": "  ⚠️ I recommend the full version. It has 3 more contradictions"},
    {"h": "  (46 vs 64 warehouse staff, …), the reasoning behind each"},
    {"h": "  score, and all sources. Say \"full\"."},
  ],
};
