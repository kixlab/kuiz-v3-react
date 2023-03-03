import { QStem } from '@server/db/qstem'
import { apiController } from '@utils/api'

export interface LoadCreatedStemDataParams {}

export interface LoadCreatedStemDataResults {
  madeStem: QStem[]
}

export default apiController<LoadCreatedStemDataParams, LoadCreatedStemDataResults>(async ({}, user) => {
  const userAfterPopulation = await user.populate<{ made: QStem[] }>('made')
  return {
    madeStem: userAfterPopulation.made,
  }
})
