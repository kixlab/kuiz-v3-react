import { ClassModel } from '@server/db/class'
import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface GetDistractorsParams {
  qStem: string
  qLearningObjective: string
  cid: ID
}

export interface GetDistractorsResults {
  distractorKeywords: string[]
}

export default apiController<GetDistractorsParams, GetDistractorsResults>(
  async ({ qStem, qLearningObjective, cid }, user) => {
    const course = await ClassModel.findById(cid)
    const promptForTextCompletion = `You are a helpful assistant that provides distractor suggestions using just 3 comma-separated keywords:`
    const promptQuestion = `${qStem}; its learning objective is ${qLearningObjective} under the domain ${course.name}.`

    const openAIResponse = await openAIService.create({
      model: 'gpt-3.5-turbo',
      role: 'user',
      content: promptQuestion,
      promptForTextCompletion,
    })

    const responseDistractors = openAIResponse.data.choices[0].message?.content
    const distractorKeywords = responseDistractors ? responseDistractors.split(', ') : []

    await logService.add(user._id, 'getDistractors', cid, {
      qStem,
      distractorKeywords,
    })

    return {
      distractorKeywords,
    }
  }
)
