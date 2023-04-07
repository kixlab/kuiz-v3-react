import { model, models, Schema, Types } from 'mongoose'
import { Doc } from 'src/types/common'

export interface Class extends Doc {
  code: string
  students: Types.ObjectId[]
  qstems: Types.ObjectId[]
  topics: {
    topic: string
    optionsGoal: number
    questionsGoal: number
  }[]
  name: string
}

const ClassSchema = new Schema<Class>({
  code: {
    type: String,
    default: 'test101',
  },
  students: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  qstems: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Qstem',
      },
    ],
  },
  name: {
    type: String,
    default: '',
  },
  topics: {
    type: [
      {
        topic: String,
        optionsGoal: Number,
        questionsGoal: Number,
      },
    ],
    default: [],
  },
})

export const ClassModel = models?.Class ?? model('Class', ClassSchema)
