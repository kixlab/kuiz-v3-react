import { ClassModel } from '@server/db/class'
import { apiController } from '@utils/api'
import { ObjectId } from 'mongodb'

export interface CheckClassTypeParams {
  cid: string
}

export interface CheckClassTypeResults {
  cType: boolean
  valid: boolean
}

export default apiController<CheckClassTypeParams, CheckClassTypeResults>(async ({ cid }) => {
  if (ObjectId.isValid(cid)) {
    const targetClass = await ClassModel.findById(cid)
    if (targetClass) {
      return {
        cType: targetClass.classType,
        valid: true,
      }
    }
    return {
      cType: false,
      valid: false,
    }
  }
  throw new Error('Invalid class ID')
})
