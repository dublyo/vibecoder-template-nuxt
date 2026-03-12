import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',
  future: { compatibilityVersion: 4 },

  modules: [
    'nuxt-auth-utils',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || '',
    redisUrl: process.env.REDIS_URL || '',
    authSecret: process.env.AUTH_SECRET || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    public: {
      appUrl: process.env.APP_URL || 'http://localhost:3000',
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    },
  },

  nitro: {
    preset: 'node-server',
  },
})
