import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import mongoose from 'mongoose'
import { cors } from './middlewares/cors'
import { logger } from './middlewares/logger'
import rootRouter from './routes'
import { Env } from './utils/getEnv'
import fs from 'fs'
import https from 'https'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(Env.COOKIE_KEY))
app.use(logger())
// app.use(cookieChecker())

mongoose
  .connect(Env.DB_URL)
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))

app.use('/', rootRouter)

https
  .createServer(
    {
      key: fs.readFileSync(Env.SSL_KEY_FILE),
      cert: fs.readFileSync(Env.SSL_CRT_FILE),
    },
    app
  )
  .listen(Env.PORT, () => {
    console.log(`server is listening at localhost:${Env.PORT}`)
  })
