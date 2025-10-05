<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";
import { splitByCase, upperFirst } from "scule";

const route = useRoute();
const { seo } = useAppConfig();
const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
if (page.value.redirect && page.value.redirect !== route.path)
  navigateTo(page.value.redirect);

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryContent()
    .where({ _extension: "md", navigation: { $ne: false } })
    .only(["title", "description", "_path"])
    .findSurround(withoutTrailingSlash(route.path))
);

const headline = computed(() => findPageHeadline(page.value as ParsedContent));
function findPageHeadline(page: ParsedContent): string {
  return page._dir?.title
    ? page._dir.title
    : splitByCase(page._dir)
        .map((p) => upperFirst(p))
        .join(" ");
}
definePageMeta({
  layout: "docs",
});
useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName} - Docs`,
  title: page.value.title,
  ogTitle: `${page.value.title} - ${seo?.siteName} - Docs`,
  twitterTitle: `${page.value.title} - ${seo?.siteName} - Docs`,
  description: page.value.description,
  ogDescription: page.value.description,
  twitterDescription: page.value.description,
});
defineOgImageComponent("Nuxt", {
  title: page.value.title,
  description: page.value.description,
});
</script>
<template>
  <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
    <div class="lg:col-span-8">
      <div class="relative border-b border-gray-200 dark:border-gray-800 py-8">
        <div
          class="mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5"
        >
          {{ headline }}
        </div>
        <div class="flex flex-col lg:flex-row items-start gap-6">
          <!---->
          <div class="flex-1">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between"
            >
              <h1
                class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
              >
                {{ page?.title }}
              </h1>
              <!---->
            </div>
            <div class="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {{ page?.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 pb-24 prose prose-primary dark:prose-invert max-w-none">
        <ContentRenderer v-if="page?.body" :value="page" />
        <DocsSurround :surround="surround" />
      </div>
    </div>
    <div class="lg:col-span-2 order-first lg:order-last"></div>
  </div>
</template>
