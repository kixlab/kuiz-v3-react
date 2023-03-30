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
  const courseClass = await ClassModel.findById(new Types.ObjectId(cid))
  if (courseClass) {
    return {
      name: courseClass.name,
      topics: courseClass.topics,
      students: courseClass.students.length,
      qstems: courseClass.qstems.length,
    }
  }
  throw new Error('Class not found')
})
