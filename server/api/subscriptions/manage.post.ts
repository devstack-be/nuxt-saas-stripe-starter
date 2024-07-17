import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "~/utils/url";
import { getServerSession } from "#auth";
import type { Session } from "next-auth";
import { prisma } from "~/lib/prisma";
// Route is auto protected by the `auth` middleware (server/middleware/auth.ts) and Session is guaranteed to be present
export default defineEventHandler(async (event) => {
  const session = (await getServerSession(event)) as Session;
  if (!session.user || !session.user.email) {
    return {
      status: 403,
      body: { error: "Unauthorized" },
    };
  }

  if (!session.user.stripeCustomerId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid signature, body or secret",
    });
  }
  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: session.user.stripeCustomerId,
    return_url: absoluteUrl("/dashboard/billing"),
  });

  const redirectUrl = stripeSession.url as string;
  return {
    redirectUrl: redirectUrl,
  };
});
