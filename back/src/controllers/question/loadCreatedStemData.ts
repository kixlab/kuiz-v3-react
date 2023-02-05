import { Types } from 'mongoose'
import { loadCreatedStemDataParams, loadCreatedStemDataResults } from '../../api/question/loadCreatedStemData'
import { QStem } from '../../db/qstem'
import { UserModel } from '../../db/user'
import { Post } from '../methods'

export const loadCreatedStemData = Post<loadCreatedStemDataParams, loadCreatedStemDataResults>(async ({ uid }) => {
  const user = await UserModel.findById(new Types.ObjectId(uid)).populate<{ made: QStem[] }>('made')

  if (user) {
    return {
      madeStem: user.made,
    }
  }
  throw new Error('User not found')
})
