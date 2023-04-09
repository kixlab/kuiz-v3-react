import { OptionModel } from '@server/db/option'
import { QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface LoadUserActivityParams {
  cid: ID
  topic?: string
}

export interface LoadUserActivityResults {
  numberOfStems: number
  numberOfOptions: number
}

export default apiController<LoadUserActivityParams, LoadUserActivityResults>(async ({ cid, topic = '' }, user) => {
  let qStemsNumber = 0
  let qOptionsNumber = 0

  const generatedQStems: string[] = []

  const qStems = await QStemModel.find({
    class: { $eq: cid },
    learningObjective: { $regex: topic, $options: 'i' },
    author: user.id,
  })

  if (qStems) {
    qStemsNumber = qStems.length
    qStems.forEach(qStem => {
      generatedQStems.push(qStem._id.toString())
    })
  }

  const qOptions = await OptionModel.find({
    class: { $eq: cid },
    learningObjective: { $regex: topic, $options: 'i' },
    author: user.id,
  })

  if (qOptions) {
    // const filteredOptions = qOptions.filter(option => !generatedQStems.includes(option.qstem.toString()))
    qOptionsNumber = qOptions.length
  }

  return {
    numberOfStems: qStemsNumber,
    numberOfOptions: qOptionsNumber,
  }
})
