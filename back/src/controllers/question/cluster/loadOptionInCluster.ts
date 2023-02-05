import {
  LoadOptionInClusterParams,
  LoadOptionInClusterResults,
} from '../../../api/question/cluster/loadOptionInCluster'
import { Post } from '../../../controllers/methods'
import { OptionModel } from '../../../db/option'

export const loadOptionInCluster = Post<LoadOptionInClusterParams, LoadOptionInClusterResults>(
  async ({ optionList }) => {
    const options = await OptionModel.find({ _id: { $in: optionList } })
    return { options }
  }
)
