import { model, models, Schema, Types } from 'mongoose'
import { Doc } from 'src/types/common'

export interface Log extends Doc {
  user: Types.ObjectId
  action: string
  class: Types.ObjectId
  info: string
}

const LogSchema = new Schema<Log>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  action: {
    type: String,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  info: {
    type: String,
  },
})
LogSchema.static('createDoc', (args: Log) => {
  return new LogModel(args)
})

export const LogModel = models?.Log ?? model('Log', LogSchema)
