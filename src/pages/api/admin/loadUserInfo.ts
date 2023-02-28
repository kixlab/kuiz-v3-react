import { ClassModel } from '@server/db/class'
import { User, UserModel } from '@server/db/user'
import { apiController } from '@utils/api'

export interface LoadUserInfoParams {
  cid: string
}

export interface LoadUserInfoResults {
  students: User[]
  success: boolean
}

export default apiController<LoadUserInfoParams, LoadUserInfoResults>(async ({ cid }) => {
  const userClass = await ClassModel.findById(cid)
  if (userClass) {
    const students = await UserModel.find({ _id: { $in: userClass.students } })
    return {
      students,
      success: true,
    }
  }
  throw new Error('Class not found')
})
