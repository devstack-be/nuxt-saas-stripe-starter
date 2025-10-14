import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import { getUserById } from '~/lib/user'
import { PrismaAdapter } from '@sidebase/authjs-prisma-adapter'
import { prisma } from '~/lib/prisma'
import { sendWelcomeEmail } from '~/lib/email'

const config = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: config.AuthSecret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: config.GoogleClientId,
      clientSecret: config.GoogleClientSecret
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user }) {
      // Vérifier si c'est un nouvel utilisateur en cherchant dans la DB
      if (user.email && user.name) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          })

          // Si l'utilisateur n'existe pas encore, c'est un nouveau utilisateur
          if (!existingUser) {
            console.log('Nouveau utilisateur détecté, envoi email de bienvenue à:', user.email)
            await sendWelcomeEmail({
              to: user.email,
              userName: user.name,
              userEmail: user.email
            })
            console.log('Email de bienvenue envoyé avec succès')
          }
        } catch (error) {
          console.error('Erreur lors de la vérification/envoi email:', error)
        }
      }
      return true
    },

    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          // @ts-expect-error - Extending session user type
          session.user.id = token.sub
        }
        session.user.name = token.name
        session.user.image = token.picture
        // @ts-expect-error - Extending session user type
        session.user.stripeCustomerId = token.stripeCustomerId

        if (token.email) {
          session.user.email = token.email
        }
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const dbUser = await getUserById(token.sub)

      if (!dbUser) return token

      token.name = dbUser.name
      token.email = dbUser.email
      token.picture = dbUser.image
      token.stripeCustomerId = dbUser.stripeCustomerId
      return token
    }
  }
})
