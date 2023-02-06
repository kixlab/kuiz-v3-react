import { Types } from 'mongoose'
import { JoinClassParams, JoinClassResults } from '../../api/auth/joinClass'
import { ClassModel } from '../../db/class'
import { UserModel } from '../../db/user'
import { Post } from '../methods'

export const joinClass = Post<JoinClassParams, JoinClassResults>(async ({ code, _id }) => {
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
