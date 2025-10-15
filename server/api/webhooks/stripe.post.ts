// Handle stripe webhook events
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'
import { prisma } from '~/lib/prisma'
import { sendSubscriptionEmail, sendCancellationEmail } from '~/lib/email'

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
      if (user && user.email && user.name) {
        try {
          // Get subscription details for email
          const priceData = await stripe.prices.retrieve(subscription.items.data[0].price.id)
          const productData = await stripe.products.retrieve(priceData.product as string)

          // Calculate next billing date
          const nextBillingDate = new Date(subscription.items.data[0].current_period_end * 1000)

          // Send subscription activation email
          await sendSubscriptionEmail({
            to: user.email,
            userName: user.name,
            userEmail: user.email,
            subscriptionName: productData.name || 'Subscription',
            subscriptionPrice: `$${(priceData.unit_amount || 0) / 100}`,
            billingCycle: priceData.recurring?.interval || 'month',
            nextBillingDate: nextBillingDate.toLocaleDateString(),
            baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
          })

          console.log('Subscription activation email sent to:', user.email)
        } catch (error) {
          console.error('Error sending subscription email:', error)
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

  if (stripeEvent.type === 'customer.subscription.updated') {
    const subscription = stripeEvent.data.object as Stripe.Subscription
    const previousAttributes = stripeEvent.data.previous_attributes

    // Helper function to check if subscription is scheduled for cancellation
    const isScheduledForCancellation = (sub: Stripe.Subscription) => {
      // Check for scheduled cancellation at a specific date
      const hasScheduledCancellation = !!sub.cancel_at

      // Check for cancellation at the end of the current period
      const willCancelAtPeriodEnd = sub.cancel_at_period_end

      return hasScheduledCancellation || willCancelAtPeriodEnd
    }

    // Check if this is a meaningful change that requires processing
    const hasSignificantChange = () => {
      if (!previousAttributes) return false

      // Check for important subscription changes
      const statusChanged = 'status' in previousAttributes
      const priceChanged = 'items' in previousAttributes
      const cancelationChanged = 'cancel_at_period_end' in previousAttributes || 'cancel_at' in previousAttributes
      const periodChanged = 'current_period_end' in previousAttributes

      return statusChanged || priceChanged || cancelationChanged || periodChanged
    }

    // Skip processing if no significant changes (e.g., only metadata/description updates)
    if (!hasSignificantChange()) {
      console.log('Skipping subscription update - no significant changes detected for:', subscription.id)
      return { status: 200 }
    }

    try {
      // Find user by subscription ID
      const user = await prisma.user.findFirst({
        where: {
          stripeSubscriptionId: subscription.id
        }
      })

      if (!user) {
        console.error('User not found for subscription:', subscription.id)
        return { status: 200 }
      }

      const firstItem = subscription.items.data[0]
      const currentPeriodEnd = new Date(firstItem.current_period_end * 1000)

      // Prepare update data
      const updateData: {
        stripePriceId: string
        stripeCurrentPeriodEnd: Date
      } = {
        stripePriceId: firstItem.price.id,
        stripeCurrentPeriodEnd: currentPeriodEnd
      }

      // Handle subscription cancellation using the improved logic
      const scheduledForCancellation = isScheduledForCancellation(subscription)
      if (subscription.status === 'canceled' || scheduledForCancellation) {
        // If canceled, we might want to clear the subscription data or set a flag
        // For now, we'll keep the data until the period ends
        if (subscription.cancel_at) {
          const cancelDate = new Date(subscription.cancel_at * 1000)
          console.log('Subscription scheduled for cancellation on:', cancelDate, 'for user:', user.id)
        } else if (subscription.cancel_at_period_end) {
          console.log('Subscription will cancel at period end for user:', user.id)
        } else {
          console.log('Subscription canceled for user:', user.id)
        }
      }

      // Handle subscription status changes (active, past_due, unpaid, etc.)
      if (subscription.status === 'past_due' || subscription.status === 'unpaid') {
        console.log('Subscription payment issue for user:', user.id, 'Status:', subscription.status)
      }

      // Update user subscription details
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: updateData
      })

      // Log the subscription update
      console.log('Subscription updated for user:', user.id, {
        status: subscription.status,
        priceId: firstItem.price.id,
        periodEnd: currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
        scheduledForCancellation: scheduledForCancellation,
        changedAttributes: previousAttributes ? Object.keys(previousAttributes) : []
      })

      // Send email notification only for significant changes
      if (user.email && previousAttributes) {
        try {
          // Check if cancellation status just changed (avoid duplicate emails)
          const wasCancelledBefore = previousAttributes.cancel_at_period_end === true || !!previousAttributes.cancel_at
          const isCancelledNow = scheduledForCancellation

          // Only send cancellation email if cancellation status just changed from false to true
          if (isCancelledNow && !wasCancelledBefore && user.name) {
            try {
              const priceData = await stripe.prices.retrieve(firstItem.price.id)
              const productData = await stripe.products.retrieve(priceData.product as string)

              let cancelDate: string
              if (subscription.cancel_at) {
                cancelDate = new Date(subscription.cancel_at * 1000).toLocaleDateString()
              } else if (subscription.cancel_at_period_end) {
                cancelDate = new Date(firstItem.current_period_end * 1000).toLocaleDateString()
              } else {
                cancelDate = 'immediately'
              }

              await sendCancellationEmail({
                to: user.email,
                userName: user.name,
                userEmail: user.email,
                subscriptionName: productData.name || 'Subscription',
                cancelDate,
                baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
              })

              console.log('Cancellation email sent to:', user.email)
            } catch (emailError) {
              console.error('Error sending cancellation email:', emailError)
            }
          } else if (!isCancelledNow && wasCancelledBefore && subscription.status === 'active') {
            // Check if cancellation was reversed (was cancelled before, now active)
            console.log('Subscription cancellation reversed for user:', user.email)
            // TODO: Create and send cancellation reversal email template
          } else if (subscription.status === 'active' && previousAttributes.status && previousAttributes.status !== 'active') {
            // Check for subscription reactivation (status changed from inactive to active)
            console.log('Subscription reactivated for user:', user.email)
            // TODO: Create and send reactivation email template
          } else if (previousAttributes.items && previousAttributes.items.data) {
            // Check for plan changes (price changed)
            const previousPriceId = previousAttributes.items.data[0]?.price?.id
            const currentPriceId = firstItem.price.id
            if (previousPriceId && previousPriceId !== currentPriceId && user.name) {
              try {
                // Get new subscription details for plan change email
                const priceData = await stripe.prices.retrieve(currentPriceId)
                const productData = await stripe.products.retrieve(priceData.product as string)
                const nextBillingDate = new Date(firstItem.current_period_end * 1000)

                // Send updated subscription email
                await sendSubscriptionEmail({
                  to: user.email,
                  userName: user.name,
                  userEmail: user.email,
                  subscriptionName: productData.name ? `${productData.name} (Updated Plan)` : 'Updated Subscription',
                  subscriptionPrice: `$${(priceData.unit_amount || 0) / 100}`,
                  billingCycle: priceData.recurring?.interval || 'month',
                  nextBillingDate: nextBillingDate.toLocaleDateString(),
                  baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
                })

                console.log('Plan change confirmation email sent to:', user.email)
              } catch (emailError) {
                console.error('Error sending plan change email:', emailError)
              }
            }
          }
        } catch (error) {
          console.error('Error sending email notification:', error)
        }
      }
    } catch (error) {
      console.error('Error handling subscription update:', error)
    }
  }

  return {
    status: 200
  }
})
