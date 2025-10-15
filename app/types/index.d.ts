import type { User } from '@prisma/client'

export type UserSubscriptionPlan = SubscriptionPlan
  & Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId' | 'stripePriceId'> & {
    stripeCurrentPeriodEnd?: number
    isPaid: boolean
    interval: 'month' | 'year' | null
    isCanceled?: boolean
  }

export type Frenquency = {
  value: 'monthly' | 'yearly'
  label: string
  default?: boolean
}
export type SubscriptionPlan = {
  mostPopular?: boolean
  title: string
  description: string
  benefits: string[]
  prices: {
    monthly: number
    yearly: number
  }
  stripeIds: null | {
    monthly: string | null
    yearly: string | null
  }
}
