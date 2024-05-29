import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'
import { GRAMMAR_CHECK_PROMPT } from 'src/constants/grammarCheckPrompt'
import { ID } from 'src/types/common'

export interface GetGrammarCheckParams {
  cid: ID
  sentence: string
}

export interface GetGrammarCheckResults {
  grammarChecked: string
}

export default apiController<GetGrammarCheckParams, GetGrammarCheckResults>(async ({ cid, sentence }, user) => {
  const openAIResponse = await openAIService.complete({
    prompt: GRAMMAR_CHECK_PROMPT(sentence),
  })

  const grammarChecked = openAIResponse.choices[0].message.content ?? ''

  await logService.add(user._id, 'getSyntaxCheck', cid, {
    sentence,
    grammarChecked,
  })

  return {
    grammarChecked,
  }
})
