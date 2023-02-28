import { OptionModel } from '@server/db/option'
import { QStemModel } from '@server/db/qstem'
import { apiController } from '@utils/api'
import { ID } from 'src/types/common'

export interface AddKeyWordsParams {
  qid: ID
  oid: ID
  keyWords: string[]
}

export interface AddKeyWordsResults {}

export default apiController<AddKeyWordsParams, AddKeyWordsResults>(async ({ qid, oid, keyWords }) => {
  const qStem = await QStemModel.findById(qid)
  const option = await OptionModel.findById(oid)

  if (qStem && option) {
    for (const keyword of keyWords) {
      if (!qStem.keyword.includes(keyword)) {
        qStem.keyword.push(keyword)
      }
      if (!option.keyWords.includes(keyword)) {
        option.keyWords.push(keyword)
      }
    }
    await qStem.save()
    await option.save()
    return {}
  } else {
    throw new Error('Invalid qid or oid')
  }
})
