import { User } from '../../db/user'

export interface LoadUserInfoParams {
  cid: string
}

export interface LoadUserInfoResults {
  students: User[]
  success: boolean
}
