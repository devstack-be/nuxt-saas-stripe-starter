<template>
  <UModal v-model="uiStore.isDocsSearchModalOpen" :ui="modalConfig">
    <UCommandPalette
      v-model="selected"
      placeholder="Search..."
      :close-button="commandPaletteConfig.closeButton"
      @close="uiStore.toggleDocsSearchModal()"
      :empty-state="{
        icon: 'i-heroicons-magnifying-glass-20-solid',
        label: 'Under development',
        queryLabel: 'Under development',
      }"
    />
  </UModal>
</template>

<script lang="ts" setup>
const uiStore = useUIStore();
const modalConfig = {
  padding: "p-0 sm:p-4",
  rounded: "rounded-none sm:rounded-lg",
  width: "sm:max-w-3xl",
  height: "h-dvh sm:h-[28rem]",
};
const commandPaletteConfig = {
  closeButton: {
    icon: "i-heroicons-x-mark-20-solid",
    color: "gray" as const,
    variant: "ghost" as const,
    size: "sm" as const,
  },
};
const selected = ref([]);
</script>
