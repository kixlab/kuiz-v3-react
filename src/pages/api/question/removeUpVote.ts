import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface RemoveUpVoteParams {
  oid: ID
  uid: ID
}

export interface RemoveUpVoteResults {}

export default apiController<RemoveUpVoteParams, RemoveUpVoteResults>(async ({ oid, uid }) => {
  await optionService.removeVote('liked', new Types.ObjectId(oid), new Types.ObjectId(uid))

  return {}
})
