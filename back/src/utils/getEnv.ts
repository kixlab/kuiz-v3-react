import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const Env = {
  PORT: process.env.PORT ?? '',
  DB_URL: process.env.DB_URL ?? '',
  COOKIE_KEY: process.env.COOKIE_KEY ?? '',
  PRODUCTION: process.env.PRODUCTION === 'true',
  SSL_CRT_FILE: process.env.SSL_CRT_FILE ?? '',
  SSL_KEY_FILE: process.env.SSL_KEY_FILE ?? '',
}
