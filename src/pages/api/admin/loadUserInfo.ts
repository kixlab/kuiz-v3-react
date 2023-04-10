import { ClassModel } from '@server/db/class'
import { User, UserModel } from '@server/db/user'
import { apiController } from '@utils/api'

export interface LoadUserInfoParams {
  cid: string
}

export interface LoadUserInfoResults {
  className: string
  students: User[]
}

export default apiController<LoadUserInfoParams, LoadUserInfoResults>(async ({ cid }, user) => {
  if (user.isAdmin) {
    const userClass = await ClassModel.findById(cid)
    if (userClass) {
      const students = await UserModel.find({ _id: { $in: userClass.students } })
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
