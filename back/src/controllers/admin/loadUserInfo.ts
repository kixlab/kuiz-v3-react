import { LoadUserInfoParams, LoadUserInfoResults } from '../../api/admin/loadUserInfo'
import { ClassModel } from '../../db/class'
import { UserModel } from '../../db/user'
import { Get } from '../methods'

export const loadUserInfo = Get<LoadUserInfoParams, LoadUserInfoResults>(async ({ cid }) => {
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
