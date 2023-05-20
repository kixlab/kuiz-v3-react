import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'

export interface GetGPTSyntaxCheckerParams {
  type: 'question' | 'question option'
  sentence: string
}

export interface GetGPTSyntaxCheckerResults {
  syntaxChecked: string | undefined
}

export default apiController<GetGPTSyntaxCheckerParams, GetGPTSyntaxCheckerResults>(async ({ type, sentence }) => {
  const promptQuestion = `Adjust the grammar and punctuation of the following ${type} "${sentence}"`

  const openAIResponse = await openAIService.create({
    model: 'gpt-3.5-turbo',
    role: 'user',
    content: promptQuestion,
  })

  const syntaxChecked = openAIResponse.data.choices[0].message?.content
  return {
    syntaxChecked: syntaxChecked,
  }
})
