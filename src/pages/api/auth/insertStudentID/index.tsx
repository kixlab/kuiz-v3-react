import { UserModel } from '@server/db/user'
import { apiController } from '@utils/api'
import 'bson-objectid'

export interface PutStudentIDParams {
  _id: string
  studentID: number
}

export interface PutStudentIDResults {
  res: boolean
}

export default apiController<PutStudentIDParams, PutStudentIDResults>(async ({ _id, studentID }) => {
  const ObjectID = require('bson-objectid')
  const user = await UserModel.findOne({ _id: ObjectID(_id) })
  if (user) {
    const userInfo = await UserModel.updateOne(
      { _id: ObjectID(_id) },
      {
        $set: { studentID: studentID },
      }
    )
    return { res: true }
  }
  throw new Error('User not found')
})
