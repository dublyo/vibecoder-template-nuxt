<script setup lang="ts">
/** Feature items displayed in the grid on the homepage */
const features = [
  {
    icon: 'lucide:zap',
    title: 'Lightning Fast',
    description: 'Built on Nuxt 4 with server-side rendering for optimal performance.',
  },
  {
    icon: 'lucide:shield',
    title: 'Authentication',
    description: 'Email/password auth with nuxt-auth-utils — ready to extend with OAuth.',
  },
  {
    icon: 'lucide:database',
    title: 'Database Ready',
    description: 'Prisma ORM with PostgreSQL — type-safe queries and easy migrations.',
  },
  {
    icon: 'lucide:credit-card',
    title: 'Payments',
    description: 'Stripe integration pre-wired — subscriptions, one-time payments, webhooks.',
  },
  {
    icon: 'lucide:mail',
    title: 'Email',
    description: 'Resend for transactional emails — welcome, password reset, notifications.',
  },
  {
    icon: 'lucide:rocket',
    title: 'Deploy Anywhere',
    description: 'Docker-ready with GitHub Actions CI/CD — push to main and ship.',
  },
]
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />

    <main class="flex-1">
      <!-- Hero Section -->
      <section class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
          <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
            Build your next
            <span class="text-primary-600 dark:text-primary-400">web app</span>
            in minutes
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            A production-ready full-stack starter with authentication, database,
            payments, email, and file uploads — all pre-configured and ready to go.
          </p>
          <div class="mt-10 flex items-center justify-center gap-4">
            <NuxtLink
              to="/register"
              class="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
            >
              Get started
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="rounded-lg px-6 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 dark:text-gray-100 dark:ring-gray-700 dark:hover:bg-gray-900"
            >
              Sign in
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="px-4 py-24 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
              All the essentials for building a modern web application.
            </p>
          </div>
          <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-950">
                <Icon :name="feature.icon" class="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 class="mt-4 text-lg font-semibold">{{ feature.title }}</h3>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="px-4 py-24 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl rounded-2xl bg-primary-600 px-8 py-16 text-center dark:bg-primary-700">
          <h2 class="text-3xl font-bold tracking-tight text-white">
            Ready to start building?
          </h2>
          <p class="mt-4 text-lg text-primary-100">
            Create your account and start shipping features today.
          </p>
          <NuxtLink
            to="/register"
            class="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50"
          >
            Get started for free
          </NuxtLink>
        </div>
      </section>
    </main>

    <LayoutFooter />
  </div>
</template>
