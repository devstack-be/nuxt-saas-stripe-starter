import { getServerSession } from "#auth";
import type { Session } from "next-auth";
import { prisma } from "~/lib/prisma";
import { stripe } from "~/lib/stripe";
import { SubscriptionPlan } from "~/types";

export default defineEventHandler(async (event) => {
  const { plans } = useAppConfig().subscriptions as {
    plans: SubscriptionPlan[];
  };
  const session = (await getServerSession(event)) as Session;
  if (!session.user || !session.user.email) {
    return {
      status: 403,
      body: { error: "Unauthorized" },
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User not found",
    });
  }

  // Check if user is on a paid plan.
  const isPaid =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
      ? true
      : false;

  // Find the pricing data corresponding to the user's plan
  const userPlan =
    plans.find((plan) => plan.stripeIds.monthly === user.stripePriceId) ||
    plans.find((plan) => plan.stripeIds.yearly === user.stripePriceId);

  const plan = isPaid && userPlan ? userPlan : plans[0];

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === user.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === user.stripePriceId
      ? "year"
      : null
    : null;

  let isCanceled = false;
  if (isPaid && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd
      ? user.stripeCurrentPeriodEnd.getTime()
      : undefined,
    isPaid,
    interval,
    isCanceled,
  };
});
