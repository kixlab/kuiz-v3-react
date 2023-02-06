import { LoadClassTopicsParams, LoadClassTopicsResults } from '../api/loadClassTopics'
import { ClassModel } from '../db/class'
import { Get } from './methods'

export const loadClassTopics = Get<LoadClassTopicsParams, LoadClassTopicsResults>(async ({ cid }) => {
  const targetClass = await ClassModel.findById(cid)

  if (targetClass) {
    return {
      topics: targetClass.topics,
    }
  }

  throw new Error('Invalid class ID')
})
