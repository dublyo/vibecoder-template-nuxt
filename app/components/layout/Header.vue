<script setup lang="ts">
const { loggedIn, clear } = useUserSession()

/** Handle sign out — clears session and redirects to homepage */
async function handleSignOut() {
  await clear()
  navigateTo('/')
}
</script>

<template>
  <header class="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-bold">
        <Icon name="lucide:rocket" class="h-6 w-6 text-primary-600 dark:text-primary-400" />
        <span>VibeCoder</span>
      </NuxtLink>

      <nav class="flex items-center gap-4">
        <UiThemeToggle />
        <template v-if="loggedIn">
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <Icon name="lucide:layout-dashboard" class="h-4 w-4" />
            Dashboard
          </NuxtLink>
          <button
            class="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            @click="handleSignOut"
          >
            <Icon name="lucide:log-out" class="h-4 w-4" />
            Sign out
          </button>
        </template>
        <template v-else>
          <NuxtLink
            to="/login"
            class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Sign in
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            Get started
          </NuxtLink>
        </template>
      </nav>
    </div>
  </header>
</template>
