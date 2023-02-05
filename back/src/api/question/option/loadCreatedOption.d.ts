import { Option } from '../../../db/option'
import { ID } from '../../../types/common'

export interface LoadCreatedOptionParams {
  uid: ID
}

export interface LoadCreatedOptionResults {
  madeOption: Option[]
}
