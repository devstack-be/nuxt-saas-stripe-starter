<template>
  <NuxtLink :to="(link as ParsedContent)._path" :class="config.wrapper">
    <div
      v-if="icon || (link as ParsedContent).icon"
      :class="config.icon.wrapper"
    >
      <UIcon
        :name="icon || (link as ParsedContent).icon"
        :class="config.icon.base"
      />
    </div>

    <p :class="config.title">
      {{ (link as ParsedContent).title }}
    </p>

    <p :class="config.description">
      {{ (link as ParsedContent).description }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ParsedContent } from "@nuxt/content";

const config = {
  wrapper:
    "block px-6 py-8 border not-prose rounded-lg border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group",
  icon: {
    wrapper:
      "inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50",
    base: "w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary",
  },
  title: "font-medium text-gray-900 dark:text-white text-[15px] mb-1",
  description:
    "text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-2",
};

defineProps({
  link: {
    type: Object as PropType<Pick<ParsedContent, string>>,
    required: true,
  },
  icon: {
    type: String,
    default: undefined,
  },
});
</script>
