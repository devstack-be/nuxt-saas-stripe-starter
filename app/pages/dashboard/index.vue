<template>
  <div>
    <h2 class="text-2xl font-semibold leading-7 text-highlighted">
      Panel
    </h2>
    <p class="mt-1 text-sm leading-6 text-muted mb-2">
      Welcome to the dashboard
    </p>
    <UCard>
      <template #header>
        <Placeholder class="h-8" />
      </template>

      <Placeholder class="h-32" />

      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Index'
})
definePageMeta({
  layout: 'dashboard'
})
</script>
