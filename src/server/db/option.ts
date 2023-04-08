import { model, models, Schema, Types } from 'mongoose'
import { Doc } from 'src/types/common'

export interface Option extends Doc {
  author: Types.ObjectId
  option_text: string
  explanation: string
  is_answer: boolean
  class: Types.ObjectId
  qstem: Types.ObjectId
  suggesetions: {
    author: Types.ObjectId
    suggestion_text: string
    likes: number
  }[]
  includedSet: Types.ObjectId[]
  plausible: {
    similar: any[]
    difference: any[]
  }
  dependency: {
    same: any[]
    contradictory: any[]
  }
  disjointSet: Types.ObjectId
  liked: Types.ObjectId[]
  disliked: Types.ObjectId[]
  learningObjective: string
  keywords: string[]
}

const optionSchema = new Schema<Option>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  option_text: {
    type: String,
    required: true,
    trim: true,
  },
  explanation: {
    type: String,
    trim: true,
  },
  is_answer: {
    type: Boolean,
    required: true,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  qstem: {
    type: Schema.Types.ObjectId,
    ref: 'Qstem',
  },
  suggesetions: {
    type: [
      {
        author: {
          type: Schema.Types.ObjectId,
        },
        suggestion_text: {
          type: String,
        },
        likes: {
          type: Number,
        },
      },
    ],
    default: [],
  },
  includedSet: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OptionSet',
      },
    ],
    default: [],
  },
  plausible: {
    type: {
      similar: {
        type: [],
      },
      difference: {
        type: [],
      },
    },
    default: {
      similar: [],
      difference: [],
    },
  },
  dependency: {
    type: {
      same: {
        type: [],
      },
      contradictory: {
        type: [],
      },
    },
    default: {
      same: [],
      contradictory: [],
    },
  },
  disjointSet: { type: Schema.Types.ObjectId, ref: 'Option' },
  liked: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  disliked: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  learningObjective: {
    type: String,
    default: '',
  },
  keywords: {
    type: [String],
    default: [],
  },
})

export const OptionModel = models?.Option ?? model('Option', optionSchema)
