<script setup lang="ts">
import { toast } from 'vue-sonner'

const route = useRoute()
const token = computed(() => route.query.token as string)
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

async function handleSubmit() {
  if (password.value !== confirmPassword.value) {
    toast.error('Passwords do not match')
    return
  }

  loading.value = true

  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { token: token.value, password: password.value },
    })
    toast.success('Password has been reset')
    navigateTo('/login')
  } catch (err: unknown) {
    const fetchErr = err as { data?: { message?: string } }
    toast.error(fetchErr?.data?.message || 'Something went wrong')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#F1F5FB] px-4 dark:bg-gray-950">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-2xl font-bold">
          <Icon name="lucide:rocket" class="h-8 w-8 text-primary-600 dark:text-primary-400" />
          VibeCoder
        </NuxtLink>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Set your new password</p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-card dark:border-gray-800 dark:bg-gray-900">
        <div v-if="!token" class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">Invalid reset link. Please request a new one.</p>
          <NuxtLink to="/forgot-password" class="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            Request new link
          </NuxtLink>
        </div>
        <form v-else class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              minlength="8"
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm password</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              minlength="8"
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
          >
            <Icon v-if="loading" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
            <span v-else>Reset password</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
