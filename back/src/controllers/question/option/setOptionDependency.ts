import { Types } from 'mongoose'
import { SetOptionDependencyParams, SetOptionDependencyResults } from '../../../api/question/option/setOptionDependency'
import { OptionModel } from '../../../db/option'
import { Post } from '../../methods'

export const setOptionDependency = Post<SetOptionDependencyParams, SetOptionDependencyResults>(
  async ({ oid, dependency }) => {
    await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { dependency })
    return {}
  }
)
