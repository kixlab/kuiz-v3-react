import { QStem } from '../../db/qstem'
import { ID } from '../../types/common'

export interface loadCreatedStemDataParams {
  uid: ID
}

export interface loadCreatedStemDataResults {
  madeStem: QStem[]
}
