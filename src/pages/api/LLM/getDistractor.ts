import { QStem, QStemModel } from '@server/db/qstem'
import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { trim } from 'lodash'
import { Types } from 'mongoose'
import { OPTION_GENERATION_PROMPT } from 'src/constants/optionGenerationPrompt'
import { ID } from 'src/types/common'

export interface GetDistractorsParams {
  isAnswer: boolean
  qid: ID
}

export interface GetDistractorsResults {
  distractorKeywords: string[]
}

export default apiController<GetDistractorsParams, GetDistractorsResults>(async ({ isAnswer, qid }, user) => {
  const qStem: QStem | null = await QStemModel.findById(new Types.ObjectId(qid))

  if (qStem) {
    const openAIResponse = await openAIService.complete({
      prompt: OPTION_GENERATION_PROMPT(
        qStem.stem_text,
        qStem.learningObjective,
        qStem.explanation,
        isAnswer ? 'answer' : 'distractor'
      ),
    })

    const distractorKeywords = openAIResponse.choices[0].message.content?.split('\n').map(trim) ?? []

    await logService.add(user._id, 'getDistractors', qStem.class._id.toString(), {
      qid,
      distractorKeywords,
      isAnswer,
    })

    return {
      distractorKeywords,
    }
  } else {
    throw new Error('QStem not found')
  }
})
