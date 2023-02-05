import { Option } from '../../../db/option'
import { ID } from '../../../types/common'

export interface LoadClusterParams {
  qid: ID
}

export interface LoadClusterResults {
  cluster: { representative: Option; options: Option[] }[]
}
