import { Option } from '../../../db/option'
import { ID } from '../../../types/common'

export interface LoadOptionInClusterParams {
  optionList: ID[]
}

export interface LoadOptionInClusterResults {
  options: Option[]
}
