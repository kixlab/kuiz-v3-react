import { openAIService } from '@server/services/openAI'
import { apiController } from '@utils/api'

export interface GetGPTSyntaxCheckerParams {
  question: string
}

export interface GetGPTSyntaxCheckerResults {
  syntaxCheckedQuestion: string | undefined
}

export default apiController<GetGPTSyntaxCheckerParams, GetGPTSyntaxCheckerResults>(async ({ question }) => {
  const promptQuestion = `Adjust the grammar and punctuation of the following question "${question}"`

  const openAIResponse = await openAIService.create({
    model: 'gpt-3.5-turbo',
    role: 'user',
    content: promptQuestion,
  })

  const syntaxCheckedQuestion = openAIResponse.data.choices[0].message?.content
  return {
    syntaxCheckedQuestion: syntaxCheckedQuestion,
  }
})
