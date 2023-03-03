import { OptionModel } from '@server/db/option'
import { OptionSet, OptionSetModel } from '@server/db/optionSet'
import { apiController } from '@utils/api'

export interface MakeOptionSetParams {
  optionSetData: OptionSet
}

export interface MakeOptionSetResults {}

export default apiController<MakeOptionSetParams, MakeOptionSetResults>(async ({ optionSetData }) => {
  const optionSet = new OptionSetModel(optionSetData)

  await optionSet.save()
  await OptionModel.updateMany({ _id: { $in: optionSet.options } }, { $push: { includedSet: optionSet.id } })

  return {}
})
