import { ClassModel } from '@server/db/class'
import { TopicModel } from '@server/db/topic'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface InsertCurrentTopicParams {
  cid: string
  topicID: string
}

export interface InsertCurrentTopicResults {
  res: ID
}

export default apiController<InsertCurrentTopicParams, InsertCurrentTopicResults>(async ({ cid, topicID }) => {
  const topic = await TopicModel.findById(new Types.ObjectId(topicID))
  const classInfo = await ClassModel.findById(new Types.ObjectId(cid))
  if (topic && classInfo) {
    const classInfo = await ClassModel.findOneAndUpdate(
      { _id: new Types.ObjectId(cid) },
      { $set: { currentTopic: topic._id } }
    )
    return { res: classInfo.currentTopic }
  } else {
    throw new Error('Topic not found')
  }
})
