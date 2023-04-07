import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'

export interface GetContributorsParams {
  uids: string[]
}

export interface GetContributorsResults {
  userData: {
    name: string
    img?: string
  }[]
}

export default apiController<GetContributorsParams, GetContributorsResults>(async ({ uids }) => {
  const userData = <
    {
      name: string
      img?: string
    }[]
  >[]
  for (const uid of uids) {
    const userInfo = await UserModel.findById({ _id: uid.toString() })
    if (userInfo) {
      userData.push({
        name: userInfo.name,
        img: userInfo.imageUrl,
      })
    }
  }
  return { userData }
})
