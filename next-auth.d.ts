import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /* Returned by `useAuth`, `getSession` and `getServerSession` */
  interface Session extends DefaultSession {
    user: {
      id: string
      stripeCustomerId?: string | null
    }
  }
}
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken` */
  interface JWT {
    stripeCustomerId?: string | null
  }
}
