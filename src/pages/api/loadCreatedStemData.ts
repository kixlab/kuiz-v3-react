import { QStem } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface LoadCreatedStemDataParams {
  cid: ID
  topic: string | undefined
}

export interface LoadCreatedStemDataResults {
  madeStem: QStem[]
}

export default apiController<LoadCreatedStemDataParams, LoadCreatedStemDataResults>(async ({ cid, topic }, user) => {
  const userAfterPopulation = await user.populate<{ made: QStem[] }>('made')
  const filteredQStem = userAfterPopulation.made.filter(qStem => {
    if (topic) {
      const regex = new RegExp(`\\b${topic}\\b`)
      return qStem.class.toString() === cid && regex.test(qStem.learningObjective)
    } else {
      return qStem.class.toString() === cid
    }
  })
  return {
    madeStem: filteredQStem,
  }
})
