import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { StatusCheckParams, StatusCheckResults } from '../api/statusCheck'
import { Get } from './methods'

const startTime = utcToZonedTime(Date.now(), 'Asia/Seoul')

export const statusCheck = Get<StatusCheckParams, StatusCheckResults>(async () => {
  return {
    success: true,
    startTime: format(startTime, 'yyyy-MM-dd HH:mm:ss'),
  }
})
