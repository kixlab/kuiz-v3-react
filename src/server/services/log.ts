import { LogModel } from '@server/db/log'

class LogService {
  async add(user: string, action: string, cid: string, info?: any) {
    const log = new LogModel({ user, action, cid, info: JSON.stringify(info) })
    await log.save()

    return log
  }
}

export const logService = new LogService()
