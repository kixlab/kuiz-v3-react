import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface AddUpVoteParams {
  oid: ID
  uid: ID
}

export interface AddUpVoteResults {}

export default apiController<AddUpVoteParams, AddUpVoteResults>(async ({ oid, uid }) => {
  await optionService.addVote('liked', new Types.ObjectId(oid), new Types.ObjectId(uid))

  return {}
})
