import { QStemModel } from '@server/db/qstem'
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
  const report = await reportService.create(new Types.ObjectId(user.id), new Types.ObjectId(qid), comment)
  console.log(report)
  if (report) {
    await QStemModel.updateOne({ _id: qid }, { $push: { report: report._id } })
  }
  return {}
})
