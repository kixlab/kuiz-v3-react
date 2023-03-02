import { optionService } from '@server/services/option'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'
import { Option } from '@server/db/option'

export interface LoadClusterParams {
  qid: ID
}

export interface LoadClusterResults {
  cluster: { representative: Option; options: Option[] }[]
}

export default apiController<LoadClusterParams, LoadClusterResults>(async ({ qid }) => {
  const cluster = await optionService.getDisjointSets(new Types.ObjectId(qid))

  return {
    cluster: cluster.map(c => {
      const [representative, options] = c
      return {
        representative,
        options,
      }
    }),
  }
})
