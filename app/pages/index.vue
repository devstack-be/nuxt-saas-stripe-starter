<script setup lang="ts">
import CTA from "~/layouts/default/sections/CTA.vue";
import Features from "~/layouts/default/sections/Features.vue";
import Hero from "~/layouts/default/sections/Hero.vue";
import PoweredBy from "~/layouts/default/sections/PoweredBy.vue";

const { seo } = useAppConfig();
useSeoMeta({
  title: seo?.siteName,
  ogTitle: seo?.siteName,
  twitterTitle: seo?.siteName,
  description:
    "Get your project off to an explosive start with Nuxt SaaS Starter! Powered by Nuxt 3, Prisma, Neon, Nuxt Auth, Resend, Nuxt ui and Stripe.",
  ogDescription:
    "Get your project off to an explosive start with Nuxt SaaS Starter! Powered by Nuxt 3, Prisma, Neon, Nuxt Auth, Resend, Nuxt ui and Stripe.",
  twitterDescription:
    "Get your project off to an explosive start with Nuxt SaaS Starter! Powered by Nuxt 3, Prisma, Neon, Nuxt Auth, Resend, Nuxt ui and Stripe.",
});
</script>
<template>
  <main class="isolate">
    <!-- Hero section -->
    <Hero />

    <!-- Logo cloud -->
    <PoweredBy />

    <!-- Features section -->
    <Features />

    <!-- CTA section -->
    <CTA />
  </main>
</template>
