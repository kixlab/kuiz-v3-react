import { apiController } from '@utils/api'

export interface AllowDocumentationParams {
  allowDocumentation: boolean
}

export interface AllowDocumentationResults {
  res: boolean
}

export default apiController<AllowDocumentationParams, AllowDocumentationResults>(
  async ({ allowDocumentation }, user) => {
    if (user) {
      const updatedUser = await user.updateOne({ $set: { allowDocumentation: allowDocumentation } })
      if (updatedUser) {
        return {
          res: updatedUser.allowDocumentation,
        }
      } else {
        throw new Error('There was an error please login and try again')
      }
    }
    throw new Error('User not found')
  }
)
