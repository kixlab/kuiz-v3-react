import { Request, Response, NextFunction } from 'express'
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'

export function logger() {
  return (req: Request, res: Response, next: NextFunction) => {
    const localTime = utcToZonedTime(Date.now(), 'Asia/Seoul')
    console.log(`${req.method}: ${req.path} @ ${format(localTime, 'yyyy-MM-dd HH:mm:ss')}`)
    next()
  }
}
