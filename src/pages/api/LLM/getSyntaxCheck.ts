import { QStem, QStemModel } from '@server/db/qstem'
import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { CONSISTENCY_CHECK_PROMPT } from 'src/constants/consistencyCheckPrompt'
import { ID } from 'src/types/common'

export interface GetSyntaxCheckParams {
  qid: ID
  option: string
  otherOptions: string[]
}

export interface GetSyntaxCheckResults {
  syntaxChecked: string
}

export default apiController<GetSyntaxCheckParams, GetSyntaxCheckResults>(
  async ({ qid, option, otherOptions }, user) => {
    const qStem: QStem | null = await QStemModel.findById(new Types.ObjectId(qid))

    if (qStem) {
      const openAIResponse = await openAIService.complete({
        prompt: CONSISTENCY_CHECK_PROMPT(qStem.stem_text, qStem.explanation, option, otherOptions),
      })

      const syntaxChecked = openAIResponse.choices[0].message.content ?? ''

      await logService.add(user._id, 'getSyntaxCheck', qStem.class.id.toString(), {
        qid,
        option,
        otherOptions,
        syntaxChecked,
      })

      return {
        syntaxChecked,
      }
    } else {
      throw new Error('QStem not found')
    }
  }
)
