import { ClassModel } from '@server/db/class'
import { apiController } from '@utils/api'

export interface JoinClassParams {
  code: string
}

export interface JoinClassResults {
  cid: string
  name: string
}

export default apiController<JoinClassParams, JoinClassResults>(async ({ code }, user) => {
  const classToJoin = await ClassModel.findOne({ code })

  if (classToJoin) {
    const classInfo = await ClassModel.findOneAndUpdate({ code }, { $push: { students: user.id } })
    await user.updateOne({ $push: { classes: classToJoin.id } })

    return {
      cid: classToJoin.id.toString(),
      name: classInfo.name,
    }
  }

  throw new Error('Class not found')
})
