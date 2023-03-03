import { UserModel } from '../db/user'

class UserService {
  async create(name: string, email: string, imageUrl: string, authId: string) {
    const user = new UserModel({ name, email, imageUrl, authId })
    await user.save()

    return user
  }
}

export const userService = new UserService()
