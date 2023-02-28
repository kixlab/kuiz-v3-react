import { qStemService } from '@server/services/qStem'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

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

export default apiController<CreateQStemParams, CreateQStemResults>(async ({ qstemObj, cid }) => {
  const qStem = await qStemService.create(qstemObj)

  return {
    data: qStem.id,
  }
})
