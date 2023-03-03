import { Option, OptionModel } from '@server/db/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadOptionDetailParams {
  oid: ID
}

export interface LoadOptionDetailResults {
  optionDetail: Option
}

export default apiController<LoadOptionDetailParams, LoadOptionDetailResults>(async ({ oid }) => {
  const optionDetail = await OptionModel.findById(new Types.ObjectId(oid))

  if (optionDetail) {
    return {
      optionDetail,
    }
  } else {
    throw new Error('Option not found')
  }
})
