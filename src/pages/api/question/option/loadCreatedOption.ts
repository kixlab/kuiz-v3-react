import { Option, OptionModel } from '@server/db/option'
import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadCreatedOptionParams {
  uid: ID
}

export interface LoadCreatedOptionResults {
  madeOption: Option[]
}

export default apiController<LoadCreatedOptionParams, LoadCreatedOptionResults>(async ({ uid }) => {
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
