import { RegisterParams, RegisterResults } from '../../api/auth/register'
import { UserModel } from '../../db/user'
import { userService } from '../../services/user'
import { Post } from '../methods'

export const register = Post<RegisterParams, RegisterResults>(async ({ name, email, image }, res) => {
  const user = await UserModel.findOne({ email })

  if (user) {
    res.cookie('uid', user.id, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    })
    return {
      new: user.classes.length === 0,
      user,
    }
  }

  const newUser = await userService.create(name, email, image)
  res.cookie('uid', newUser.id, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  })
  return {
    new: true,
    user: newUser,
  }
})
