import { topicService } from '@server/services/topic'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface DeleteTopicParams {
  tid: ID
}

export interface DeleteTopicResults {}

export default apiController<DeleteTopicParams, DeleteTopicResults>(async ({ tid }, user) => {
  if (user.isAdmin) {
    await topicService.delete(tid)
    return {}
  } else {
    throw new Error('Permission denied')
  }
})
