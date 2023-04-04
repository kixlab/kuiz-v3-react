import { Topic, TopicModel } from '@server/db/topic'
import { ClassModel } from '@server/db/class'

class TopicService {
  async create(label: string, requiredOptionNumber: number, requiredQuestionNumber: number, cid: string) {
    const topic = new TopicModel({ label, requiredOptionNumber, requiredQuestionNumber, class: cid })
    await ClassModel.findByIdAndUpdate(cid, { $push: { topics: topic.id } })

    await topic.save()

    return topic
  }

  async delete(tid: string) {
    const topic: Topic | null = await TopicModel.findById(tid)
    if (topic) {
      await TopicModel.findByIdAndDelete(tid)
      console.log(topic.class, tid)
      await ClassModel.findByIdAndUpdate(topic.class, { $pull: { topics: tid } })
    } else {
      throw new Error('Topic not found')
    }
  }
}

export const topicService = new TopicService()
