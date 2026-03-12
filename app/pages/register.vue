<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const { fetch: refreshSession } = useUserSession()

async function handleSubmit() {
  loading.value = true
  error.value = ''

  try {
    // Register the user
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value },
    })

    // Auto-login after registration
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    await refreshSession()
    navigateTo('/dashboard')
  } catch (err: unknown) {
    const fetchErr = err as { data?: { message?: string } }
    error.value = fetchErr?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#F1F5FB] px-4 dark:bg-gray-950">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="mb-8 text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-2xl font-bold">
          <Icon name="lucide:rocket" class="h-8 w-8 text-primary-600 dark:text-primary-400" />
          VibeCoder
        </NuxtLink>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create your account
        </p>
      </div>

      <!-- Form Card -->
      <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div v-if="error" class="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
            {{ error }}
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              minlength="8"
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="••••••••"
            />
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Must be at least 8 characters
            </p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
          >
            <Icon v-if="loading" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
            <span v-else>Create account</span>
          </button>
        </form>
      </div>

      <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?
        <NuxtLink to="/login" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
