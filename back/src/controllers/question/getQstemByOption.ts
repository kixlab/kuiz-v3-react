import { Types } from 'mongoose'
import { GetQstemByOptionParams, GetQstemByOptionResults } from '../../api/question/getQStemByOption'
import { QStem, QStemModel } from '../../db/qstem'
import { Post } from '../methods'

export const getQstemByOption = Post<GetQstemByOptionParams, GetQstemByOptionResults>(async ({ qstems }) => {
  const details = (
    await Promise.all(
      qstems
        .map(id => new Types.ObjectId(id))
        .map(async qstem => {
          return QStemModel.findById(qstem)
        })
    )
  ).filter(d => d !== null) as QStem[]

  return {
    qstems: details,
  }
})
