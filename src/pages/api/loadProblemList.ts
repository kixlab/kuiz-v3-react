import { ClassModel } from '@server/db/class'
import { QStem, QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadProblemListParams {
  cid: ID
}

export interface LoadProblemListResults {
  problemList: QStem[]
}

export default apiController<LoadProblemListParams, LoadProblemListResults>(async ({ cid }) => {
  const targetClass = await ClassModel.findById(new Types.ObjectId(cid))
  if (targetClass) {
    const qStems = await QStemModel.find({ _id: { $in: targetClass.qstems } })

    return {
      problemList: qStems,
    }
  }
  throw new Error('Class not found')
})
