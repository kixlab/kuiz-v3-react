import { Env } from '@utils/getEnv'
import { Configuration, OpenAIApi } from 'openai'

interface OpenAIData {
  model?: 'text-davinci-003'
  prompt: string
  temperature?: number
  stop?: string
  maxTokens?: number
}

class OpenAIService {
  private apiKey = Env.OPEN_AI_KEY
  private openAI = new OpenAIApi(
    new Configuration({
      apiKey: this.apiKey,
    })
  )

  async complete({ prompt, maxTokens = 300, temperature = 1, model = 'text-davinci-003', stop = '---' }: OpenAIData) {
    const openAIResponse = await this.openAI.createCompletion({
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
      stop,
    })

    return openAIResponse
  }
}

export const openAIService = new OpenAIService()
