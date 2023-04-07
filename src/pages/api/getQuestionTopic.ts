import { QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface getQuestionTopicParams {
  qid: ID
}

export interface getQuestionTopicResults {
  learningObjective: string
}

export default apiController<getQuestionTopicParams, getQuestionTopicResults>(async ({ qid }) => {
  const qStem = await QStemModel.findById(new Types.ObjectId(qid))
  if (qStem) {
    return {
      learningObjective: qStem.learningObjective,
    }
  } else {
    throw new Error('Question not found')
  }
})
