import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',
  future: { compatibilityVersion: 4 },

  modules: [
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
    public: {
      appUrl: process.env.APP_URL || 'http://localhost:3000',
    },
  },

  nitro: {
    preset: 'node-server',
  },
})
