import { ClassModel } from '@server/db/class'
import { OptionModel } from '@server/db/option'
import { QStemModel } from '@server/db/qstem'
import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface DeleteQstemParams {
  qid: ID
}

export interface DeleteQstemResults {}

export default apiController<DeleteQstemParams, DeleteQstemResults>(async ({ qid }, user) => {
  const qStem = await QStemModel.findById(new Types.ObjectId(qid))
  if (qStem) {
    if (qStem.author.toString() === user.id.toString()) {
      qStem.options.forEach(async (option: ID) => {
        const optionInfo = await OptionModel.findById(option)
        await UserModel.findByIdAndUpdate(optionInfo.author, { $pull: { madeOptions: optionInfo._id } })
        await QStemModel.findByIdAndUpdate(new Types.ObjectId(qid), {
          $pull: { options: optionInfo._id },
        })
        await OptionModel.deleteOne({ _id: optionInfo._id })
      })
      const cid = qStem.class
      await ClassModel.updateOne({ _id: cid }, { $pull: { qstems: new Types.ObjectId(qid) } })
      await UserModel.findByIdAndUpdate(qStem.author, { $pull: { made: qStem._id } })
      await QStemModel.deleteOne({ _id: new Types.ObjectId(qid) })
      return {}
    } else {
      throw new Error("You don't have the right authorization")
    }
  } else {
    throw new Error('Question not found')
  }
})
