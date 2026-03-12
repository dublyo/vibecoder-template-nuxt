/**
 * Stripe webhook handler.
 * Only active when STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET are set.
 */
export default defineEventHandler(async (event) => {
  const stripe = useStripeServer()

  if (!stripe) {
    throw createError({
      statusCode: 501,
      message: 'Stripe is not configured',
    })
  }

  const body = await readRawBody(event)
  const signature = getHeader(event, 'stripe-signature')

  if (!body || !signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw createError({
      statusCode: 400,
      message: 'Missing signature or webhook secret',
    })
  }

  try {
    const webhookEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // Handle specific event types
    switch (webhookEvent.type) {
      case 'checkout.session.completed':
        // Handle successful checkout
        break
      case 'customer.subscription.updated':
        // Handle subscription update
        break
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        break
      default:
        break
    }

    return { received: true }
  } catch (error) {
    console.error('Stripe webhook error:', error)
    throw createError({
      statusCode: 400,
      message: 'Webhook verification failed',
    })
  }
})
