import { Types } from 'mongoose'
import { LoadOptionDetailParams, LoadOptionDetailResults } from '../../../api/question/option/loadOptionDetail'
import { OptionModel } from '../../../db/option'
import { Get } from '../../methods'

export const loadOptionDetail = Get<LoadOptionDetailParams, LoadOptionDetailResults>(async ({ oid }) => {
  const optionDetail = await OptionModel.findById(new Types.ObjectId(oid))

  if (optionDetail) {
    return {
      optionDetail,
    }
  } else {
    throw new Error('Option not found')
  }
})
