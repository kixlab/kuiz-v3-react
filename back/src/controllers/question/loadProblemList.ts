import { Types } from 'mongoose'
import { LoadProblemListParams, LoadProblemListResults } from '../../api/question/loadProblemList'
import { ClassModel } from '../../db/class'
import { QStemModel } from '../../db/qstem'
import { Get } from '../methods'

export const loadProblemList = Get<LoadProblemListParams, LoadProblemListResults>(async ({ cid }) => {
  const targetClass = await ClassModel.findById(new Types.ObjectId(cid))
  if (targetClass) {
    const qStems = await QStemModel.find({ _id: { $in: targetClass.qstems } })

    return {
      problemList: qStems,
    }
  }
  throw new Error('Class not found')
})
