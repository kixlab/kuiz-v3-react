import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { trim } from 'lodash'
import { QUESTION_IMPROVE_PROMPT } from 'src/constants/questionRephrasePrompt'
import { ID } from 'src/types/common'

export interface GetRephrasedQuestionParams {
  question: string
  learningObjective: string
  explanation: string
  cid: ID
}

export interface GetRephrasedQuestionResults {
  rephrasedQuestions: string[]
}

export default apiController<GetRephrasedQuestionParams, GetRephrasedQuestionResults>(
  async ({ question, learningObjective, explanation, cid }, user) => {
    const openAIResponse = await openAIService.complete({
      prompt: QUESTION_IMPROVE_PROMPT(question, learningObjective, explanation),
    })

    const rephrasedQuestions = openAIResponse.data.choices[0].text?.split('\n')?.map(trim) ?? []

    await logService.add(user._id, 'getRephrasedQuestion', cid, {
      question,
      learningObjective,
      explanation,
      rephrasedQuestions,
    })

    return {
      rephrasedQuestions,
    }
  }
)
