import { ClassModel } from '@server/db/class'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface LoadClassTopicsParams {
  cid: ID
}

export interface LoadClassTopicsResults {
  topics: string[]
}

export default apiController<LoadClassTopicsParams, LoadClassTopicsResults>(async ({ cid }) => {
  const targetClass = await ClassModel.findById(cid)

  if (targetClass) {
    return {
      topics: targetClass.topics,
    }
  }

  throw new Error('Invalid class ID')
})
