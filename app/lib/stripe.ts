import Stripe from "stripe";

const config = useRuntimeConfig();
export const stripe = new Stripe(config.StripeSecretKey, {
  apiVersion: "2024-04-10",
  typescript: true,
});
