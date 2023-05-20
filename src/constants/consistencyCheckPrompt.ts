export const CONSISTENCY_CHECK_PROMPT = (
  question: string,
  explanation: string,
  option: string,
  otherOptions: string[]
) => `
Give feedback on OPTION's consistency with OTHER_OPTIONS regarding QUESTION and EXPLANATION.

QUESTION:
Which of the following best describes slips and lapses in human error?

EXPLANATION:
Better understanding for slips and lapses

OPTION:
problem solving

OTHER_OPTIONS:
Errors in planning or rule application
Forgetfulness or memory lapses in skilled behavior

CONSISTENT_OPTION:
Be more specific. "Errors in problem solving or logical reasoning" is a better option.

---

QUESTION:
How we prevent mode errors?

EXPLANATION:
about prevent mode errors

OPTION:
small number of modes

OTHER_OPTIONS:
avoid two modes to share any action
Increase visibility of mode
Create a confirmation dialog

FEEDBACK:
Consider staring your option with a verb (e.g., "reduce modes").

---

QUESTION:
What is the source of a lapse?

EXPLANATION:
Better understanding for lapse

OPTION:
A failure of memory

OTHER_OPTIONS:
A failure in execution or control
An error in planning or rule application
A suboptimal heuristic

CONSISTENT_OPTION:
Your option is consistent with other options. Good job!

---

QUESTION:
${question}

EXPLANATION:
${explanation}

OPTION:
${option}

OTHER_OPTIONS:
${otherOptions.join('\n')}

CONSISTENT_OPTION:
`
