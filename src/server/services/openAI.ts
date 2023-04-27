import { Configuration, OpenAIApi } from 'openai'

interface OpenAIData {
  apiKey: string
  model: 'gpt-3.5-turbo' | 'gpt-4'
  role: 'user' | 'assistant' | 'system'
  content: string
}

class OpenAIService {
  async create({ apiKey, model, role, content }: OpenAIData) {
    const openAI = new OpenAIApi(
      new Configuration({
        apiKey,
      })
    )
    const openAIResponse = await openAI.createChatCompletion({
      model: model,
      messages: [{ role, content }],
    })

    return openAIResponse
  }
}

export const openAIService = new OpenAIService()
