import { ID } from '../../types/common'

export interface CreateQStemParams {
  qstemObj: {
    uid: ID
    stem_text: string
    raw_string: string
    explanation: string
    action_verb: string[]
    keyword: string[]
    cid: ID
    options: ID[]
    optionSets: ID[]
    learning_objective: string
  }
  cid: ID
}

export interface CreateQStemResults {
  data: string
}
