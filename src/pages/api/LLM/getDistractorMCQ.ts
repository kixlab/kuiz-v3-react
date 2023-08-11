import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { trim } from 'lodash'
import { OPTION_GENERATION_PROMPT } from 'src/constants/optionGenerationPrompt'
import { ID } from 'src/types/common'

export interface GetDistractorsMCQParams {
  stem: string
  explanation: string
  learningObjective: string
  isAnswer: boolean
  cid: ID
}

export interface GetDistractorsMCQResults {
  distractorKeywords: string[]
}

export default apiController<GetDistractorsMCQParams, GetDistractorsMCQResults>(
  async ({ cid, isAnswer, stem, explanation, learningObjective }, user) => {
    const openAIResponse = await openAIService.complete({
      prompt: OPTION_GENERATION_PROMPT(stem, learningObjective, explanation, isAnswer ? 'answer' : 'distractor'),
    })

    const distractorKeywords = openAIResponse.data.choices[0].text?.split('\n').map(trim) ?? []

    await logService.add(user._id, 'getDistractors', cid, {
      distractorKeywords,
      isAnswer,
    })

    return {
      distractorKeywords,
    }
  }
)
