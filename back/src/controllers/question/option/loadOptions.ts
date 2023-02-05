import { LoadOptionsParams, LoadOptionsResults } from '../../../api/question/option/loadOptions'
import { QStemModel } from '../../../db/qstem'
import { Get } from '../../methods'
import { Types } from 'mongoose'
import { OptionModel } from '../../../db/option'

export const loadOptions = Get<LoadOptionsParams, LoadOptionsResults>(async ({ qid }) => {
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
