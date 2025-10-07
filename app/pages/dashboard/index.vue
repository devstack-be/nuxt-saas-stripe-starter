<script setup lang="ts">
const { data: user, signOut } = useAuth()
</script>

<template>
  <div>
    <UPageHero
      title="Dashboard"
      description="Welcome to your dashboard. Here you can manage your account, view your subscription details, and access exclusive features."
    >
      <template #links>
        <UButton
          label="Manage Account"
          color="neutral"
          variant="outline"
          size="sm"
          to="/account"
          icon="i-lucide-user-circle-2"
        />
      </template>
      <div class="mt-6">
        user infos: {{ user }}
      </div>
      <div class="mt-6">
        <UButton
          label="Sign Out"
          color="error"
          variant="outline"
          size="sm"
          icon="i-lucide-log-out"
          @click="signOut()"
        />
      </div>
    </UPageHero>
  </div>
</template>
