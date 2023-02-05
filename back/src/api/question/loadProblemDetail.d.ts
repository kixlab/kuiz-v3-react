import { Option } from '../../db/option'
import { QStem } from '../../db/qstem'
import { ID } from '../../types/common'

export interface LoadProblemDetailParams {
  qid: ID
}

export interface LoadProblemDetailResults {
  qinfo: QStem
  options: Option[]
}
