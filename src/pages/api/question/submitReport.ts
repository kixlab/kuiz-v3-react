import { reportService } from '@server/services/report'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'
import { ID } from 'src/types/common'

export interface SubmitReportParams {
  uid: ID
  comment: string
}

export interface SubmitReportResults {}

export default apiController<SubmitReportParams, SubmitReportResults>(async ({ uid, comment }) => {
  await reportService.create(new Types.ObjectId(uid), comment)
  return {}
})
