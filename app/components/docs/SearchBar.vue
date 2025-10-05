<script setup lang="ts">
const { metaSymbol } = useShortcuts();
const uiStore = useUIStore();
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      uiStore.toggleDocsSearchModal();
    },
  },
});
</script>
<template>
  <UButton
    class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 items-center flex-1 hidden lg:flex"
    icon="i-heroicons-magnifying-glass-20-solid"
    @click.prevent="uiStore.toggleDocsSearchModal()"
    color="white"
    label="Search..."
    block
  >
    <template #trailing>
      <div
        class="hidden lg:flex items-center gap-0.5 ml-auto -my-1 flex-shrink-0"
      >
        <UKbd>{{ metaSymbol }}</UKbd>
        <UKbd>K</UKbd>
      </div>
    </template>
  </UButton>
</template>
