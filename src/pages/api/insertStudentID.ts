import { apiController } from '@utils/api'

export interface PutStudentIDParams {
  _id: string
  studentID: number
}

export interface PutStudentIDResults {
  res: boolean
}

export default apiController<PutStudentIDParams, PutStudentIDResults>(async ({ _id, studentID }, user) => {
  console.log(_id)
  if (user) {
    await user.updateOne({ $set: { studentID: studentID } })
    return { res: true }
  }
  throw new Error('User not found')
})
