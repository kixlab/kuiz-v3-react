import { ClassModel } from '@server/db/class'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'

export interface UpdateTopicInfoParams {
  cid: string
  topics: string[]
}

export interface UpdateTopicInfoResults {
  topics: string[]
  success: boolean
}

export default apiController<UpdateTopicInfoParams, UpdateTopicInfoResults>(async ({ cid, topics }) => {
  const courseClass = await ClassModel.findById(new Types.ObjectId(cid))
  if (courseClass) {
    const updateCourseTopics = await courseClass.updateOne({ $set: { topics: topics } })
    if (updateCourseTopics) {
      const courseClass = await ClassModel.findById(new Types.ObjectId(cid))
      return {
        topics: courseClass.topics,
        success: true,
      }
    }
  }
  throw new Error('Class not found')
})
