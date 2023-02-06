import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const Env = {
  PORT: process.env.PORT ?? '',
  DB_URL: process.env.DB_URL ?? '',
  COOKIE_KEY: process.env.COOKIE_KEY ?? '',
}
