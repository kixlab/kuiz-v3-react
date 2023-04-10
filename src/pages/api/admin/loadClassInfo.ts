import { ClassModel } from '@server/db/class'
import { Topic } from '@server/db/topic'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadClassInfoParams {
  cid: string
}

export interface LoadClassInfoResults {
  name: string
  topics: Topic[]
  studentsNumber: number
  qstemsNumber: number
  currentTopic: ID | null
}

export default apiController<LoadClassInfoParams, LoadClassInfoResults>(async ({ cid }, user) => {
  if (user.isAdmin) {
    const courseClass = await ClassModel.findById(new Types.ObjectId(cid)).populate('topics')

    if (courseClass) {
      return {
        name: courseClass.name,
        topics: courseClass.topics,
        studentsNumber: courseClass.students.length,
        qstemsNumber: courseClass.qstems.length,
        currentTopic: courseClass.currentTopic,
      }
    }
    throw new Error('Class not found')
  } else {
    throw new Error('Permission denied')
  }
})
