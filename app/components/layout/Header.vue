<template>
  <header class="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-bold">
        My App
      </NuxtLink>
      <nav class="flex items-center gap-4">
        <NuxtLink
          to="/"
          class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          Home
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
