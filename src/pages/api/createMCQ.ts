import { optionService } from '@server/services/option'
import { profanityFilterService } from '@server/services/profanityFilter'
import { qStemService } from '@server/services/qStem'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface CreateMCQParams {
  stem_text: string
  explanation: string
  keyword: string[]
  cid: ID
  options: ID[]
  optionSets: ID[]
  learningObjective: string
  ansList: string[]
  disList: string[]
}

export interface CreateMCQResults {
  data: string
}

export default apiController<CreateMCQParams, CreateMCQResults>(
  async ({ stem_text, explanation, keyword, cid, options, optionSets, learningObjective, ansList, disList }, user) => {
    const qStem = await qStemService.create({
      uid: user.id,
      cid,
      stem_text: await profanityFilterService.filter(stem_text),
      explanation: await profanityFilterService.filter(explanation),
      keyword,
      options,
      optionSets,
      learningObjective,
    })

    for (const text of ansList) {
      await optionService.create({
        uid: user.id,
        cid: new Types.ObjectId(cid),
        qid: new Types.ObjectId(qStem.id),
        isAnswer: true,
        optionText: await profanityFilterService.filter(text),
        keywords: [],
      })
    }

    for (const text of disList) {
      await optionService.create({
        uid: user.id,
        cid: new Types.ObjectId(cid),
        qid: new Types.ObjectId(qStem.id),
        isAnswer: false,
        optionText: await profanityFilterService.filter(text),
        keywords: [],
      })
    }

    return {
      data: qStem.id,
    }
  }
)
