import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserById } from "~/lib/user";
import { PrismaAdapter } from '@sidebase/authjs-prisma-adapter'
import { prisma } from "~/lib/prisma";

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: config.AuthSecret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: config.GoogleClientId,
      clientSecret: config.GoogleClientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session, user }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.stripeCustomerId = token.stripeCustomerId;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await getUserById(token.sub);

      if (!dbUser) return token;

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.stripeCustomerId = dbUser.stripeCustomerId;
      return token;
    },
  },
});
