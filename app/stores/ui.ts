export const useUIStore = defineStore("ui", () => {
  const isDocsSearchModalOpen = ref(false);

  const toggleDocsSearchModal = (value?: boolean) => {
    isDocsSearchModalOpen.value = value ? value : !isDocsSearchModalOpen.value;
  };

  return {
    isDocsSearchModalOpen,
    toggleDocsSearchModal,
  } as const;
});

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
