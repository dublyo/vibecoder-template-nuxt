<template>
  <footer class="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Icon name="lucide:rocket" class="h-4 w-4" />
          <span>Built with VibeCoder</span>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
