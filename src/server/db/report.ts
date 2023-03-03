import { model, models, Schema, Types } from 'mongoose'
import { Doc } from 'src/types/common'

export interface Report extends Doc {
  uid: Types.ObjectId
  comment: string
}

const ReportSchema = new Schema<Report>({
  uid: {
    type: Schema.Types.ObjectId,
  },
  comment: {
    type: String,
  },
})
ReportSchema.static('createDoc', (args: Report) => {
  return new ReportModel(args)
})

export const ReportModel = models?.Report ?? model('Report', ReportSchema)
