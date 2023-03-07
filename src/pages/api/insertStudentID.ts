import { apiController } from '@utils/api'

export interface PutStudentIDParams {
  studentID: number
}

export interface PutStudentIDResults {
  res: boolean
}

export default apiController<PutStudentIDParams, PutStudentIDResults>(async ({ studentID }, user) => {
  if (user) {
    await user.updateOne({ $set: { studentID: studentID } })
    return { res: true }
  }
  throw new Error('User not found')
})
