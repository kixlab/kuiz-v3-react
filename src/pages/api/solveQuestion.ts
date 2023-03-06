import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface SolveQuestionParams {
  initAns: string
  qid: ID
  optionSet: ID[]
  isCorrect: boolean
}

export interface SolveQuestionResults {
  success: boolean
}

export default apiController<SolveQuestionParams, SolveQuestionResults>(
  async ({ initAns, qid, optionSet, isCorrect }, user) => {
    const solved = {
      question: new Types.ObjectId(qid),
      history: {
        optionSet: optionSet.map(op => new Types.ObjectId(op)),
        initAns: new Types.ObjectId(initAns),
        isCorrect,
      },
    }

    await user.updateOne({ $push: { solved } })
    return {
      success: true,
    }
  }
)
