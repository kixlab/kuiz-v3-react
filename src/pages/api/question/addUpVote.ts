import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface AddUpVoteParams {
  oid: ID
}

export interface AddUpVoteResults {}

export default apiController<AddUpVoteParams, AddUpVoteResults>(async ({ oid }, user) => {
  await optionService.addVote('liked', new Types.ObjectId(oid), new Types.ObjectId(user.id))

  return {}
})
