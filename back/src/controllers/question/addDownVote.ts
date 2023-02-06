import { Types } from 'mongoose'
import { AddDownVoteParams, AddDownVoteResults } from '../../api/question/addDownVote'
import { optionService } from '../../services/option'
import { Post } from '../methods'

export const addDownVote = Post<AddDownVoteParams, AddDownVoteResults>(async ({ oid, uid }) => {
  await optionService.addVote('disliked', new Types.ObjectId(oid), new Types.ObjectId(uid))

  return {}
})
