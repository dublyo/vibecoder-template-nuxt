<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ middleware: 'auth' })

const { user, fetch: refreshSession } = useUserSession()

const name = ref(user.value?.name || '')
const email = ref(user.value?.email || '')
const currentPassword = ref('')
const newPassword = ref('')
const savingProfile = ref(false)
const savingPassword = ref(false)

async function handleProfileSubmit() {
  savingProfile.value = true
  try {
    await $fetch('/api/user/profile', {
      method: 'PATCH',
      body: { name: name.value, email: email.value },
    })
    await refreshSession()
    toast.success('Profile updated')
  } catch (err: unknown) {
    const fetchErr = err as { data?: { message?: string } }
    toast.error(fetchErr?.data?.message || 'Failed to update profile')
  } finally {
    savingProfile.value = false
  }
}

async function handlePasswordSubmit() {
  savingPassword.value = true
  try {
    await $fetch('/api/user/password', {
      method: 'PATCH',
      body: { currentPassword: currentPassword.value, newPassword: newPassword.value },
    })
    currentPassword.value = ''
    newPassword.value = ''
    toast.success('Password updated')
  } catch (err: unknown) {
    const fetchErr = err as { data?: { message?: string } }
    toast.error(fetchErr?.data?.message || 'Failed to update password')
  } finally {
    savingPassword.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />
    <div class="flex flex-1">
      <LayoutSidebar />
      <main class="flex-1 p-8">
        <div class="mx-auto max-w-2xl">
          <h1 class="text-2xl font-bold">Settings</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your account settings</p>

          <!-- Profile Section -->
          <form class="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900" @submit.prevent="handleProfileSubmit">
            <h2 class="text-lg font-semibold">Profile</h2>
            <div class="mt-4 space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label for="settings-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  id="settings-email"
                  v-model="email"
                  type="email"
                  class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button
                type="submit"
                :disabled="savingProfile"
                class="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
              >
                <Icon v-if="savingProfile" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
                Save profile
              </button>
            </div>
          </form>

          <!-- Password Section -->
          <form class="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-gray-900" @submit.prevent="handlePasswordSubmit">
            <h2 class="text-lg font-semibold">Change Password</h2>
            <div class="mt-4 space-y-4">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current password</label>
                <input
                  id="currentPassword"
                  v-model="currentPassword"
                  type="password"
                  required
                  class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New password</label>
                <input
                  id="newPassword"
                  v-model="newPassword"
                  type="password"
                  required
                  minlength="8"
                  class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button
                type="submit"
                :disabled="savingPassword"
                class="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 disabled:opacity-50"
              >
                <Icon v-if="savingPassword" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
                Update password
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>
