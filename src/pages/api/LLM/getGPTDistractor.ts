import { ClassModel } from '@server/db/class'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface GetGPTDistractorsParams {
  qStem: string
  qLearningObjective: string
  cid: ID
}

export interface GetGPTDistractorsResults {
  distractorKeywords: string[]
}

export default apiController<GetGPTDistractorsParams, GetGPTDistractorsResults>(
  async ({ qStem, qLearningObjective, cid }) => {
    const course = await ClassModel.findById(cid)
    const promptQuestion = `Suggest 3 keywords to create distractors reply by separating them with a comma for the following question ${qStem}; its learning objective is ${qLearningObjective} under the domain ${course.name}, reply only with the distractors.`

    const openAIResponse = await openAIService.create({
      model: 'gpt-3.5-turbo',
      role: 'user',
      content: promptQuestion,
    })

    const responseDistractors = openAIResponse.data.choices[0].message?.content
    const distractors = responseDistractors ? responseDistractors.split(', ') : []
    return {
      distractorKeywords: distractors,
    }
  }
)
