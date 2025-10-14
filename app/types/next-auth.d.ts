import type { DefaultSession, DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      stripeCustomerId?: string | null
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    stripeCustomerId?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    stripeCustomerId?: string | null
  }
}
