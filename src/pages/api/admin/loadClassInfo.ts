import { ClassModel } from '@server/db/class'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'

export interface LoadClassInfoParams {
  cid: string
}

export interface LoadClassInfoResults {
  name: string
  topics: string[]
  students: number
  qstems: number
}

export default apiController<LoadClassInfoParams, LoadClassInfoResults>(async ({ cid }) => {
  const CourseClass = await ClassModel.findById(new Types.ObjectId(cid))
  if (CourseClass) {
    return {
      name: CourseClass.name,
      topics: CourseClass.topics,
      students: CourseClass.students.length,
      qstems: CourseClass.qstems.length,
    }
  }
  throw new Error('Class not found')
})
