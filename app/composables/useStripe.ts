/** Client-side Stripe helpers — only functional when publishable key is set */
export function useStripe() {
  const config = useRuntimeConfig()
  const publishableKey = config.public.stripePublishableKey

  const isConfigured = computed(() => !!publishableKey)

  return {
    isConfigured,
    publishableKey,
  }
}
