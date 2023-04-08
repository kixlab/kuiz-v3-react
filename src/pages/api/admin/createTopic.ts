import { Topic } from '@server/db/topic'
import { topicService } from '@server/services/topic'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface CreateTopicParams {
  cid: ID
  label: string
  requiredOptionNumber: number
  requiredQuestionNumber: number
}

export interface CreateTopicResults {
  topic: Topic
}

export default apiController<CreateTopicParams, CreateTopicResults>(
  async ({ cid, label, requiredOptionNumber, requiredQuestionNumber }, user) => {
    if (user.isAdmin) {
      const topic = await topicService.create(label, requiredOptionNumber, requiredQuestionNumber, cid)
      return { topic }
    } else {
      throw new Error('Permission denied')
    }
  }
)
