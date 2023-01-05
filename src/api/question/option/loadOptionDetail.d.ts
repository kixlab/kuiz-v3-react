import { Option } from '../../../db/option'
import { ID } from '../../../types/common'

export interface LoadOptionDetailParams {
  oid: ID
}

export interface LoadOptionDetailResults {
  optionDetail: Option
}
