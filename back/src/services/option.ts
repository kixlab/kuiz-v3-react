import { Document, Types } from 'mongoose'
import { Option, OptionModel } from '../db/option'
import { QStemModel } from '../db/qstem'
import { UserModel } from '../db/user'

interface OptionData {
  uid: Types.ObjectId
  qid: Types.ObjectId
  cid: Types.ObjectId
  optionText: string
  isAnswer: boolean
  explanation?: string
  keywords?: string[]
}

class OptionService {
  async create({ uid, qid, cid, optionText, isAnswer, explanation = '', keywords = [] }: OptionData) {
    const option = new OptionModel({
      author: uid,
      class: cid,
      option_text: optionText,
      is_answer: isAnswer,
      explanation,
      qstem: qid,
      keyWords: keywords,
    })
    option.disjointSet = option.id
    await option.save()

    await UserModel.findByIdAndUpdate(uid, { $push: { madeOptions: option.id } })

    await QStemModel.findByIdAndUpdate(qid, {
      $push: { options: option.id },
      $addToSet: { keyword: { $each: keywords } },
    })

    return option
  }

  async getDisjointSets(qid: Types.ObjectId): Promise<[Option, Option[]][]> {
    const options = await OptionModel.find({ qstem: new Types.ObjectId(qid) })
    const disjointSets = new Map<Types.ObjectId, [Option, Option[]]>()

    for (const option of options) {
      const cluster = await this.findOption(option.id)
      if (!disjointSets.has(cluster.id)) {
        disjointSets.set(cluster.id, [cluster, []])
      }
      const [representative, members] = disjointSets.get(cluster.id)!
      const repScore = representative.liked.length - representative.disliked.length
      const optionScore = option.liked.length - option.disliked.length
      if (repScore < optionScore) {
        disjointSets.get(cluster.id)![0] = option
      }
      members.push(option)
    }

    return [...disjointSets.values()]
  }

  async findOption(oid: Types.ObjectId): Promise<Document<unknown, any, Option> & Option> {
    const option = await OptionModel.findById(oid)

    if (option) {
      if (option.disjointSet.equals(option._id)) {
        return option
      } else {
        const cluster = await this.findOption(option.disjointSet)
        option.disjointSet = cluster.id
        await option.save()
        return cluster
      }
    } else {
      throw new Error(`Option not found: ${oid}`)
    }
  }

  async unionOption(oid1: Types.ObjectId, oid2: Types.ObjectId): Promise<void> {
    const cluster1 = await this.findOption(oid1)
    const cluster2 = await this.findOption(oid2)

    if (cluster1.id < cluster2.id) {
      await OptionModel.findByIdAndUpdate(oid1, { cluster: cluster2 })
    } else if (cluster2.id < cluster1.id) {
      await OptionModel.findByIdAndUpdate(oid2, { cluster: cluster1 })
    }
  }

  async addVote(type: 'liked' | 'disliked', oid: Types.ObjectId, uid: Types.ObjectId): Promise<void> {
    const option = await OptionModel.findById(oid)

    if (option) {
      const i = option[type].findIndex(u => u.equals(uid._id))
      if (i < 0) {
        option[type].push(uid)
        await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { $set: { [type]: option[type] } })
      }
    } else {
      throw new Error('Option not found')
    }
  }

  async removeVote(type: 'liked' | 'disliked', oid: Types.ObjectId, uid: Types.ObjectId): Promise<void> {
    const option = await OptionModel.findById(oid)

    if (option) {
      const i = option[type].findIndex(u => u.equals(uid._id))
      if (0 <= i) {
        option[type].splice(i, 1)
        await OptionModel.findByIdAndUpdate(new Types.ObjectId(oid), { $set: { [type]: option[type] } })
      }
    } else {
      throw new Error('Option not found')
    }
  }
}

export const optionService = new OptionService()
