<template>
  <div class="grid gap-8 sm:grid-cols-2">
    <DocsSurroundLink
      v-if="prev"
      :link="prev"
      icon="i-heroicons-arrow-left-20-solid"
    />
    <span v-else class="hidden sm:block">&nbsp;</span>
    <DocsSurroundLink
      v-if="next"
      :link="next"
      icon="i-heroicons-arrow-right-20-solid"
      class="text-right"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ParsedContent } from "@nuxt/content";

const props = defineProps({
  surround: {
    type: Array as PropType<Pick<ParsedContent, string>[]>,
    default: () => [],
  },
});

const [prev, next] = props.surround || [];
</script>
