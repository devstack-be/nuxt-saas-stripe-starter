<script setup lang="ts">
const uiStore = useUIStore();
</script>
<template>
  <UButton
    icon="i-heroicons-magnifying-glass"
    @click.prevent="uiStore.toggleDocsSearchModal()"
    variant="ghost"
    color="gray"
    class="lg:hidden flex"
  />
</template>
