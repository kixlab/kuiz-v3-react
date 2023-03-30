import { ClassModel } from '@server/db/class'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'

export interface UpdateTopicInfoParams {
  cid: string
  topics: string[]
}

export interface UpdateTopicInfoResults {
  topics: string[]
}

export default apiController<UpdateTopicInfoParams, UpdateTopicInfoResults>(async ({ cid, topics }) => {
  const courseClass = await ClassModel.findById(new Types.ObjectId(cid))
  if (courseClass) {
    const updateCourseTopics = await courseClass.updateOne({ $set: { topics: topics } })
    if (updateCourseTopics.acknowledged) {
      const courseClass = await ClassModel.findById(new Types.ObjectId(cid))
      return {
        topics: courseClass.topics,
      }
    } else {
      throw new Error('Topic update was unsuccessful')
    }
  }
  throw new Error('Class not found')
})
