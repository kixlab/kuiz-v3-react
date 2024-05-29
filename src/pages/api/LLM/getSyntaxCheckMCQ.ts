import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { CONSISTENCY_CHECK_PROMPT } from 'src/constants/consistencyCheckPrompt'
import { ID } from 'src/types/common'

export interface GetSyntaxCheckMCQParams {
  cid: ID
  stem: string
  explanation: string
  option: string
  otherOptions: string[]
}

export interface GetSyntaxCheckMCQResults {
  syntaxChecked: string
}

export default apiController<GetSyntaxCheckMCQParams, GetSyntaxCheckMCQResults>(
  async ({ stem, explanation, cid, option, otherOptions }, user) => {
    const openAIResponse = await openAIService.complete({
      prompt: CONSISTENCY_CHECK_PROMPT(stem, explanation, option, otherOptions),
    })

    const syntaxChecked = openAIResponse.choices[0].message.content ?? ''

    await logService.add(user._id, 'getSyntaxCheck', cid, {
      option,
      otherOptions,
      syntaxChecked,
    })

    return {
      syntaxChecked,
    }
  }
)
