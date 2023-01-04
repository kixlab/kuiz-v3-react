import { QStem } from '../../db/qstem'
import { ID } from '../../types/common'

export interface GetQstemByOptionParams {
  qstems: ID[]
}

export interface GetQstemByOptionResults {
  qstems: QStem[]
}
