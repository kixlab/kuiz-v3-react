import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface AddDownVoteParams {
  oid: ID
  uid: ID
}

export interface AddDownVoteResults {}

export default apiController<AddDownVoteParams, AddDownVoteResults>(async ({ oid, uid }) => {
  await optionService.addVote('disliked', new Types.ObjectId(oid), new Types.ObjectId(uid))

  return {}
})
