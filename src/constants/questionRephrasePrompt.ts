export const QUESTION_IMPROVE_PROMPT = (question: string, learningObjective: string, explanation: string) => `
Give three suggestions to improve QUESTION regarding LEARING_OBJECTIVE and EXPLANATION.

QUESTION:
Which of the following is true?

LEARING_OBJECTIVE:
To understand the concept of Human cognition

EXPLANATION:
To understand different examples of human cognition

IMPROVED_QUESTION:
Which of the following is true about human cognition?
What is the definition of human cognition?
How does human cognition differ from other types of cognition?

---

QUESTION:
Choose causes of slips

LEARING_OBJECTIVE:
To remember the concept of Safety

EXPLANATION:
To know the different categorization of slips

IMPROVED_QUESTION:
Which of the following is not the cause of slips?
How can one prevent slips?
How is slips related to safety?

---

QUESTION:
${question}

LEARING_OBJECTIVE:
${learningObjective}

EXPLANATION:
${explanation}

IMPROVED_QUESTION:
`
