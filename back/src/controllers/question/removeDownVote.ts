import { Types } from 'mongoose'
import { RemoveDownVoteParams, RemoveDownVoteResults } from '../../api/question/removeDownVote'
import {} from '../../api/question/removeUpVote'
import { optionService } from '../../services/option'
import { Post } from '../methods'

export const removeDownVote = Post<RemoveDownVoteParams, RemoveDownVoteResults>(async ({ oid, uid }) => {
  await optionService.removeVote('disliked', new Types.ObjectId(oid), new Types.ObjectId(uid))

  return {}
})
