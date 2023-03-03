import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface RemoveUpVoteParams {
  oid: ID
}

export interface RemoveUpVoteResults {}

export default apiController<RemoveUpVoteParams, RemoveUpVoteResults>(async ({ oid }, user) => {
  await optionService.removeVote('liked', new Types.ObjectId(oid), new Types.ObjectId(user.id))

  return {}
})
