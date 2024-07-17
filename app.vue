<script setup lang="ts">
provideHeadlessUseId(() => useId());
const { seo } = useAppConfig();
const publicConfig = useRuntimeConfig().public;

useHead({
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});
useSeoMeta({
  robots: "index, follow",
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogUrl: publicConfig.SiteUrl,
  ogType: "website",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
});
</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
