import { Types } from 'mongoose'
import { ClassModel } from '../db/class'
import { QStemModel } from '../db/qstem'
import { UserModel } from '../db/user'

interface QStemData {
  uid: string
  stem_text: string
  explanation: string
  keyword?: string[]
  cid: string
  options?: string[]
  optionSets?: string[]
  learningObjective: string
  numberOfTopicSuggestionsChecked: number
  numberOfRephraseRequestsChecked: number
  numberOfQuestionGrammarChecks: number
}

class QStemService {
  async create({
    uid,
    stem_text,
    explanation,
    keyword = [],
    cid,
    options = [],
    optionSets = [],
    learningObjective,
    numberOfTopicSuggestionsChecked,
    numberOfRephraseRequestsChecked,
    numberOfQuestionGrammarChecks,
  }: QStemData) {
    const qStem = new QStemModel({
      author: uid,
      stem_text,
      explanation,
      keyword,
      class: cid,
      options,
      optionSets,
      learningObjective,
      numberOfTopicSuggestionsChecked,
      numberOfRephraseRequestsChecked,
      numberOfQuestionGrammarChecks,
    })
    await qStem.save()

    await ClassModel.updateOne({ _id: new Types.ObjectId(cid) }, { $push: { qstems: qStem.id } })

    await UserModel.findByIdAndUpdate(qStem.author, { $push: { made: qStem.id } })

    return qStem
  }
}

export const qStemService = new QStemService()
