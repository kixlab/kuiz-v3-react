import { Option } from '@server/db/option'
import { optionService } from '@server/services/option'
import { profanityFilterService } from '@server/services/profanityFilter'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface CreateOptionParams {
  optionData: {
    option_text: string
    is_answer: boolean
    class: ID
    qstem: ID
    keywords: string[]
    numberOfOptionGrammarChecks?: number
    numberOfKeywordSuggestionChecks?: number
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
    optionText: await profanityFilterService.filter(optionData.option_text),
    keywords: optionData.keywords,
    numberOfOptionGrammarChecks: optionData.numberOfOptionGrammarChecks ? optionData.numberOfOptionGrammarChecks : 0,
    numberOfKeywordSuggestionChecks: optionData.numberOfKeywordSuggestionChecks
      ? optionData.numberOfKeywordSuggestionChecks
      : 0,
  })

  for await (const similarOption of similarOptions) {
    optionService.unionOption(new Types.ObjectId(similarOption), new Types.ObjectId(option._id))
  }

  return {
    option,
  }
})
