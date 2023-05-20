import { ClassModel } from '@server/db/class'
import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface GetRephrasedQuestionParams {
  question: string
  topic: string
  method: string
  cid: ID
}

export interface GetRephrasedQuestionResults {
  rephrasedQuestion: string | undefined
}

export default apiController<GetRephrasedQuestionParams, GetRephrasedQuestionResults>(
  async ({ question, topic, method, cid }, user) => {
    const course = await ClassModel.findById(cid)
    const promptQuestion = `Considering that the objective is to ${method} the concept of ${topic} under the course ${course.name} rephrase the following question "${question}"`

    const openAIResponse = await openAIService.create({
      model: 'gpt-3.5-turbo',
      role: 'user',
      content: promptQuestion,
    })

    const rephrasedQuestion = openAIResponse.data.choices[0].message?.content

    await logService.add(user._id, 'getRephrasedQuestion', cid, {
      method,
      question,
      rephrasedQuestion,
    })

    return {
      rephrasedQuestion,
    }
  }
)
