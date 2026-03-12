import Stripe from 'stripe'

/** Stripe client singleton — only initializes if STRIPE_SECRET_KEY is set */
let stripe: Stripe | null = null

export function useStripeServer(): Stripe | null {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-02-25.clover',
    })
  }
  return stripe
}
