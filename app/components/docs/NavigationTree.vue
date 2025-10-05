<script setup lang="ts">
import type { NavItem } from "@nuxt/content";
defineProps<{
  navigation: NavItem[];
}>();
</script>
<template>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="-mx-2 space-y-1">
          <DocsNavigationItem
            v-for="item in navigation"
            :key="item._path"
            :item="item"
          />
        </ul>
      </li>
    </ul>
  </nav>
</template>
