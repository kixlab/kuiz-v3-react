import { apiController } from '@utils/api'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export interface StatusCheckParams {}

export interface StatusCheckResults {
  success: boolean
  startTime: string
}

const startTime = utcToZonedTime(Date.now(), 'Asia/Seoul')

export default apiController<StatusCheckParams, StatusCheckResults>(async () => {
  return {
    success: true,
    startTime: format(startTime, 'yyyy-MM-dd HH:mm:ss'),
  }
})
