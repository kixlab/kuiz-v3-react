import { Option, OptionModel } from '@server/db/option'
import { apiController } from '@utils/api'

export interface LoadCreatedOptionParams {}

export interface LoadCreatedOptionResults {
  madeOption: Option[]
}

export default apiController<LoadCreatedOptionParams, LoadCreatedOptionResults>(async ({}, user) => {
  const option = await OptionModel.find({ _id: { $in: user.madeOptions } })

  return {
    madeOption: option,
  }
})
