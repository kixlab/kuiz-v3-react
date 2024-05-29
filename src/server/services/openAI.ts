import { Env } from '@utils/getEnv'
import OpenAI from 'openai'
import { Chat } from 'openai/resources'

interface OpenAIData {
  prompt: string
  temperature?: number
  stop?: string
  maxTokens?: number
}

class OpenAIService {
  openAI = new OpenAI({
    apiKey: Env.OPEN_AI_KEY,
  })

  async complete({ prompt, maxTokens = 300, temperature = 1, stop = '---' }: OpenAIData) {
    const openAIResponse = await this.openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature,
      stop,
    })

    return openAIResponse
  }
}

export const openAIService = new OpenAIService()
