/* Texts shown in the demo. The CRUX answer and the progress lines come from a real run:
   demo-doc/crux-output.txt and demo-doc/crux-run.jsonl (trimmed only for length). */
const W = '<span class="warn"></span>';
const B = (s) => `<span class="b">${s}</span>`;
window.CRUX = {
  file: "northwind-4-day-week.pdf",
  docMeta: "40 pages · ~14,000 words<br>about an hour to read",
  cwd: "~/board",
  hint: "real run: 4 min 34 s → shown in 4 s",

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

  /* progress lines, from the tool calls in crux-run.jsonl */
  runSeconds: 274,
  work: [
    ["Bash(extract.py northwind-4-day-week.pdf)", "40 pages · 15 sections · load-bearing claims mapped"],
    ["Agent(Fact-check load-bearing claims)", "6 web searches · 13 pages opened"],
    ["Fetch(henley-iwf.org/reports/four-day-dividend-2023)", '<span class="red">domain doesn\'t exist</span>'],
    ["Bash(Recompute document figures and grep key quotes)", "EUR 412k (§8.5) ≠ EUR 1.2 million (Exec. Summary)"],
  ],

  /* the answer — demo-doc/crux-output.txt, shortened */
  output: [
    { k: "verdict", h: `<span class="b">⏺</span> <span class="cy b">VERDICT: Return.</span> The productivity study the whole` },
    { h: "  business case rests on could not be found anywhere, and the" },
    { h: "  document contradicts its own numbers. A pilot can still make" },
    { h: "  sense, but approve it on its own terms, not on this document's." },
    { h: "" },
    { h: '  <span class="grey">Brief: not supplied, guessed (high confidence, §1.1)</span>' },
    { h: '  <span class="grey">Your decision: whether to approve a 3-month pilot</span>' },
    { h: "" },
    { h: "  " + B("Summary") },
    { h: `  ${B("Main message:")} 100% pay for 80% of the time, staggered days` },
    { h: "  off; 6-month pilot with 56 people, then company-wide (§15.2)." },
    { h: "  • Strained today: turnover 22.5%, absence 6.8%, overtime" },
    { h: "    EUR 486k (+23%); all SLAs below target (§4.3–4.6)" },
    { h: "  • Model: net EUR 412k a year, 7-month payback (§8.5)" },
    { h: '  • It depends on +27% productivity "from 340 logistics' },
    { h: '    firms" (§5.4, §8.1)' },
    { h: "" },
    { h: "  " + B("Recommendation for your decision") },
    { h: `  • ${B("Approve only the pilot.")} Not the rollout or hiring 6 people` },
    { h: "    (§15.2). The pilot is how you test the shaky assumptions." },
    { h: "  • 3 months is short: it misses the Oct–Dec peak, and drivers," },
    { h: "    the biggest new cost (EUR 164k), are left out (§7.10, §10.3)" },
    { h: "  • Set pass/fail criteria without the 27%: output ≥ 95% of" },
    { h: "    baseline (§10.4)" },
    { h: "" },
    { h: "  " + B("Risks and gaps") },
    { k: "fake", h: `  ${W} ${B("The Henley Institute study (27%) looks made up.")}` },
    { k: "fake", h: "    Its domain doesn't exist, the title can't be found [1] (§5.4)" },
    { h: `  ${W} "40% less likely to quit" and "burnout drops by half"` },
    { h: "    have no source (§6.3, §8.4)" },
    { h: `  ${W} Net benefit is "EUR 1.2 million" in some places and` },
    { h: "    EUR 412k in others (Exec. Summary, §15.1 vs §8.5)" },
    { h: `  ${W} The warehouse has 46 people in one place, "64" in another` },
    { h: "    (§4.2 vs §7.9, §10.6)" },
    { h: `  ${W} The Risks section lists no risks (§13)` },
    { h: "" },
    { h: "  " + B("Questions for the author") },
    { h: "  1. Can you share the Henley report? If not, what is the case" },
    { h: "     without the 27%?" },
    { h: "  2. Which is right: EUR 412k or EUR 1.2M, 46 or 64 staff?" },
    { h: "  3. What does the pilot alone cost, and how do we roll it back?" },
    { h: "" },
    { k: "score0", h: "  " + B("Scoring") + ' <span class="grey">(depth: Standard · brief: guessed)</span>' },
    { k: "score1", h: `  ${B("Overall 2.2/5 → Return")} (a key source looks made up)` },
    { k: "score1", h: "  Alignment 4 (approx.) · Accuracy 2 · Support 2" },
    { k: "score1", h: "  Specificity 3 · Consistency 1 · Usefulness 3 · Depth 2" },
    { h: "" },
    { h: '  <span class="grey">[1] henley-iwf.org/reports/… (domain doesn\'t exist)</span>' },
  ],
};
