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
  const openAIResponse = await openAIService.complete({
    prompt: QUESTION_IDEA_GENERATION_PROMPT(
      topic === 'Accessibility'
        ? shuffle(ACCESSIBILITY_MATERIALS).slice(5).join('\n')
        : shuffle(INTERNATIONALIZATION_MATERIALS).slice(5).join('\n')
    ),
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
