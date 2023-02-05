import { Types } from 'mongoose'
import { SubmitReportParams, SubmitReportResults } from '../../api/question/submitReport'
import { reportService } from '../../services/report'
import { Post } from '../methods'

export const submitReport = Post<SubmitReportParams, SubmitReportResults>(async ({ uid, comment }) => {
  await reportService.create(new Types.ObjectId(uid), comment)
  return {}
})
