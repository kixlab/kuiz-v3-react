import { model, Schema, Types } from 'mongoose'

export interface Report {
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

export const ReportModel = model('Report', ReportSchema)
