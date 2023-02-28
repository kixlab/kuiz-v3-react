import { QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface UpdateExplanationParams {
  qid: ID
  explanation: string
}

export interface UpdateExplanationResults {}

export default apiController<UpdateExplanationParams, UpdateExplanationResults>(async ({ qid, explanation }) => {
  const qStem = await QStemModel.findById(new Types.ObjectId(qid))

  if (qStem) {
    qStem.explanation = explanation
    await qStem.save()
    return {}
  } else {
    throw new Error('Question not found')
  }
})
