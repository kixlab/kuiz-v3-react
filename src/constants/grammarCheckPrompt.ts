export const GRAMMAR_CHECK_PROMPT = (sentence: string) => `
Evaluate the grammar and punctuation of SENTENCE.

SENTENCE:
How we prevent mode errors?

EVALUATION:
It seems that you are missing a verb. Consider adding it. For example, "How do we prevent mode errors?"

---

SENTENCE:
How can you avoid description errors?

EVALUATION:
The sentence is grammatically correct.

---

SENTENCE:
${sentence}

EVALUATION:
`
