import { OptionModel } from '@server/db/option'
import { QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'
import { UserModel } from '@server/db/user'

export interface GetContributorsParams {
  qid: ID
}

export interface GetContributorsResults {
  userData: {
    name: string
    img?: string
  }[]
}

export default apiController<GetContributorsParams, GetContributorsResults>(async ({ qid }) => {
  const uids = new Set<string>()
  const qStem = await QStemModel.findById(new Types.ObjectId(qid))
  if (qStem) {
    uids.add(qStem.author.toString())
    const options = await OptionModel.find({ _id: { $in: qStem.options } })
    options.forEach(option => uids.add(option.author.toString()))
    const userData = <
      {
        name: string
        img?: string
      }[]
    >[]
    for (const uid of uids) {
      const userInfo = await UserModel.findById({ _id: uid })
      if (userInfo) {
        userData.push({
          name: userInfo.name,
          img: userInfo.imageUrl,
        })
      }
    }
    return { userData }
  }
  throw new Error('Question not found')
})
