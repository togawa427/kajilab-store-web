import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: '商店係',
      credentials: {
        id: {
          label: 'ID',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // credentials に入力が渡ってくる
        // id, password はここでベタ打ちして検証している
        const matched =
          credentials?.id === process.env.NEXTAUTH_ID && 
          credentials?.password === process.env.NEXTAUTH_PASSWORD
        if (matched) {
          // 今回は null を返さなければなんでもよいので適当
          return {
            id: '29472084752894723890248902',
          }
        } else {
          return null
        }
      },
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }