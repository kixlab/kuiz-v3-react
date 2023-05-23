import { ClassModel } from '@server/db/class'
import { Option, OptionModel } from '@server/db/option'
import { QStem, QStemModel } from '@server/db/qstem'
import { User, UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'

export interface LoadUserInfoParams {
  cid: string
  topic?: string
}

export interface LoadUserInfoResults {
  className: string
  students: User[]
}

export default apiController<LoadUserInfoParams, LoadUserInfoResults>(async ({ cid, topic }, user) => {
  if (user.isAdmin) {
    const userClass = await ClassModel.findById(cid)
    if (userClass) {
      const students = (await UserModel.find({ _id: { $in: userClass.students } })) as User[]

      for (const student of students) {
        const qstems = (await QStemModel.find({ _id: { $in: student.made } })) as QStem[]
        student.made = qstems
          .filter(qstem => qstem.learningObjective.includes(topic ?? ''))
          .map(qstem => new Types.ObjectId(qstem._id))
        const options = (await OptionModel.find({
          _id: { $in: student.madeOptions },
          qstem: { $in: student.made },
        })) as Option[]
        student.madeOptions = options.map(option => new Types.ObjectId(option._id))
      }

      const className = userClass.name
      return {
        className,
        students,
      }
    }
    throw new Error('Class not found')
  } else {
    throw new Error('Permission denied')
  }
})
