import { ClassModel } from '@server/db/class'
import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'

export interface JoinClassParams {
  code: string
  _id: string
}

export interface JoinClassResults {
  msg: string
  success: boolean
  cid?: string
  cType?: boolean
}

export default apiController<JoinClassParams, JoinClassResults>(async ({ code, _id }, token) => {
  const classToJoin = await ClassModel.findOne({ code })

  if (classToJoin) {
    await ClassModel.findOneAndUpdate({ code }, { $push: { students: new Types.ObjectId(_id) } })
    await UserModel.findOneAndUpdate({ _id }, { $push: { classes: classToJoin.id } })

    return {
      msg: 'Joined class',
      success: true,
      cid: classToJoin.id.toString(),
      cType: classToJoin.classType,
    }
  }

  throw new Error('Class not found')
})
