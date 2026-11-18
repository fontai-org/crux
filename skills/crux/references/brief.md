# Reconstructing the brief ("co bylo zadáním tvůrci dokumentu a proč")

Use when the user did not supply the brief, or asked for "Odhad zadání".

## Signals to read

- Title, intro and stated goal; the questions the document says it answers.
- What it compares and what it leaves out (scope tells you what was asked).
- The audience it writes for and the form (memo, comparison, plan, research report).
- Constraints it keeps repeating (budget, deadline, technology, country).
- Leftover prompt traces: "as requested", headings that mirror a list of questions,
  sentences that echo an instruction.

## Output

- **Odvozené zadání**: 1–2 sentences, written as the author would have been asked.
- **Proč asi vznikl**: the likely decision or problem behind it, one sentence.
- **Jistota**: vysoká / střední / nízká, plus the 1–2 strongest signals with locations.
- **Pravděpodobný prompt** (only if "Odhad zadání" was chosen): a short reconstruction
  of the prompt, clearly marked as a guess.

If the user did supply the brief, compare it with your reconstruction anyway: a big gap
between them is itself a finding (scope drift).
