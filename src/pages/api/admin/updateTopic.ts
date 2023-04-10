import { Topic, TopicModel } from '@server/db/topic'
import { apiController } from '@utils/api'

export interface UpdateTopicParams {
  topic: Topic
}

export interface UpdateTopicResults {}

export default apiController<UpdateTopicParams, UpdateTopicResults>(async ({ topic }, user) => {
  if (user.isAdmin) {
    await TopicModel.findByIdAndUpdate(topic._id, {
      $set: { ...topic },
    })
    return {}
  } else {
    throw new Error('Permission denied')
  }
})
