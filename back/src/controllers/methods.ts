import { Request, Response } from 'express'

interface ErrorResults {
  msg: string
}

export function Get<Req, Res>(handler: (params: Req, resFunc: Response) => Promise<Res>) {
  return async (req: Request<Req>, res: Response<Res | ErrorResults>) => {
    try {
      const reqQuery = req.query as unknown as Req
      const result = await handler(reqQuery, res)
      res.status(200).send(result)
    } catch (err: any) {
      console.error(err)
      res.status(500).send({
        msg: err.message,
      })
    }
  }
}

export function Post<Req, Res>(handler: (params: Req, resFunc: Response) => Promise<Res>) {
  return async (req: Request, res: Response<Res | ErrorResults>) => {
    try {
      const reqBody = req.body as Req
      const result = await handler(reqBody, res)
      res.status(200).send(result)
    } catch (err: any) {
      console.error(err)
      res.status(500).send({
        msg: err.message,
      })
    }
  }
}
