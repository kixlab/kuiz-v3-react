import { ClassModel } from '@server/db/class'
import { User, UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'

export interface LoadUserInfoParams {
  cid: string
}

export interface LoadUserInfoResults {
  className: string
  students: User[]
  success: boolean
}

export default apiController<LoadUserInfoParams, LoadUserInfoResults>(async ({ cid }) => {
  const userClass = await ClassModel.findById(cid)
  if (userClass) {
    const students = await UserModel.find({ _id: { $in: userClass.students } })
    const courseClass = await ClassModel.findById(new Types.ObjectId(cid))
    const className = courseClass.name
    return {
      className,
      students,
      success: true,
    }
  }
  throw new Error('Class not found')
})
