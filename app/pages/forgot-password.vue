<script setup lang="ts">
import { toast } from 'vue-sonner'

const email = ref('')
const loading = ref(false)
const sent = ref(false)

async function handleSubmit() {
  loading.value = true

  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value },
    })
    sent.value = true
    toast.success('Check your email for a reset link')
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
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Reset your password</p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-card dark:border-gray-800 dark:bg-gray-900">
        <div v-if="sent" class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            If an account with that email exists, we sent a password reset link. Check your inbox.
          </p>
        </div>
        <form v-else class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
          >
            <Icon v-if="loading" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
            <span v-else>Send reset link</span>
          </button>
        </form>
      </div>

      <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <NuxtLink to="/login" class="inline-flex items-center gap-1 font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
          <Icon name="lucide:arrow-left" class="h-3 w-3" />
          Back to sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
