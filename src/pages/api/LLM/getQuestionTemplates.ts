import { logService } from '@server/services/log'
import { apiController } from '@utils/api'
import { shuffle } from 'lodash'
import { QUESTION_STARTERS } from 'src/constants/questionStarters'
import { ID } from 'src/types/common'

export interface GetQuestionTemplatesParams {
  topic: string
  method: string
  cid: ID
}

export interface GetQuestionTemplatesResults {
  templates: string[]
}

export default apiController<GetQuestionTemplatesParams, GetQuestionTemplatesResults>(
  async ({ topic, method, cid }, user) => {
    const templates = shuffle(QUESTION_STARTERS).slice(0, 3)

    await logService.add(user._id, 'getQuestionTemplates', cid, {
      topic,
      method,
      templates,
    })

    return {
      templates,
    }
  }
)
