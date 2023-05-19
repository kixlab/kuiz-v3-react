import { profanityFilterService } from '@server/services/profanityFilter'
import { qStemService } from '@server/services/qStem'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface CreateQStemParams {
  qstemObj: {
    stem_text: string
    explanation: string
    keyword: string[]
    cid: ID
    options: ID[]
    optionSets: ID[]
    learningObjective: string
    numberOfTopicSuggestionsChecked: number
    numberOfRephraseRequestsChecked: number
    numberOfGrammarChecks: number
  }
}

export interface CreateQStemResults {
  data: string
}

export default apiController<CreateQStemParams, CreateQStemResults>(
  async (
    {
      qstemObj: {
        stem_text,
        explanation,
        keyword,
        cid,
        options,
        optionSets,
        learningObjective,
        numberOfTopicSuggestionsChecked,
        numberOfRephraseRequestsChecked,
        numberOfGrammarChecks,
      },
    },
    user
  ) => {
    const qStem = await qStemService.create({
      uid: user.id,
      cid,
      stem_text: await profanityFilterService.filter(stem_text),
      explanation: await profanityFilterService.filter(explanation),
      keyword,
      options,
      optionSets,
      learningObjective,
      numberOfTopicSuggestionsChecked,
      numberOfRephraseRequestsChecked,
      numberOfGrammarChecks,
    })

    return {
      data: qStem.id,
    }
  }
)
