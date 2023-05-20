import { logService } from '@server/services/log'
import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'

export interface GetSyntaxCheckParams {
  type: 'question' | 'question option'
  sentence: string
  cid: string
}

export interface GetSyntaxCheckResults {
  syntaxChecked: string | undefined
}

export default apiController<GetSyntaxCheckParams, GetSyntaxCheckResults>(async ({ type, sentence, cid }, user) => {
  const promptQuestion = `Adjust the grammar and punctuation of the following ${type} "${sentence}"`

  const openAIResponse = await openAIService.create({
    model: 'gpt-3.5-turbo',
    role: 'user',
    content: promptQuestion,
  })

  const syntaxChecked = openAIResponse.data.choices[0].message?.content

  await logService.add(user._id, 'getSyntaxCheck', cid, {
    type,
    sentence,
    syntaxChecked,
  })

  return {
    syntaxChecked,
  }
})
