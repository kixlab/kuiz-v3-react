import { Types } from 'mongoose'
import { SolveQuestionParams, SolveQuestionResults } from '../../api/question/solveQuestion'
import { UserModel } from '../../db/user'
import { Post } from '../methods'

export const solveQuestion = Post<SolveQuestionParams, SolveQuestionResults>(
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
