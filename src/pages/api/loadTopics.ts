import { Topic, TopicModel } from '@server/db/topic'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadTopicsParams {
  cid: ID
}

export interface LoadTopicsResults {
  topics: Topic[]
}

export default apiController<LoadTopicsParams, LoadTopicsResults>(async ({ cid }) => {
  const topics = await TopicModel.find({ class: new Types.ObjectId(cid) })
  return {
    topics,
  }
})
