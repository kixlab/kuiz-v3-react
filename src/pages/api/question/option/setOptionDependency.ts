import { OptionModel } from '@server/db/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface SetOptionDependencyParams {
  oid: ID
  dependency: any[]
}

export interface SetOptionDependencyResults {}

export default apiController<SetOptionDependencyParams, SetOptionDependencyResults>(async ({ oid, dependency }) => {
  await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { dependency })
  return {}
})
