import { reportService } from '@server/services/report'
import { apiController } from '@utils/api'
import { Types } from 'mongoose'

export interface SubmitReportParams {
  comment: string
}

export interface SubmitReportResults {}

export default apiController<SubmitReportParams, SubmitReportResults>(async ({ comment }, user) => {
  await reportService.create(new Types.ObjectId(user.id), comment)
  return {}
})
