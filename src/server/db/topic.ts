import { model, models, Schema, Types } from 'mongoose'
import { Doc } from 'src/types/common'

export interface Topic extends Doc {
  label: string
  requiredOptionNumber: number
  requiredQuestionNumber: number
  class: Types.ObjectId
}

const TopicSchema = new Schema<Topic>({
  label: {
    type: String,
  },
  requiredOptionNumber: {
    type: Number,
  },
  requiredQuestionNumber: {
    type: Number,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
})
TopicSchema.static('createDoc', (args: Topic) => {
  return new TopicModel(args)
})

export const TopicModel = models?.Topic ?? model('Topic', TopicSchema)
