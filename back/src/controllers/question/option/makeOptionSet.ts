import { MakeOptionSetParams, MakeOptionSetResults } from '../../../api/question/option/makeOptionSet'
import { OptionModel } from '../../../db/option'
import { OptionSetModel } from '../../../db/optionSet'
import { Post } from '../../methods'

export const makeOptionSet = Post<MakeOptionSetParams, MakeOptionSetResults>(async ({ optionSetData }) => {
  const optionSet = new OptionSetModel(optionSetData)

  await optionSet.save()
  await OptionModel.updateMany({ _id: { $in: optionSet.options } }, { $push: { includedSet: optionSet.id } })

  return {}
})
