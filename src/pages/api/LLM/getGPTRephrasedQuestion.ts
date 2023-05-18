import { ClassModel } from '@server/db/class'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface GetGPTRephrasedQuestionParams {
  question: string
  topic: string
  method: string
  cid: ID
}

export interface GetGPTRephrasedQuestionResults {
  rephrasedQuestion: string | undefined
}

export default apiController<GetGPTRephrasedQuestionParams, GetGPTRephrasedQuestionResults>(
  async ({ question, topic, method, cid }) => {
    const course = await ClassModel.findById(cid)
    const promptQuestion = `Considering that the objective is to ${method} the concept of ${topic} under the course ${course.name} rephrase the following question "${question}"`

    const openAIResponse = await openAIService.create({
      model: 'gpt-3.5-turbo',
      role: 'user',
      content: promptQuestion,
    })

    const RephrasedQuestion = openAIResponse.data.choices[0].message?.content
    return {
      rephrasedQuestion: RephrasedQuestion,
    }
  }
)
