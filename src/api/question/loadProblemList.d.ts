import { QStem } from '../../db/qstem'
import { ID } from '../../types/common'

export interface LoadProblemListParams {
  cid: ID
}

export interface LoadProblemListResults {
  problemList: QStem[]
}
