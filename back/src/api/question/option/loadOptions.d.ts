import { QStem } from '../../../db/qstem'
import { Option } from '../../../db/option'
import { ID } from '../../../types/common'

export interface LoadOptionsParams {
  qid: ID
}

export interface LoadOptionsResults {
  options: Option[]
  qinfo: QStem
}
