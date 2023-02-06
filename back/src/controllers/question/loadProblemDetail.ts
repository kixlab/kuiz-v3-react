import { Types } from 'mongoose'
import { LoadProblemDetailParams, LoadProblemDetailResults } from '../../api/question/loadProblemDetail'
import { OptionModel } from '../../db/option'
import { QStemModel } from '../../db/qstem'
import { Get } from '../methods'

export const loadProblemDetail = Get<LoadProblemDetailParams, LoadProblemDetailResults>(async ({ qid }) => {
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
