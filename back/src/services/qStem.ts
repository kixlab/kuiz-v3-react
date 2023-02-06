import { Types } from 'mongoose'
import { ClassModel } from '../db/class'
import { QStemModel } from '../db/qstem'
import { UserModel } from '../db/user'

interface QStemData {
  uid: string
  stem_text: string
  raw_string: string
  explanation: string
  action_verb?: string[]
  keyword?: string[]
  cid: string
  options?: string[]
  optionSets?: string[]
  learning_objective: string
}

class QStemService {
  async create({
    uid,
    stem_text,
    raw_string,
    explanation,
    action_verb = [],
    keyword = [],
    cid,
    options = [],
    optionSets = [],
    learning_objective,
  }: QStemData) {
    const qStem = new QStemModel({
      author: uid,
      stem_text,
      raw_string,
      explanation,
      action_verb,
      keyword,
      class: cid,
      options,
      optionSets,
      learning_objective,
    })
    await qStem.save()

    await ClassModel.updateOne({ _id: new Types.ObjectId(cid) }, { $push: { qstems: qStem.id } })

    await UserModel.findByIdAndUpdate(qStem.author, { $push: { made: qStem.id } })

    return qStem
  }
}

export const qStemService = new QStemService()
