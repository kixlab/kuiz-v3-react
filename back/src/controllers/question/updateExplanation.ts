import { Types } from 'mongoose'
import { UpdateExplanationParams, UpdateExplanationResults } from '../../api/question/updateExlanation'
import { QStemModel } from '../../db/qstem'
import { Post } from '../methods'

export const updateExplantion = Post<UpdateExplanationParams, UpdateExplanationResults>(
  async ({ qid, explanation }) => {
    const qStem = await QStemModel.findById(new Types.ObjectId(qid))

    if (qStem) {
      qStem.explanation = explanation
      await qStem.save()
      return {}
    } else {
      throw new Error('Question not found')
    }
  }
)
