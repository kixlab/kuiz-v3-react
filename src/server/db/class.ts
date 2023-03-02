import { model, models, Schema, Types } from 'mongoose'
import { Doc } from 'src/types/common'

export interface Class extends Doc {
  code: string
  students: Types.ObjectId[]
  qstems: Types.ObjectId[]
  classType: boolean
  topics: string[]
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
  classType: {
    type: Boolean,
  },
  topics: {
    type: [String],
    default: [],
  },
})

export const ClassModel = models?.Class ?? model('Class', ClassSchema)
