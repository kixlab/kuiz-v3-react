import { logService } from '@server/services/log'
import { apiController } from '@utils/api'
import { shuffle } from 'lodash'
import { QUESTION_STARTERS } from 'src/constants/questionStarters'
import { ID } from 'src/types/common'

export interface GetQuestionTemplatesParams {
  cid: ID
}

export interface GetQuestionTemplatesResults {
  templates: string[]
}

export default apiController<GetQuestionTemplatesParams, GetQuestionTemplatesResults>(async ({ cid }, user) => {
  const templates = shuffle(QUESTION_STARTERS).slice(0, 3)

  await logService.add(user._id, 'getQuestionTemplates', cid, {
    templates,
  })

  return {
    templates,
  }
})
