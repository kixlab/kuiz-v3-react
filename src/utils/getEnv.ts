export const Env = {
  PORT: process.env.PORT ?? '',
  DB_URL: process.env.DB_URL ?? '',
  PRODUCTION: process.env.PRODUCTION === 'true',
  SSL_CRT_FILE: process.env.SSL_CRT_FILE ?? '',
  SSL_KEY_FILE: process.env.SSL_KEY_FILE ?? '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? '',
  OPEN_AI_KEY: process.env.OPEN_AI_KEY ?? '',
}
