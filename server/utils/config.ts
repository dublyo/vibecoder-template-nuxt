/**
 * Centralized server configuration — all env vars accessed here.
 * Prevents scattered process.env calls and provides type safety.
 * For public vars, use useRuntimeConfig() in composables instead.
 */

function getEnv(key: string, fallback = ''): string {
  return process.env[key] ?? fallback
}

export function useServerConfig() {
  return {
    /** Database */
    databaseUrl: getEnv('DATABASE_URL', 'postgresql://vibecoder:vibecoder@localhost:5432/app'),

    /** Redis */
    redisUrl: getEnv('REDIS_URL', 'redis://localhost:6379'),

    /** Auth */
    authSecret: getEnv('AUTH_SECRET'),
    sessionPassword: getEnv('NUXT_SESSION_PASSWORD'),

    /** Stripe (optional) */
    stripe: {
      secretKey: getEnv('STRIPE_SECRET_KEY'),
      webhookSecret: getEnv('STRIPE_WEBHOOK_SECRET'),
      get isConfigured() {
        return !!this.secretKey
      },
    },

    /** Resend (optional) */
    resend: {
      apiKey: getEnv('RESEND_API_KEY'),
      get isConfigured() {
        return !!this.apiKey
      },
    },

    /** UploadThing (optional) */
    uploadthing: {
      token: getEnv('UPLOADTHING_TOKEN'),
      get isConfigured() {
        return !!this.token
      },
    },

    isProduction: process.env.NODE_ENV === 'production',
  } as const
}
