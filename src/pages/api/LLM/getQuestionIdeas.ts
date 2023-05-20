import { ClassModel } from '@server/db/class'
import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface GetQuestionIdeasParams {
  topic: string
  method: string
  cid: ID
}

export interface GetQuestionIdeasResults {
  ideas: string[]
}

export default apiController<GetQuestionIdeasParams, GetQuestionIdeasResults>(async ({ topic, method, cid }, user) => {
  const course = await ClassModel.findById(cid)
  const promptQuestion = `Suggest 3 topics to create question in order to ${method} the concept of ${topic} under the course ${course.name}, reply only with the topics and make sure they are separated with a coma`

  const openAIResponse = await openAIService.create({
    model: 'gpt-3.5-turbo',
    role: 'user',
    content: promptQuestion,
  })

  const responseTopics = openAIResponse.data.choices[0].message?.content
  const ideas = responseTopics ? responseTopics.split(', ') : []

  await logService.add(user._id, 'getQuestionIdeas', cid, {
    topic,
    method,
    ideas,
  })

  return {
    ideas,
  }
})
