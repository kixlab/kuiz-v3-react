import { AddKeyWordsParams, AddKeyWordsResults } from '../../api/question/addKeyWords'
import { OptionModel } from '../../db/option'
import { QStemModel } from '../../db/qstem'
import { Post } from '../methods'

export const addKeyWords = Post<AddKeyWordsParams, AddKeyWordsResults>(async ({ qid, oid, keyWords }) => {
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
