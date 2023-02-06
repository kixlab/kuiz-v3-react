import { Types } from 'mongoose'
import { AddUpVoteParams, AddUpVoteResults } from '../../api/question/addUpVote'
import { optionService } from '../../services/option'
import { Post } from '../methods'

export const addUpVote = Post<AddUpVoteParams, AddUpVoteResults>(async ({ oid, uid }) => {
  await optionService.addVote('liked', new Types.ObjectId(oid), new Types.ObjectId(uid))

  return {}
})
