<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const { user } = useUserSession()
</script>

<template>
  <div class="mx-auto max-w-4xl">
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
      Welcome back, {{ user?.name || user?.email || 'User' }}
    </p>

    <!-- User Info Cards -->
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-950">
            <Icon name="lucide:user" class="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Name</p>
            <p class="font-medium">{{ user?.name || 'Not set' }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-950">
            <Icon name="lucide:calendar" class="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p class="font-medium">{{ user?.email }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950">
            <Icon name="lucide:shield" class="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Role</p>
            <p class="font-medium capitalize">{{ user?.role || 'user' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Start Guide -->
    <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 class="text-lg font-semibold">Quick Start</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        This is your dashboard. Start building by editing the source code.
      </p>
      <ul class="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li class="flex items-start gap-2">
          <span class="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
          Edit pages in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">app/pages/</code>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
          Add API routes in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">server/api/</code>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
          Modify the database schema in <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">prisma/schema.prisma</code>
        </li>
      </ul>
    </div>
  </div>
</template>
