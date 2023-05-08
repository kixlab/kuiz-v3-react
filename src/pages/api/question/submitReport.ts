import { reportService } from '@server/services/report'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface SubmitReportParams {
  qid: ID
  comment: string
}

export interface SubmitReportResults {}

export default apiController<SubmitReportParams, SubmitReportResults>(async ({ qid, comment }, user) => {
  await reportService.create(new Types.ObjectId(user.id), new Types.ObjectId(qid), comment)
  return {}
})
