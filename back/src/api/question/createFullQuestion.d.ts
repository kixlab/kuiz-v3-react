import { QStem } from '../../db/qstem'
import { ID } from '../../types/common'

export interface CreateFullQuestionParams {
  optionList: {
    option_text: string
    is_answer: boolean
  }[]
  qinfo: {
    authorId: ID
  }
  cid: ID
  explanation: string
}

export interface CreateFullQuestionResults {
  question: QStem
}
