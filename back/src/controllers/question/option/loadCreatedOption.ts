import { Types } from 'mongoose'
import { LoadCreatedOptionParams, LoadCreatedOptionResults } from '../../../api/question/option/loadCreatedOption'
import { OptionModel } from '../../../db/option'
import { UserModel } from '../../../db/user'
import { Post } from '../../methods'

export const loadCreatedOption = Post<LoadCreatedOptionParams, LoadCreatedOptionResults>(async ({ uid }) => {
  const user = await UserModel.findById(new Types.ObjectId(uid))

  if (user) {
    const option = await OptionModel.find({ _id: { $in: user.madeOptions } })

    return {
      madeOption: option,
    }
  } else {
    throw new Error('User not found')
  }
})
