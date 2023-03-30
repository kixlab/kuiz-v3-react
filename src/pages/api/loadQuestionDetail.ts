import { Option, OptionModel } from '@server/db/option'
import { QStem, QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadQuestionDetailParams {
  qid: ID
}

export interface LoadQuestionDetailResults {
  qinfo: QStem
  options: Option[]
}

export default apiController<LoadQuestionDetailParams, LoadQuestionDetailResults>(async ({ qid }) => {
  const qStem = await QStemModel.findById(new Types.ObjectId(qid))

  if (qStem) {
    const options = await OptionModel.find({ _id: { $in: qStem.options } })

    if (options) {
      return {
        qinfo: qStem,
        options,
      }
    }
    throw new Error('Options not found')
  }
  throw new Error('Question not found')
})
