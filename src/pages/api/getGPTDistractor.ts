import { apiController } from '@utils/api'
import { Env } from '@utils/getEnv'
import { Configuration, OpenAIApi } from 'openai'

export interface GetGPTDistractorsParams {
  qStem: string
  qLearningObjective: string
}

export interface GetGPTDistractorsResults {
  distractors: string[]
}

export default apiController<GetGPTDistractorsParams, GetGPTDistractorsResults>(
  async ({ qStem, qLearningObjective }) => {
    const promptQuestion = `Create 3 distractors separated by a comma for the following question ${qStem}; its learning objective is ${qLearningObjective}, reply only with the distractors.`

    const openAIKey = Env.OPEN_AI_KEY
    const openAI = new OpenAIApi(
      new Configuration({
        apiKey: openAIKey,
      })
    )
    const openAIResponse = await openAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: promptQuestion }],
    })
    const responseDistractors = openAIResponse.data.choices[0].message?.content
    const distractors = responseDistractors ? responseDistractors.split(', ') : []
    return {
      distractors: distractors,
    }
  }
)
