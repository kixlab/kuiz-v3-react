import { QStem } from '@server/db/qstem'
import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadCreatedStemDataParams {
  uid: ID
}

export interface LoadCreatedStemDataResults {
  madeStem: QStem[]
}

export default apiController<LoadCreatedStemDataParams, LoadCreatedStemDataResults>(async ({ uid }) => {
  const user = await UserModel.findById(new Types.ObjectId(uid)).populate<{ made: QStem[] }>('made')

  if (user) {
    return {
      madeStem: user.made,
    }
  }
  throw new Error('User not found')
})
