import { Option } from '@server/db/option'
import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface CreateOptionParams {
  optionData: {
    option_text: string
    is_answer: boolean
    explanation: string
    class: ID
    qstem: ID
    keywords: string[]
  }
  similarOptions: ID[]
}

export interface CreateOptionResults {
  option: Option
}

export default apiController<CreateOptionParams, CreateOptionResults>(async ({ optionData, similarOptions }, user) => {
  const option = await optionService.create({
    uid: new Types.ObjectId(user.id),
    cid: new Types.ObjectId(optionData.class),
    qid: new Types.ObjectId(optionData.qstem),
    isAnswer: optionData.is_answer,
    optionText: optionData.option_text,
    explanation: optionData.explanation,
    keywords: optionData.keywords,
  })

  for await (const similarOption of similarOptions) {
    optionService.unionOption(new Types.ObjectId(similarOption), option.id)
  }

  return {
    option,
  }
})
