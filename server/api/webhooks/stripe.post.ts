//Handle stripe webhook events
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const sig = getHeader(event, "stripe-signature");
  const body = await readRawBody(event);
  const webhookSecret = runtimeConfig.StripeWebhookSecret;
  if (!webhookSecret || !sig || !body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid signature, body or secret",
    });
  }

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      webhookSecret
    );
  } catch (err: any) {
    throw createError({
      statusCode: 400,
      statusMessage: `Webhook Error: ${err.message}`,
    });
  }
  const stripeSession = stripeEvent.data.object as Stripe.Checkout.Session;
  if (stripeEvent.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    try {
      const user = await prisma.user.update({
        where: {
          id: stripeSession?.metadata?.userId,
        },
        data: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
      if (user && user.email) {
        try {
          console.log("TODO: Send email to user", user.email);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      //It's a webhook endpoint, so we don't want to return an error. log it
      console.error(error);
    }
  }

  if (stripeEvent.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    );
    try {
      // Update the price id and set the new period end.
      const user = await prisma.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  return {
    status: 200,
  };
});
