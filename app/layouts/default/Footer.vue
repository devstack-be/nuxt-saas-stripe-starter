<script setup lang="ts">
const { footer } = useAppConfig();
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <footer class="relative border-t border-gray-900/10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl overflow-hidden px-6 lg:px-8">
        <nav
          class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          <div v-for="item in footer.navigation" class="pb-6">
            <NuxtLink
              :key="item.name"
              :to="item.href"
              class="text-sm leading-6 text-gray-600 hover:text-gray-900"
              >{{ item.name }}</NuxtLink
            >
          </div>
        </nav>
        <div class="mt-10 flex justify-center space-x-10">
          <UButton
            v-for="(link, index) of footer.links"
            :key="index"
            v-bind="{ color: 'gray', variant: 'ghost', ...link }"
          />
        </div>
        <p class="mt-10 text-center text-xs leading-5 text-gray-500">
          {{ footer.credits }}
        </p>
      </div>
    </footer>
  </div>
</template>
