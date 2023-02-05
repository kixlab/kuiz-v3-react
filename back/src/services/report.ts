import { Types } from 'mongoose'
import { ReportModel } from '../db/report'

class ReportService {
  async create(uid: Types.ObjectId, comment: string) {
    const report = new ReportModel({
      uid,
      comment,
    })
    await report.save()

    return report
  }
}

export const reportService = new ReportService()
