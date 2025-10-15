import { getServerSession } from '#auth'
import type { Session } from 'next-auth'
import type Stripe from 'stripe'
import { prisma } from '~/lib/prisma'
import { stripe } from '~/lib/stripe'
import type { SubscriptionPlan } from '~/types'

export default defineEventHandler(async (event) => {
  let plans: SubscriptionPlan[]
  try {
    const pricingContent = await queryCollection(event, 'pricing').first()
    plans = pricingContent?.plans

    if (!plans || plans.length === 0) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Pricing plans not found'
      })
    }
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load pricing plans'
    })
  }
  const session = (await getServerSession(event)) as Session
  if (!session.user || !session.user.email) {
    return {
      status: 403,
      body: { error: 'Unauthorized' }
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true
    }
  })

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found'
    })
  }

  // Check if user is on a paid plan.
  const isPaid
    = user.stripePriceId
      && user.stripeCurrentPeriodEnd
      && user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
      ? true
      : false

  // Find the pricing data corresponding to the user's plan
  const userPlan
    = plans.find(plan => plan.stripeIds && plan.stripeIds.monthly === user.stripePriceId)
      || plans.find(plan => plan.stripeIds && plan.stripeIds.yearly === user.stripePriceId)

  const plan = isPaid && userPlan ? userPlan : plans[0]

  const interval = isPaid
    ? userPlan?.stripeIds && userPlan.stripeIds.monthly === user.stripePriceId
      ? 'month'
      : userPlan?.stripeIds && userPlan.stripeIds.yearly === user.stripePriceId
        ? 'year'
        : null
    : null

  let isCanceled = false
  if (isPaid && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    )
    isCanceled = isScheduledForCancellation(stripePlan)
  }

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd
      ? user.stripeCurrentPeriodEnd.getTime()
      : undefined,
    isPaid,
    interval,
    isCanceled
  }
})

const isScheduledForCancellation = (sub: Stripe.Subscription) => {
  // Check for scheduled cancellation at a specific date
  const hasScheduledCancellation = !!sub.cancel_at

  // Check for cancellation at the end of the current period
  const willCancelAtPeriodEnd = sub.cancel_at_period_end

  return hasScheduledCancellation || willCancelAtPeriodEnd
}
