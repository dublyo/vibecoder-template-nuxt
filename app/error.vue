<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-[#F1F5FB] px-4 dark:bg-gray-950">
    <h1 class="text-8xl font-bold text-primary-600 dark:text-primary-400">
      {{ error.statusCode }}
    </h1>
    <p class="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
      {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
    </p>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      {{ error.statusCode === 404 ? "The page you're looking for doesn't exist or has been moved." : error.message }}
    </p>
    <button
      class="mt-8 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
      @click="handleClear"
    >
      Go home
    </button>
  </div>
</template>
