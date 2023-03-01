import { UserModel } from '@server/db/user'
import { userService } from '@server/services/user'
import { Env } from '@utils/getEnv'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: Env.GOOGLE_CLIENT_ID,
      clientSecret: Env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async signIn({ user }) {
      const userInfo = await UserModel.findOne({ authId: user.id.toString() })
      if (!userInfo) {
        await userService.create(user.name ?? '', user.email ?? '', user.image ?? '', user.id.toString())
      }
      return true
    },
    async session({ session, token }) {
      const authId = token.sub?.toString()
      if (authId) {
        const userInfo = await UserModel.findOne({ authId })
        if (userInfo) {
          session.user.id = userInfo.id
        }
      }
      return session
    },
  },
})
