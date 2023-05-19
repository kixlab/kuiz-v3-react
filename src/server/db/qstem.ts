import { model, models, Schema, Types } from 'mongoose'
import { Doc } from 'src/types/common'

export interface QStem extends Doc {
  author: Types.ObjectId
  stem_text: string
  keyword: string[]
  learningObjective: string
  material: string
  class: Types.ObjectId
  options: Types.ObjectId[]
  optionSets: Types.ObjectId[]
  explanation: string
  contributor: Types.ObjectId[]
  report: Types.ObjectId[]
  numberOfTopicSuggestionsChecked: number
  numberOfRephraseRequestsChecked: number
  numberOfGrammarChecks: number
}

const QstemSchema = new Schema<QStem>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    stem_text: {
      type: String,
      required: true,
    },
    keyword: {
      type: [String],
      default: [],
    },
    learningObjective: {
      type: String,
      default: '',
    },
    material: {
      type: String,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
    options: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Option',
        },
      ],
    },
    optionSets: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'OptionSet',
        },
      ],
    },
    explanation: {
      type: String,
      default: '',
    },
    contributor: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
    report: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Report',
        },
      ],
    },
    numberOfTopicSuggestionsChecked: {
      type: Number,
      default: 0,
    },
    numberOfRephraseRequestsChecked: {
      type: Number,
      default: 0,
    },
    numberOfGrammarChecks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export const QStemModel = models?.Qstem ?? model<QStem>('Qstem', QstemSchema)
