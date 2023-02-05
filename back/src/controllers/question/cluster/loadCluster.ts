import { Types } from 'mongoose'
import { LoadClusterParams, LoadClusterResults } from '../../../api/question/cluster/loadCluster'
import { optionService } from '../../../services/option'
import { Get } from '../../methods'

export const loadCluster = Get<LoadClusterParams, LoadClusterResults>(async ({ qid }) => {
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
