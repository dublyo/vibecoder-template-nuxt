<script setup lang="ts">
const route = useRoute()

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: 'lucide:layout-dashboard' },
  { href: '/dashboard/billing', label: 'Billing', icon: 'lucide:credit-card' },
  { href: '/dashboard/uploads', label: 'Uploads', icon: 'lucide:upload' },
  { href: '/dashboard/notifications', label: 'Notifications', icon: 'lucide:mail' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'lucide:settings' },
]
</script>

<template>
  <aside class="w-64 border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
    <nav class="flex flex-col gap-1 p-4">
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        :class="[
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          route.path === item.href
            ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
        ]"
      >
        <Icon :name="item.icon" class="h-4 w-4" />
        {{ item.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>
