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
  const CourseClass = await ClassModel.findById(new Types.ObjectId(cid))
  if (CourseClass) {
    const updateCourseTopics = await CourseClass.updateOne({ $set: { topics: topics } })
    if (updateCourseTopics) {
      const CourseClass = await ClassModel.findById(new Types.ObjectId(cid))
      return {
        topics: CourseClass.topics,
        success: true,
      }
    }
  }
  throw new Error('Class not found')
})
