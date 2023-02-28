import { Option } from '@server/db/option'
import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface OptionCreateParams {
  optionData: {
    author: ID
    option_text: string
    is_answer: boolean
    explanation: string
    class: ID
    qstem: ID
    keywords: string[]
  }
  similarOptions: ID[]
}

export interface OptionCreateResults {
  option: Option
}

export default apiController<OptionCreateParams, OptionCreateResults>(async ({ optionData, similarOptions }) => {
  console.log(optionData)

  const option = await optionService.create({
    uid: new Types.ObjectId(optionData.author),
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
