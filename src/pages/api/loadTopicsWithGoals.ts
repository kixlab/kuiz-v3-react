import { Class, ClassModel } from '@server/db/class'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface LoadTopicsWithGoalsParams {
  cid: ID
}

export interface LoadTopicsWithGoalsResults {
  topics: {
    topic: string
    optionsGoal: number
    questionsGoal: number
  }[]
}

export default apiController<LoadTopicsWithGoalsParams, LoadTopicsWithGoalsResults>(async ({ cid }) => {
  const targetClass: Class | null = await ClassModel.findById(new Types.ObjectId(cid))
  if (targetClass) {
    const topics = <
      {
        topic: string
        optionsGoal: number
        questionsGoal: number
      }[]
    >[]
    targetClass.topics.forEach((topicWithGoals: { topic: string; optionsGoal: number; questionsGoal: number }) => {
      topics.push(topicWithGoals)
    })
    return {
      topics,
    }
  }
  throw new Error('Class not found')
})
