import { NextFunction, Request, Response } from 'express'

export function cookieChecker() {
  return (req: Request, res: Response, next: NextFunction) => {
    const uid = req.signedCookies['uid'] as string
    if (['/', '/auth/register'].some(p => p === req.path)) {
      next()
    } else if (uid !== undefined) {
      res.cookie('uid', uid, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      next()
    } else {
      res.status(401).send()
    }
  }
}
