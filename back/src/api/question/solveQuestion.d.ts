import { ID } from '../../types/common'

export interface SolveQuestionParams {
  uid: ID
  initAns: string
  qid: ID
  optionSet: ID[]
  isCorrect: boolean
}

export interface SolveQuestionResults {
  success: boolean
}
