import { Types } from 'mongoose'
import { OptionCreateParams, OptionCreateResults } from '../../../api/question/option/optionCreate'
import { optionService } from '../../../services/option'
import { Post } from '../../methods'

export const optionCreate = Post<OptionCreateParams, OptionCreateResults>(async ({ optionData, similarOptions }) => {
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
