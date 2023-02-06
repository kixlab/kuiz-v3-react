import { Schema, model, Types } from 'mongoose'

export interface OptionSet {
  options: Types.ObjectId[]
  qstem: Types.ObjectId
  class: Types.ObjectId
  answer: Types.ObjectId
}

const OptionSetSchema = new Schema<OptionSet>({
  options: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Option',
      },
    ],
  },
  qstem: {
    type: Schema.Types.ObjectId,
    ref: 'Qstem',
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
  },
})

export const OptionSetModel = model<OptionSet>('OptionSet', OptionSetSchema)
