import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface SolveQuestionParams {
  uid: ID
  initAns: string
  qid: ID
  optionSet: ID[]
  isCorrect: boolean
}

export interface SolveQuestionResults {
  success: boolean
}

export default apiController<SolveQuestionParams, SolveQuestionResults>(
  async ({ uid, initAns, qid, optionSet, isCorrect }) => {
    const solved = {
      question: new Types.ObjectId(qid),
      history: {
        optionSet: optionSet.map(op => new Types.ObjectId(op)),
        initAns: new Types.ObjectId(initAns),
        isCorrect,
      },
    }

    await UserModel.findByIdAndUpdate(uid, { $push: { solved } })
    return {
      success: true,
    }
  }
)
