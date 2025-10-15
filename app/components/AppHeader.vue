<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const route = useRoute()
const { data: authData, signOut } = useAuth()

const items = computed(() => [{
  label: 'Docs',
  to: '/docs',
  active: route.path.startsWith('/docs')
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}, {
  label: 'Changelog',
  to: '/changelog'
}])

const dropdownMenuItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'i-lucide-layout-dashboard',
    slot: 'dashboard' as const
  }, {
    label: 'Logout',
    onSelect: async () => {
      await signOut({ callbackUrl: '/' })
    },
    icon: 'i-lucide-log-out'
  }
] satisfies DropdownMenuItem[]
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        v-if="!authData"
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <UButton
        v-if="!authData"
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/login"
        class="hidden lg:inline-flex"
      />
      <UDropdownMenu
        v-else
        :items="dropdownMenuItems"
        class="hidden lg:inline-flex"
        :ui="{ content: 'w-48' }"
      >
        <UButton
          :label="authData.user?.name ?? authData.user?.email ?? undefined"
          color="neutral"
          variant="outline"
          icon="i-lucide-user"
        />
      </UDropdownMenu>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        v-if="!authData"
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        v-else
        label="Dashboard"
        color="primary"
        variant="solid"
        to="/dashboard"
        block
        class="mb-3"
      />
      <UButton
        icon="i-lucide-log-out"
        label="Logout"
        color="error"
        variant="subtle"
        block
        @click="signOut({ callbackUrl: '/' })"
      />
    </template>
  </UHeader>
</template>
