import { QStem, QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface GetQstemByOptionParams {
  qstems: ID[]
}

export interface GetQstemByOptionResults {
  qstems: QStem[]
}

export default apiController<GetQstemByOptionParams, GetQstemByOptionResults>(async ({ qstems }) => {
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
