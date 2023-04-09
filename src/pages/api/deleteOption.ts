import { OptionModel } from '@server/db/option'
import { QStemModel } from '@server/db/qstem'
import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface DeleteOptionParams {
  optionID: ID
}

export interface DeleteOptionResults {}

export default apiController<DeleteOptionParams, DeleteOptionResults>(async ({ optionID }, user) => {
  const option = await OptionModel.findById(new Types.ObjectId(optionID))
  if (option) {
    if (option.author.toString() === user.id.toString()) {
      await QStemModel.findByIdAndUpdate(option.qstem, {
        $pull: { options: option._id },
      })
      await UserModel.findByIdAndUpdate(option.author, { $pull: { madeOptions: option._id } })
      await OptionModel.deleteOne({ _id: option._id })
      return {}
    } else {
      throw new Error("You don't have the right authorization")
    }
  } else {
    throw new Error('Option not found')
  }
})
