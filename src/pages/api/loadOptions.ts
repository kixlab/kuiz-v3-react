import { Option, OptionModel } from '@server/db/option'
import { QStem, QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadOptionsParams {
  qid: ID
}

export interface LoadOptionsResults {
  options: Option[]
  qinfo: QStem
}

export default apiController<LoadOptionsParams, LoadOptionsResults>(async ({ qid }) => {
  const qStem = await QStemModel.findById(new Types.ObjectId(qid))

  if (qStem) {
    const options = await OptionModel.find({ _id: { $in: qStem.options } })
    if (options) {
      return {
        options,
        qinfo: qStem,
      }
    } else {
      throw new Error('No options found')
    }
  } else {
    throw new Error('No qstem found')
  }
})
