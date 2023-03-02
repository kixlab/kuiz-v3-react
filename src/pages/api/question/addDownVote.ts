import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface AddDownVoteParams {
  oid: ID
}

export interface AddDownVoteResults {}

export default apiController<AddDownVoteParams, AddDownVoteResults>(async ({ oid }, user) => {
  await optionService.addVote('disliked', new Types.ObjectId(oid), new Types.ObjectId(user.id))

  return {}
})
