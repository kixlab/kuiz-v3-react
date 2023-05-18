import { ClassModel } from '@server/db/class'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface GetGPTQuestionTopicSuggestionParams {
  topic: string
  method: string
  cid: ID
}

export interface GetGPTQuestionTopicSuggestionResults {
  topics: string[]
}

export default apiController<GetGPTQuestionTopicSuggestionParams, GetGPTQuestionTopicSuggestionResults>(
  async ({ topic, method, cid }) => {
    const course = await ClassModel.findById(cid)
    const promptQuestion = `Suggest 3 topics to create question in order to ${method} the concept of ${topic} under the course ${course.name}, reply only with the topics and make sure they are separated with a coma`

    const openAIResponse = await openAIService.create({
      model: 'gpt-3.5-turbo',
      role: 'user',
      content: promptQuestion,
    })

    const responseTopics = openAIResponse.data.choices[0].message?.content
    const topics = responseTopics ? responseTopics.split(', ') : []
    return {
      topics: topics,
    }
  }
)
