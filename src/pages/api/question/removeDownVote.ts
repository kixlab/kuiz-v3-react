import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface RemoveDownVoteParams {
  oid: ID
  uid: ID
}

export interface RemoveDownVoteResults {}

export default apiController<RemoveDownVoteParams, RemoveDownVoteResults>(async ({ oid, uid }) => {
  await optionService.removeVote('disliked', new Types.ObjectId(oid), new Types.ObjectId(uid))

  return {}
})
