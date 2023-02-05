import { Types } from 'mongoose'
import { RemoveUpVoteParams, RemoveUpVoteResults } from '../../api/question/removeUpVote'
import { optionService } from '../../services/option'
import { Post } from '../methods'

export const removeUpVote = Post<RemoveUpVoteParams, RemoveUpVoteResults>(async ({ oid, uid }) => {
  await optionService.removeVote('liked', new Types.ObjectId(oid), new Types.ObjectId(uid))

  return {}
})
