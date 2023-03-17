import { ClassModel } from '@server/db/class'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'

export interface LoadClassInfoParams {
  cid: string
}

export interface LoadClassInfoResults {
  name: string
  topics: string[]
  students: Types.ObjectId[]
  qstems: Types.ObjectId[]
  success: boolean
}

export default apiController<LoadClassInfoParams, LoadClassInfoResults>(async ({ cid }) => {
  const CourseClass = await ClassModel.findById(new Types.ObjectId(cid))
  if (CourseClass) {
    return {
      name: CourseClass.name,
      topics: CourseClass.topics,
      students: CourseClass.students,
      qstems: CourseClass.qstems,
      success: true,
    }
  }
  throw new Error('Class not found')
})
