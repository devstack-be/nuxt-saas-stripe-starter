<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import SignIn from "~/layouts/default/modals/SignIn.vue";

const navigation = [
  { name: "Pricing", href: "pricing" },
  { name: "Docs", href: "docs" },
];
const mobileMenuOpen = ref(false);
const { status: authStatus } = useAuth();
const authStore = useAuthStore();
</script>

<template>
  <!-- Header -->
  <header class="absolute inset-x-0 top-0 z-50">
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <SvgLogo class="h-8 w-auto" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm font-semibold leading-6"
          :class="[
            $route.name === item.href ? 'text-indigo-600' : 'text-gray-900',
          ]"
          >{{ item.name }}</NuxtLink
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <button
          v-if="authStatus === 'unauthenticated'"
          @click.prevent="authStore.toggleSignInModal()"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Sign In <span aria-hidden="true">&rarr;</span>
        </button>
        <button
          v-else
          @click.prevent="navigateTo('/dashboard')"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Dashboard <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </nav>
    <HeadlessDialog
      as="div"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50" />
      <HeadlessDialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <SvgLogo class="h-8 w-auto" aria-hidden="true" />
          </NuxtLink>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50"
                :class="[
                  $route.name === item.href
                    ? 'text-indigo-600'
                    : 'text-gray-900',
                ]"
                >{{ item.name }}</NuxtLink
              >
            </div>
            <div class="py-6">
              <button
                @click.prevent="authStore.toggleSignInModal()"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </HeadlessDialogPanel>
    </HeadlessDialog>
    <SignIn />
  </header>
</template>
