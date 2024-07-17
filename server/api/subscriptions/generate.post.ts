import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "~/utils/url";
import { getServerSession } from "#auth";
import type { Session } from "next-auth";
// Route is auto protected by the `auth` middleware (server/middleware/auth.ts) and Session is guaranteed to be present
export default defineEventHandler(async (event) => {
  const session = (await getServerSession(event)) as Session;
  if (!session.user || !session.user.email) {
    return {
      status: 403,
      body: { error: "Unauthorized" },
    };
  }

  const body = (await readBody(event)) as { priceId: string };

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: absoluteUrl("/dashboard?webhookCallback=true"),
    cancel_url: absoluteUrl("/pricing"),
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: session.user.email,
    line_items: [
      {
        price: body.priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
    },
  });

  const redirectUrl = stripeSession.url as string;
  return {
    redirectUrl: redirectUrl,
  };
});
