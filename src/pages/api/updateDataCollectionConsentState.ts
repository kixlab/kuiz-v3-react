import { apiController } from '@utils/api'

export interface UpdateDataCollectionConsentStateParams {
  dataCollectionConsentState: boolean
}

export interface UpdateDataCollectionConsentStateResults {
  res: boolean
}

export default apiController<UpdateDataCollectionConsentStateParams, UpdateDataCollectionConsentStateResults>(
  async ({ dataCollectionConsentState }, user) => {
    if (user) {
      const updatedUser = await user.updateOne({ $set: { allowDocumentation: dataCollectionConsentState } })
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
