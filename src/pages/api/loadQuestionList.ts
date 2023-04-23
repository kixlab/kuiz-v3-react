import { QStem, QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface LoadQuestionListParams {
  cid: ID
  topic?: string
  page: number
}

export interface LoadQuestionListResults {
  problemList: QStem[]
  maxPages: number
}

export default apiController<LoadQuestionListParams, LoadQuestionListResults>(async ({ cid, topic = '', page }) => {
  const questionsPerPage = 10

  const getNumOfQuestions = QStemModel.find({
    class: { $eq: cid },
    learningObjective: { $regex: topic, $options: 'i' },
  }).countDocuments()

  const getQStems = QStemModel.find({
    class: { $eq: cid },
    learningObjective: { $regex: topic, $options: 'i' },
  })
    .skip((page - 1) * questionsPerPage)
    .limit(questionsPerPage)

  const [totalDocuments, qStems] = await Promise.all([getNumOfQuestions, getQStems])

  const maxPages = Math.ceil(totalDocuments / questionsPerPage)

  return {
    problemList: qStems,
    maxPages,
  }
})
