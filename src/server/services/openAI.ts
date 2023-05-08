import { Env } from '@utils/getEnv'
import { Configuration, OpenAIApi } from 'openai'

interface OpenAIData {
  model: 'gpt-3.5-turbo' | 'gpt-4'
  role: 'user' | 'assistant' | 'system'
  content: string
}

class OpenAIService {
  private apiKey: string
  private openAI: OpenAIApi

  constructor() {
    this.apiKey = Env.OPEN_AI_KEY
    this.openAI = new OpenAIApi(
      new Configuration({
        apiKey: this.apiKey,
      })
    )
  }

  async create({ model, role, content }: OpenAIData) {
    const openAIResponse = await this.openAI.createChatCompletion({
      model: model,
      messages: [{ role, content }],
    })

    return openAIResponse
  }
}

export const openAIService = new OpenAIService()
