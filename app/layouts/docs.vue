<script setup lang="ts">
import type { NavItem } from "@nuxt/content";
import Header from "./docs/Header.vue";
const { data: navigation } = await useAsyncData<NavItem[]>("navigation", () =>
  fetchContentNavigation()
);
const navigationItems =
  navigation.value && navigation.value.length > 0
    ? (navigation.value[0].children as NavItem[])
    : [];

provide("navigation", navigationItems);
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Nuxt SaaS Starter`
      : "Nuxt SaaS Starter";
  },
});
</script>
<template>
  <div class="bg-white">
    <Header />
    <main class="min-h-[calc(100vh-4em)]">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
          <!-- LEFT -->
          <div class="lg:col-span-2">
            <aside
              class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-4em)] lg:sticky lg:top-[4em] py-8 lg:px-4 lg:-mx-4"
            >
              <div class="relative">
                <DocsNavigationTree
                  v-if="navigationItems"
                  :navigation="navigationItems"
                />
              </div>
            </aside>
          </div>
          <!-- CENTER/RIGHT -->
          <div class="lg:col-span-8">
            <slot />
          </div>
        </div>
      </div>
    </main>
    <ClientOnly>
      <LazyDocsSearchMenu />
    </ClientOnly>
  </div>
</template>
