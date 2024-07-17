<script setup lang="ts">
import Footer from "./default/Footer.vue";
import Header from "./default/Header.vue";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Nuxt SaaS Starter`
      : "Nuxt SaaS Starter";
  },
});
useSeoMeta({
  ogImage: "/social-card.png",
  twitterImage: "/social-card.png",
});
</script>
<template>
  <div class="bg-white">
    <Header />
    <div>
      <slot />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>
