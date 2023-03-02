import { apiController } from '@utils/api'
import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'

export interface CheckIsInClassParams {
  cid: string
}

export interface CheckIsInClassResults {
  inclass: boolean
  cid: string | undefined
  enrolled: boolean
  valid: boolean
}

export default apiController<CheckIsInClassParams, CheckIsInClassResults>(async ({ cid }, user) => {
  const isInClass = ObjectId.isValid(cid) && user.classes.includes(new Types.ObjectId(cid))
  return {
    inclass: isInClass,
    cid: isInClass ? cid : user.classes[0]?.toString(),
    enrolled: user.classes.length > 0,
    valid: ObjectId.isValid(cid),
  }
})
