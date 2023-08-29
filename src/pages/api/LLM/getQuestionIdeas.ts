import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { shuffle, trim } from 'lodash'
import { QUESTION_IDEA_GENERATION_PROMPT } from 'src/constants/questionIdeaGenerationPrompt'
import { ID } from 'src/types/common'

export interface GetQuestionIdeasParams {
  topic: string
  cid: ID
}

export interface GetQuestionIdeasResults {
  ideas: string[]
}

export default apiController<GetQuestionIdeasParams, GetQuestionIdeasResults>(async ({ topic, cid }, user) => {
  const materials = shuffle(SAFETY_MATERIALS).slice(0, 5).join('\n')
  const openAIResponse = await openAIService.complete({
    prompt: QUESTION_IDEA_GENERATION_PROMPT(materials),
  })

  const ideas = openAIResponse.data.choices[0].text?.split('\n').map(trim) ?? []

  await logService.add(user._id, 'getQuestionIdeas', cid, {
    topic,
    ideas,
  })

  return {
    ideas,
  }
})

const ACCESSIBILITY_MATERIALS = [
  `# Diversity of Ability
  Visual impairments
  - Color perception
  - Low Vision (acuity, central field loss, tunnel vision)
  - Total blindness
  Hearing impairments
  - Often varies with frequency
  Motor impairments
  - Tremor and spasms
  - Muscle weakness and fatigue
  - Paralysis
  Cognitive and neurological impairments
  - intellectual disabilities
  - memory impairments, distractability, dyslexia, seizure disorders
  - sensation impairments (touch, vibration, temperature)
  `,
  `# Impairments Affect Everybody
  Aging
  - Changes in vision
  - Hearing loss
  - Musculoskeletal problems
  - Changes in memory
  Overexposure
  - Noise-induced hearing loss
  - RSI
  Situational disabilities
  - Driving a car
  - Walking down the street
  - In a noisy environment
  `,
  `# Universal Design
  - Equitable use
  - Flexibility in use
  - Simple & intuitive
  - Perceptible information
  - Tolerance for error
  - Low physical effort
  - Size and space for approach and use
  `,
  `# Assistive Technology
  Output
  - Screen magnifier
  - Screen reader
  - Braille display
  - Screen flashing on sound
  Pointing
  - Eye or head tracker
  - Puff-and-sip
  - Mouse keys
  Typing
  - Onscreen keyboards
  - Sticky keys
  - Speech recognition
  `,
  `# Accessibility Guidelines
  Section 508
  W3C Accessibility Initiative
  `,
  `# Support Keyboard Access
  Pointing interactions should have keyboard alternatives
  - Menus should be controllable by the keyboard
  - Forms and links should be navigable by keyboard
  - Needed by motor-impaired and vision-impaired
  `,
  `# Don’t Rely on Sound Alone
  Flash as well as beep
  Closed captioning for videos
  `,
  `# User Control Over Colors and Fonts
  Allow user to choose high-contrast colors
  Allow user to enlarge fonts
  Don’t rely on color alone
  `,
  `#Accessibility APIs
  javax.accessibility
  - Swing widgets implement Accessible
  - getAccessibleContext() returns an object with labels, descriptions, content, selections for the widget
  - Platform-specific accessibility APIs are similar
  HTML accessibility features
  - alt and title attributes
  - label element
  - accesskey attribute
  - aural CSS  
  `,
]

const INTERNATIONALIZATION_MATERIALS = [
  `# Translation
All user-visible text has to be translated
- Object approach
<button> OK </button>
- Stroke approach
canvas.fillText("Name:",...)
- Pixel approach
Error messages too
`,
  `# Text Direction
Some scripts don’t read left-to-right
- Arabic, Hebrew are right-to-left
- Affects drawing, screen layout, even icons
`,
  `# Sort Order
Unicode order isn’t even right for English
Uppercase/lowercase, accents affect order
Norwegian: … x y z æ ø å
Traditional Spanish: c, ch, d, …, l, ll, m, …
`,
  `# Implementation Support for I18N
Message files
Unicode
Bidirectionality
Formatting libraries
Separating structure from presentation
`,
  `# Message Files
A message file separates localizable messages from source code
- Also called resource files or resource bundles
Human translators generate a message file for each supported locale
- Doesn’t require translators to read source code or recompile
Messages with dynamic parts can be tricky
- {N} users have visited since {date}
`,
  `# Bidirectionality
Bidirectional text display and editing
Bidirectional layout
`,
  `# Formatting Libraries
Javascript library support for parsing and printing numbers and dates:
- format.js
- Intl API `,
  `# Separating Structure From Presentation
Replaceable icons and images
Fonts
Colors
`,
]

const SAFETY_MATERIALS = [
  `# Error Types
  Slips and lapses
  - Failure to correctly execute a procedure
  - Slip is a failure of execution, lapse is a failure of memory
  - Typically found in skilled behavior
  Mistakes
  - Using wrong procedure for the goal
  - Typically found in rule-based behavior or problem-solving behavior
  `,
  `# Capture errors
  - A frequent sequence of actions captures a less frequent sequence of actions
  - Leave your house and find yourself walking to school instead of where you meant to go
  - vi :w command (to save the file) vs. :wq command (to save and quit)
  - Excel array formulas must be entered with Ctrl-Shift-Enter, not just Enter
  `,
  `# Description errors
  - Actions have similar descriptions
  - Description can be visual, spatial, or semantic
  - Consistency (same) is good for learning
  - Inadvertent similarity (close but not quite) is bad for safety
  `,
  `# Mode errors
  Modes: states in which actions have different meanings
  - Vi's insert mode vs. command mode
  - Caps Lock
  - Drawing Palette
  `,
  `# Causes of Slips
  "Strong-but-wrong" effect
  - Similarity
  - High frequency
  Inattention or inappropriate attention
  Speed / accuracy tradeoff
  `,
  `# Error Prevention
  Safety from Capture Errors
  - Avoid habitual action sequences with identical prefixes
  Safety from Description Errors
  - Avoid actions with very similar descriptions
  - Keep dangerous commands away from common ones
  Safety from Mode Errors
  - Eliminate modes
  - Increase visibility of mode
  - Spring-loaded or temporary modes
  - Disjoint action sets in different modes
  Safety by Forcing User Interaction
  - Interlock: creating mutual dependency in a sequence of actions
  - Lockin: keeping specific operations active to avoid accidental stopping
  - Lockout: asking users to perform some action to proceed with a task
  Confirmation Dialogs
  `,
  `# Writing Error Message Dialogs
  Best error message is none at all
  - Errors should be prevented
  - Be more flexible and tolerant
  - Nonsense entries can often be ignored without harm
  Be Precise and Comprehensible
  - Be precise
  - Restate user's input
  - Speak the user's language 
  Suggest Reasons and Solutions
  - Give constructive help: why the error occurred and how to fix it
  Suggest Reasons and Solutions
  - Be polite and nonblaming
  Avoid Loaded Words
  - Fatal, illegal, aborted, terminated
  `,
]
