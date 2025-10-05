<template>
  <div>
    <h2 class="text-2xl font-semibold leading-7 text-gray-900">Panel</h2>
    <p class="mt-1 text-sm leading-6 text-gray-500 mb-2">
      Welcome to the dashboard
    </p>
    <UCard>
      <template #header>
        <UiPlaceHolder class="h-8" />
      </template>

      <UiPlaceHolder class="h-32" />

      <template #footer>
        <UiPlaceHolder class="h-8" />
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Index",
});
definePageMeta({
  layout: "dashboard",
});
</script>
