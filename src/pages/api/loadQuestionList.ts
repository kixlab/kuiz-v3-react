import { QStem, QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface LoadQuestionListParams {
  cid: ID
  topic?: string
}

export interface LoadQuestionListResults {
  problemList: QStem[]
}

export default apiController<LoadQuestionListParams, LoadQuestionListResults>(async ({ cid, topic = '' }) => {
  const qStems = await QStemModel.find({ class: { $eq: cid }, learningObjective: { $regex: topic, $options: 'i' } })

  return {
    problemList: qStems,
  }
})
