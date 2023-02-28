import { Option, OptionModel } from '@server/db/option'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface LoadOptionInClusterParams {
  optionList: ID[]
}

export interface LoadOptionInClusterResults {
  options: Option[]
}

export default apiController<LoadOptionInClusterParams, LoadOptionInClusterResults>(async ({ optionList }) => {
  const options = await OptionModel.find({ _id: { $in: optionList } })
  return { options }
})
