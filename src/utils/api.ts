import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import { Env } from './getEnv'

export function apiController<P, R>(handler: (params: P, token: JWT | null) => Promise<R>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        mongoose
          .connect(Env.DB_URL)
          .then(() => console.log('MongoDB connected.'))
          .catch(error => console.log(error))
      }

      const token = await getToken({ req, secret: Env.NEXTAUTH_SECRET })
      const reqBody = req.body as P
      const result = await handler(reqBody, token)
      res.status(200).send(result)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: (error as any).toString(), error })
    }
  }
}

export async function request<P, R>(url: string, params: P): Promise<R | null> {
  try {
    const res = await fetch(`/api/${url}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(params),
    })

    if (res.ok) {
      return res.json()
    }
    const { message } = await res.json()
    alert(message)
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}
