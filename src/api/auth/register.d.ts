import { User } from '../../db/user'

export interface RegisterParams {
  name: string
  email: string
  image: string
}

export interface RegisterResults {
  new: boolean
  user: User
}
