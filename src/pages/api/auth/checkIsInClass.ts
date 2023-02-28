import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'

export interface CheckIsInClassParams {
  uid: string
  cid: string
}

export interface CheckIsInClassResults {
  inclass: boolean
  cid: string | undefined
  enrolled: boolean
  valid: boolean
}

export default apiController<CheckIsInClassParams, CheckIsInClassResults>(async ({ uid, cid }) => {
  const user = await UserModel.findById(new Types.ObjectId(uid))
  if (user) {
    const isInClass = ObjectId.isValid(cid) && user.classes.includes(new Types.ObjectId(cid))
    return {
      inclass: isInClass,
      cid: isInClass ? cid : user.classes[0]?.toString(),
      enrolled: user.classes.length > 0,
      valid: ObjectId.isValid(cid),
    }
  }
  throw new Error('User not found')
})
