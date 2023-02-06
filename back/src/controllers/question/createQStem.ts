import { CreateQStemParams, CreateQStemResults } from '../../api/question/createQStem'
import { qStemService } from '../../services/qStem'
import { Post } from '../methods'

export const createQStem = Post<CreateQStemParams, CreateQStemResults>(async ({ qstemObj, cid }) => {
  const qStem = await qStemService.create(qstemObj)

  return {
    data: qStem.id,
  }
})
