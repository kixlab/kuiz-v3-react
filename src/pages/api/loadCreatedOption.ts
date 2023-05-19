import { Option, OptionModel } from '@server/db/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadCreatedOptionParams {
  cid: ID
  topic: string | undefined
}

export interface LoadCreatedOptionResults {
  madeOption: Option[]
}

export default apiController<LoadCreatedOptionParams, LoadCreatedOptionResults>(async ({ cid, topic }, user) => {
  const option = topic
    ? await OptionModel.aggregate([
        {
          $match: {
            _id: { $in: user.madeOptions },
            class: { $eq: new Types.ObjectId(cid) },
          },
        },
        {
          $lookup: {
            from: 'qstems',
            localField: 'qstem',
            foreignField: '_id',
            as: 'qstemDocs',
          },
        },
        {
          $match: {
            'qstemDocs.learningObjective': { $regex: topic, $options: 'i' },
          },
        },
      ])
    : await OptionModel.find({
        _id: { $in: user.madeOptions },
        class: { $eq: cid },
      })

  return {
    madeOption: option,
  }
})
