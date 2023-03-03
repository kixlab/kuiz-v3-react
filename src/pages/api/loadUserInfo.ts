import { Class, ClassModel } from '@server/db/class'
import { User } from '@server/db/user'
import { apiController } from '@utils/api'

export interface LoadUserInfoParams {}

export interface LoadUserInfoResults {
  user: User
  classes: { cid: string; name: string }[]
}

export default apiController<LoadUserInfoParams, LoadUserInfoResults>(async ({}, user) => {
  const classes: Class[] = (await ClassModel.find({ _id: { $in: user.classes } })) ?? []

  return {
    user,
    classes: classes.map(c => ({ cid: c._id, name: c.name })),
  }
})
