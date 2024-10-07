export const OPTION_GENERATION_PROMPT = (
  question: string,
  learningObjective: string,
  explanation: string,
  type: 'answer' | 'distractor'
) => `
Give three possible keywords for a multiple choice question QUESTION regarding LEARNING_OBJECTIVE, TYPE, and EXPLANATION.

QUESTION:
What is the correct way of writing error messages?

LEARNING_OBJECTIVE:
To remember the concept of Safety

EXPLANATION:
This question checks if a solver remembers the guidelines for good error messages.

TYPE:
answer

KEYWORDS:
Recovery
Learnability
Actionable

---

QUESTION:
Which of the following best describes slips and lapses in human error?

LEARNING_OBJECTIVE:
To understand the concept of Safety

EXPLANATION:
Better understanding for slips and lapses

TYPE:
distractor

KEYWORDS:
Planning failures
Error prevention strategies
Fatigue

---

QUESTION:
${question}

LEARNING_OBJECTIVE:
${learningObjective}

EXPLANATION:
${explanation}

TYPE:
${type}

KEYWORDS:
`
