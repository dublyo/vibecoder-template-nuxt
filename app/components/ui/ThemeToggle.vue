<script setup lang="ts">
/** Dark/light mode toggle button with system detection */
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <Icon
      :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
      class="h-4 w-4"
    />
  </button>
</template>
