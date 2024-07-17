<template>
  <div>
    <Header />
    <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
      <SecondaryNavigation />
      <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./dashboard/Header.vue";
import SecondaryNavigation from "./dashboard/SecondaryNavigation.vue";

useSeoMeta({
  robots: "noindex, nofollow",
});
const route = useRoute();
const router = useRouter();
const toast = useToast();
onMounted(() => {
  if (route.query.signInCallback) {
    router.replace({ query: {} });
    toast.add({
      title: "Welcome!",
      color: "indigo",
      description: "You have successfully signed in.",
    });
  }
  if (route.query.webhookCallback) {
    router.replace({ query: {} });
    toast.add({
      title: "Subscription",
      color: "green",
      description:
        "You have successfully subscribed to our plan. You will receive an email shortly.",
    });
  }
});
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Dashboard` : "Dashboard";
  },
});
</script>
