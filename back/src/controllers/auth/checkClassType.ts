import { ObjectId } from 'mongodb'
import { CheckClassTypeParams, CheckClassTypeResults } from '../../api/auth/checkClassType'
import { ClassModel } from '../../db/class'
import { Get } from '../methods'

export const checkClassType = Get<CheckClassTypeParams, CheckClassTypeResults>(async ({ cid }) => {
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
