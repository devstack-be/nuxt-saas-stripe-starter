import Stripe from 'stripe'

const config = useRuntimeConfig()
export const stripe = new Stripe(config.StripeSecretKey, {
  apiVersion: '2025-09-30.clover',
  typescript: true
})
