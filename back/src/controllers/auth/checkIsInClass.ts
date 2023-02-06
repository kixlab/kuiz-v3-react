import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'
import { CheckIsInClassParams, CheckIsInClassResults } from '../../api/auth/checkIsInClass'
import { Post } from '../methods'
import { UserModel } from '../../db/user'

export const checkIsInClass = Post<CheckIsInClassParams, CheckIsInClassResults>(async ({ uid, cid }) => {
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
