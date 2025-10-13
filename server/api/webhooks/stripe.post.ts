// Handle stripe webhook events
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'
import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const sig = getHeader(event, 'stripe-signature')
  const body = await readRawBody(event)
  const webhookSecret = runtimeConfig.StripeWebhookSecret
  if (!webhookSecret || !sig || !body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid signature, body or secret'
    })
  }

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      webhookSecret
    )
  } catch (err: unknown) {
    throw createError({
      statusCode: 400,
      statusMessage: `Webhook Error: ${(err as Error)?.message || 'Unknown error'}`
    })
  }
  if (stripeEvent.type === 'checkout.session.completed') {
    const stripeSession = stripeEvent.data.object as Stripe.Checkout.Session
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    try {
      const firstItem = subscription.items.data[0]
      const currentPeriodEnd = new Date(firstItem.current_period_end * 1000)
      const user = await prisma.user.update({
        where: {
          id: stripeSession?.metadata?.userId
        },
        data: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: currentPeriodEnd
        }
      })
      if (user && user.email) {
        try {
          console.log('TODO: Send email to user', user.email)
        } catch (error) {
          console.error(error)
        }
      }
    } catch (error) {
      // It's a webhook endpoint, so we don't want to return an error. log it
      console.error(error)
    }
  }

  if (stripeEvent.type === 'invoice.payment_succeeded') {
    const stripeInvoice = stripeEvent.data.object as Stripe.Invoice
    // Retrieve the subscription details from Stripe.
    const subscriptionId = stripeInvoice.parent?.subscription_details?.subscription
    if (!subscriptionId) {
      return { status: 200 }
    }
    const subscription = await stripe.subscriptions.retrieve(
      subscriptionId as string
    )
    try {
      // Update the price id and set the new period end.
      const firstItem = subscription.items.data[0]
      const currentPeriodEnd = new Date(firstItem.current_period_end * 1000)
      await prisma.user.update({
        where: {
          stripeSubscriptionId: subscription.id
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: currentPeriodEnd
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  return {
    status: 200
  }
})
